const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = app => {

  app.post('/api/surveys', requireLogin, async (req, res) => {
      console.log(req.body);
      const { title, subject, body, recipients } = req.body;
      const survey = new Survey({
          title,
          subject,
          body,
          recipients: recipients.split(',').map(email => ({ email: email.trim() })),
          _user: req.user.id,
          dateSent: Date.now(),
      });

      //send email, save to survey collection & update user credits
      const mailer = new Mailer(survey, surveyTemplate(survey));

      try {
          await mailer.send();
          await survey.save();
          req.user.credits -= 1;
          const user = await req.user.save();

          res.send(user);
      } catch (err) {
          res.status(422).send(err);
      }

  });

  app.get('/api/surveys', requireLogin, async (req, res) =>{
      const surveys = await Survey
          .find({ _user: req.user.id })
          .select({ recipients: false });

      res.send(surveys);
  });

  app.post('/api/surveys/webhooks', (req, res) => {
      const path = new Path('/api/surveys/:surveyId/:choice');

      _.chain(req.body)
        .map(({ email, url }) => {
            const pathName = new URL(url).pathname;
            const match = path.test(pathName);
            if(match) {
                return { email, surveyId: match.surveyId, choice: match.choice };
            }
        })
        .compact() //remove undefined
        .uniqBy('email', 'surveyId') // unique by email, surveyId
        .each(({surveyId, email, choice}) => {
            Survey.updateOne(
            {
                _id: surveyId,
                recipients: {
                    $elemMatch: {email: email, responded: false}
                }
            },
            {
                $inc: {[choice]: 1},
                $set: {'recipients.$.responded': true, ['recipients.$.'+choice]: 1, 'recipients.$.responseTime': Date.now()},
                lastResponded: Date.now()
            }).exec();
        })
        .value();

      // const events = _.map(req.body, ({ email, url }) => {
      //    const pathName = new URL(url).pathname;
      //    const match = path.test(pathName);
      //    if(match) {
      //        return {email, surveyId: match.surveyId, choice: match.choice};
      //    }
      // });
      //
      // const removeUndefined = _.compact(events);
      // const uniqueEvents = _.uniqBy(removeUndefined, 'email', 'surveyId');



      // console.log(events);

    });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });
};
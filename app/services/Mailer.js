const sendGrid = require('sendgrid');
const helper = sendGrid.mail;
const keys = require('../config/keys');

//Everything done here is sendGrid requirements

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();

        this.sendGridApi = sendGrid(keys.sendGrid.api_key);
        this.from_email = new helper.Email('no-reply@surveyservice.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        //Register recipients
        this.addRecipients();

        //helper.Mail predefined function
        this.addContent(this.body);

        //click tracking
        this.addClickTracking();

    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        })
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    async send() {
        const request = this.sendGridApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });
        const response = await this.sendGridApi.API(request);
        return response;
    }
}

module.exports = Mailer;
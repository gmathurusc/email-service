const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require("path");
const keys = require("./app/config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require('body-parser');

require('./app/models/User');  //should come before passport
require('./app/models/Survey');
require('./app/services/passport');


mongoose.connect(keys.mongoose.uri);

/*

app.use is for declaring middleware which pre-process incoming requests before hitting routes

*/

//Enabling Cookies
app.use(
    cookieSession({
        maxAge : 30*24*60*60,
        keys : [keys.cookieSession.key]
    })
);

//Asking passport to use cookies
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

require('./app/routes/authentication')(app);
require('./app/routes/billing')(app);
require('./app/routes/survey')(app);
app.set('public', path.join(__dirname, 'public'));

//Set Static Path
app.use('/public', express.static(__dirname + '/public'));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        console.log("dirname :" +__dirname);
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


app.listen(process.env.PORT || 8003, function () {
    console.log("Server serving on 8003...");
});
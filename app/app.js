const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require("path");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");

require('./models/User');  //should come before passport
require('./services/passport');


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

require('./routes/authentication')(app);
//Routes
// app.use('/', require('./routes'));


app.set('public', path.join(__dirname, 'public'));

//Set Static Path
app.use('/public', express.static(__dirname + '/public'));


app.listen(process.env.PORT || 8003, function () {
    console.log("Server serving on 8003...");
});
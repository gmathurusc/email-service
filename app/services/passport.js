const passport = require('passport');
const keys = require("../config/keys");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) =>{
   done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    User.findById(id).then(user =>{
        done(null, user);
    })
});

passport.use(new GoogleStrategy(
        {
            clientID : keys.google.client_id,
            clientSecret : keys.google.client_secret,
            callbackURL : '/auth/google/callback',
            proxy : true
        }, (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId : profile.id }).then((existingUser) => {
                if(existingUser) {
                    console.log("existing");
                    done(null, existingUser); //error, user
                }
                else {
                    new User({ googleId : profile.id}).save().then(user => done(null, user));
                }
        });
    }
))


const bcrypt = require('bcryptjs');
const express = require("express");
const router = express.Router();
const Login = require("./model/login/logins");
const { Op } = require("sequelize");
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

    function FindUser(username) {
        return Login.findOne({ where: { user: user }});
    }

    function FindUserById(id) {
        return Login.findOne({ where: { id: id }});
    }

    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    passport.deserializeUser((id, done) => {
        try {
            const user = FindUserById(id);
            done(null, user);
        }
        catch(err) {
            console.log(err);
            return done(err, null);
        }
    });

    passport.use( new LocalStrategy({
        usernameField: 'user',
        passwordField: 'password'
    },
    (username, password, done) => {
        try {
            const user = FindUser(username);
            if(!user) return done(null, false);

            const isValid = bcrypt.compareSync(password, user.password);
            if(!isValid) return done(null, false);
            return done(null, user);
        } 
        catch (error) {
            console.log(error);
            return done(error, false);
        }
    }));
}

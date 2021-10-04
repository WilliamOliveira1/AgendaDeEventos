const express = require("express");
const app = express();
const router = express.Router();
const Login = require("../model/login/logins");
const bcrypt = require('bcryptjs');
const { application } = require("express");

router.post("/login/save", (req,res) => {
    let user     = req.body.user;
    let email     = req.body.email;
    let password = req.body.password;
    let passBcryptHash = bcrypt.hashSync(password);
    let errorMessage;

    if(!user || !password) {
        errorMessage = "User and/or";
        console.error("User tried to save empty data!");
        res.redirect("/");
    }else{
        //First we check if the user exist
        Login.count({ where: { user: user } }).then(count => {
            // if user do not exist we create  it
            console.log("Counted");
            if (count == 0) {
                Login.create({
                    user: user,
                    email: email,
                    password: passBcryptHash,
                }).then(() => {
                    res.redirect("/");
                })
            }
            else {
                console.log("User already exist")
                res.redirect("/");
            }
        });
    }
});

router.post("/login/check", (req,res) => {
    let user     = req.body.user;
    let password = req.body.password;
    let errorMessage;
    

    if(!user || !password) {
        errorMessage = "User and/or";
        console.error("User tried to save empty data!");
        res.redirect("/");
    }else{
        //First we check if the user exist 
        Login.count({ where: { user: user } }).then(count => {
            // if user do not exist we create  it
            if (count == 1) {
                Login.findOne({ where: 
                { 
                        user: user
                }}).then(local => {
                    let test = JSON.stringify(local);
                    let obj = JSON.parse(test)
                    const isValid = bcrypt.compareSync(password, obj.password);
                    console.log(isValid);
                    if(isValid) {
                        res.send("User exist!");
                    }else {
                        res.redirect("/");
                    }                    
                });                                
            }
            else {
                console.log("Login do no exist!");
                res.redirect("/");
            }
        });
    }
});

/*router.post('/login/check', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/registration'
}))*/

module.exports = router;
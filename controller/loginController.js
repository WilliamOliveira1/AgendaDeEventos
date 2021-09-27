const express = require("express");
const router = express.Router();
const Login = require("../model/login/logins");

router.post("/login/save", (req,res) => {
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
            if (count == 0) {
                Login.create({
                    user: user,
                    password: password,
                }).then(() => {
                    res.render('registration')
                })
            }
            else {
                console.log("User already exist")
                res.redirect("/");
            }
        });
    }
});

module.exports = router;
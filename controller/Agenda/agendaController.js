const express = require("express");
const app = express();
const router = express.Router();
const Agenda = require("../../model/Agenda/agenda");
const bcrypt = require('bcryptjs');
const { application } = require("express");

router.post("/agenda/save", (req, res) => {
    let title = req.body.title;
    let start = req.body.start;
    let end = req.body.end;
    let allDay = req.body.allDay;
    let idMessage;
    console.log("agenda save data");

    if (!title) {
        message = "true";
        idMessage = "userOrPassEmptyCad"
        console.error("User tried to save empty data!");
        res.render("index", {
            message: message,
            idMessage: idMessage
        });
    } else {
        Agenda.create({
            title: title,
            start: start,
            end: end,
            allDay: allDay
        }).then(() => {
            message = "true";
            idMessage = "userCreated"
            console.error("User account saved!");
            res.render("index", {
                message: message,
                idMessage: idMessage
            });
        })
    }
});

router.get("/api/eventosagenda", (req, res) => {
    Agenda.findAll().then(eventos => {
        res.json(eventos);
    });    
});

module.exports = router;
const express = require("express");
const app = express();
const router = express.Router();
const Agenda = require("../../model/Agenda/agenda");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { application } = require("express");
const authCheck = require('../../middleware/loginCheck')

router.post("/agenda/save", (req, res) => {
    let title = req.body.title;
    let start = req.body.start;
    let end = req.body.end;
    let allDay = req.body.allDay;
    let room  = req.body.room;

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
            allDay: allDay,
            room: room
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

router.post("/api/eventosagendaporsala", (req, res) => {
    let room = req.body.room;
    console.log(req.body.room);

    Agenda.findAll({where: {
        room: room
    }}).then(eventos => {
        res.json(eventos);
    });    
});


router.post("/api/deleteEventById", (req, res) => {
    var id = req.body.room;
    console.log(id);
    if(id !== undefined) {
        if(!isNaN(id)) {
            Agenda.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                console.log("id: " + id);
            });
        }else {
            console.log("id " + id + "is not a number!");
        }
    }else {
        console.log("id " + id + "is undefined!");
        res.redirect("/admin/categories");
    }
});

module.exports = router;
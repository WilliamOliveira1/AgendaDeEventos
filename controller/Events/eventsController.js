const express = require("express");
const app = express();
const router = express.Router();
const Events = require("../../model/events/events");
const { application } = require("express");

router.post("/events/save", (req, res) => {
    let event = req.body.InputEvent;
    let idMessage;

    if (!event) {
        message = "true";
        idMessage = "eventEmpty"
        console.error("User tried to save empty data!");
        res.render("dashboard", {
            message: message,
            idMessage: idMessage
        });
    } else {
        Events.count({ where: { event: event } }).then(count => {
            if (count == 0) {
                Events.create({
                    event: event,
                }).then(() => {
                    message = "true";
                    idMessage = "eventCreated"
                    console.error("Event saved!");
                    res.render("dashboard", {
                        message: message,
                        idMessage: idMessage
                    });
                })
            }else {
                message = "true";
                idMessage = "eventExist"
                console.log("Event already exist");
                res.render("dashboard", {
                    message: message,
                    idMessage: idMessage
                });
            }
        });
    }
});

router.get("/api/getallevents", (req, res) => {
    Events.findAll().then(events => {
        res.json(events);
    });    
});

module.exports = router;
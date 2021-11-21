const express = require("express");
const app = express();
const router = express.Router();
const Rooms = require("../../model/salas/salas");
const { application } = require("express");


router.post("/rooms/save", (req, res) => {
    let room = req.body.InputRoom;
    let idMessage;

    if (!room) {
        message = "true";
        idMessage = "roomEmpty"
        console.error("User tried to save empty data!");
        res.render("dashboard", {
            message: message,
            idMessage: idMessage
        });
    } else {
        Rooms.count({ where: { Nome: room } }).then(count => {
            if (count == 0) {
                Rooms.create({
                    Nome: room,
                }).then(() => {
                    message = "true";
                    idMessage = "roomCreated"
                    console.error("Room saved!");
                    res.render("dashboard", {
                        message: message,
                        idMessage: idMessage
                    });
                })
            }else {
                message = "true";
                idMessage = "roomExist"
                console.log("Room already exist");
                res.render("dashboard", {
                    message: message,
                    idMessage: idMessage
                });
            }
        });
    }
});

router.get("/api/getallrooms", (req, res) => {
    Rooms.findAll().then(rooms => {
        res.json(rooms);
    });    
});

module.exports = router;
const express = require("express");
const router = express.Router();
const db = require("../models")

router.get("/signup", function (req, res) {
    res.render("signup");
})

router.post("/signup", function (req, res) {
    db.User.create({
        username: req.body.username,
        password: req.body.password
    }).then(newUser => {
        // res.json(newUser)
        req.session.user = {
            username: newUser.username,
            id: newUser.id
        };
        // res.send("logged in!")
        res.redirect('/secretclub')
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;
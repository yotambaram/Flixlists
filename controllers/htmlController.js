const express = require("express");
const router = express.Router();
const db = require("../models");
//const bcrypt = require("bcrypt");


router.get("/movies", function (req, res) {
    if (req.session.user) {
        db.User.findAll({
            where: {
                username: req.session.user.id
            }
        }).then(dbUser => {
            res.render("main", dbUser)
        })
    }else {
        res.redirect("/login");
    }
})


router.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
        res.json('logged out');
    })
})

module.exports = router;
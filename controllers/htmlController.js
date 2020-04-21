const express = require("express");
const router = express.Router();
const db = require("../models");
//const bcrypt = require("bcrypt");



router.get("/movies", function (req, res) {
    if (req.session.user) {
        res.render("secretclub", req.session.user)
    } else {
        res.redirect("/login");
    }
})



router.get("/movies/:userid", function (req, res) {
    if (req.session.user) {
        db.res.render(
            //render user id db
        )
    } else {
        res.redirect("/login");
    }
})




/*
router.get("/readsessions", function (req, res) {
    res.json(req.session);
})
*/

router.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
        res.json('logged out');
    })
})

module.exports = router;
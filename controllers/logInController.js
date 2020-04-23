


const express = require("express");
const router = express.Router();
const db = require("../models")
const bcrypt = require("bcrypt");
router.get("/login", function (req, res) {
    res.render("login");
})
router.post("/login", function (req, res) {
    db.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUser => {
        console.log(dbUser.password)
        console.log(req.body.password)
        if (bcrypt.compareSync(req.body.password, dbUser.password)) {
            req.session.user = {
                email: dbUser.email,
                id: dbUser.id
            };
            res.redirect('/movies/')
        } else {
            res.send("not logged in")  //<---------------- MAKE A HTML RES
        }
    })
})
module.exports = router;
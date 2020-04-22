const express = require("express");
const router = express.Router();
const db = require("../models");
//const bcrypt = require("bcrypt");


router.get("/signup", function (req, res) {
    res.render("signup");
})

router.post("/signup", function (req, res) {
    db.User.create({
        first_name: req.body. first_name,
        last_name: req.body. last_name,
        email: req.body.email,
        password: req.body.password,

    }).then(newUser => {
        req.session.user = {
            email: newUser.email,
            id: newUser.id
        };
        res.redirect('/movies')
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;

/*
const user = await User.create({
  username: 'alice123',
}, { fields: ['username'] });
// let's assume the default of isAdmin is false
console.log(user.username); // 'alice123'
console.log(user.isAdmin); // false
*/
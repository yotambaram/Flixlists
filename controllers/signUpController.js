const express = require("express");
const router = express.Router();
const db = require("../models");

//const bcrypt = require("bcrypt");
router.get("/signup", function (req, res) {
    if(req.session.user){
        res.redirect('/movies')
    }else{
        res.render("signup");
    }  
})

router.post("/signup", function (req, res) {
    db.User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    }).then(newUser => {
        req.session.user = {
            email: newUser.email,
            id: newUser.id
        };
        db.List.create({
            list_title: `${req.body.first_name}'s first list!`,
            UserId: req.session.user.id

         })  
        res.redirect('/movies')
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})
module.exports = router;

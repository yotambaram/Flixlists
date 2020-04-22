const express = require("express");
const router = express.Router();
const db = require("../models");
//const bcrypt = require("bcrypt");



router.get("/", function (req, res) {
        res.redirect("/movies");
})


//main page, takes all user data and render
router.get("/movies", function (req, res) {
    if (req.session.user) {
        db.User.findAll({
            where: {
                id: req.session.user.id //user?
            }
        }).then(dbUser => {
            res.render("main", dbUser)
        })
    }else {
        res.redirect("/login");
    }
})





// movie page (when user press on movie in the list to get more info)
router.get("/movies/:id", function (req, res) {
    if (req.session.user) {
        db.Movie.findOne({
            where: {
                imdb_id: req.budy.imdb_id //user?
            }
        }).then(dbUser => {
            //gives back the IMDB MOVIE ID, then the front shuold get the info from api 
            res.json(dbUser)
            //res.render("detail", dbUser)
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
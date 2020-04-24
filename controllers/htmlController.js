const express = require("express");
const router = express.Router();
const db = require("../models");


//const bcrypt = require("bcrypt");
router.get("/", function (req, res) {
        res.redirect("/movies");
})

//const bcrypt = require("bcrypt");
router.get("/index", function (req, res) {
    res.redirect("/movies");
})

//main page, takes all user data and render just if user logged in
router.get("/movies", function (req, res) {  
    if (req.session.user) {
        console.log(req.session.user.id)
        db.Lists.findAll({
            raw: true,
            where:{
                UserID: 1 //req.session.user.id
            }

        }).then(userList =>{
           const test = {userList}
           console.log(test)
           res.render("index", test)
        })
    } else {
        res.redirect("/login");
    
}}
)

// create new list by event (button)
router.post("/movies/addlist", function (req, res) { 
    console.log(req.body)
    db.Lists.create({
        list_title: req.body.list_title,
        userId: req.session.user.id
    }).then(newUser => {
        res.redirect('/movies')
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})
//posting new movie to 'movie' table. the user can choose witch list (front)
router.post("/movies/addmovie", function (req, res) { 
    console.log(req.body)
    if (req.session.user) {
        db.Movies.create({
            movie_name: req.body.movieName,
            imdb_id: req.body.movieID,
        }).then(newUser => {
    //////////
            res.redirect('/movies')
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    } else {
        res.redirect("/login");
    }
})
// edit list name
router.put("/movies/editlistname/:id", function (req, res) { 
    if (req.session.user) {
        db.Movie.update({
            list_title: req.body.movie_name
        },{
            where:{
                id:req.params.id
            }
        }).then(newUser => {
            /////
            res.redirect('/movies')
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    } else {
        res.redirect("/login");
    }
})
/*
// movie details page (when user press on movie in the list to get more info)
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
*/
router.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
        res.json('logged out');
    })
})
module.exports = router;
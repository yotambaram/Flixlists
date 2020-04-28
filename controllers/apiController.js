
//const inquirer = require("inquirer");
const axios = require("axios");
const express = require("express");
const router = express.Router();
//const db = require("../models");
//const fs = require("fs");


//main page, takes all user data and render just if user logged in
router.post("/movies/movieinfo", function (req, res){
    const movie = req.body.movie_title
    const queryUrl = `https://www.omdbapi.com/?t=${movie}&apikey=${process.env.IMDBAPIKEY}`
    axios.get(queryUrl).then(function(movieInfo) {
        //console.log(movieInfo.data)
        res.json(movieInfo.data)
        //get movie info
          }).catch(err => {
              console.log(err)
              res.sendStatus(500)
          })
})

module.exports = router;

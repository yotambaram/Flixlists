const express = require("express");
const router = express.Router();
const db = require("../models")
const bcrypt = require("bcrypt");


router.get("/login", function (req, res) {
    if(req.session.user){
        res.redirect('/movies')
    }else{
        res.render("login");
    }
})

router.post("/login", function (req, res) {
    db.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUser => {
        if (bcrypt.compareSync(req.body.password, dbUser.password)) {
            req.session.user = {
                email: dbUser.email,
                id: dbUser.id
            };

            res.redirect('/movies')
        } else {
            res.status(404).send("not working")
        }
    })
})
module.exports = router;




router.delete('/session', function(req, res) {
    // here is our security check
    // if you use a isAuthenticated-middleware you could make this shorter
    if (req.session.authenticated) {
        // this destroys the current session (not really necessary because you get a new one
        req.session.destroy(function() {
            // if you don't want destroy the whole session, because you anyway get a new one you also could just change the flags and remove the private informations
            // req.session.user.save(callback(err, user)) // didn't checked this
            //delete req.session.user;  // remove credentials
            //req.session.authenticated = false; // set flag
            //res.clearCookie('connect.sid', { path: '/' }); // see comments above                res.send('removed session', 200); // tell the client everything went well
        });
    } else {
        res.send('cant remove public session', 500); // public sessions don't containt sensible information so we leave them
    }
});
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
        db.List.findAll({

            where: {
                UserID: req.session.user.id
            },
            include: [db.Movie]

        }).then(userList => {
            const userListJSON = userList.map(list => list.toJSON())
            res.render("index", { userList: userListJSON })
        })
    } else {
        res.redirect("/login");

    }
}
)


//main page, takes all user data and render just if user logged in
router.get("/movies/:listId", function (req, res) {
    if (req.session.user) {
        db.Movie.findAll({
            raw: true,
            where: {
                ListId: req.params.listId
            }
        }).then(movieList => {
            res.render("index", { movieList })
        })
    } else {
        res.redirect("/login");

    }
}
)



// create new list by event (button)
router.post("/movies/addlist", function (req, res) {
    db.List.create({
        list_title: req.body.list_title,
        UserId: req.session.user.id
    }).then(newUser => {
        res.redirect('/movies')
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})


//posting new movie to 'movie' table. the user can choose which list (front)
router.post("/movies/:id", function (req, res) {
    if (req.session.user) {
        db.Movie.create({
            movie_name: req.body.movieName,
            imdb_id: req.body.movieID,
            ListId: req.params.id
        }).then(newUser => {
            res.redirect('/movies')
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    } else {
        res.redirect("/login");
    }
})

router.delete("/movies/:id", (req, res) => {
    db.Movie.destroy({
        where: {
            id: req.params.id
        }
    }).then(deletedMovie => {
        res.status(200).json(deletedMovie);
    })
})


// edit list name
router.put("/movies/editlistname/:id", function (req, res) {
        db.List.update({
            list_title: req.body.list_title
        }, {
            where: {
                id: req.params.id
            }
        }).then(data => {
            res.status(200).json(data);

            
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    
})

// router.put("/api/movies/:id", function(req, res) {
//     let listId = "id = " + req.params.id;
//     List.update({
//       display: true
//     }, listId, function(result) {
//       if (result.changedRows == 0) {
//         // If no rows were changed, then the ID must not exist, so 404
//         return res.status(404).end();
//       } else {
//         res.status(200).end();
//       }
//     });
//   });

router.put("/movies/disp/:id", (req, res) => {
    db.List.update({
        display: req.body.display,
    }, {
        where: {
            id: req.params.id
        }
    }).then(updatedList => {
        res.status(200).json(updatedList);
    })
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
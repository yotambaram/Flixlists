

router.get("/login", function (req, res) {
    res.render("login");
})

router.post("/login", function (req, res) {
    db.User.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUser => {
        if (bcrypt.compareSync(req.body.password, dbUser.password)) {
            req.session.user = {
                username: dbUser.username,
                id: dbUser.id
            };
            res.redirect('/movies/' + id)
        } else {
            res.send("not logged in")  //<---------------- MAKE A HTML RES
        }
    })
})
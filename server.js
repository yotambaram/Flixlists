//express
const express = require("express");
const app = express();
//connection port
const PORT = process.env.PORT || 8080;

//models
const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static folders
app.use(express.static("public"))

//handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// routes (*********************** NEED TO DEFINE ALL CONTOROLLERS FILES HERE ***********************)
const htmlApiRoutes = require("./controllers/htmlController.js");
const signInApiRoutes = require("./controllers/signInController.js");

//user routes  (*********************** NEED TO USE ALL CONTOROLLERS FILES HERE **************************)
app.use(htmlApiRoutes);
app.use(signInApiRoutes);


// sync the models and listen
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

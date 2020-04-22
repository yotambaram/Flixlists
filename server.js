//express
const express = require("express");
const app = express();
//connection port
const PORT = process.env.PORT || 8080;

require("dotenv").config();
const session = require("express-session");
var SequelizeStore = require('connect-session-sequelize')(session.Store);

//models
const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: new SequelizeStore({
      db: db.sequelize
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 3600000
  }
}))

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
const logInApiRoutes = require("./controllers/logInController.js");
const signUpApiRoutes = require("./controllers/signUpController.js");


//user routes  (*********************** NEED TO USE ALL CONTOROLLERS FILES HERE **************************)
app.use(htmlApiRoutes);
app.use(logInApiRoutes);
app.use(signUpApiRoutes);


// sync the models and listen
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
      console.log('App listening on PORT ' + PORT);
  });
}).catch(err => {throw err;});
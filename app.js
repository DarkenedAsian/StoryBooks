const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan"); //used for logging
const exphbs = require("express-handlebars");
const connectDB = require("./config/db");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const { default: mongoose } = require("mongoose");

// Load config
//pass in an object with curly braces
dotenv.config({ path: "./config/config.env" });

// Passport config
require("./config/passport")(passport); //pass in passport export

connectDB();

const app = express();

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false, //dont create session until something is stored
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// Handlebars
app.engine(".hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname, "public")));

//Routes, links to exports module which handles GET requests for express
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

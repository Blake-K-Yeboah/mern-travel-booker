// Require Express
const express = require('express');

// Require body-parser
const bodyParser = require('body-parser');

// Require Mongoose
const mongoose = require('mongoose');

// Require passport
const passport = require('passport');

// Require User Router
const users = require('./routes/api/user.routes');

// Initialize Express
const app = express();

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB 
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// User Route
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
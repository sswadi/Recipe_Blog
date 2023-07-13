const express = require('express'); //express server
const expressLayouts = require('express-ejs-layouts'); //express layouts helps in creating different layouts for diff scenarios
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express(); //new express application
const port = process.env.PORT || 8000;

require('dotenv').config(); //used for storing DB details; dotenv loads environment variables from .env file

//middlewares
app.use(express.urlencoded( {extended: true} )); //this helps in parsing url encoded bodies to Strings/Arrays-
app.use(express.static('public')); //to fetch images,scripts, stylesheets we only have to give relative path
app.use(expressLayouts);

app.use(cookieParser('cookingBlogSecure'));
app.use(session({
    secret: 'cookingBlogSecretSession',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(fileUpload());

//set the layout(ejs) folder for express layout
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/recipeRoutes.js');
app.use('/', routes);

app.get('/');

app.listen(port, ()=> console.log(`Listening to port ${port}`));










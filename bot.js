// bot.js
'use strict';

// Loading env configuration
require('dotenv').config({path: `${__dirname}/.env`});

// BASE SETUP
// =============================================================================

// needed packages

// express, used for the api
const express    			= require('express');
const app        			= express();

// bodyparser, used for parsing json body
const bodyParser 			= require('body-parser');

// setting port
const port       			= process.env.PORT || 8080;

// filesystem module
const fs							= require('fs');

global.hello = {}

try {
	global.hello = JSON.parse(fs.readFileSync(`${__dirname}/.config/hello.json`).toString());
} catch(e) {
	console.log(e);
	global.hello = {};
}

global.answers = {};

try {
	global.answers = JSON.parse(fs.readFileSync(`${__dirname}/.config/answers.json`).toString());
} catch(e) {
	global.answers = {};
}


global.mentions = [];

try {
	global.mentions = JSON.parse(fs.readFileSync(`${__dirname}/.config/mentions.json`).toString());
} catch(e) {
	global.mentions = [];
}

// Basic express settings
app.set('json spaces', 2);
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.json({msg: 'Qu\'est que tu veux encore ?'});
});

// requiring routers
app.use('/hello', require('./controllers/hello'));
app.use('/answers', require('./controllers/answers'));
app.use('/mentions', require('./controllers/mentions'));

app.listen(process.env.PORT, function () {
  console.log("Magic happens on port", process.env.PORT);
});

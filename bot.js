// bot.js
'use strict';

// Loading env configuration
require('dotenv').config({path: __dirname + '/.env'});

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
const fs 							= require('fs');

let hello = {}

try {
	hello = JSON.parse(fs.readFileSync('./.config/hello.json').toString());
} catch(e) {
	hello = {};
}

let answers = {};

try {
	answers = JSON.parse(fs.readFileSync('./.config/answers.json').toString());
} catch(e) {
	answers = {};
}


let mentions = [];

try {
	mentions = JSON.parse(fs.readFileSync('./.config/mentions.json').toString());
} catch(e) {
	mentions = [];
}

app.set('json spaces', 2);

app.get('/', (req, res) => {
	res.json({msg: 'Qu\'est que tu veux encore ?'});
});

app.get('/hello', (req, res) => {
	res.json({msg: "Tiens, voilà mes messages de bonjour, arrête de me casser les couilles maintenant.", result: hello});
});

app.get('/answers', (req, res) => {
	res.json({msg: "Je te file mes réponses et tu me laisses tranquille, ok ?", result: answers});
});

app.get('/mentions', (req, res) => {
	res.json({msg: "Voilà les réponses à mes mentions, maintenant casse toi.", result: mentions});
});

app.listen(process.env.PORT, function () {
  console.log("Magic happens on port " + process.env.PORT);
});
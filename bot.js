// bot.js
'use strict';

// Loading env configuration
require('dotenv').config({path: `${__dirname}/.env`});

// BASE SETUP
// =============================================================================

// needed packages

// express, used for the api
const express					= require('express');
const app							= express();

// bodyparser, used for parsing json body
const bodyParser			= require('body-parser');

// setting port
const port						= process.env.PORT || 8080;

// filesystem module
const fs							= require('fs');

// Discord Bot
const bot = new (require('discord.js')).Client();

global.hello = {};

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

bot.on('ready', () => {
	if(process.env.WELCOME_MESSAGE){
		sendGlobalMessage(process.env.WELCOME_MESSAGE);
	}
});

bot.on('message', (message) => {
	if(message.author.bot){
		return;
	}

	const content = message.cleanContent.toLowerCase();

	const helloMatch = global.hello.triggers.find(trigger => {
		const regex = new RegExp(`(^|\\\s)${trigger}($|\\\s)`, 'gi');
		return content.match(regex);
	});

	const answersMatch = helloMatch || Object.keys(global.answers).find(trigger => {
		const regex = new RegExp(`(^|\\\s)${trigger}($|\\\s)`, 'gi');
		return content.match(regex);
	});

	const mentionsMatch = answersMatch || content.indexOf('@slackbot') > -1;

	const gifMatch = mentionsMatch || content.match(/https?:\/\/.*\.mp4/);

	if(helloMatch){
		const a = global.hello.answers;
		message.reply(a[Math.floor(Math.random() * a.length)]);
		console.log(`Replied to hello ${content}`);
	} else if (answersMatch){
		message.reply(global.answers[answersMatch]);
		console.log(`Replied to answers ${content}`);
	} else if(mentionsMatch) {
		const m = global.mentions;
		message.reply(m[Math.floor(Math.random() * m.length)]);
		console.log(`Replied to mention ${content}`);
	} else if(gifMatch && gifMatch.length > 0){
		gifMatch.forEach(gif => {
			message.reply(`${process.env.MP4_TO_GIF_CONVERTOR}${gif}`);
			console.log(`converted mp4 to gif for ${gif}`);
		});
	} else {
		console.log(`Nothing matches "${content}"`);
	}

});

bot.login(process.env.TOKEN);

function sendGlobalMessage(message) {
	bot.channels
		.filter(channel => channel.type === 'text')
		.forEach(channel => channel.sendMessage(message));
}

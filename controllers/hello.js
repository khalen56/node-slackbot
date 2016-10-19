'use strict';

// express, used for routing
const express		= require('express'),
			router		= express.Router(),
			fs				= require('fs');

router.get('/', (req, res) => {
	res.json({msg: "Tiens, voilà mes messages de bonjour, arrête de me casser les couilles maintenant.", result: global.hello});
});

router.post('/triggers', (req, res) => {
	try {
		if (req.body.trigger) {
			if (!global.hello.triggers) {
				global.hello.triggers = [];
			}
			global.hello.triggers.push(req.body.trigger);
			fs.writeFileSync(__dirname + '/../.config/hello.json', JSON.stringify(global.hello, null, '  '));
			res.json({msg: "Ok."});
		} else {
			res.sendStatus(400);
			res.json({msg: "Mauvaise requête."});
		}
	} catch(e) {
		console.log(e);
		res.sendStatus(500);
		res.json({msg: "Erreur."});
	}
});

router.post('/answers', (req, res) => {
	try {
		if (req.body.answer) {
			if (!global.hello.answers) {
				global.hello.answers = [];
			}
			global.hello.answers.push(req.body.answer);
			fs.writeFileSync(__dirname + '/../.config/hello.json', JSON.stringify(global.hello, null, '  '));
			res.json({msg: "Ok."});
		} else {
			res.sendStatus(400);
			res.json({msg: "Mauvaise requête."});
		}
	} catch(e) {
		console.log(e);
		res.sendStatus(500);
		res.json({msg: "Erreur."})
	}
});

module.exports = router;

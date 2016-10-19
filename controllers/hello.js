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
			res.status(400).json({msg: "Mauvaise requête."});
		}
	} catch(e) {
		console.log(e);
		res.status(500).json({msg: "Erreur."});
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
			res.status(400).json({msg: "Mauvaise requête."});
		}
	} catch(e) {
		console.log(e);
		res.status(500).json({msg: "Erreur."});
	}
});

router.delete('/triggers/:trigger', (req, res) => {
	try {
		const indexOf = global.hello.triggers.indexOf(req.params.trigger)
		if (indexOf > -1) {
			global.hello.triggers.splice(indexOf, 1);
			fs.writeFileSync(__dirname + '/../.config/hello.json', JSON.stringify(global.hello, null, '  '));
			res.json({msg: "Ok."});
		} else {
			res.status(404).json({msg: "Trigger introuvable, pd."});
		}
	} catch (e) {
		console.log(e);
		res.status(500).json({msg: "Erreur."});
	}
});

router.delete('/answers/:answer', (req, res) => {
	try {
		const indexOf = global.hello.answers.indexOf(req.params.answer)
		if (indexOf > -1) {
			global.hello.answers.splice(indexOf, 1);
			fs.writeFileSync(__dirname + '/../.config/hello.json', JSON.stringify(global.hello, null, '  '));
			res.json({msg: "Ok."});
		} else {
			console.log(req.params);
			res.status(404).json({msg: "Answer introuvable, pd."});
		}
	} catch (e) {
		console.log(e);
		res.status(500).json({msg: "Erreur."});
	}
});

module.exports = router;

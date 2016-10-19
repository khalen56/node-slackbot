'use strict';

// express, used for routing
const express		= require('express'),
			router		= express.Router(),
			fs				= require('fs');

router.get('/', (req, res) => {
	res.json({msg: "Je te file mes réponses et tu me laisses tranquille, ok ?", result: global.answers});
});

router.post('/', (req, res) => {
	try {
		if (Object.keys(req.body).length > 0) {
			Object.keys(req.body).forEach( trigger => {
				const answer = req.body[trigger];
				global.answers[trigger.toLowerCase()] = answer.toLowerCase();
			});
			fs.writeFileSync(__dirname + '/../.config/answers.json', JSON.stringify(global.answers, null, '  '));
			res.json({msg: "Ok."});
		} else {
			res.status(400).json({msg: "Mauvaise requête."});
		}
	} catch(e) {
		console.log(e);
		res.status(500).json({msg: "Erreur."});
	}
});

router.delete('/:trigger', (req, res) => {
	try {
		if (global.answers[req.params.trigger.toLowerCase()]) {
			delete global.answers[req.params.trigger.toLowerCase()];
			fs.writeFileSync(__dirname + '/../.config/answers.json', JSON.stringify(global.answers, null, '  '));
			res.json({msg: "Ok."});
		} else {
			res.status(404).json({msg: "Trigger introuvable, pd."});
		}
	} catch(e) {
		console.log(e);
		res.status(500).json({msg: "Erreur."});
	}
})

module.exports = router;

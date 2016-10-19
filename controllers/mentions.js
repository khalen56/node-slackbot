'use strict';

// express, used for routing
const express		= require('express'),
			router		= express.Router(),
			fs				= require('fs');

router.get('/', (req, res) => {
	res.json({msg: "Voilà les réponses à mes mentions, maintenant casse toi.", result: global.mentions});
});

router.post('/', (req, res) => {
	try {
		if (req.body.mention) {
			global.mentions.push(req.body.mention);
			fs.writeFileSync(`${__dirname}/../.config/mentions.json`, JSON.stringify(global.mentions, null, '  '));
			res.json({msg: "Ok."});
		} else {
			res.status(400).json({msg: "Mauvaise requête."});
		}
	} catch(e) {
		console.log(e);
		res.status(500).json({msg: "Erreur."});
	}
});

router.delete('/:id', (req, res) => {
	try {
		const id = parseInt(req.params.id);
		if (global.mentions[id]) {
			global.mentions.splice(id, 1);
			fs.writeFileSync(`${__dirname}/../.config/mentions.json`, JSON.stringify(global.mentions, null, '  '));
			res.json({msg: "Ok."});
		} else {
			res.status(404).json({msg: "Introuvable, pd."});
		}
	} catch(e) {
		console.log(e);
		res.status(500).json({msg: "Erreur."});
	}
});

module.exports = router;

'use strict';

// express, used for routing
const express		= require('express'),
			router		= express.Router(),
			fs				= require('fs');

router.get('/', (req, res) => {
	res.json({msg: "Je te file mes réponses et tu me laisses tranquille, ok ?", result: global.answers});
});

module.exports = router;

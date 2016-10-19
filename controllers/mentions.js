'use strict';

// express, used for routing
const express		= require('express'),
			router		= express.Router(),
			fs				= require('fs');

router.get('/', (req, res) => {
	res.json({msg: "Voilà les réponses à mes mentions, maintenant casse toi.", result: global.mentions});
});

module.exports = router;

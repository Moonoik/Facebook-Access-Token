var express = require('express'),
	router = express.Router(),
	define = require('./defineFacebook').facebookManagement,
	facebookDefine = new define();

router.get('/', function(req, res, next) {
    res.render('index');
});

module.exports = router;
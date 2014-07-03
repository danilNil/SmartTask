var express = require('express');
var router = express.Router();	

router.get('/google_task', function(req, res) {
	res.render('tasks');
});

router.get('/', function(req, res) {
	res.render('tasks');
});

module.exports = router;

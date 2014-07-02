var express = require('express');
var router = express.Router();	
var url = require("url");
var auth = require('../auth/auth.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'SmartTask' });
});

router.get('/oauth2callback', function(req, res) {
  	//console.log(res);
  	debugger;
  	var parsedUrl = url.parse(req.url, true);
  	auth.getToken(parsedUrl, function (err) {
	  	res.render('auth');
  	});
});

router.get('/auth/google', function(req, res) {
	auth.onLogin( function (err) {
	  	console.log(err);
  	});
});

module.exports = router;

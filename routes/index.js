var express = require('express');
var router = express.Router();	
var url = require("url");
var auth = require('../auth/auth.js');

/* GET home page. */
router.get('/', function(req, res) {
  if(!auth.userLogged()) {
    res.redirect("/google_login");
  }
  else {
    res.redirect("/google_task");
  }
});

router.get('/oauth2callback', function(req, res) {
  	//console.log(res);
  	var parsedUrl = url.parse(req.url, true);
  	auth.getToken(parsedUrl, function (err) {
      var statusString = "OK";
      if(err)
        statusString = err.stack;
	  	res.render('auth', {status : statusString});
  	});
});

router.get('/google_login', function(req, res) {
	auth.onLogin( function (err) {
	  	console.log(err);
  	});
});

module.exports = router;

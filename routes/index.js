var express = require('express');
var router = express.Router();
var readline = require('readline');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'SmartTask' });
});

router.get('/oauth2callback', function(req, res) {
  console.log(res);
});

router.get('/auth/google', function(req, res) {
	var googleapis = require('googleapis'),
    OAuth2 = googleapis.auth.OAuth2;

	var oauth2Client =
	    new OAuth2(
	    	"181187044153-nn51k2mjdglll4b0ipi1s1o5n6rkbj9r.apps.googleusercontent.com",
	     	"9WIyr3z0N6anZZC9yKjspOQG", 
	     	"http://127.0.0.1:3000/oauth2callback"
	     	);

	// generates a url that allows offline access and asks permissions
	// for Google+ scope.
	var scopes = [
	  'https://www.googleapis.com/auth/tasks'	  
	];

	var url = oauth2Client.generateAuthUrl({
	  access_type: 'offline',
	  scope: scopes.join(" ") // space delimited string of scopes
	});

	var rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});
	console.log('Visit the url: ', url);
	rl.question('Enter the code here:', function(code) {
		// request access token
		oauth2Client.getToken(code, function(err, tokens) {
		  // set tokens to the client
		  // TODO: tokens should be set by OAuth2 client.
		  oauth2Client.setCredentials(tokens);
		  console.log(tokens);
		  res.render('auth');
		});
	});
	
});

module.exports = router;

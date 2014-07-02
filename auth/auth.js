var open = require('open');
var googleapis = require('googleapis'),
OAuth2 = googleapis.auth.OAuth2;

var oauth2Client =
    new OAuth2(
    	"181187044153-nn51k2mjdglll4b0ipi1s1o5n6rkbj9r.apps.googleusercontent.com",
     	"9WIyr3z0N6anZZC9yKjspOQG", 
     	"http://127.0.0.1:3000/oauth2callback"
     	);

   
exports.getToken = function  (url, callback){
  	var code = url.query.code;
  	// request access token
	oauth2Client.getToken(code, function(err, tokens) {
	  // set tokens to the client
	  // TODO: tokens should be set by OAuth2 client.
	  oauth2Client.setCredentials(tokens);
	  console.log(tokens);
	  callback(err);
	});
}


exports.onLogin = function (callback) {
	// generates a url that allows offline access and asks permissions
	// for tasks scope.
	var scopes = [
	  'https://www.googleapis.com/auth/tasks'	  
	];

	var url = oauth2Client.generateAuthUrl({
	  access_type: 'offline',
	  scope: scopes.join(" ") // space delimited string of scopes
	});

	open(url, function (err) {
  		callback(err);
	});
}

exports.userLogged = function(){
	return oauth2Client.credentials;
}
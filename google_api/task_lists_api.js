var googleapis = require('googleapis');
var auth = require('../auth/auth.js');

module.exports.fetchTasks= function(req, res, next){
    console.log("start fetchTasks");
  	 var client =googleapis.tasks('v1',auth.oauth2Client());
     console.log(client);
     console.log(client.tasks);
  		getUserTasks(client, function(err, lists) {
	      if (err) {
	        console.log('An error occured', err);
          next(err);
	      }
        req.tasks = lists.items;
        next();
    	});
}

function getUserTasks(client, callback) {
  client
    .tasks.list(callback);
}


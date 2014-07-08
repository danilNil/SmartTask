var googleapis = require('googleapis');
var auth = require('../auth/auth.js');

module.exports.fetchTasks= function(req, res, next){
    console.log("start fetchTasks");
  	googleapis
    		.discover('tasks', 'v1')
    		.execute(function(err, client) {
          console.log("got googleapis client");
  		getUserTasks(client, function(err, lists) {
  	      if (err) {
  	        console.log('An error occured', err);
            next(err);
  	      }
          console.log("!!lists.length");
  	      console.log(lists.length);
          req.tasks = lists.items;
          next();
      	});
    	});
}

function getUserTasks(client, callback) {
  client
    .tasks.tasklists.list()
    .withAuthClient(auth.oauth2Client())
    .execute(callback);
}


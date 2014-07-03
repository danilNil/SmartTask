var googleapis = require('googleapis');
var auth = require('../auth/auth.js');

exports.fetchTasks= function(callback){
	googleapis
  		.discover('tasks', 'v1')
  		.execute(function(err, client) {
		getUserTasks(client, function(err, lists) {
	      if (err) {
	        console.log('An error occured', err);
	      }
	      console.log(lists);
	      callback(lists.items, err);
    	});
  	});
}

function getUserTasks(client, callback) {
  client
    .tasks.tasklists.list()
    .withAuthClient(auth.oauth2Client())
    .execute(callback);
}


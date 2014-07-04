var express = require('express');
var router = express.Router();	
var tasks_source = require('../data_sources/tasks_source.js')
router.get('/', function(req, res) {
	fetchTasks(function (tasks, err) {
		if(err)
			res.render('error', {
	            message: err.message,
	            error: err
        	});
		else{
			saveLists(tasks);
			res.render('tasks', {tasks : tasks});	
		}
	});
});

function saveLists (tasks) {
	var pg = require('pg');
	var conString = "postgres://postgres:123@localhost/smart_tasks";
	var client = new pg.Client(conString);
	
	client.connect();
  	client.query("CREATE TABLE IF NOT EXISTS tasks (id text PRIMARY KEY, title text)");
  	for (var i = tasks.length - 1; i >= 0; i--) {
  		console.log(tasks[i].title);
		client.query("INSERT INTO tasks (id, title) VALUES($1, $2)", [tasks[i].id, tasks[i].title]);
	};
	// var query = client.query("SELECT * FROM tasks");

	// query.on('row', function(row) {
	//   console.log(row);
	// });

	// query.on('end', function() { 
	//   client.end();
	// });
}


function fetchTasks(callback){
	tasks_source.fetchTasks(callback);
}

module.exports = router;

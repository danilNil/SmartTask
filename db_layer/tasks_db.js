var pg = require('pg');
var conString = "postgres://postgres:123@localhost/smart_tasks";


module.exports.saveLists = function(req, res, next) {
		console.log("saveLists started");
		var tasks = req.tasks;
		var client = new pg.Client(conString);
	    client.connect();
	  	client.query("CREATE TABLE IF NOT EXISTS tasks (id text PRIMARY KEY, title text)");
	  	for (var i = tasks.length - 1; i >= 0; i--) {
			client.query("INSERT INTO tasks (id, title) VALUES($1, $2)", [tasks[i].id, tasks[i].title]);
		};
		client.end();
		next();
}

module.exports.getLists = function(req, res, next){
	console.log("getLists started");
	var client = new pg.Client(conString);
	client.connect();
  	client.query('SELECT * FROM tasks', function(err, result) {
	    if(err) {
	      return console.error('error running query', err);
	    }
	    req.tasks = result.rows;
	    client.end();
	    next();
  	});
}
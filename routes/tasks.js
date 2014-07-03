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
			res.render('tasks', {tasks : tasks});	
		}
	});
});


function fetchTasks(callback){
	tasks_source.fetchTasks(callback);
}

module.exports = router;

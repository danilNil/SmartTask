var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'SmartTask' });
});

router.get('/auth/google', function(req, res) {
  res.render('auth');
});

module.exports = router;

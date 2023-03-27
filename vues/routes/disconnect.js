var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    req.session.key = null;
    req.session.connected = false;
    res.render('disconnect');
});

module.exports = router;

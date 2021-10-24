var express = require('express');
var mongoClient = require('./../mongo/config')
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('airbnb', {title:'AirBnb', mongoHost:mongoClient.options.srvHost});
});

module.exports = router;

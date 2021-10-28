var express = require('express');
var mongoClient = require('./../mongo/config')
var mongoQueries = require('./../mongo/queries')
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('airbnb', {title:'AirBnb', mongoHost:mongoClient.options.srvHost});
});


router.get('/find1', (req,res)=>{
  mongoQueries.findListing(res);
})





module.exports = router;

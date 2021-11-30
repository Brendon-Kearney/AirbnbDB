var express = require('express');
var mongoClient = require('./../mongo/config')
var mongoQueries = require('./../mongo/queries')
var router = express.Router();


// localhost:3000/airbnb
router.get('/', (req, res) => {
  res.render('airbnb', {title:'AirBnb', mongoHost:mongoClient.options.srvHost});
});

router.get('/find-one', async (req,res)=>{

  console.log(req.query)

  let criteria = 
    {   bedrooms: {$gte: parseInt(req.query.bedrooms)}, 
        number_of_reviews: {$gte:50}, 
        "property_type" : req.query.property_type,
        minimum_nights : {$lte: req.query.minimum_nights},
        "address.country" : req.query.country,
        "address.country_code" : req.query.country_code
      }

  if (req.query.amenities)
    criteria ["amenities"] = {$all : req.query.amenities}

  let listing = await mongoQueries.findListing(criteria);
  res.render('listing', {listing})
})

router.get ("/find-many", (req,res)=>{

  let criteria =
  {
    bedrooms: {$gte: parseInt(req.query.bedrooms)} ,
    number_of_reviews: {$gte: 4 },
    "address.country": req.query.country
  }

  let numberOfListings = parseInt(req.query.numbListings);

  let projection = {}

  mongoQueries.findListings(res,criteria,projection,numberOfListings)


})

router.get('/find-oneId', async (req,res)=>{

  let criteria = 
    {   
      _id: req.query.id
    }

  let listing = await mongoQueries.findListing(criteria);
  res.render('listing', {listing})
})


module.exports = router;

const mongoClient = require("./config");


async function findListing(criteria)
{
  let result = []
  await mongoClient.connect()
    .then(connection=>connection.db('sample_airbnb'))
    .then(db=>db.collection('listingsAndReviews'))
    .then(listingsAndReviews=>listingsAndReviews.findOne(criteria))
    .then(listing=>{ result = listing})
    .catch(error => console.log(error))
  return result
}



async function findListings(response, criteria, projection, nListings)
{
    mongoClient.connect()
      .then(connection=>connection.db('sample_airbnb'))
      .then(db=>db.collection('listingsAndReviews'))
      .then(listingsAndReviews=>listingsAndReviews
        .find(criteria,{projection})
        .limit(nListings))
      .then(cursor=>cursor.toArray())
      .then(listings=>response.render('listings',{listings}))
      .catch(error=>console.log(error))
}


module.exports = {findListing,findListings}  
// Shortcut for 
//  {   findListing:findListing,
//      findListings:findListings
//  }
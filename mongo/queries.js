const mongoClient = require("./config");

async function findListing(response)
{
  console.log('Find Listing');
  let connection = await mongoClient.connect()
  console.log('Connected');
  let db = await connection.db('sample_airbnb');
  console.log('open airbnb databse')

  let listingsAndReviews = await db.collection('listingsAndReviews')
  console.log('select listings and reviews')

  let listing = await listingsAndReviews.findOne({})

  console.log('Close db')

  response.send(listing)
  connection.close()  
}

module.exports = {findListing}
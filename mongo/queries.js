const mongoClient = require("./config");

async function findListing1(response)
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

async function findListing2 (response)
{
  try{
    var connection = await mongoClient.connect()
    let db = await connection.db('sample_airbnb');
    let listingsAndReviews = await db.collection('listingsAndReviews')
    let listing = await listingsAndReviews.findOne({})
    response.send(listing)
  }
  catch(error)
  {
    console.log(error)
    response.send(error)
  }
  finally{
    // This is where any cleanup code goes
    connection.close()
  }
}

async function findListing3(response,criteria)
{
  mongoClient.connect()
    .then(connection=>connection.db('sample_airbnb'))
    .then(db=>db.collection('listingsAndReviews'))
    .then(listingsAndReviews=>listingsAndReviews.findOne(criteria))
    .then(listing=>response.send(listing))
    .catch(error => console.log(error))

}


let findListing = findListing3

module.exports = {findListing}  // Shortcut for {findListing:findListing}
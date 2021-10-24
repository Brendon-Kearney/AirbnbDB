const { MongoClient } = require('mongodb')

const protocol = 'mongodb+srv'
const credentials = 'comp-206:comp-206'
const host = 'vue-express-mdb.ck6mp.mongodb.net'
const options = 'retryWrites=true&w=majority'
const url = `${protocol}://${credentials}@${host}?${options}`
const mongoClient = new MongoClient(url)
console.log("Mongo DB URL: ", mongoClient.s.url)
module.exports=mongoClient
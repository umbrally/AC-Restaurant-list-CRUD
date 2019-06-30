const mongoose = require('mongoose')
const Restaurant = require('../restaurant.js')
const restaurantSeed = require('./restaurant.json')
const restaurantSeedResults = restaurantSeed.results
// connect to database
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })

// get connection object after connected with mongoDB
const db = mongoose.connection


// if database connection is abnormal
db.on('error', () => {
  console.log('mongodb error')
})

// if database connection is normal
db.once('open', () => {
  console.log('mongodb connected')
  restaurantSeedResults.forEach(restaurant => {
    Restaurant.create(restaurant);
  })

})
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
  for (let i = 0; i < restaurantSeedResults.length; i++)
    Restaurant.create({
      name: restaurantSeedResults[i].name, name_en: restaurantSeedResults[i].name_en, category: restaurantSeedResults[i].category, image: restaurantSeedResults[i].image, location: restaurantSeedResults[i].location, phone: restaurantSeedResults[i].phone, google_map: restaurantSeedResults[i].google_map, rating: restaurantSeedResults[i].rating, description: restaurantSeedResults[i].description
    })

})
const mongoose = require('mongoose')
const Restaurant = require('../restaurant.js')
const restaurantSeed = require('./restaurant.json')
const restaurantSeedResults = restaurantSeed.results
const User = require('../user.js')
const bcrypt = require('bcryptjs')
const userSeedList = [{ email: 'user1@example.com', password: '12345678' }, { email: 'user2@example.com', password: '12345678' }]

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
  userSeedList.forEach(user => {
    const { email, password } = user
    const newUser = new User({
      email,
      password
    })
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        newUser.password = hash
        newUser
          .save(err => {
            if (err) return console.error(err)
            return
          })
      })
    )
  })


  User.findOne({
    email: 'user1@example.com'
  }, (err, user) => {
    for (let i = 0; i < 3; i++) {
      let restaurantData = restaurantSeedResults[i]
      restaurantData.userId = user._id
      Restaurant.create(restaurantData)
    }
  })
  User.findOne({
    email: 'user2@example.com'
  }, (err, user) => {
    for (let i = 3; i < 6; i++) {
      let restaurantData = restaurantSeedResults[i]
      restaurantData.userId = user._id
      Restaurant.create(restaurantData)
    }
  })

})


  // restaurantSeedResults.forEach(restaurant => {
  //   Restaurant.create(restaurant);
  // })

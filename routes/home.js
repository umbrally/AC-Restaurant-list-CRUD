const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

// setting main page route
router.get('/', (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurants })
  })
})

module.exports = router
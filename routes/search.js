const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

// setting search results route
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const regExp = new RegExp(keyword, 'i')
  Restaurant.find((err, restaurants) => {
    restaurants = restaurants.filter(restaurant => {
      return regExp.test(restaurant.name) || regExp.test(restaurant.category) || regExp.test(restaurant.location)
    })
    res.render('index', { restaurants: restaurants, keyword: keyword })
  })
})
module.exports = router
const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')
// setting search results route
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const regExp = new RegExp(keyword, 'i')
  Restaurant.find(
    {
      userId: req.user._id,
      $or: [
        { name: { $regex: regExp } },
        { category: { $regex: regExp } },
        { location: { $regex: regExp } }

      ]
    }
    // (err, restaurants) => {
    //   if (err) return console.error(err)
    //   console.log(restaurants)
    //   // return res.render('index', { restaurants: restaurants, keyword: keyword })
    // }
  )
    .sort({ rating: 'desc' })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurants: restaurants, keyword: keyword })
    })



  // Restaurant.find((err, restaurants) => {
  //   restaurants = restaurants.filter(restaurant => {
  //     return regExp.test(restaurant.name) || regExp.test(restaurant.category) || regExp.test(restaurant.location)
  //   })
  //   res.render('index', { restaurants: restaurants, keyword: keyword })
  // })
})

module.exports = router
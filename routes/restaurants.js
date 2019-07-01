const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')
const setSelected = require('../helpers/selected.js')


// 載入 auth middleware
const { authenticated } = require('../config/auth.js')

// show search and sorting results
router.get('/', authenticated, (req, res) => {
  const keyword = req.query.keyword
  const regExp = new RegExp(keyword, 'i')
  if (req.query.type) {
    Restaurant.find(
      {
        userId: req.user._id,
        $or: [
          { name: { $regex: regExp } },
          { category: { $regex: regExp } },
          { location: { $regex: regExp } }

        ]
      }
    )
      .sort({ [req.query.type.split(' ')[0]]: req.query.type.split(' ')[1] })
      .exec((err, restaurants) => {
        if (err) return console.error(err)
        return res.render('index', { restaurants: restaurants, keyword: keyword })
      })
  }
  else {
    Restaurant.find(
      {
        userId: req.user._id,
        $or: [
          { name: { $regex: regExp } },
          { category: { $regex: regExp } },
          { location: { $regex: regExp } }
        ]
      }, (err, restaurants) => {
        if (err) return console.error(err)
        return res.render('index', { restaurants: restaurants, keyword: keyword })
      }
    )
  }

})


// create new restaurant page
router.get('/new', authenticated, (req, res) => {
  return res.render('new')
})


// create new one restaurant action
router.post('/', authenticated, (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description,
    userId: req.user._id
  })
  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})



// show detail page
router.get('/:id', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('detail', { restaurant: restaurant })
  })
})


// edit page
router.get('/:id/edit', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', {
      restaurant: restaurant, helpers: {
        setSelected: setSelected
      }
    })
  })
})

// edit action
router.put('/:id', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    Object.assign(restaurant, req.body)
    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})

// delete restaurant action
router.delete('/:id/delete', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})


module.exports = router
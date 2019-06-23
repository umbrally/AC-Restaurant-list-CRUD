const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')
const setSelected = require('../helpers/selected.js')

// show all restaurants
router.get('/', (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurants })
  })
})

// create new restaurant page
router.get('/new', (req, res) => {
  return res.render('new')
})


// create new one restaurant action
router.post('/', (req, res) => {
  const restaurant = new Restaurant(req.body)
  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})



// show detail page
router.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('detail', { restaurant: restaurant })
  })
})


// edit page
router.get('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', {
      restaurant: restaurant, helpers: {
        setSelected: setSelected
      }
    })
  })

})

// edit action
router.put('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    Object.assign(restaurant, req.body)
    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})

// delete restaurant action
router.delete('/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router
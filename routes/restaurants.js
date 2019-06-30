const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')
const setSelected = require('../helpers/selected.js')


// show sort results
router.get('/', (req, res) => {

  if (req.query.type) {
    Restaurant.find({})
      .sort({ [req.query.type.split(' ')[0]]: req.query.type.split(' ')[1] })
      .exec((err, restaurants) => {
        if (err) return console.error(err)
        return res.render('index', { restaurants: restaurants })
      })
  }

  else {
    Restaurant.find((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurants: restaurants })
    })
  }
})


// // show all restaurants
// router.get('/', (req, res) => {
//   Restaurant.find((err, restaurants) => {
//     if (err) return console.error(err)
//     return res.render('index', { restaurants: restaurants })
//   })
// })

// create new restaurant page
router.get('/new', (req, res) => {
  return res.render('new')
})



// create new one restaurant action
router.post('/', (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.bode.google_map,
    rating: req.body.rating,
    description: req.body.description
  })
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

// // show sort results
// router.get('/', (req, res) => {
//   console.log(req.query)
//   Restaurant.find({})
//     .sort({ [req.query.type]: req.params.type })
//     .exec((err, restaurants) => {
//       if (err) return console.error(err)
//       return res.render('index', { restaurants: restaurants })
//     })
// })

module.exports = router
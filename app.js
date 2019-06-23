// include packages used in this project
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const setSelected = require('./helpers/selected.js')

// set bady-parser
app.use(bodyParser.urlencoded({ extended: true }))

// set handlebars as template engine and use 'main' as default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// set static files
app.use(express.static('public'))

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
})


// include model
const Restaurant = require('./models/restaurant.js')


// routes setting
// setting main page route
app.get('/', (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurants })
  })
})

// show all restaurants
app.get('/restaurants', (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurants })
  })
})

// create new restaurant page
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})


// create new one restaurant action
app.post('/restaurants', (req, res) => {
  const restaurant = new Restaurant(req.body)
  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})



// show detail page
app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('detail', { restaurant: restaurant })
  })
})


// edit page
app.get('/restaurants/:id/edit', (req, res) => {
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
app.post('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    Object.assign(restaurant, req.body)
    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})



// delete restaurant action
app.post('/restaurants/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

// setting search results route
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const regExp = new RegExp(keyword, 'i')
  Restaurant.find((err, restaurants) => {
    restaurants = restaurants.filter(restaurant => {
      return regExp.test(restaurant.name) || regExp.test(restaurant.category) || regExp.test(restaurant.location)
    })
    res.render('index', { restaurants: restaurants, keyword: keyword })
  })
})

app.listen(3000, () => {
  console.log('web server is running')
})
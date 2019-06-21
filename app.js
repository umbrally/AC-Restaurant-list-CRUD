// include packages used in this project
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

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


// show detail page
app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('detail', { restaurant: restaurant })
  })
})

// create new restaurant page
app.get('/restaurants/new', (req, res) => {

})


// create new one restaurant action
app.post('/restaurants', (req, res) => {

})

// edit page
app.get('/restaurants/:id/edit', (req, res) => {

})

// edit action
app.post('/restaurants/:id/', (req, res) => {

})



// delete restaurant action
app.post('/restaurants/:id/delete', (req, res) => {

})



app.listen(3000, () => {
  console.log('web server is running')
})
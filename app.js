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

app.use('/', require('./routes/home.js'))
app.use('/restaurants', require('./routes/restaurants.js'))
app.use('/search', require('./routes/search.js'))

app.listen(3000, () => {
  console.log('web server is running')
})
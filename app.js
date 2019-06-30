// include packages used in this project
const express = require('express')
const app = express()
if (process.env.NODE_ENV !== 'production') {      // 如果不是 production 模式
  require('dotenv').config()                      // 使用 dotenv 讀取 .env 檔案
}
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
// const setSelected = require('./helpers/selected.js')


// set bady-parser
app.use(bodyParser.urlencoded({ extended: true }))

// set handlebars as template engine and use 'main' as default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定 method-override
app.use(methodOverride('_method'))

app.use(flash())

// set static files
app.use(express.static('public'))

// connect to database
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useCreateIndex: true })

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

// 使用express-session
app.use(session({
  secret: 'djkwej',
  resave: 'false',
  saveUninitialized: 'false'
}))

// 使用passport
app.use(passport.initialize())
app.use(passport.session())

// 載入 Passport config
require('./config/passport.js')(passport)

// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()      // 辨識使用者是否已經登入的變數，讓 view 可以使用
  // 新增兩個 flash message 變數 
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('error')

  next()
})




// routes setting

app.use('/', require('./routes/home.js'))
app.use('/restaurants', require('./routes/restaurants.js'))
app.use('/search', require('./routes/search.js'))
app.use('/users', require('./routes/user.js'))
app.use('/auth', require('./routes/auths'))

app.listen(3000, () => {
  console.log('web server is running')
})
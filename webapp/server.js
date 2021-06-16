// =======================================
//              DEPENDENCIES
// =======================================

require('dotenv').config()
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session')
const { flash } = require('express-flash-message')

const {
  setUserVarMiddleware, authenticatedOnly
} = require('./middlewares/auth-middleware')
const {
  authenticatedOnly: authenticatedOnlyMiddleware,
//   guestOnly: guestOnlyMiddleware,
} = require('./middlewares/auth-middleware')
const productRouter = require('./routers/product_router')
const userRouter = require('./routers/user_router')
const productController = require('./controllers/products_controller')
const cartController = require('./controllers/cart_controller')

const app = express();
const port = process.env.PORT || 7000; // tenary operator
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

// MIDDLEWARES

// set the view engine that express will use
app.set('view engine', 'ejs');
// app.set('views', './views')

// to allow server to use the css stylesheet
// app.use(express.static('/public'))
app.use(express.static(__dirname + '/public'));

// setting middleware to accept json and urlencoded request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setting middleware to accept spoofed methods based on _method query parameter
app.use(methodOverride('_method'))

// setting up middleware to support session
app.use(session({
  secret: process.env.SESSION_SECRET,
  name: 'user_session',
  resave: false,
  saveUninitialized: false,
  cookie: { path: '/', secure: false, maxAge: 3600000 } // 3600000ms = 3600s = 60mins, cookie expires in an hour
}))

app.use(flash({ sessionKeyName: 'flash_message' }));

// setting middleware to ensure global template user variable
app.use(setUserVarMiddleware)

// to use my static files
app.use("/static", express.static('./static/'))

// =======================================
//              ROUTES
// =======================================

app.get('/home', (req, res) => {
  res.render('pages/home')
})

app.get('/', (req, res) => {
  res.redirect('/home')
})

app.get('/search', (req, res) => {
  res.render('pages/search')
})

app.get('/shipping', (req, res) => {
  res.render('pages/shipping')
})

app.get('/care', (req, res) => {
  res.render('pages/care')
})

app.get('/contact', (req, res) => {
  res.render('pages/contact')
})

app.get('/cart', authenticatedOnlyMiddleware, cartController.index)
app.post('/cart', authenticatedOnlyMiddleware, cartController.confirmCart)
app.patch('/cart', authenticatedOnlyMiddleware, cartController.updateCart)
app.delete('/cart', authenticatedOnlyMiddleware, cartController.deleteCart)

app.use('/products', productRouter)
app.use('/users', userRouter)

// =======================================
//              LISTENER
// =======================================

// Initialise MongoDB connection via Mongoose
mongoose.connect( mongoURI, {useNewUrlParser: true, useUnifiedTopology: true} )
    .then(response => {
        app.listen(port, () => {
        console.log(`Webapp listening on port: ${port}`)
        })
    })
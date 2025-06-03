require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')


// express app
const app = express()

// Set strictQuery to true to maintain the current behavior in Mongoose,
// where query filters must match fields defined in the schema.
// This prevents a deprecation warning introduced in Mongoose 7.
mongoose.set('strictQuery', true);

// connect to mongodb
const dbUrl = process.env.MONGODB_URI

mongoose.connect(dbUrl)
    .then((result) => app.listen(3000))
    .catch((err) => { console.log(err) })

// register view engine
app.set('view engine', 'ejs')

// middleware & static files
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

// blog routes
app.use('/blogs/', blogRoutes)

// about page
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})
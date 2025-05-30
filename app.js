const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

const app = express()


const dbUrl = 'mongodb+srv://testproject:mongo2025test@cluster0.sndeotg.mongodb.net/node-blog'
mongoose.connect(dbUrl)
    .then((result) => app.listen(3000))
    .catch((err) => {console.log(err)})

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/blogs', (req, res) => {

    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'Home', blogs: result })
        })
        .catch((err) => { console.log(err) })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'New Blog' })
})

app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})
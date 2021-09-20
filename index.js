const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { response } = require('express');

const app = express();

//connect to mongo db
const dbURI = 'mongodb+srv://ebubeker:1234567890@cluster0.798mw.mongodb.net/Haram-Habibi-Website?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(PORT, () => console.log(`Server started on port: ${PORT}`)))
    .catch((err) => console.log(err));

//Website routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
});
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});
app.get('/product', (req, res) => {
    res.render('product', { title: 'Products' });
});
app.get('/admin', (req, res) => {
    res.render('admin', { title: 'Admin' });
});

app.get('/blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.render('index', { title: "Home", blogs: result })
        })
        .catch((err) => console.log(err));
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});


//register view engine
app.set('view engine', 'ejs');

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.Port || 5000;
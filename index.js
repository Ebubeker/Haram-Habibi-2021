const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const Blog = require('./models/blog')

const app = express();

//connect to mongo db
const dbURI = 'mongodb+srv://ebubeker:1234567890@cluster0.798mw.mongodb.net/Haram-Habibi-Website?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(PORT, () => console.log(`Server started on port: ${PORT}`)))
    .catch((err) => console.log(err));

//mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    // const blog = new Blog({
    //     title: "fire",
    //     snippet: "about mu new blog",
    //     body: "More about my special blog"
    // });
    // blog.save()
    //     .then((result) => {
    //         res.send(result)
    //     })
    //     .catch((err) => console.log(err));
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        });
})

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.Port || 5000;
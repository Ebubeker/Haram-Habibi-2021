const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const User = require('./models/user-admin');
const { response } = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const Product = require('./models/product');
const Email = require('./models/emailColl');
const Contact = require('./models/conatct');

// const MongoDbSession = require('connect-mongodb-session')(session);
const PORT = process.env.Port || 5000;

// const store = new session.MemoryStore();

const app = express();

const dbURI = 'mongodb+srv://ebubeker:1234567890@cluster0.798mw.mongodb.net/Haram-Habibi-Website?retryWrites=true&w=majority';
const store = MongoStore.create({ mongoUrl: dbURI });
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    saveUninitialized: false,
    store
}));

//connect to mongo db
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
    const num = 1;
    Product.find()
        .then((resu) => {
            res.render('productNrPage', { title: 'Products', products: resu, num })
        }).catch((err) => console.log(err));
});

app.get('/product/:num', (req, res) => {
    const num = req.params.num;
    Product.find()
        .then((resu) => {
            res.render('productNrPage', { title: 'Products', products: resu, num })
        }).catch((err) => console.log(err));
});

app.get('/search', (req, res) => {
    res.render('searchProduct', { title: 'Search' })
});

app.post('/search', (req, res) => {
    let search = req.body.searchName;
    let num = 1;

    Product.find({ title: { $regex: search } })
        .then((result) => {
            Product.find()
                .then((response) => {
                    res.render('searchProduct', { title: 'Search Product', products: result, num, searchName: search, allProd: response })
                });
        });

});

app.get('/filter', (req, res) => {
    res.render('filterProd', { title: 'Filter' })
});

app.post('/filter', (req, res) => {
    let categorieVal = req.body.categorie;
    let priceVal = req.body.price;
    console.log(priceVal)
    let num = 1;
    if (priceVal === 'All' && categorieVal !== 'All') {
        Product.find({ categorie: categorieVal })
            .then((result) => {
                console.log(1)
                Product.find()
                    .then((response) => {
                        res.render('filterProd', { title: 'Filter Product', products: result, num, allProd: response });
                    });
            });
    } else if (categorieVal === 'All' && priceVal !== 'All') {
        Product.find()
            .then((result) => {
                let products = [];
                result.forEach((prod) => {
                    if (parseInt(prod.price) > parseInt(priceVal.split('-')[0]) && parseInt(prod.price) <= parseInt(priceVal.split('-')[1])) {
                        products.push(prod);
                    }
                });
                console.log(2)
                console.log(products)
                Product.find()
                    .then((response) => {
                        res.render('filterProd', { title: 'Filter Product', products: products, num, allProd: response })
                    });
            });
    } else if (categorieVal === 'All' && priceVal === 'All') {
        Product.find()
            .then((result) => {
                console.log(3)
                Product.find()
                    .then((response) => {
                        res.render('filterProd', { title: 'Filter Product', products: result, num, allProd: response })
                    });
            });
    } else if (categorieVal !== 'All' && priceVal !== 'All') {
        Product.find({ categorie: categorieVal })
            .then((result) => {
                let products = [];
                result.forEach((prod) => {
                    if (parseInt(prod.price) > parseInt(priceVal.split('-')[0]) && parseInt(prod.price) <= parseInt(priceVal.split('-')[1])) {
                        products.push(prod);
                    }
                });
                console.log(4)
                Product.find()
                    .then((response) => {
                        res.render('filterProd', { title: 'Filter Product', products: result, num, allProd: response })
                    });
            });
    }
});

app.get('/collaborations', (req, res) => {
    res.render('collaborations', { title: 'Collaborations' });
});

app.get('/admin', (req, res) => {
    Contact.find()
        .then((result) => {
            Email.find()
                .then((resu) => {
                    Product.find()
                        .then((prod) => {
                            res.render('admin', { title: 'Admin', contact: result, email: resu, product: prod });

                        })
                        .catch((err) => console.log(err))
                })
                .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
});

app.get('/createProduct', (req, res) => {
    res.render('createProduct', { title: 'Create a Product' });
});

app.get('/login', (req, res) => {
    if (req.session.authenticated) {
        res.redirect('/admin');
    } else {
        res.render('login', { title: 'Admin-Login', par: '' });
    }
});

app.get('/blogs', (req, res) => {
    Product.find()
        .then((resu) => {
            res.render('index', { title: "Home", products: resu })
        }).catch((err) => console.log(err));
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});


//Login Authentication
app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({ username: username, password: password }, (err, user) => {
        if (err) {
            console.log(err)
        }
        if (!user) {
            res.render('login', { title: 'Admin-Login', par: 'Login Unsuccessful, Try Again!' });
        } else {
            req.session.authenticated = true;
            res.redirect('/admin');
        }
    });
});

app.get('/allEmailsSent', (req, res) => {
    if (req.session.authenticated) {
        Contact.find()
            .then((results) => {
                res.send(results);
            })
            .catch((err) => console.log(err))

    } else {
        res.redirect('/login')
    }
});

app.get('/subscriptions', (req, res) => {
    if (req.session.authenticated) {

        Email.find()
            .then((results) => {
                res.send(results);
            })
            .catch((err) => console.log(err))
    } else {
        res.redirect('/login')
    }
});

app.post('/createProduct', (req, res) => {
    let image = req.body.image;
    let title = req.body.title;
    let description = req.body.description;
    let price = req.body.price;
    let url = req.body.link;
    let categorie = req.body.categorie;

    const product = new Product({
        image,
        title,
        description,
        price,
        url,
        categorie
    });

    product.save()
        .then(() => {
            res.redirect('/admin');

        })
        .catch((err) => console.log(err));
});

app.get('/email', (req, res) => {
    // let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // console.log(fullUrl)

    res.render('emailThank', { title: "Thank You Email" })
});


app.post('/email', (req, res) => {
    let email = req.body.email;
    // let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // console.log(fullUrl)
    let newEmail = new Email({
        email: email
    });

    newEmail.save()
        .then(() => {
            res.redirect('/email')

        })
        .catch((err) => console.log(err));
});

app.post('/contact', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let message = req.body.message;

    let newContact = new Contact({
        name,
        email,
        message
    });

    newContact.save()
        .then(() => {
            res.redirect('/contact')

        })

});

//register view engine
app.set('view engine', 'ejs');

// // Body Parse Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser, json());

// const PORT = process.env.Port || 5000;
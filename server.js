const express = require('express');
const pug = require('pug');

let app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.locals.currentYear = new Date().getFullYear();

app.get('/', (req, res) => {
    res.render('home.pug', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.pug', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request!'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000')
});
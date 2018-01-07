const express = require('express');
const pug = require('pug');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

app.set('view engine', 'pug');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    console.log(log);
    next();
});

// app.use((req, res, next) => {
//     res.render('maintence.pug', {
//         pageTitle: 'Updating site!'
//     })
// });

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

app.get('/projects', (req, res) => {
    res.render('projects.pug', {
        pageTitle: 'Projects Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request!'
    });
});



app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});
//Require
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
//db
require('./data/reddit-db');
//Setup
const app = express();
//MiddleWare
const hbs  = require('express-handlebars');

//EXPRESS CONFIG
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.engine( 'hbs', hbs( {
    extname: 'hbs',
    defaultView: 'default',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'handlebars');
//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Validator
app.use(expressValidator());

//Controllers
require('./controllers/posts.js')(app);

app.get('/posts/new', (req, res) => {
    res.render('post/new');
})

app.listen(3000, () => {
    console.log('Reddit.js listening on port localhost:3000!');
});

module.exports = app;
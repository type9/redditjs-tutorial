//Require
const express = require('express');
//Setup
const app = express();
//MiddleWare
const hbs  = require('express-handlebars');

//Express Config
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.engine( 'hbs', hbs( {
    extname: 'hbs',
    defaultView: 'default',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(3000, () => {
    console.log('Reddit.js listening on port localhost:3000!');
});
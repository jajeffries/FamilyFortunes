const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
  if(!req.query.index) {
    res.redirect('/?index=0')
  }
  fs.readFile('./data/questions.json', (err, data) => {
    if (err) throw err;
    const models = JSON.parse(data);
    const model = models[req.query.index];
    res.render('index', model);
  });
});

module.exports = app;

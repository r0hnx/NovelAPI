const express = require('express');
const indexRouter = require('./routes/index');
const globalRouter = require('./routes/global');
const homeRouter = require('./routes/home');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/country', indexRouter);
app.use('/all', globalRouter);
app.use('/', homeRouter);

module.exports = app;
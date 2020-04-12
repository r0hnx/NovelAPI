var express = require('express');
var indexRouter = require('./routes/index');
var globalRouter = require('./routes/global');
var app = express();
app.use(express.json());
app.use('/', indexRouter);
app.use('/all', globalRouter);
module.exports = app;
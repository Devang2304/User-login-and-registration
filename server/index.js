var express = require('express');
var env=require('dotenv');
var path=require('path');
var app=express();
var mongoose =require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://<DB_USER_NAME>:<DB_PASSWORD>@cluster0-vatbg.mongodb.net/registrationFormHeruko?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('Connected to Mongoose');
  } else {
    console.log(err);
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var route = require('./routes/index');
app.use('/',route);

app.use(function (req, res,next) {
    var err = new Error('File cannot be found');
    err.status = 404;
    next(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Server is started on http://127.0.0.1:'+PORT);
});
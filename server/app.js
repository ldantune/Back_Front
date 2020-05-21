const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const api = require('./routes/api');
const auth = require('./routes/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/backfront', 
{useNewUrlParser: true});

//
app.use('/api', api);
app.use('/auth', auth);

app.use(function(req, res, next) {
    res.status(404).send('Not found');
})
app.listen(3000, () => {
    console.log('Servidor no Ar!!');
});
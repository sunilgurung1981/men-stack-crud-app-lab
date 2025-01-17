
const dotenv = require("dotenv");
dotenv.config()
const express = require('express');
const mongoose = require('mongoose')

const app = express();

const Cars = require('./models/cars.js')

//connectted express server to Database
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log('Connected to MongoDB ');
  });

app.get('/', function(req, res){
	res.render('index.ejs')
})

// test route
app.get('/test', function (req, res) {
    res.send('server is running')
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
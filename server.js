
const dotenv = require("dotenv");
dotenv.config()
const express = require('express');
const mongoose = require('mongoose')
const methodOverride = require('method-override');
const morgan = require("morgan");

const app = express();

const Cars = require('./models/cars.js')

// To handle form data submission 
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan("dev"));

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

app.delete('/cars/:carsId', async function(req, res){

	const deletedCars = await Cars.findByIdAndDelete(req.params.carsId)

	res.redirect('/cars')
})

// route for edit
app.get('/cars/:carId/edit', async function (req, res) {
    const carDoc = await Cars.findById(req.params.carId);
    res.render('cars/edit.ejs', { carDoc });
})

// updated route for edit using put method
app.put('/cars/:carId', async function (req, res) {
    if(req.body.isDrivable === 'on'){
		req.body.isDrivable = true
	} else {
		req.body.isDrivable = false
	}

    const updatedCar = await Cars.findByIdAndUpdate (req.params.carId, req.body) 
    res.redirect(`/cars/ ${req.params.carId}`)
})

app.get('/cars', async function(req, res){
	// get all of the cars from the db!

	const allCarDocs = await Cars.find({})
	console.log(allCarDocs)

	res.render('cars/index.ejs', {carDoc: allCarDocs})
})
//route for create new car /cars/new
app.get('/cars/new', function (req, res) {
    res.render('cars/new.ejs')
})

// the new route must be defined before the show, because params are catch alls
app.get('/cars/:carId', async function(req, res){
	console.log(req.params.carId, " <- req.params.carId")

	// using the id from the request, 
	// tell the model to go find that specific fruit from the database!
	const carDoc = await Cars.findById(req.params.carId)
	console.log(carDoc)

	res.render('cars/show.ejs', {carDoc: carDoc})
})

//route to subit the form
app.post('/cars', async function(req, res){
    if(req.body.isDrivable === 'on'){
		req.body.isDrivable = true
	} else {
		req.body.isDrivable = false
	}

    // const carDoc = await Cars.create(req.body)
    //     res.send('car sucessfully added')
    try {
        const carDoc = await Cars.create(req.body)
        res.send('car sucessfully added')
        console.log(carDoc)
    } catch (error) {
        console.error(error);
        res.status(500).send('error on car')
    }
})
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
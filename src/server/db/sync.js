//------------------------------------------------------------------------------------------//
// This script was made only to send the "db.json" to the MongoDB Server in a automated way.//
//------------------------------------------------------------------------------------------//
var mongoose = require('mongoose');

// Creates an array with all database
const database = require('./db.json');

// Connects to MongoDB Server
mongoose.connect('mongodb+srv://guilherme:123@cluster0-zqwij.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});

// Gets all database schemas
const restaurantsSchema = require('./schemas/restaurantSchema');
const menuSchema = require('./schemas/menuSchema');
const reviewsSchema = require('./schemas/reviewSchema');
const ordersSchema = require('./schemas/orderSchema');

// Saves the offline database on MongoDB Server
restaurantsSchema.create(database.restaurants);
menuSchema.create(database.menu);
reviewsSchema.create(database.reviews);
ordersSchema.create(database.orders);
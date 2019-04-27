//------------------------------------------------------------------------------------------//
// This script was made only to send the "db.json" to the MongoDB Server in a automated way.//
//------------------------------------------------------------------------------------------//
var mongoose = require('mongoose');

// Creates a array with all database
const database = require('./db.json');

// Connects to MongoDB Server
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

// Gets all database schemas
const restaurantsSchema = require('./schemas/restaurantsSchema');
const menuSchema = require('./schemas/menusSchema');
const reviewsSchema = require('./schemas/reviewsSchema');
const ordersSchema = require('./schemas/ordersSchema');

// Saves the offline database on MongoDB Server
restaurantsSchema.create(database.restaurants);
menuSchema.create(database.menu);
reviewsSchema.create(database.reviews);
ordersSchema.create(database.orders);
const Mongoose = require('mongoose')

var restaurantsSchema = new Mongoose.Schema({
    _id: {
        type: String
    },
    name: {
        type: String
    },
    category: {
        type: String
    },
    deliveryEstimate: {
        type: String
    },
    rating: {
        type: Number
    },
    imagePath: {
        type: String
    },
    about: {
        type: String
    },
    hours: {
        type: String
    },
});

module.exports = Mongoose.model('restaurants', restaurantsSchema);
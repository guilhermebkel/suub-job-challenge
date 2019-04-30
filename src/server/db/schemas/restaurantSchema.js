const Mongoose = require('mongoose')
const shortid = require('shortid');

var restaurantsSchema = new Mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    name: {
        type: String,
        default: " "
    },
    category: {
        type: String,
        default: " "
    },
    deliveryEstimate: {
        type: String,
        default: " "
    },
    rating: {
        type: Number,
        default: 0
    },
    imagePath: {
        type: String,
        default: " "
    },
    about: {
        type: String,
        default: " "
    },
    hours: {
        type: String,
        default: " "
    },
});

module.exports = Mongoose.model('restaurants', restaurantsSchema);
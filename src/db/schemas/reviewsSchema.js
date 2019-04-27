const Mongoose = require('mongoose')

var reviewsSchema = new Mongoose.Schema({
    name: {
        type: String
    },
    date: {
        type: String
    },
    rating: {
        type: Number
    },
    comments: {
        type: String
    },
    restaurant_id: {
        type: String
    }
});

module.exports = Mongoose.model('reviews', reviewsSchema);
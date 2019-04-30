const Mongoose = require('mongoose')

var reviewsSchema = new Mongoose.Schema({
    name: {
        type: String,
        default: " "
    },
    date: {
        type: String,
        default: " "
    },
    rating: {
        type: Number,
        default: 0
    },
    comments: {
        type: String,
        default: " "
    },
    restaurant_id: {
        type: String,
        default: " "
    }
});

module.exports = Mongoose.model('reviews', reviewsSchema);
const Mongoose = require('mongoose')
const shortid = require('shortid');

const menuSchema = new Mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    imagePath: {
        type: String,
        default: " "
    },
    name: {
        type: String,
        default: " "
    },
    description: {
        type: String,
        default: " "
    },
    price: {
        type: Number,
        default: 0
    },
    restaurant_id: {
        type: String,
        default: " "
    }
});

module.exports = Mongoose.model('menus', menuSchema);
const Mongoose = require('mongoose')

const menuSchema = new Mongoose.Schema({
    _id: {
        type: String,
        default: Math.random().toString(36).substr(2, 9)
    },
    imagePath: {
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    restaurant_id: {
        type: String
    }
});

module.exports = Mongoose.model('menus', menuSchema);
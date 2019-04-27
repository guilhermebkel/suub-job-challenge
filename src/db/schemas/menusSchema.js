const Mongoose = require('mongoose')

const menuSchema = new Mongoose.Schema({
    /*_id: {
        type: String
    },*/
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
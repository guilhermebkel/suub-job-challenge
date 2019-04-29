const Mongoose = require('mongoose')

var ordersSchema = new Mongoose.Schema({
    customer: {
        type: String,
        default: " "
    },
    order: {
        type: String,
        default: " "
    },
    price: {
        type: Number,
        default: 0
    },
    menu_id: {
        type: String,
        default: " "
    },
    restaurant_id: {
        type: String,
        default: " "
    },
    reviews_id: {
        type: String,
        default: " "
    }
})

module.exports = Mongoose.model('orders', ordersSchema);
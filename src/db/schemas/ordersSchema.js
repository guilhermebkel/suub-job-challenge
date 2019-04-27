const Mongoose = require('mongoose')

var ordersSchema = new Mongoose.Schema({
    customer: {
        type: String
    },
    order: {
        type: String
    },
    price: {
        type: Number
    },
    menu_id: {
        type: String
    },
    restaurant_id: {
        type: String
    },
    reviews_id: {
        type: String,
        default: ""
    }
})

module.exports = Mongoose.model('orders', ordersSchema);
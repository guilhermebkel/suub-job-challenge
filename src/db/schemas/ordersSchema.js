const Mongoose = require('mongoose')

var ordersSchema = new Mongoose.Schema({
    customer_name: {
        type: String
    },
    order_name: {
        type: String
    },
    order_price: {
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
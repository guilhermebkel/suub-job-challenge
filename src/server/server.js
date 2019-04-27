const restify = require('restify')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const RestaurantSchema = require('../db/schemas/restaurantsSchema');
const MenuSchema = require('../db/schemas/menusSchema');
const ReviewSchema = require('../db/schemas/reviewsSchema');
const OrderSchema = require('../db/schemas/ordersSchema');

const cors = require('cors');
const logger = require('morgan');
const methodOverride = require('method-override')

// Starts the restify server
const server = restify.createServer();

server.on('MethodNotAllowed', unknownMethodHandler);
function unknownMethodHandler(req, res) {
    if (req.method.toLowerCase() === 'options') {
        console.log('received an options method request');
      var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'Origin', 'X-Requested-With']; // added Origin & X-Requested-With
  
      if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');
  
      res.header('Access-Control-Allow-Credentials', true);
      res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
      res.header('Access-Control-Allow-Methods', res.methods.join(', '));
      res.header('Access-Control-Allow-Origin', req.headers.origin);
  
      return res.send(204);
    }
    else
      return res.send(new restify.MethodNotAllowedError());
}

// Connects to MongoDB Server
mongoose.connect('mongodb+srv://guilherme:123@cluster0-zqwij.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });

// Hosts the server on a port
server.listen(4000, () => {
    console.log('Server running at', server.name, server.url);
})

// Helps taking the user inputs
server.use(bodyParser.urlencoded({ extended: 'false' }));
server.use(bodyParser.json());

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
server.use(cors());
server.use(logger('dev'));
server.use(methodOverride());

server.get('/', function (req, res) {
    res.json({ "status": "Server is running" });
})

server.get('/restaurants', (req, res) => {
    RestaurantSchema.find({}, (err, data) => {
        res.json(data);
    })
})
server.get('/menus', (req, res) => {
    MenuSchema.find({}, (err, data) => {
        res.json(data);
    })
})
server.get('/reviews', (req, res) => {
    ReviewSchema.find({}, (err, data) => {
        res.json(data);
    })
})
server.get('/orders', (req, res) => {
    OrderSchema.find({}, (err, data) => {
        res.json(data);
    })
})

server.get('/restaurants/delete/:id', (req, res) => {
    RestaurantSchema.findByIdAndRemove(req.params.id, (err, data) => {
        if (data) {
            res.json("Done");
        }
    });
})
server.get('/menus/delete/:id', (req, res) => {
    MenuSchema.findByIdAndRemove(req.params.id, (err, data) => {
        if (data) {
            res.json("Done");
        }
    });
})
server.get('/reviews/delete/:id', (req, res) => {
    ReviewSchema.findByIdAndRemove(req.params.id, (err, data) => {
        if (data) {
            res.json("Done");
        }
    });
})
server.get('/orders/delete/:id', (req, res) => {
    OrderSchema.findByIdAndRemove(req.params.id, (err, data) => {
        if (data) {
            res.json("Done");
        }
    });
})

server.post('/restaurants/create', (req, res) => {
    RestaurantSchema.create(req.body.userInput, (err, data) => {
        if (data) {
            res.json("Done");
        }
    });
})
server.post('/menus/create', (req, res) => {
    MenuSchema.create(req.body.userInput, (err, data) => {
        if (data) {
            res.json("Done");
        }
    });
})
server.post('/reviews/create', (req, res) => {
    ReviewSchema.create(req.body.userInput, (err, data) => {
        if (data) {
            res.json("Done");
        }
    });
})
server.post('/orders/create', (req, res) => {
    OrderSchema.create(req.body.userInput, (err, data) => {
        if (data) {
            res.json("Done");
        }
    });
})
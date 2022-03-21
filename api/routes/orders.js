const express = require('express');
const route = express.Router(); 

 
const OrderController = require('../controller/orders');

route.get('/', OrderController.get_all);

route.post('/', OrderController.create_new);

route.get('/:orderId', OrderController.order_by_id);

route.delete('/:orderId', OrderController.delete);

module.exports = route;
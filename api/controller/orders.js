
const Order = require('../models/order');
const Product = require('../models/products');
const mongoose = require('mongoose');

exports.get_all = (req, res, next) => {
    Order.find()
        .select('product quantity _id')
        .populate('product', 'name')
        .exec()
        .then((orders) => {
            const response = {
                count: orders.length,
                orders: orders.map((doc) => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'https://radia-api.herokuapp.com/orders/' + doc._id
                        }
                    }
                })
            }
            res.status(200)
                .json(response);
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            })
        });
}

exports.create_new = (req, res, next) => {

    Product.findById(req.body.productId)
        .then((product) => {
            if (!product) {
                return res.status(401).json({
                    message: "Product Not Found"
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });
            return order.save();
        })
        .then((result) => {
            res.status(201).json({
                message: "Order Created",
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: "GET",
                    url: "https://radia-api.herokuapp.com/orders/" + result._id
                }
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        })
}

exports.order_by_id = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId)
        .select('product quantity _id')
        .exec()
        .then((order) => {
            if (!order) {
                res.status(404).json({
                    message: "Order Not Found"
                });
            } else {
                res.status(200).json({
                    order: order,
                    request: {
                        type: 'GET',
                        url: 'https://radia-api.herokuapp.com/orders/'
                    }
                });
            }

        })
        .catch((err) => {
            res.status(500).json(err);
        });
}

exports.delete = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.deleteOne({ _id: orderId })
        .exec()
        .then((response) => {
            res.status(201).json(
                {
                    message: 'Order Deleted',
                    request: {
                        type: 'GET',
                        url: 'https://radia-api.herokuapp.com/orders/',
                        body: { productId: "ID", quantity: "Number" }
                    }
                }
            );
        }).catch((err) => {
            res.status(201).json({
                message: err
            });
        })

}
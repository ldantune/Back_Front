const ProductModel = require("../models/ProductModel");

module.exports = {   
    all: (req, res) => {
        ProductModel.find({}).lean().exec((err, products) => {
            if(err){
                res.status(500).send(err);
            } else {
                res.status(200).send(products);
            }
        })
    },

    add: (req, res) =>{
        let p = new ProductModel({
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            departments: req.body.departments
        });
        p.save((err, prod) => {
            if(err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(prod);
            }
        })
    },

    delete: (req, res) => {
        ProductModel.deleteOne({_id: req.params.id}, (err) => {
            if(err) {
                res.status(500).send(err);
            } else {
                res.status(200).send();
            }
        })
    },

    update: (req, res) => {
        ProductModel.findById(req.params.id, (err, prod) => {
            if(err){
                res.status(500).send(err);
            } else if (!prod){
                res.status(404).send({});
            } else {
                prod.name = req.body.name;
                prod.price = req.body.price;
                prod.stock = req.body.stock;
                prod.departments = req.body.departments;
                prod.save((err, prod) => {
                    if(err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).send(prod);
                    }
                })
            }
        })
    },
};
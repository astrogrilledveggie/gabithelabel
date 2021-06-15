const _ = require('lodash')
const { product, productModel } = require('../models/products')
const { cart, cartModel } = require('../models/cart')
const { userModel } = require('../models/users')

module.exports = {

    index: async (req, res) => {
        let product = []
        try {
            product = await productModel.find()
        } catch (err) {
            res.statusCode(500) // 500 = internal server error
            return 'server error'
        }

        res.render('products/index', { product: product })
    },

    show: (req, res) => {
        let product = {}

        productModel.findOne({ slug: req.params.slug })
            .then(item => {
                // if item is not found, redirect to homepage
                if (!item) {
                    res.redirect('/products')
                    return
                }

                product = item
                res.render('products/show', { product: product })
            })
            .catch(err => {
                console.log(err)
                res.redirect('/products')
            })
    },

}
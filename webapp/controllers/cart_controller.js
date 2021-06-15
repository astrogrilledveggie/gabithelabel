const _ = require('lodash')
const { product, productModel } = require('../models/products')
const { cart, cartModel } = require('../models/cart')
const { userModel } = require('../models/users')

module.exports = {

    index: async (req, res) => {
        let cart = []
        try {
            cart = await cartModel.find()
        } catch (err) {
            res.statusCode(500) // 500 = internal server error
            return 'server error'
        }

        res.render('pages/cart', { cart: cart })
    },

    addToCart: async (req, res) => {

        let product = {}

        productModel.findOne({ slug: req.params.slug })
            .then(item => {
                
                product = item
                
                cartModel.create({
                    userID: req.session.user,
                    })
                
                cartModel.updateOne(
                    { userID: req.session.user },
                    { 
                        $push: { 
                            product: {
                                name: product.name,
                                price: product.price,
                                image: product.image,
                                slug: product.slug
                                }
                        }
                    }
                )
                    .then(createResp => {
                        res.redirect('/cart')
                    })
                    .catch(err => {
                        console.log(err)
                        // res.redirect('/products')
                    })
            })
    },

    update: (req, res) => {

        cartModel.updateOne(
            { userID: req.session.user },
        )
            .then(updateResp => {
                res.redirect('/cart')
            })
            .catch(err => {
                res.redirect('/cart')
            })
    },

}
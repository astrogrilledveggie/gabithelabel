const _ = require('lodash')
const moment = require('moment')
const { product, productModel } = require('../models/products')
const { cart, cartModel } = require('../models/cart')
const { userModel } = require('../models/users')

module.exports = {

    index: async (req, res) => {
        let cart = {}
        try {
            cart = await cartModel.findOne({ userID: req.session.user._id })
        } catch (err) {
            res.statusCode(500) // 500 = internal server error
            return 'server error'
        }

        res.render('pages/cart', { cart: cart })
    },

    // confirmCart: async (req, res) => {
    //     const timestampNow = moment().utc()

    //     let name = req.body.name
    //     let price = req.body.price
    //     let image = req.body.image
    //     let quantity = req.body.quantity
    //     let slug = _.kebabCase(req.body.name)

    //     cartModel.findOne({ userID: req.session.user._id })
    //         .then(user => {
    //             if (!user) {
    //                 cartModel.create({
    //                     userID: req.session.user._id,
    //                     product: [
    //                         {
    //                             name: name,
    //                             price: price,
    //                             image: image,
    //                             quantity: quantity,
    //                             slug: slug
    //                         }
    //                     ],
    //                     created_at: timestampNow,
    //                     updated_at: timestampNow
    //                 })
    //             } else {
    //                 cartModel.updateOne(
    //                     { userID: req.session.user._id },
    //                     {
    //                             $push: { 
    //                                 product: {
    //                                     name: name,
    //                                     price: price,
    //                                     image: image,
    //                                     quantity: quantity,
    //                                     slug: slug
    //                                 }
    //                             },
    //                             $set: { updated_at: timestampNow }
    //                     }
    //                 )
    //             }
    //         })
    //         .then(createResp => {
    //             res.redirect('/cart')
    //         })
    //         .catch(err => {
    //             console.log(err)
    //             alert('We are sorry, an error occurred. Please try again, or reach out to us at hello@gabi-label.com.')
    //         })

    // },

    confirmCart: async (req, res) => {
        const timestampNow = moment().utc()

        let name = req.body.name
        let price = req.body.price
        let image = req.body.image
        let quantity = req.body.quantity
        let slug = _.kebabCase(req.body.name)

        cartModel.updateOne(
            { userID: req.session.user._id },
            {
                $push: { 
                    product: {
                        name: name,
                        price: price,
                        image: image,
                        quantity: quantity,
                        slug: slug
                    }
                },
                $set: { 
                    updated_at: timestampNow
                }
            },
            {
                upsert: true,
            }
        )
            .then(createResp => {
                res.redirect('/cart')
            })
            .catch(err => {
                console.log(err)
                alert('We are sorry, an error occurred. Please try again, or reach out to us at hello@gabi-label.com.')
            })
    },

    updateCart: (req, res) => {
        cartModel.deleteOne({ userID: req.session.user._id })
            .then(deleteResp => {
                return
            })
            .catch(err => {
                console.log(err)
                return
            })

        const timestampNow = moment().utc()

        for (let i = 0; i < 10; i++) {
            let name = req.body[`name${i}`]
            let price = req.body[`price${i}`]
            let image = req.body[`image${i}`]
            let quantity = req.body[`quantity${i}`]
            let slug = _.kebabCase(name)

            cartModel.updateOne(
                { userID: req.session.user._id },
                {
                    $push: { 
                        product: {
                            name: name,
                            price: price,
                            image: image,
                            quantity: quantity,
                            slug: slug
                        }
                    },
                    $set: { 
                        updated_at: timestampNow
                    }
                },
                {
                    upsert: true,
                }
            )
                .then(updateResp => {
                    res.redirect('/cart')
                    return
                })
                .catch(err => {
                    console.log(err)
                    return
                })
        }
    },

    deleteCart: (req, res) => {
        cartModel.deleteOne({ userID: req.session.user._id })
            .then(deleteResp => {
                res.redirect('/cart')
                alert('Your cart has been emptied')
                return
            })
            .catch(err => {
                console.log(err)
                return
            })
    },

}
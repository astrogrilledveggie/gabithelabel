const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userID: { type: String, required: true, unique: true },
    product: [
        {
            name: { type: String, required: true, unique: true },
            price: { type: Number, required: true },
	        image: { type: String, required: true },
            slug: { type: String, required: true, unique: true }
        },
    ],
})

const cartModel = mongoose.model('cart', cartSchema);

module.exports = {
    cartModel: cartModel
}
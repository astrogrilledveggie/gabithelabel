const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    product: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
	        image: { type: String, required: true },
            slug: { type: String, required: true },
            quantity: { type: Number, required: true, default: 1 },
        },
    ],
    updated_at: { type: Date },
}, { timestamps: { createdAt: true, updatedAt: false } })

const cartModel = mongoose.model('cart', cartSchema);

module.exports = {
    cartModel: cartModel
}
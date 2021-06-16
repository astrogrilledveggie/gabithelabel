const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
	image: { type: String, required: true },
    image2: { type: String, required: true },
    collectionName: { type: String },
    productType: { type: String },
    gabiStudio: { type: Boolean },
    description: { type: String },
    slug: { type: String, required: true, unique: true }
})

const productModel = mongoose.model('product', productSchema);

module.exports = {
    productModel: productModel
}
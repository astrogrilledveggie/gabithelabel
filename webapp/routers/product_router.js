const express = require('express')
const router = express.Router()
const {
  authenticatedOnly: authenticatedOnlyMiddleware,
//   guestOnly: guestOnlyMiddleware,
} = require('../middlewares/auth-middleware')
const productController = require('../controllers/products_controller')

// INDEX Route
router.get('/', productController.index)

// SHOW Route
router.get('/:slug', productController.show)

module.exports = router
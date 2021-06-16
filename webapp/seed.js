require('dotenv').config()
const mongoose = require('mongoose');
const _ = require('lodash')
const { productModel } = require('./models/products')

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

let data = [
        { 
            name: 'Isolde Ring *18k Gold-plated', 
            price: 29.9, 
            image: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/isolde10_600x.jpg',
            image2: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/isolde1_600x.jpg',
            collectionName: 'isleofus',
            productType: 'ring',
            gabiStudio: false,
            description: 'Refined, everyday lustrous gold ring with a single rhinestone.',
        },
        { 
            name: 'Sibyl Ring *18k Gold-plated', 
            price: 34.9, 
            image: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/sibyl-main2_600x.jpg',
            image2: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/sibyl5_800x.jpg',
            collectionName: 'isleofus',
            productType: 'ring',
            gabiStudio: false,
            description: 'Thick, lustrous gold ring with a single starburst rhinestone.',
        },
        { 
            name: 'Solange Ring *18k Gold-plated S925', 
            price: 34.9, 
            image: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/solange-ring_600x.jpg',
            image2: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/solange-odette3_800x.jpg',
            collectionName: 'isleofus',
            productType: 'ring',
            gabiStudio: false,
            description: 'Delicate, lustrous gold ring with striking emerald green cubic zirconia.',
        },
        { 
            name: 'Zodiac Coin Necklace *18k Gold-plated', 
            price: 28.9, 
            image: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/zodiac14-short3_700x.jpg',
            image2: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/zodiac-coin-main_700x.jpg',
            collectionName: 'isleofus',
            productType: 'necklace',
            gabiStudio: true,
            description: 'Vintage-inspired, quaint zodiac coin necklaces. Highly versatile; features intricate details and zodiac symbol carvings.',
        },
        { 
            name: 'Rope Necklace - Thin *18K Gold-plated Stainless Steel', 
            price: 35.9, 
            image2: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/rope_54fc2853-f2ef-4209-8d6e-338c0c154730_600x.jpg',
            image: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/rope-thin_4e00f95b-1a10-4426-8041-0398f7aea0cc_800x.jpg',
            collectionName: 'isleofus',
            productType: 'necklace',
            gabiStudio: false,
            description: 'A chic, versatile chain necklace.',
        },
        { 
            name: 'Thais Necklace *18K Gold-plated Stainless Steel', 
            price: 42.9, 
            image2: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/thais5_700x.jpg',
            image: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/thais12_800x.jpg',
            collectionName: 'isleofus',
            productType: 'necklace',
            gabiStudio: true,
            description: 'A beautiful necklace with natural greyish-blue stone pendant.',
        },
        { 
            name: 'Ingrid Earrings - Clear *18K Gold-plated', 
            price: 35.9, 
            image: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/ingrid-clear5_700x.jpg',
            image2: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/ingrid-clear_800x.jpg',
            collectionName: 'isleofus',
            productType: 'earring',
            gabiStudio: true,
            description: 'GABI STUDIO / Delicate pearl earrings with a gentle sophistication.',
        },
        { 
            name: 'Ingrid Earrings - Lilac *18K Gold-plated', 
            price: 35.9, 
            image2: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/ingrid-asta-4_f9ddb406-bc47-431b-9b83-624bf7122c15_600x.jpg',
            image: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/ingrid-lilac_800x.jpg',
            collectionName: 'isleofus',
            productType: 'earring',
            gabiStudio: true,
            description: 'GABI STUDIO / Delicate pearl earrings with a gentle sophistication.',
        },
        { 
            name: 'Asta Earrings *18K Gold-plated', 
            price: 29.9, 
            image2: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/asta2-main_600x.jpg',
            image: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/asta-model-main_800x.jpg',
            collectionName: 'isleofus',
            productType: 'earring',
            gabiStudio: true,
            description: 'GABI STUDIO / Ethereal glass earrings with a soft artfulness.',
        },
]

data = data.map(item => {
    item.slug = _.kebabCase(item.name)
    return item
})

let connection = null

mongoose.connect( mongoURI, {useNewUrlParser: true, useUnifiedTopology: true} )
    .then(connResp => {
        connection = connResp
        return productModel.insertMany(data)
    })
    .then(insertResp => {
        console.log('successful data insertion')
    })
    .catch(err => {
        console.log(err)
    })
    .finally(() => {
        if (connection !== null) {
            connection.disconnect()
        }
    })
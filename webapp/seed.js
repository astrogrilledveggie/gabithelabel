require('dotenv').config()
const mongoose = require('mongoose');
const _ = require('lodash')
const { productModel } = require('./models/products')

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

let data = [
        { 
            name: 'Isolde Ring *18k Gold-plated', 
            price: 29.9, 
            image: 'https://scontent.fsin9-2.fna.fbcdn.net/v/t45.5328-4/p960x960/192736526_4147105128687677_2260765175491334470_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=c48759&_nc_ohc=vLJ5YVaE8zQAX8m8SZf&_nc_ht=scontent.fsin9-2.fna&tp=6&oh=695f89822af5c17df0f31d4adef3c98f&oe=60C3417D',
            image2: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/isolde1_600x.jpg?v=1622169017',
            collectionName: 'isleofus',
            productType: 'ring',
            gabiStudio: false,
        },
        { 
            name: 'Odette Ring - Gold *18k Gold-plated S925', 
            price: 36.9, 
            image: 'https://scontent.fsin9-2.fna.fbcdn.net/v/t45.5328-4/p960x960/187541842_4010511302372783_263463215527833094_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=c48759&_nc_ohc=AC4ia_tmfMEAX-jJ8YU&_nc_ht=scontent.fsin9-2.fna&tp=6&oh=208a55b4d8c457d24e9abc0c160ebf3a&oe=60C42A49',
            image2: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/solange-odette2_0d80cbaa-1aec-41d9-a9a4-8f7cbbdc04cc_800x.jpg?v=1622118028',
            collectionName: 'isleofus',
            productType: 'ring',
            gabiStudio: false,
        },
        { 
            name: 'Sibyl Ring *18k Gold-plated', 
            price: 34.9, 
            image: 'https://scontent.fsin9-2.fna.fbcdn.net/v/t45.5328-4/p960x960/192680979_2889748034483092_8944388429361288702_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=c48759&_nc_ohc=zsJJr8CygkkAX_UEI6i&_nc_ht=scontent.fsin9-2.fna&tp=6&oh=3d308085375d61e611e30a1ea8c53089&oe=60C489E5',
            image2: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/sibyl5_800x.jpg?v=1622175321',
            collectionName: 'isleofus',
            productType: 'ring',
            gabiStudio: false,
        },
        { 
            name: 'Solange Ring *18k Gold-plated S925', 
            price: 34.9, 
            image: 'https://scontent.fsin9-2.fna.fbcdn.net/v/t45.5328-4/p960x960/193601159_3970790383015373_3504065562053148600_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=c48759&_nc_ohc=kZ4WqasGa9kAX8o-omA&_nc_ht=scontent.fsin9-2.fna&tp=6&oh=2d86855d06ff096cafc73174f2c50b7d&oe=60C4BF8F',
            image2: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/solange-odette3_800x.jpg?v=1622175100',
            collectionName: 'isleofus',
            productType: 'ring',
            gabiStudio: false,
        },
        { 
            name: 'Snake Ring *14k Gold-plated', 
            price: 34.9, 
            image: 'https://scontent.fsin9-1.fna.fbcdn.net/v/t45.5328-4/p960x960/183990219_4080369631998611_2379700180553268180_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=c48759&_nc_ohc=WMG9QdX1D-cAX-R8Aci&_nc_ht=scontent.fsin9-1.fna&tp=6&oh=0d720690a79ebbd2c0bdc38b7e92bccd&oe=60C50C8A',
            image2: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/snake4_15e57466-f9d8-4b63-bcaf-a1090a57ab16_800x.jpg?v=1622120435',
            collectionName: 'isleofus',
            productType: 'ring',
            gabiStudio: false,
        },
        { 
            name: 'Zodiac Coin Necklace *18k Gold-plated', 
            price: 28.9, 
            image: 'https://scontent.fsin9-2.fna.fbcdn.net/v/t45.5328-4/p960x960/190723785_4146380878716426_5263844682697943650_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=c48759&_nc_ohc=FegaW5gpZ68AX9tTjFL&_nc_ht=scontent.fsin9-2.fna&tp=6&oh=e180a0bc51bd6209539f4721f37f888b&oe=60C4F920',
            image2: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/2ECA7DFC-3956-47ED-ADC8-B8F9B071084F_800x.jpg?v=1622727992',
            collectionName: 'isleofus',
            productType: 'necklace',
            gabiStudio: true,
        },
        { 
            name: 'Rope Necklace - Thin *18K Gold-plated Stainless Steel', 
            price: 35.9, 
            image: 'https://scontent.fsin9-2.fna.fbcdn.net/v/t45.5328-4/p960x960/138274988_2776115199180364_5297797972306231943_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=c48759&_nc_ohc=5PNt53xUjDoAX9bNAhw&_nc_ht=scontent.fsin9-2.fna&tp=6&oh=f5012e9923ce120e27446134943f8310&oe=60C45EB4',
            image2: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/rope-thin_4e00f95b-1a10-4426-8041-0398f7aea0cc_800x.jpg?v=1612349035',
            collectionName: 'isleofus',
            productType: 'necklace',
            gabiStudio: false,
        },
        { 
            name: 'Thais Necklace *18K Gold-plated Stainless Steel', 
            price: 42.9, 
            image: 'https://scontent.fsin9-2.fna.fbcdn.net/v/t45.5328-4/p960x960/192857008_4070548913014463_2057480685766663621_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=c48759&_nc_ohc=wdhhYzdoHKkAX_6Dm_P&_nc_ht=scontent.fsin9-2.fna&tp=6&oh=cea52d97a21b32f5064c7f8a999b3351&oe=60C428AC',
            image2: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/thais12_800x.jpg?v=1622127958',
            collectionName: 'isleofus',
            productType: 'necklace',
            gabiStudio: true,
        },
        { 
            name: 'Ingrid Earrings - Clear *18K Gold-plated', 
            price: 35.9, 
            image: 'https://scontent.fsin9-1.fna.fbcdn.net/v/t45.5328-4/p960x960/194065894_4479549312055764_3114645301292264154_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=c48759&_nc_ohc=WPw76pMh8YwAX-njb-d&_nc_ht=scontent.fsin9-1.fna&tp=6&oh=3a25c90956f78d24421c6f53a9004e4d&oe=60C38DD6',
            image2: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/ingrid-clear_800x.jpg?v=1622109040',
            collectionName: 'isleofus',
            productType: 'earring',
            gabiStudio: true,
        },
        { 
            name: 'Ingrid Earrings - Lilac *18K Gold-plated', 
            price: 35.9, 
            image: 'https://scontent.fsin9-2.fna.fbcdn.net/v/t45.5328-4/p960x960/190165934_4274415092609493_6591289238601356353_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=c48759&_nc_ohc=hPNoCu5clsgAX8xp-KB&_nc_ht=scontent.fsin9-2.fna&tp=6&oh=340200a5862ce9cfcd01faff5c41ac6d&oe=60C4DE12',
            image2: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/ingrid-lilac_800x.jpg?v=1622109015',
            collectionName: 'isleofus',
            productType: 'earring',
            gabiStudio: true,
        },
        { 
            name: 'Asta Earrings *18K Gold-plated', 
            price: 29.9, 
            image: 'https://scontent.fsin9-2.fna.fbcdn.net/v/t45.5328-4/p960x960/187616416_4115304275172029_4188472980338425300_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=c48759&_nc_ohc=V0XAQ1VzFwwAX_VNivz&_nc_ht=scontent.fsin9-2.fna&tp=6&oh=58d0fba0d201b3fe44fa7b197790710c&oe=60C4203C',
            image2: 'https://cdn.shopify.com/s/files/1/0009/8746/3737/products/asta-model-main_800x.jpg?v=1622174776',
            collectionName: 'isleofus',
            productType: 'earring',
            gabiStudio: true,
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
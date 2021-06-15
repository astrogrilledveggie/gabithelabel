const { userModel } = require('../models/users')
const moment = require('moment')
const { v4: uuidv4 } = require('uuid')
const { createHash } = require('crypto') 
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {

    registerForm: (req, res) => {
        res.render('users/register')
    },

    loginForm: (req, res) => {
        res.render('users/login')
    },

    registerUser: async (req, res) => {
        // validate first & last name
        if (!req.body.first_name || !req.body.last_name) {
            res.redirect('/users/register')
            return
        }

        // ensure password and confirm password matches
        if (req.body.password !== req.body.password_confirm) {
            res.redirect('/users/register')
            return
        }

        // ensure that there is no existing user account with the same email given
        let user = null
        try {
            user = await userModel.findOne({ email: req.body.email })
        } catch (err) {
            console.log(err)
            res.redirect('/users/register')
            return
        }
        if (user) {
            res.redirect('/users/register')
            return
        }

        const timestampNow = moment().utc()

        // ================================================
        // SHA256 Hashing METHOD
        // ================================================
        // const salt = uuidv4()
        // const saltedPassword = salt + req.body.password
        // const hashInstance = createHash('sha256')
        // hashInstance.update(saltedPassword)

        // ================================================
        // bcrypt Hashing METHOD
        // ================================================
        const generatedHash = await bcrypt.hash(req.body.password, saltRounds)

        try {
            await userModel.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                // pwsalt: salt, --> no need if using bcrypt
                // hash: hashInstance.digest('hex'), ---> SHA256 method
                hash: generatedHash, // ---> bcrypt method
                created_at: timestampNow,
                updated_at: timestampNow,
            })
        } catch(err) {
            console.log(err)
            res.redirect('/users/register')
            return
        }
        
        res.redirect('/products')
    },

    loginUser: async (req, res) => {
        
        let user = null

        try {
            user = await userModel.findOne({ email: req.body.email })
        } catch(err) {
            console.log(err)
            res.redirect('/users/register')
            return
        }

        if (!user) {
            res.redirect('/users/register')
            return
        }

        // ================================================
        // SHA256 METHOD
        // ================================================
        // try to check if given password is correct
        // const saltedPassword = user.pwsalt + req.body.password
        // const hashInstance = createHash('sha256')
        // hashInstance.update(saltedPassword)
        // const hashedPassword = hashInstance.digest('hex')

        // compare hashed passwords against hash in db
        // if (hashedPassword !== user.hash) {
        //     res.redirect('/users/register')
        //     return
        // }

        // ================================================
        // bcrypt METHOD
        // ================================================
        const isValidPassword = await bcrypt.compare(req.body.password, user.hash)
        if (!isValidPassword) {
            res.redirect('/users/register')
            return
        }

        req.session.user = user
        res.redirect('/users/account')
    },

    account: (req, res) => {
        res.render('users/account')
    },

    logout: (req, res) => {
        req.session.destroy()
        res.redirect('/products')
    }

}

// addresses: {
//     addr_line_1: req.body.addr_line_1,
//     addr_line_2: req.body.addr_line_2,
//     unit: req.body.unit,
//     postal: req.body.postal,
//     city: req.body.city,
//     state: req.body.state,
//     country: req.body.country
// },
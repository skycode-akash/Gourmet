const { request } = require('express')
const User = require('../../models/user')
const bcrypt = require('bcrypt')

function authController() {
    return {
        login(req, res) {
            res.render('auth/login')
        },
        register(req, res) {
            res.render('auth/register')
        },
        async postRegister(req, res) {
            const { name, email, password } = req.body

            // validate request
            if(!name || !email || !password) {
                req.flash('error', 'All fields are required')
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect('/register')
            }

            //chech if email exists
            User.exists({ email: email }, (err, result) => {
                if(result) {
                req.flash('error', 'Email already registerd!')
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect('/register')
                }
            })

            //hash password
            const hashedPassword = await bcrypt.hash(password, 10)

            //create user
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword
            })

            user.save().then((user) => {
                // login
                return res.redirect('/')
            }).catch(err => {
                req.flash('error', 'something went wrong!')
                return res.redirect('/register')
            })

            console.log(req.body)
        }
    }
}

module.exports = authController
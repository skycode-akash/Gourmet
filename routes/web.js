const authController = require('../app/http/controllers/authController')
const homeController = require('../app/http/controllers/homeController')
const cartController = require('../app/http/controllers/customers/cartController')

function initRoutes(app) {

    app.get('/', homeController().index)
    // (req, res) => {
    //     res.render('home')
    // }

    app.get('/cart', cartController().index)
    // (req, res) => {
    //     res.render('customers/cart')
    // }
    
    app.get('/login', authController().login)
    // (req, res) => {
    //     res.render('auth/login')
    // }
    
    app.get('/register', authController().register)
    // (req, res) => {
    //     res.render('auth/register')
    // }
}

module.exports = initRoutes
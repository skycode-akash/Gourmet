const authController = require('../app/http/controllers/authController')
const homeController = require('../app/http/controllers/homeController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const AdminOrderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/statusController')

// middlewares
const auth = require('../app/http/middlewares/auth')
const guest = require('../app/http/middlewares/guest')
const admin = require('../app/http/middlewares/admin')



function initRoutes(app) {

    app.get('/', homeController().index)
    // (req, res) => {
    //     res.render('home')
    // }

    app.get('/cart', cartController().index)
    // (req, res) => {
    //     res.render('customers/cart')
    // }
    
    app.get('/login', guest, authController().login)
    // (req, res) => {
    //     res.render('auth/login')
    // }
    
    app.get('/register', guest, authController().register)
    // (req, res) => {
    //     res.render('auth/register')
    // }

    app.post('/update-cart', cartController().update)
    app.post('/register', authController().postRegister)
    app.post('/login', authController().postLogin)
    app.post('/logout', authController().logout)

    // customer route
    app.post('/orders', auth, orderController().store)
    app.get('/customer/orders', auth, orderController().index)
    app.get('/customer/orders/:id', auth, orderController().show)

    // Admin routes
    app.get('/admin/orders', admin, AdminOrderController().index)
    app.post('/admin/order/status', admin, statusController().update)
    
}

module.exports = initRoutes
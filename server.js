require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')


// mongoose.connect('mongodb://127.0.0.1/Gourmet');
// const connection = mongoose.connection;

// mongoose.connection.once('open',() => {
//     console.log("Database connected");
// })


//thapa 
// mongoose.connect("mongodb://127.0.0.1/Gourmet", {
//     useNewUrlParser: true, useUnifiedTopology: true})
// .then( () => console.log("connection successful..."))
// .catch((err) => console.log(err));
// const connection = mongoose.connection;


//stackoverflow
// mongoose.connect('mongodb://localhost/Gourmet', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
//     console.log("Connected to Database...");
// }).catch((err) => {
//     console.log("Not Connected to Database ERROR! ", err);
// });


//database connection
// const url = 'mongodb://localhost/Gourmet'
mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('database connected...');
})
// .catch(err => {
//     console.log('connection failed...')
// })

// const url = 'mongodb://localhost/Gourmet'
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true});
// const connection = mongoose.connection;
// connection.once('open', () => {
// console.log('database connected...');
// })



//check conn
require('./server.js'); // which executes 'mongoose.connect()'
console.log(mongoose.connection.readyState);


//session store
// let mongoStore = new MongoDbStore({
//     mongooseConnection: connection,
//     collection: 'sessions'
// })


//session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDbStore.create({
        mongoUrl: process.env.MONGO_CONNECTION_URL
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } //24hr
}))

app.use(flash())


// Assets
app.use(express.static('public'))
app.use(express.json())

// set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)

app.listen(PORT, () => {
    console.log(`Listing on port ${PORT}`)
})

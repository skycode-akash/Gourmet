const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000
// const mongoose = require('mongoose')


//thapa 
// mongoose.connect("mongodb://localhost:2017/Gourmet", {
//     useNewUrlParser: true, useUnifiedTopology: true 
// }) 
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
// const url = 'mongodb://localhost:27017/Gourmet'
// mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true});
// const connection = mongoose.connection;
// connection.once('open', () => {
// console.log('database connected...');
// }).catch(err => {
//     console.log('connection failed...');
// })


//check conn
// require('./server.js'); // which executes 'mongoose.connect()'
// console.log(mongoose.connection.readyState);


// Assets
app.use(express.static('public'))

// set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)

app.listen(PORT, () => {
    console.log(`Listing on port ${PORT}`)
})

const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')

//database connection
const url = 'mongodb://localhost:27017/Gourmet'
// mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true});
// const connection = mongoose.connection;
// mongoose.connection.once('open', () => {
// console.log('database connected...');
// }).catch(err => {
//     console.log('connection failed...');
// })

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

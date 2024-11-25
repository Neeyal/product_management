const express = require('express')
const productRoutes = require('./src/routes/product-routes')
const sequelize = require('./database')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors('*'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api', productRoutes)

// Export the app instance for testing
module.exports = app

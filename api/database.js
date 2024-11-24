const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('product_management', 'root', 'Neil@3210987', {
  host: 'localhost',
  dialect: 'mysql',
})

sequelize
  .authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error: ' + err))

module.exports = sequelize

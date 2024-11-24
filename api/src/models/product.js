const { DataTypes } = require('sequelize')
const sequelize = require('../../database')

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  imagePath: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}
, {
    timestamps: false, // Disable Sequelize's default timestamps
    tableName: 'products', // Ensure this matches your DB table name
})

module.exports = Product

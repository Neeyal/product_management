import { DataTypes } from 'sequelize'
import sequelize from '../../database.js'

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  imagePaths: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'products',
})

export default Product

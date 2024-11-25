const Product = require('../models/product')
const { Op } = require('sequelize')

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const { name, price } = req.body
    console.log(req.file)
    const image = req.file?.filename

    if (!name || !price || !image) {
      return res.status(400).json({ message: 'Invalid input' })
    }

    const product = await Product.create({ name, price, imagePath: `uploads/${image}` })
    res.status(201).json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Fetch Products
exports.getProducts = async (req, res) => {
  try {
    const { search, startDate, endDate, sort, page = 1, limit = 10 } = req.query

    const where = {}

    if (search) where.name = { [Op.like]: `%${search}%` }
    if (startDate && endDate)
      where.createdAt = { [Op.between]: [startDate, endDate] }

    const products = await Product.findAll({
      where,
      order: [['createdAt', sort || 'DESC']],
      limit,
      offset: (page - 1) * limit,
    })

    const count = await Product.count({ where })
    res.json({ products, total: count })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { name, price } = req.body

    const product = await Product.findByPk(id)

    if (!product) return res.status(404).json({ message: 'Product not found' })

    if (req.file) product.imagePath = req.file.path
    if (name) product.name = name
    if (price) product.price = price

    await product.save()
    res.json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

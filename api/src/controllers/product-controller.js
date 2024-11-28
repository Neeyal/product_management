import Product from '../models/product.js'
import { Op } from 'sequelize'
import { startOfDay, endOfDay, parseISO, isBefore } from 'date-fns'

export const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body
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

export const getProducts = async (req, res) => {
  try {
    const { search, startDate, endDate, order = 'DESC', page = 1 } = req.query
    const where = {}

    let start = null
    let end = null
    if (startDate) {
      start = startOfDay(parseISO(startDate))
    }
    if (endDate) {
      end = endOfDay(parseISO(endDate))
    }

    if (start && end && isBefore(end, start)) {
      return res.status(400).json({
        error: 'Invalid date range: endDate cannot be earlier than startDate'
      })
    }

    if (search) where.name = { [Op.like]: `%${search}%` }

    if (start && end) {
      where.createdAt = { [Op.between]: [start, end] }
    } else if (start) {
      where.createdAt = { [Op.gte]: start }
    } else if (end) {
      where.createdAt = { [Op.lte]: end }
    }

    const limit = 10
    const offset = (page - 1) * limit

    const { rows: products, count: total } = await Product.findAndCountAll({
      where,
      order: [['createdAt', order]],
      limit,
      offset,
    })

    res.json({ products, total, totalPages: Math.ceil(total / limit) })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { name, price } = req.body

    const product = await Product.findByPk(id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    if (req.file) {
      product.imagePath = req.file.path
    }
    if (name) {
      product.name = name
    }
    if (price) {
      product.price = price
    }

    await product.save()
    res.json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

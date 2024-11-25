const request = require('supertest')
const fs = require('fs')
const app = require('../../app')
const sequelize = require('../../database') // Import your Sequelize instance
const Product = require('../../src/models/product') // Adjust path to your Product model
const path = require('path')

describe('Product API Tests', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }) // Ensure a clean database before tests
  })

  afterAll(async () => {
    await sequelize.close() // Close the database connection
  })

  it('should fetch all products', async () => {
    // Seed the database with a test product
    await Product.create({
      name: 'Sample Product',
      price: 19.99,
      imagePath: 'uploads/sample-product.jpg', // Simulate an uploaded image
    })

    const res = await request(app).get('/api/products')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('products')
    expect(Array.isArray(res.body.products)).toBe(true)
    expect(res.body.products.length).toBeGreaterThan(0)
    expect(res.body.products[0]).toHaveProperty('name', 'Sample Product')
  })

  it('should create a product', async () => {
    const imagePath = path.join(__dirname, './fixtures/test-image.jpg')

    // Ensure the file exists
    if (!fs.existsSync(imagePath)) {
      throw new Error('Test image file not found at path: ' + imagePath)
    }

    const res = await request(app)
      .post('/api/products')
      .field('name', 'Test Product')
      .field('price', '10.99')
      .attach('image', imagePath) // Use a valid test image path

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('name', 'Test Product')
    expect(res.body).toHaveProperty('price', '10.99')
    expect(res.body).toHaveProperty('imagePath') // Ensure image path exists
    expect(res.body.imagePath).toMatch(/^uploads\//)
  })
  it('should return validation errors for invalid data', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({ name: '', price: '', image: null })

    expect(res.status).toBe(400)
    expect(res).toHaveProperty('text', '{\"message\":\"Invalid input\"}')
    })
})

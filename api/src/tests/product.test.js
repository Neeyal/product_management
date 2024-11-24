const { Product } = require('../models/product') // Assuming you have a 'Product' model
const { addProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/product-controller') // Replace with actual path

jest.mock('../models') // Mock the Product model

describe('Product API with Sequelize', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create a new product', async () => {
    const mockProduct = { name: 'Test Product', price: 100, imagePath: '/uploads/test.jpg' }
    Product.create.mockResolvedValueOnce({ id: 1, ...mockProduct }) // Mocking Sequelize's create method

    const result = await addProduct(mockProduct)
    expect(Product.create).toHaveBeenCalledWith(mockProduct)
    expect(result).toEqual({ id: 1, ...mockProduct })
  })

  it('should fetch a list of products', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', price: 100, imagePath: '/uploads/product1.jpg', createdAt: '2024-11-23' },
      { id: 2, name: 'Product 2', price: 200, imagePath: '/uploads/product2.jpg', createdAt: '2024-11-22' },
    ]
    Product.findAll.mockResolvedValueOnce(mockProducts) // Mocking Sequelize's findAll method

    const result = await getProducts()
    expect(Product.findAll).toHaveBeenCalledWith({
      order: [['createdAt', 'DESC']], // Ordering by creation date
    })
    expect(result).toEqual(mockProducts)
  })

  it('should update a product', async () => {
    const updatedProduct = { id: 1, name: 'Updated Product', price: 150 }
    Product.update.mockResolvedValueOnce([1]) // Mocking Sequelize's update method, which returns an array with affected rows

    const result = await updateProduct(updatedProduct.id, updatedProduct)
    expect(Product.update).toHaveBeenCalledWith(updatedProduct, {
      where: { id: updatedProduct.id },
    })
    expect(result).toBe(true)
  })

  it('should delete a product', async () => {
    const productId = 1
    Product.destroy.mockResolvedValueOnce(1) // Mocking Sequelize's destroy method, which returns the number of deleted rows

    const result = await deleteProduct(productId)
    expect(Product.destroy).toHaveBeenCalledWith({
      where: { id: productId },
    })
    expect(result).toBe(true)
  })
})

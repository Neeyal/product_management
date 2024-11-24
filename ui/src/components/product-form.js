import React, { useState } from 'react'
import axios from 'axios'

const ProductForm = ({ onProductAdded }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', price)
    formData.append('image', image)

    await axios.post('http://localhost:3001/api/products', formData)
    onProductAdded()
    setName('')
    setPrice('')
    setImage(null)
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
      <button type="submit">Add Product</button>
    </form>
  )
}

export default ProductForm

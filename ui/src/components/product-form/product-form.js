import React, { useState, useRef } from 'react'
import axios from 'axios'

const ProductForm = ({ onProductAdded }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [images, setImages] = useState([])
  const fileInputRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', price)
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i])
    }

    await axios.post('http://localhost:3001/api/products', formData)
    onProductAdded()
    setName('')
    setPrice('')
    setImages([])

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files))
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
        min="1"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        multiple
        onChange={handleImageChange}
        required
      />
      <button type="submit">Add Product</button>
    </form>
  )
}

export default ProductForm

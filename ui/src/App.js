import React, { useState, useEffect } from 'react'
import ProductForm from './components/product-form/product-form.js'
import ProductList from './components/product-table/product-table.js'
import './index.css'

const App = () => {
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({ search: '', startDate: '', endDate: '', sort: 'asc', page: 1 })

  const fetchProducts = async () => {
    const query = new URLSearchParams(filters).toString()
    const response = await fetch(`http://localhost:3001/api/products?${query}`)
    const data = await response.json()
    setProducts(data.products)
  }

  useEffect(() => {
    fetchProducts()
  }, [filters])

  return (
    <div className="container">
      <h1>Product Management</h1>
      <ProductForm onProductAdded={fetchProducts} />
      <ProductList
        products={products}
        filters={filters}
        setFilters={setFilters}
        onProductUpdated={fetchProducts}
      />
    </div>
  )
}

export default App

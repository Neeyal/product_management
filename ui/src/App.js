import React, { useState, useEffect } from 'react'
import ProductForm from './components/product-form/product-form.js'
import ProductList from './components/product-table/product-table.js'
import FilterForm from './components/product-form/product-filter-form.js'
import './index.css'

const App = () => {
  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [filters, setFilters] = useState({ search: '', startDate: '', endDate: '', order: 'asc', page: 1 })

  const fetchProducts = async () => {
    const query = new URLSearchParams(filters).toString()
    const response = await fetch(`http://localhost:3001/api/products?${query}`)
    const data = await response.json()
    setProducts(data.products)
    setTotalPages(data.totalPages)
  }

  useEffect(() => {
    fetchProducts()
  }, [filters])

  return (
    <div className="container">
      <h1>Product Management</h1>
      <ProductForm onProductAdded={fetchProducts} />
      <FilterForm filters={filters} setFilters={setFilters} />
      <ProductList
        products={products}
        totalPages={totalPages}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  )
}

export default App

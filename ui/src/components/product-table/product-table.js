import React, { useState } from 'react'

const ProductList = ({ products, setProducts, onProductUpdated }) => {
  const [editingProduct, setEditingProduct] = useState(null)
  const [editedDetails, setEditedDetails] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [nameFilter, setNameFilter] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const itemsPerPage = 5 // Number of items to display per page

  // Filter products based on name and date range
  const filteredProducts = products.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(nameFilter.toLowerCase())
    const matchesDate =
      (!startDate || new Date(product.createdAt) >= new Date(startDate)) &&
      (!endDate || new Date(product.createdAt) <= new Date(endDate))
    return matchesName && matchesDate
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Handle editing a product
  const handleEditClick = (product) => {
    setEditingProduct(product)
    setEditedDetails({ ...product }) // Initialize the form with product details
  }

  // Save edited product
  const handleSaveClick = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedDetails),
      })
      if (response.ok) {
        // Refresh the product list after saving
        await onProductUpdated()
        setEditingProduct(null) // Exit editing mode
      } else {
        console.error('Failed to update product')
      }
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  // Cancel editing
  const handleCancelClick = () => {
    setEditingProduct(null)
    // Optionally, refresh the product list to ensure it shows the original values
    onProductUpdated()
  }

  // Change the current page
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  // Reset filters and pagination
  const resetFilters = () => {
    setNameFilter('')
    setStartDate('')
    setEndDate('')
    setCurrentPage(1)
  }

  return (
    <div className="product-list">
      {/* Filter Section */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={resetFilters}>Reset Filters</button>
      </div>

      {/* Product Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Creation Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product) => (
            <tr key={product.id}>
              {editingProduct?.id === product.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editedDetails.name}
                      onChange={(e) =>
                        setEditedDetails({ ...editedDetails, name: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <img
                      src={`http://localhost:3001/${product.imagePath}`}
                      alt={product.name}
                      style={{ width: 50, height: 50 }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editedDetails.price}
                      onChange={(e) =>
                        setEditedDetails({ ...editedDetails, price: +e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{product.name}</td>
                  <td>
                    <img
                      src={`http://localhost:3001/${product.imagePath}`}
                      alt={product.name}
                      style={{ width: 80, height: 80 }}
                    />
                  </td>
                  <td>${product.price}</td>
                  <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleEditClick(product)}>Edit</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ProductList

import React, { useState } from 'react'

const ProductList = ({ products, totalPages, filters, setFilters }) => {
  const [editingProduct, setEditingProduct] = useState(null)
  const [editedDetails, setEditedDetails] = useState({})
  const [editedImage, setEditedImage] = useState(null)
  const currentPage = filters.page || 1

  const handleEditClick = (product) => {
    setEditingProduct(product)
    setEditedDetails({ ...product })
    setEditedImage(null)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setEditedImage(file)
  }

  const handleSaveClick = async () => {
    try {
      const formData = new FormData()
      formData.append('name', editedDetails.name)
      formData.append('price', editedDetails.price)
      if (editedImage) {
        formData.append('image', editedImage)
      }

      const response = await fetch(`http://localhost:3001/api/products/${editingProduct.id}`, {
        method: 'PUT',
        body: formData
      })
      if (response.ok) {
        setFilters({ ...filters })
        setEditingProduct(null)
      } else {
        console.error('Failed to update product')
      }
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  const handleCancelClick = () => {
    setEditingProduct(null)
    setEditedImage(null)
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setFilters({ ...filters, page: newPage })
    }
  }

  const handleSortClick = () => {
    const newOrder = filters.order === 'asc' ? 'desc' : 'asc'
    setFilters({ ...filters, order: newOrder, page: 1 })
  }

  return (
    <div className="product-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>
              Creation Date
              <button onClick={handleSortClick}>
                Sort ({filters.order === 'asc' ? 'Desc' : 'Asc'})
              </button>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { products.map((product) => (
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
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {editedImage ? (
                      <img
                        src={URL.createObjectURL(editedImage)}
                        alt="Preview"
                        style={{ width: 50, height: 50 }}
                      />
                    ) : (
                      <img
                        src={`http://localhost:3001/${product.imagePath}`}
                        alt={product.name}
                        style={{ width: 50, height: 50 }}
                      />
                    )}
                  </td>
                  <td>
                    <input
                      type="number"
                      min="1"
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
                  <td>{product.price}</td>
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

import React, { useState } from 'react'

const ProductList = ({ products, totalPages, filters, setFilters }) => {
  const [editingProduct, setEditingProduct] = useState(null)
  const [editedDetails, setEditedDetails] = useState({})
  const [editedImages, setEditedImages] = useState([])
  const [removedImages, setRemovedImages] = useState([])
  const [imageError, setImageError] = useState('')
  const currentPage = filters.page || 1

  const handleEditClick = (product) => {
    setEditingProduct(product)
    setEditedDetails({ ...product })
    setEditedImages([])
    setRemovedImages([])
    setImageError('')
  }
  const handleDeleteClick = async(productId) => {
    try{
      const response = await fetch(`http://localhost:3001/api/products/${productId}`,{ method:'DELETE' })
    if(response.ok){
      setFilters({...filters})
    }
    }
    catch(error){
      console.log("unable to delete product")
    }
  }

  const handleImageChange = (e) => {
    setEditedImages(Array.from(e.target.files))
    setImageError('')
  }

  const handleRemoveImage = (imagePath) => {
    setRemovedImages([...removedImages, imagePath])
    setEditedDetails({
      ...editedDetails,
      imagePaths: editedDetails.imagePaths.filter(path => path !== imagePath),
    })
  }

  const handleSaveClick = async () => {
    const hasImages = editedDetails.imagePaths.length > 0 || editedImages.length > 0

    if (!hasImages) {
      setImageError('At least one image is required.')
      return
    }

    try {
      const formData = new FormData()
      formData.append('name', editedDetails.name)
      formData.append('price', editedDetails.price)

      for (let i = 0; i < editedImages.length; i++) {
        formData.append('images', editedImages[i])
      }

      formData.append('removeImages', JSON.stringify(removedImages))

      const response = await fetch(`http://localhost:3001/api/products/${editingProduct.id}`, {
        method: 'PUT',
        body: formData,
      })

      if (response.ok) {
        setFilters({ ...filters })
        setEditingProduct(null)
        setImageError('')
      } else {
        console.error('Failed to update product')
      }
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  const handleCancelClick = () => {
    setEditingProduct(null)
    setEditedImages([])
    setRemovedImages([])
    setImageError('')
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
            <th>Images</th>
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
          {products.map((product) => (
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
                    <input type="file" accept="image/*" multiple onChange={handleImageChange} />
                    {editedDetails.imagePaths.map((image, index) => (
                      <div key={index} style={{ position: 'relative', display: 'inline-block', margin: '5px' }}>
                        <img
                          src={`http://localhost:3001/${image}`}
                          alt={`Product Image ${index + 1}`}
                          style={{ width: 50, height: 50 }}
                        />
                        <button
                          onClick={() => handleRemoveImage(image)}
                          className='removeButton'
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {editedImages.map((image, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt="New Preview"
                        style={{ width: 50, height: 50, margin: '5px' }}
                      />
                    ))}
                    {imageError && <div style={{ color: 'red', marginTop: '5px' }}>{imageError}</div>}
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
                    {product.imagePaths.map((image, index) => (
                      <img
                        key={index}
                        src={`http://localhost:3001/${image}`}
                        alt={`Product Image ${index + 1}`}
                        style={{ width: 50, height: 50, margin: '5px' }}
                      />
                    ))}
                  </td>
                  <td>{product.price}</td>
                  <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleEditClick(product)}>Edit</button>
                    <button onClick={() => handleDeleteClick(product.id)}>Delete</button>
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

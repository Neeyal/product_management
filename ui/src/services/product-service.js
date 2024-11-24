import axios from 'axios'

const API_URL = 'http://localhost:3001/api/products'

export const fetchProducts = (params) =>
  axios.get(API_URL, { params }).then((res) => res.data)

export const createProduct = (data) =>
  axios.post(API_URL, data).then((res) => res.data)

export const updateProduct = (id, data) =>
  axios.put(`${API_URL}/${id}`, data).then((res) => res.data)

import express from 'express'
import productRoutes from './src/routes/product-routes.js'
import cors from 'cors'
import path from 'path'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors('*'))
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

app.use('/api', productRoutes)

export default app

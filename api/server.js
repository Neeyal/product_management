import app from './app.js'
import sequelize from './database.js'

const PORT = process.env.PORT || 3001

sequelize.sync({force: true}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
})

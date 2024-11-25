const app = require('./app')
const sequelize = require('./database')

const PORT = process.env.PORT || 3001

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
})

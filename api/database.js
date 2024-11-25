import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_MYSQL_NAME,
  process.env.DB_ROOTUSER,
  process.env.DB_PASSW0RD,
  {
    host: process.env.DB_HOSTED,
    dialect: 'mysql',
  }
)

sequelize
  .authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error: ' + err))

export default sequelize

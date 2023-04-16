require('dotenv').config()
const mysql = require('mysql2')
const { Sequelize } = require('sequelize')
const initModels = require('../models/init-models')

const token = process.env.SECRET
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_ROOT_PASSWORD
})

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_ROOT_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  logging: false
})

initModels(sequelize)
sequelize.sync()

module.exports.token = token
module.exports.connection = connection
module.exports.sequelize = sequelize

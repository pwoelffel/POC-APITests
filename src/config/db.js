require('dotenv').config()
const { Sequelize } = require('sequelize')
const initModels = require('../models/init-models')

const token = process.env.SECRET

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_ROOT_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  logging: false
})

initModels(sequelize)
sequelize.sync()

module.exports.token = token
module.exports.sequelize = sequelize

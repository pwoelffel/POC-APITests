require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const db = require('./config/db')

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(cors({
  origin: '*'
}))

app.use(bodyParser.json())

require('./routes/animal')(app, db)
require('./routes/users')(app, db)

app.get('/', (req, res) => {
  res.send('Hello World !')
})

app.all('*', function (req, res) {
  const msg = {
    msg: 'Not found'
  }
  res.status(404).json(msg)
})

module.exports = app

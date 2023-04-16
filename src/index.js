require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

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

require('./routes/animal')(app)
require('./routes/users')(app)

app.get('/', (req, res) => {
  res.send('Hello World !')
})

app.all('*', function (req, res) {
  const msg = {
    msg: 'Not found'
  }
  res.status(404).json(msg)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

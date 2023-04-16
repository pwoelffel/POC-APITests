const db = require('../config/db')

module.exports = function (app) {
  // Route to get the list of all users
  app.get('/users', async (req, res) => {
    const users = await db.sequelize.models.user.findAll()
    return res.status(200).json(users)
  })

  // Route to get a specific user
  app.get('/user/:id', async (req, res) => {
    const user = await db.sequelize.models.user.findOne({ where: { id: req.params.id } })
    return res.status(200).json(user)
  })

  // Route to get list of animals of the user
  app.get('/user/animals/:id', async (req, res) => {
    const animals = await db.sequelize.models.animal.findAll({ where: { owner_id: req.params.id } })
    return res.status(200).json(animals)
  })
}

const db = require('../config/db')

// TODO: separate queries as functions

module.exports = function (app) {
  // Route to get the list of all animal types
  app.get('/animal/types', async (req, res) => {
    const types = await db.sequelize.models.animal_type.findAll()
    return res.status(200).json(types)
  })

  // Route to get the list of all animal races
  app.get('/animals', async (req, res) => {
    const animals = await db.sequelize.models.animal.findAll()
    return res.status(200).json(animals)
  })

  // Route to get an animal by id
  app.get('/animal/:id', async (req, res) => {
    const animal = await db.sequelize.models.animal.findOne({ where: { id: req.params.id } })
    return res.status(200).json(animal)
  })

  // Route to get all animal in type
  app.get('/animal/type/:id', async (req, res) => {
    const animals = await db.sequelize.models.animal.findAll({ where: { type: req.params.id } })
    return res.status(200).json(animals)
  })
}

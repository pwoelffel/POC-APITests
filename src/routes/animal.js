module.exports = function (app, db) {
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
    if (!animal) { return res.status(204).json({ error: 'Animal not found' }) }

    return res.status(200).json(animal)
  })

  // Route to get all animal in type
  app.get('/animal/type/:id', async (req, res) => {
    const animals = await db.sequelize.models.animal.findAll({ where: { type: req.params.id } })
    return res.status(200).json(animals)
  })

  app.post('/animal', async (req, res) => {
    if(!await db.sequelize.models.animal_type.findOne({ where: { id: req.body.type } })) return res.status(400).json({ error: 'Type not found' })

    if(!await db.sequelize.models.user.findOne({ where: { id: req.body.owner_id } })) return res.status(400).json({ error: 'User not found' })

    const animal = await db.sequelize.models.animal.create(req.body)
    return res.status(201).json(animal)
  })

  app.put('/animal/:id', async (req, res) => {
    if (req.body.type) {
      if(!await db.sequelize.models.animal_type.findOne({ where: { id: req.body.type } })) return res.status(400).json({ error: 'Type not found' })
    }

    if (req.body.owner_id) {
      if(!await db.sequelize.models.user.findOne({ where: { id: req.body.owner_id } })) return res.status(400).json({ error: 'User not found' })
    }
    
    const animal = await db.sequelize.models.animal.update(req.body, { where: { id: req.params.id } })
    return res.status(200).json(animal)
  })

  app.delete('/animal/:id', async (req, res) => {
    const animal = await db.sequelize.models.animal.destroy({ where: { id: req.params.id } })
    return res.status(200).json(animal)
  })
}

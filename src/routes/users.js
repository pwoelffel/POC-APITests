module.exports = function (app, db) {
  // Route to get the list of all users
  app.get('/users', async (req, res) => {
    const users = await db.sequelize.models.user.findAll()
    return res.status(200).json(users)
  })

  // Route to get a specific user
  app.get('/user/:id', async (req, res) => {
    const user = await db.sequelize.models.user.findOne({ where: { id: req.params.id } })
    if (!user) { return res.status(204).json({ error: 'User not found' }) }

    return res.status(200).json(user)
  })

  // Route to get list of animals of the user
  app.get('/user/:id/animals', async (req, res) => {
    const animals = await db.sequelize.models.animal.findAll({ where: { owner_id: req.params.id } })
    return res.status(200).json(animals)
  })

  app.post('/user', async (req, res) => {
    const user = await db.sequelize.models.user.create(req.body)
    return res.status(201).json(user)
  })

  app.put('/user/:id', async (req, res) => {
    const user = await db.sequelize.models.user.update(req.body, { where: { id: req.params.id } })
    return res.status(200).json(user)
  })

  app.delete('/user/:id', async (req, res) => {
    const user = await db.sequelize.models.user.destroy({ where: { id: req.params.id } })
    return res.status(200).json(user)
  })
}

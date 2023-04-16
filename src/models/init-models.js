const DataTypes = require('sequelize').DataTypes
const _animal = require('./animal')
const _animal_type = require('./animal_type')
const _user = require('./user')

function initModels (sequelize) {
  const animal = _animal(sequelize, DataTypes)
  const animal_type = _animal_type(sequelize, DataTypes)
  const user = _user(sequelize, DataTypes)

  animal.belongsTo(animal_type, { as: 'type_animal_type', foreignKey: 'type' })
  animal_type.hasMany(animal, { as: 'animals', foreignKey: 'type' })
  animal.belongsTo(user, { as: 'owner', foreignKey: 'owner_id' })
  user.hasMany(animal, { as: 'animals', foreignKey: 'owner_id' })

  return {
    animal,
    animal_type,
    user
  }
}
module.exports = initModels
module.exports.initModels = initModels
module.exports.default = initModels

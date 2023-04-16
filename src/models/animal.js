const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('animal', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'animal_type',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'animal',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' }
        ]
      },
      {
        name: 'owner_id',
        using: 'BTREE',
        fields: [
          { name: 'owner_id' }
        ]
      },
      {
        name: 'type',
        using: 'BTREE',
        fields: [
          { name: 'type' }
        ]
      }
    ]
  })
}

'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class user extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         user.hasMany(models.Order, { foreignKey: 'client' });
         user.hasMany(models.Review, { foreignKey: 'client' });
      }
   }

   user.init({
      id: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
         primaryKey: true
      },
      firstName: {
         type: DataTypes.STRING(53),
         allowNull: false
      },
      lastName: {
         type: DataTypes.STRING(53),
         allowNull: false
      },
      privilege: {
         type: DataTypes.STRING(20),
         defaultValue: 'user',
         allowNull: false
      },
      username: {
         type: DataTypes.STRING(20),
         allowNull: false,
         unique: true
      },
      password: {
         type: DataTypes.STRING(100),
         allowNull: false
      },
      email: {
         type: DataTypes.STRING(324),
         allowNull: false,
         unique: true
      },
      phone: {
         type: DataTypes.STRING(25)
      }
   }, {
      sequelize,
      modelName: 'User',
      tableName: 'users'
   });

   return user;
};
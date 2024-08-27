'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class image extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
      }
   }

   image.init({
      id: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
         primaryKey: true
      },
      name: {
         type: DataTypes.STRING(200),
         allowNull: false,
         unique: true
      },
      description: {
         type: DataTypes.TEXT,
         allowNull: false
      },
      data: {
         type: DataTypes.BLOB,
         allowNull: false
      }
   }, {
      sequelize,
      modelName: 'Image',
      tableName: 'images'
   });
   
   return image;
};
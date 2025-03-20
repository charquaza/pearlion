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
         image.belongsTo(models.Product, { foreignKey: 'product' });
         image.belongsTo(models.Review, { foreignKey: 'review' });
      }
   }

   image.init({
      id: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
         primaryKey: true
      },
      product: {
         type: DataTypes.UUID,
         references: {
            model: 'products',
            key: 'id'
         },
         allowNull: true,
         onUpdate: 'CASCADE',
         onDelete: 'CASCADE'
      },
      review: {
         type: DataTypes.UUID,
         references: {
            model: 'reviews',
            key: 'id'
         },
         allowNull: true,
         onUpdate: 'CASCADE',
         onDelete: 'CASCADE'
      },
      name: {
         type: DataTypes.STRING(200),
         allowNull: false
      },
      description: {
         type: DataTypes.TEXT,
         allowNull: false
      },
      url: {
         type: DataTypes.TEXT,
         allowNull: false
      }
   }, {
      sequelize,
      modelName: 'Image',
      tableName: 'images'
   });
   
   return image;
};
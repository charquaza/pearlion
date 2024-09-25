'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class product extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         product.hasMany(models.Image, { foreignKey: 'product' });
         product.hasMany(models.Review, { foreignKey: 'product' });
         product.belongsToMany(models.Order, 
            { 
               through: models.Purchase, 
               foreignKey: 'product',
               otherKey: 'order',
               unique: false
            }
         );
      }
   }

   product.init({
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
      category: {
         type: DataTypes.STRING(100),
         allowNull: false
      },
      price: {
         type: DataTypes.BIGINT,
         allowNull: false
      },
      quantityInStock: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      status: {
         type: DataTypes.STRING(100),
         defaultValue: 'for sale',
         allowNull: false
      },
      reviewCount: {
         type: DataTypes.INTEGER,
         defaultValue: 0,
         allowNull: false
      },
      ratingSum: {
         type: DataTypes.INTEGER,
         defaultValue: 0,
         allowNull: false
      }
   }, {
      sequelize,
      modelName: 'Product',
      tableName: 'products'
   });
   
   return product;
};
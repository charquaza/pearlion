'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class review extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         review.hasMany(models.Image, { foreignKey: 'review' });
         review.belongsTo(models.User, { foreignKey: 'client' });
         review.belongsTo(models.Product, { foreignKey: 'product' });
      }
   }
   
   review.init({
      id: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
         primaryKey: true
      },
      client: {
         type: DataTypes.UUID,
         references: {
            model: 'users',
            key: 'id'
         },
         allowNull: false,
         onUpdate: 'CASCADE',
         onDelete: 'CASCADE'
      },
      product: {
         type: DataTypes.UUID,
         references: {
            model: 'products',
            key: 'id'
         },
         allowNull: false,
         onUpdate: 'CASCADE',
         onDelete: 'CASCADE'
      },
      rating: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      review: {
         type: DataTypes.TEXT,
         allowNull: false
      }
   }, {
      sequelize,
      modelName: 'Review',
      tableName: 'reviews'
   });

   return review;
};
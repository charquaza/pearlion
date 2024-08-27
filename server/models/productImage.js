'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class productImage extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
      }
   }
   
   productImage.init({
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
         allowNull: false,
         onUpdate: 'CASCADE',
         onDelete: 'CASCADE'
      },
      image: {
         type: DataTypes.UUID,
         references: {
            model: 'images',
            key: 'id'
         },
         allowNull: false,
         onUpdate: 'CASCADE',
         onDelete: 'CASCADE'
      }
   }, {
      sequelize,
      modelName: 'ProductImage',
      tableName: 'product_images'
   });

   return productImage;
};
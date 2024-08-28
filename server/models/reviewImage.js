'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class reviewImage extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
      }
   }
   
   reviewImage.init({
      id: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
         primaryKey: true
      },
      review: {
         type: DataTypes.UUID,
         references: {
            model: 'reviews',
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
      modelName: 'reviewImage',
      tableName: 'review_images'
   });

   return reviewImage;
};
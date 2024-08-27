'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class purchase extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
      }
   }
   
   purchase.init({
      id: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
         primaryKey: true
      },
      order: {
         type: DataTypes.UUID,
         references: {
            model: 'orders',
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
         onDelete: 'RESTRICT'
      },
      unitPrice: {
         type: DataTypes.BIGINT,
         allowNull: false
      },
      quantityPurchased: {
         type: DataTypes.INTEGER,
         allowNull: false
      }
   }, {
      sequelize,
      modelName: 'Purchase',
      tableName: 'purchases'
   });

   return purchase;
};
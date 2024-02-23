'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class order extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
      }
   }

   order.init({
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
         onDelete: 'RESTRICT'
      },
      purchaseDate: {
         type: DataTypes.DATE,
         allowNull: false
      },
      shippingCost: {
         type: DataTypes.BIGINT,
         allowNull: false
      },
      tax: {
         type: DataTypes.BIGINT,
         allowNull: false
      },
      purchaseTotal: {
         type: DataTypes.BIGINT,
         allowNull: false
      },
      fulfillmentStatus: {
         type: DataTypes.STRING(100),
         allowNull: false
      },
      deliveryDate: {
         type: DataTypes.DATE
      },
      returnStatus: {
         type: DataTypes.STRING(100)
      }
   }, {
      sequelize,
      modelName: 'Order',
      tableName: 'orders'
   });
   
   return order;
};
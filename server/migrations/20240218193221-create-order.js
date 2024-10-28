'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('orders', {
         id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
         },
         paymentApiId: {
            type: Sequelize.STRING(50),
            unique: true
         },   
         client: {
            type: Sequelize.UUID,
            references: {
               model: 'users',
               key: 'id'
            },
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
         },
         purchaseDate: {
            type: Sequelize.DATE,
            allowNull: false
         },
         shippingCost: {
            type: Sequelize.BIGINT,
            allowNull: false
         },
         tax: {
            type: Sequelize.BIGINT,
            allowNull: false
         },
         fulfillmentStatus: {
            type: Sequelize.STRING(100),
            allowNull: false
         },
         deliveryDate: {
            type: Sequelize.DATE
         },
         returnStatus: {
            type: Sequelize.STRING(100)
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
         }
      });
   },
   
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable('orders');
   }
};
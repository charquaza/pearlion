'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('purchases', {
         id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
         },
         order: {
            type: Sequelize.UUID,
            references: {
               model: 'orders',
               key: 'id'
            },
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
         },
         product: {
            type: Sequelize.UUID,
            references: {
               model: 'products',
               key: 'id'
            },
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
         },
         quantityPurchased: {
            type: Sequelize.INTEGER,
            allowNull: false
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
      await queryInterface.dropTable('purchases');
   }
};
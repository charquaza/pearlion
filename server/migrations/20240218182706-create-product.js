'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('products', {
         id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
         },
         name: {
            type: Sequelize.STRING(200),
            allowNull: false,
            unique: true
         },
         description: {
            type: Sequelize.TEXT,
            allowNull: false
         },
         category: {
            type: Sequelize.STRING(100),
            allowNull: false
         },   
         price: {
            type: Sequelize.BIGINT,
            allowNull: false
         },
         quantityInStock: {
            type: Sequelize.INTEGER,
            allowNull: false
         },
         status: {
            type: Sequelize.STRING(100),
            defaultValue: 'for sale',
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
      await queryInterface.dropTable('products');
   }
};
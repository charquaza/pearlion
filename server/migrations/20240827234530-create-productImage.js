'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('product_images', {
         id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
         },
         product: {
            type: Sequelize.UUID,
            references: {
               model: 'products',
               key: 'id'
            },
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
         },
         image: {
            type: Sequelize.UUID,
            references: {
               model: 'images',
               key: 'id'
            },
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
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
      await queryInterface.dropTable('product_images');
   }
};
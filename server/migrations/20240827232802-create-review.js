'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('reviews', {
         id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
         },
         client: {
            type: Sequelize.UUID,
            references: {
               model: 'users',
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
            onDelete: 'CASCADE'
         },
         rating: {
            type: Sequelize.INTEGER,
            allowNull: false
         },
         review: {
            type: Sequelize.TEXT,
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
      await queryInterface.dropTable('reviews');
   }
};
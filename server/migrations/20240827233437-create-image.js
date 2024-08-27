'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('images', {
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
         data: {
            type: Sequelize.BLOB,
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
      await queryInterface.dropTable('images');
   }
};
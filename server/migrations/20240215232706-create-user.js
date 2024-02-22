'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('users', {
         id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
         },
         firstName: {
            type: Sequelize.STRING(53),
            allowNull: false
         },
         lastName: {
            type: Sequelize.STRING(53),
            allowNull: false
         },
         privilege: {
            type: Sequelize.STRING(20),
            defaultValue: 'user',
            allowNull: false
         },
         username: {
            type: Sequelize.STRING(20),
            allowNull: false,
            unique: true
         },
         password: {
            type: Sequelize.STRING(100),
            allowNull: false
         },
         email: {
            type: Sequelize.STRING(324),
            allowNull: false,
            unique: true
         },
         phone: {
            type: Sequelize.STRING(25)
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
      await queryInterface.dropTable('users');
   }
};
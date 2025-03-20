'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('images', 'url', {
      type: Sequelize.TEXT,
      allowNull: false
    });

    await queryInterface.removeColumn('images', 'data');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('images', 'url');

    await queryInterface.addColumn('images', 'data', {
      type: Sequelize.BLOB,
      allowNull: false
    });
  }
};

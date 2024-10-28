'use strict';

const bcrypt = require('bcryptjs');
const User = require('../models/index').User;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        firstName: 'Admin',
        lastName: 'Admin',
        privilege: 'admin',
        username: 'admin',
        password: await bcrypt.hash('adminPass', 10),
        email: 'admin@email.com'
      },
      {
        firstName: 'Test',
        lastName: 'User',
        privilege: 'user',
        username: 'testuser1',
        password: await bcrypt.hash('userPass', 10),
        email: 'testuser1@email.com'
      },
      {
        firstName: 'Guest',
        lastName: 'User',
        privilege: 'user',
        username: 'guestuser1',
        password: await bcrypt.hash('guest', 10),
        email: 'guestuser1@email.com'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { 
      username: ['admin', 'testuser1', 'guestuser1'] 
    });
  }
};
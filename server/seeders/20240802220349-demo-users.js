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
        password: await bcrypt.hash(process.env.ADMIN_PSWD, 10),
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
      },
      {
        firstName: 'Betty',
        lastName: 'Baggins',
        privilege: 'user',
        username: 'bbaggins',
        password: await bcrypt.hash('userPass', 10),
        email: 'bbaggins@email.com'
      },
      {
        firstName: 'Bo',
        lastName: 'Walker',
        privilege: 'user',
        username: 'bwalker',
        password: await bcrypt.hash('userPass', 10),
        email: 'bwalker@email.com'
      },
      {
        firstName: 'George',
        lastName: 'Curious',
        privilege: 'user',
        username: 'gcurious',
        password: await bcrypt.hash('userPass', 10),
        email: 'gcurious@email.com'
      },
      {
        firstName: 'Jon',
        lastName: 'Doe',
        privilege: 'user',
        username: 'jdoe',
        password: await bcrypt.hash('userPass', 10),
        email: 'jdoe@email.com'
      },
      {
        firstName: 'Norwood',
        lastName: 'Price',
        privilege: 'user',
        username: 'nprice',
        password: await bcrypt.hash('userPass', 10),
        email: 'nprice@email.com'
      },
      {
        firstName: 'Mary',
        lastName: 'Jane',
        privilege: 'user',
        username: 'mjane',
        password: await bcrypt.hash('userPass', 10),
        email: 'mjane@email.com'
      },
      {
        firstName: 'Nancy',
        lastName: 'Kim',
        privilege: 'user',
        username: 'nkim',
        password: await bcrypt.hash('userPass', 10),
        email: 'nkim@email.com'
      },
      {
        firstName: 'Carla',
        lastName: 'Carter',
        privilege: 'user',
        username: 'ccarter',
        password: await bcrypt.hash('userPass', 10),
        email: 'ccarter@email.com'
      },
      {
        firstName: 'Sara',
        lastName: 'Rodriguez',
        privilege: 'user',
        username: 'srodriguez',
        password: await bcrypt.hash('userPass', 10),
        email: 'srodriguez@email.com'
      },
      {
        firstName: 'Katy',
        lastName: 'Gold',
        privilege: 'user',
        username: 'kgold',
        password: await bcrypt.hash('userPass', 10),
        email: 'kgold@email.com'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { 
      username: [
        'admin', 'testuser1', 'guestuser1', 'bbaggins', 'bwalker', 'gcurious', 
        'jdoe', 'nprice', 'mjane', 'nkim', 'ccarter', 'srodriguez', 'kgold'
      ]
    });
  }
};
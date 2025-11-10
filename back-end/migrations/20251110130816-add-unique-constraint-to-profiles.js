'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addConstraint('Profiles', {
      fields: ['userId'],
      type: 'unique',
      name: 'unique_userId_constraint'
    });
    
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Profiles', 'unique_userId_constraint');
  }
};

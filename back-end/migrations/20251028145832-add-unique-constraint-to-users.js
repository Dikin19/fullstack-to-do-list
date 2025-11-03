'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

  
    await queryInterface.addConstraint(
      'Users', 
      {
      fields: ['email'],
      type: 'unique',
      name: 'unique_email_constraint'
      }
  );

    
  //   await queryInterface.addConstraint('Users', {
  //     fields: ['username'],
  //     type: 'unique',
  //     name: 'unique_username_constraint'
  //   });
  },

  async down(queryInterface, Sequelize) {
    // Hapus constraint saat rollback
    await queryInterface.removeConstraint('Users', 'unique_email_constraint');
    // await queryInterface.removeConstraint('Users', 'unique_username_constraint');
  }
};

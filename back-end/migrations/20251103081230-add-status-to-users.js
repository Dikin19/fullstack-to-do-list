'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addColumn('Users', 'status', {

      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'customer'

    });

  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.removeColumn('Users', 'status')

  }
};

// npx sequelize db:migrate
// migration untuk manipulasi database kalo model untuk manipulasi logic data

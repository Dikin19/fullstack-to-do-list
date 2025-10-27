'use strict';
const fs = require ('fs').promises

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface, Sequelize) {

    let dataTodo = await fs.readFile("./data/todo.json", "utf-8")
    dataTodo = JSON.parse(dataTodo)
    
    dataTodo.forEach(el => {
      delete el.id
      el.createdAt = new Date ()
      el.updatedAt = new Date ()
    });

    await queryInterface.bulkInsert('Todos', dataTodo,{});

  },


   async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Todos', null, {
      restartIdentity: true,
      cascade: true,
      truncate: true
      });
 }
};
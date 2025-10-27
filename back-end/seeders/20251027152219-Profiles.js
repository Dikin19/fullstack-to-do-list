'use strict';

// | Cara                                             | Fungsi                                                                          | Hasil yang dikembalikan  | Kapan dipakai                                             |
// | ------------------------------------------------ | ------------------------------------------------------------------------------- | ------------------------ | --------------------------------------------------------- |
// | `require("../data/user.json")`                   | Node.js otomatis membaca file dan langsung mengubah JSON jadi JavaScript Object | Langsung Object/Array    | Kalau file JSON **lokal dan statis**                      |
// | `await fs.readFile("./data/todo.json", "utf-8")` | Membaca isi file dalam bentuk **string**                                        | Masih berupa teks string | Kalau file diambil **asynchronously (pakai async/await)** |


const fs = require ('fs').promises

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface, Sequelize) {

    let dataProfile = await fs.readFile("./data/profile.json", "utf-8")
    dataProfile = JSON.parse(dataProfile)
    
    dataProfile.forEach(el => {
      delete el.id
      el.createdAt = new Date ()
      el.updatedAt = new Date ()
    });

    await queryInterface.bulkInsert('Profiles', dataProfile,{});

  },


  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Profiles', null, {
      restartIdentity: true,
      cascade: true,
      truncate: true
      });
 }

};
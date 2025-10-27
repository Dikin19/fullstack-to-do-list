'use strict'; // mdoe ketat = contoh tidak bisa pakai variabel tanpa let/const/var

/** @type {import('sequelize-cli').Migration} */
// Ini adalah komentar JSDoc yang membantu editor (seperti VS Code) mengenali bahwa ini file migration Sequelize.
// Dengan ini, kamu bisa dapat auto-completion dan hint saat menulis queryInterface.

const {hashPassword} = require('../helpers/bcrypt')


// Ini adalah struktur standar migration di Sequelize:
// up → dijalankan saat migration atau seeding dijalankan (misal: npx sequelize-cli db:seed:all)
// down → dijalankan saat rollback (misal: npx sequelize-cli db:seed:undo:all)
// Jadi:
// up() = menambah data ke DB
// down() = menghapus data dari DB

module.exports = {
  async up (queryInterface, Sequelize) {

    const dataUser = require("../data/user.json").map(el =>{

      delete el.id

      el.createdAt = el.updatedAt = new Date()
      el.password = hashPassword(el.password)
      return el;

    })

    // ni perintah untuk memasukkan banyak data sekaligus (bulk insert)
    // ke tabel Users di database.
    await queryInterface.bulkInsert('Users', dataUser)

  },


// Ini bagian rollback, dipakai kalau kamu ingin membatalkan seeding.
// Penjelasannya:
// 'Users' → nama tabel yang ingin dihapus datanya
// null → hapus semua baris
// { restartIdentity: true } → reset auto-increment id ke 1 lagi
// { cascade: true } → kalau ada relasi foreign key, hapus juga yang terkait
// { truncate: true } → hapus semua baris dengan cara cepat (TRUNCATE TABLE Users)
  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Users', null, {

      restartIdentity: true,
      cascade: true,
      truncate: true

     });
  }
};

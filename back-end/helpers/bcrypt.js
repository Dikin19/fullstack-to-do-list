const bcrypt = require('bcrypt');

const hashPassword = (password) => {

    // “Salt” itu seperti bumbu rahasia acak yang ditambahkan ke password biar makin susah ditebak.
    // 10 itu untuk mengacak semakin tinggi semakin bagus keamanan tapi lebih lama prosesnya.
    const salt = bcrypt.genSaltSync(10)

    // 12345 + hY7f!kP
    return bcrypt.hashSync(password, salt)

    // Gabungkan password + salt.
    // Jalankan algoritma enkripsi Blowfish (dalam mode bcrypt).
    // Ulangi proses itu 2¹⁰ kali (1024 kali).
    // Hasil akhirnya diubah jadi kode teks yang terlihat seperti ini:
    // hasil = $2b$10$XWxCw4vGtd.x94oJq2V9qOjxqZz63P4Rrlzp.RhrEwY8XlthWxkzO

    // Blowfish adalah algoritma enkripsi (penyandian data).
    // Artinya: dia dipakai untuk mengubah teks biasa (seperti password) 
    // menjadi teks acak yang tidak bisa dibaca manusia.

}


const comparePassword = (password, hashedPassword) => {

    // password baru yang diketik dan dilakukan hashpassword yang sama seperti saat register
    // lalu dibandingkan dengan hashedPassword yang ada didatabase.

    return bcrypt.compareSync(password, hashedPassword)

}


module.exports = {

    hashPassword,
    comparePassword

}
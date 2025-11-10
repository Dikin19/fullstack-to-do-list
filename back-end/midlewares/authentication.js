const { verifyToken } = require('../helpers/jwt')
const {User} = require('../models')


module.exports = async function authentication(req, res, next) {
    try {

        const authHeader = req.headers.authorization

        if (!authHeader) throw({ name: "Unauthorized", message: "Authentication required" })
        console.log('req header: ',authHeader);

        // ambil kata setelah bearer atau index ke 7 yaitu huruf awal token yg akan menjadi token
        // jika tidak ada bearer gunakan autheader apa adaanya.
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader
        
        if (!token) throw({name: "Unauthorized", message: "Authentication required" })
        console.log('token setelah autheader menjadi token: ',token);

    // menampilkan hasil verfytoken yg berbentuk id dan iat
        const payload = verifyToken(token)
        console.log('ini isi payload', payload);

        const user = await User.findByPk(payload.id)
        // console.log('apakah data user dari payload masuk? :',user);
        console.log('apakah data user dari payload masuk? :',user.dataValues);
        if (!user) throw({name: 'InvalidToken', message: "Invalid Token"})

        req.user = user
        // method bawaan sequelize untuk mengambil dataValues
        console.log('req.user sekarang:', req.user.get());
        next()

    } catch (err) {
        next(err)
    }
}


// | Kondisi                     | Error Name            | Pesan                       | Sumber                               |
// | --------------------------- | --------------------- | --------------------------- | ------------------------------------ |
// | Tidak kirim token           | `"Unauthorized"`      | `"Authentication required"` | kamu buat di `authentication.js`     |
// | Token rusak/expired         | `"InvalidToken"`      | `"Invalid token"`           | kamu buat di `verifyToken()`         |
// | Token format salah dari JWT | `"JsonWebTokenError"` | `"jwt malformed"`           | otomatis dari library `jsonwebtoken` |
// iat itu singkatan dari "Issued At", yaitu waktu (dalam satuan Unix timestamp) kapan token JWT kamu dibuat.

/* Penjelasan langkah-per-langkah

1. verifyToken(token) — apa yang terjadi

verifyToken adalah fungsi pembungkus yang memanggil jwt.verify() dari library jsonwebtoken.
jwt.verify(token, JWT_SECRET) melakukan dua hal utama:

Memeriksa signature token menggunakan JWT_SECRET. Ini memastikan token memang ditandatangani oleh 
server yang punya secret yang sama.
Mendekode (decode) payload dari token jika signature valid. Hasilnya adalah objek JavaScript 
(biasanya disebut payload atau claims), misalnya { id: 3, iat: 1762163503 }.
Keluaran: jika token valid → verifyToken mengembalikan objek payload.
Jika token tidak valid/expired → jwt.verify melempar error (throw).

2. const payload = verifyToken(token) — sinkron atau asinkron?

jwt.verify() bisa dipanggil secara sinkron (mengembalikan nilai atau melempar error) seperti di kode kamu, atau 
dengan callback untuk versi asinkron.
Pada bentuk yang kamu gunakan (return jwt.verify(...)) fungsi itu sinkron: apabila token rusak atau kadaluarsa, 
fungsi akan langsung melempar error dan eksekusi akan lompat ke blok catch di middleware (jika ada).

3. req.user = payload — apa artinya dan fungsinya

Setelah token berhasil diverifikasi, payload (biasanya berisi identitas user, mis. id, role, dll.) disimpan ke req.user.
Menyimpan ke req.user membuat data user tersedia untuk middleware/handler berikutnya (controller, route, authorization middleware).
Contoh: req.user.id bisa dipakai untuk mengambil resource user atau melakukan pengecekan hak akses.

4. next() — lanjutkan eksekusi
next() memberi tahu Express untuk melanjutkan ke middleware/handler berikutnya.
Karena req.user sudah diisi, handler berikutnya bisa mengakses req.user.
Error yang mungkin terjadi dari jwt.verify

JsonWebTokenError → token tidak valid (mis. signature salah, malformed).
TokenExpiredError → token sudah kedaluwarsa.
NotBeforeError → token belum aktif (nbf claim).
Karena jwt.verify melempar error, sebaiknya pemanggilan dibungkus try/catch agar kamu bisa mengubah error 
menjadi bentuk yang konsisten untuk errorHandler (mis. { name: 'InvalidToken', message: 'Invalid token' }). */
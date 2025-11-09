const {User} = require('../models')

class UserController {

    static async findAllUsers(req, res, next){

        try {

            const data = await User.findAll({
                
                attributes: { exclude: ['password']}

            })

            res.status(200).json(data)
            
        } catch (err) {
            console.log(err, 'ini error');
            next(err)
        }


    }

    static async updateUserReturning(req, res, next){

        try {

            const user = await User.findByPk(req.params.id)
            // const {id} = req.params
            // const user = await User.findByPk(id)
            console.log(user, 'apakah data user masuk?');
            
            if (!user) throw({name: 'NotFound', message: 'User is not found'})

            const {username, email} = req.body

            const result = await User.update(

                {
                    username,
                    email
                },

                {
                    where : {
                        // id: user.id // where kita
                        id: req.params.id
                    },
                    returning: true
                    
                }
            )
            
            console.log(result[1][0], 'apa hasilya');
            res.status(200).json(result[1][0])

        } catch (err) {
            console.log(err, 'dari cacth');
            next(err)
            
        }

    }

    static async updateUser(req, res, next){

        try {

            const user = await User.findByPk(req.params.id)
            console.log(user, 'apakah data masuk?');

            if (!user) throw({name: 'NotFound', message: 'User is not found'})
            
            const {username, email} = req.body

            const updateSementara = await User.update(
                {
                    username,
                    email
                },
                {
                    where: {id: req.params.id}
                }
            )

            const updateResult = await User.findByPk(
                
                req.params.id,

                {
                    attributes: {exclude: ['password']}
                }
            )

            console.log(updateSementara, 'updateSementara');
            console.log(updateResult, 'updateBerhasil');

            res.status(200).json(updateResult)
            
            
            
        } catch (err) {
            next(err)
            
        }

    }

    static async updateUserByPatch(req, res, next){

        try {

            const {id} = req.params
            // const {id} = req.query

            const {username, email} = req.body

            const user = await User.findByPk(id)
            console.log(user, 'apakah data ini masuk');

            if (!user) throw({name: "NotFound", message: "User is not found "})
            
            const dataBaru = {}
            
            if (username) dataBaru.username = username
            if (email) dataBaru.email = email
            console.log(dataBaru, 'apakahh data baru masuk?');

            if (!dataBaru || Object.keys(dataBaru).length===0) 
                throw({name: "BadRequest", message: "There is no data to update"})

            // jika tanpa returning true hanya mengembalikan baris tanpa data yang sudah di update
            // const dataUpadate = await User.update(dataBaru, {where: {id}})
            // console.log("dataUpadate",dataUpadate);

            // Lakukan update ke database
            // returning: true artinya Sequelize akan langsung kasih balik data barunya
            const [jumlahBaris, barisYangSudahDiubah] = await User.update(
                dataBaru, 
                        {
                            where: { id },
                            returning: true, // agar dapat data hasil update
                        }
                    );
            
            console.log("jumlahBaris:", jumlahBaris);
            console.log("barisYangSudahDiubah", barisYangSudahDiubah)
            
//             Fungsi JSON.stringify() sebenarnya punya 3 parameter: JSON.stringify(value, replacer, space)
//             value → data yang mau diubah jadi string (di sini: barisYangSudahDiubah)
//             replacer → bisa digunakan untuk memilih properti mana yang mau disertakan (biasanya diisi null kalau mau semuanya)
//             space → jumlah spasi untuk membuat tampilan JSON lebih rapi (indentasi)
//             Jadi: JSON.stringify(barisYangSudahDiubah, null, 2)
//              artinya: "Ubah objek barisYangSudahDiubah menjadi string JSON dengan indentasi 2 spasi agar lebih mudah dibaca."
            console.log("barisYangSudahDiubah (raw):", JSON.stringify(barisYangSudahDiubah, null, 2) );

            console.log("userInstance:", barisYangSudahDiubah[0]);
            console.log("userInstance.dataValues:", barisYangSudahDiubah[0].dataValues); // cara pertama

            const userInstance = barisYangSudahDiubah[0];
            // ambil dataValues
            console.log("dataValues:", userInstance.dataValues); // cara kedua

            const {password, ...tanpaPassword} = userInstance.dataValues
            console.log("data yang ingin dihilangkan", password);
            console.log("data baru tanpa password", tanpaPassword);

            res.status(200).json({
                message: "Data user berhasil diubah",
                data: tanpaPassword
            })
            

            
        } catch (err) {
            next(err)
            
        }

        

    }

    static async updateUserByPatchQuery(req, res, next){

        try {

            const {id} = req.query

            const {username, email} = req.body

            const user = await User.findByPk(id)
            console.log(user, 'apakah data ini masuk');

            if (!user) throw({name: "NotFound", message: "User is not found "})
            
            const dataBaru = {}
            
            if (username) dataBaru.username = username
            if (email) dataBaru.email = email
            console.log(dataBaru, 'apakahh data baru masuk?');

            if (!dataBaru || Object.keys(dataBaru).length===0) 
                throw({name: "BadRequest", message: "There is no data to update"})

            // jika tanpa returning true hanya mengembalikan baris tanpa data yang sudah di update
            // const dataUpadate = await User.update(dataBaru, {where: {id}})
            // console.log("dataUpadate",dataUpadate);

            // Lakukan update ke database
            // returning: true artinya Sequelize akan langsung kasih balik data barunya
            const [jumlahBaris, barisYangSudahDiubah] = await User.update(
                dataBaru, 
                        {
                            where: { id },
                            returning: true, // agar dapat data hasil update
                        }
                    );
            
            console.log("jumlahBaris:", jumlahBaris);
            console.log("barisYangSudahDiubah", barisYangSudahDiubah)
            
//             Fungsi JSON.stringify() sebenarnya punya 3 parameter: JSON.stringify(value, replacer, space)
//             value → data yang mau diubah jadi string (di sini: barisYangSudahDiubah)
//             replacer → bisa digunakan untuk memilih properti mana yang mau disertakan (biasanya diisi null kalau mau semuanya)
//             space → jumlah spasi untuk membuat tampilan JSON lebih rapi (indentasi)
//             Jadi: JSON.stringify(barisYangSudahDiubah, null, 2)
//              artinya: "Ubah objek barisYangSudahDiubah menjadi string JSON dengan indentasi 2 spasi agar lebih mudah dibaca."
            console.log("barisYangSudahDiubah (raw):", JSON.stringify(barisYangSudahDiubah, null, 2) );

            console.log("userInstance:", barisYangSudahDiubah[0]);
            console.log("userInstance.dataValues:", barisYangSudahDiubah[0].dataValues); // cara pertama

            const userInstance = barisYangSudahDiubah[0];
            // ambil dataValues
            console.log("dataValues:", userInstance.dataValues); // cara kedua

            const {password, ...tanpaPassword} = userInstance.dataValues
            console.log("data yang ingin dihilangkan", password);
            console.log("data baru tanpa password", tanpaPassword);

            res.status(200).json({
                message: "Data user berhasil diubah",
                data: tanpaPassword
            })
            

            
        } catch (err) {
            next(err)
            
        }

    }

    static async deleteById(req, res, next){

        const {id} = req.params

        const user = await User.findByPk(id)

        console.log(user);

        if (!user) throw({name: "NotFound", message: "User is not found"})
        
        // jika isDeleted = true
        if (user.isDeleted) throw({ name: "BadRequest", message: "User already deleted" })
        
        await User.update(
            { isDeleted: true }, // data yang ingin diubah
            { where: { id } }    // kondisi baris yang diubah
        );

        res.status(200).json({
            status: "success",
            message: `User ${user.username} deleted successfully`,
            data: {
                deletedAt: new Date().toISOString()
            }
        });


    }


}


module.exports = UserController
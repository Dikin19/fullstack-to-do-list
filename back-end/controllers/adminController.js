const { where } = require('sequelize');
const {User} = require('../models')

class AdminController {

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
            
            
            

            
        } catch (err) {
            next(err)
            
        }

        

    }



}


module.exports = AdminController
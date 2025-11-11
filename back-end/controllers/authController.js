const { User } = require("../models")
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

module.exports = class AuthController {
    

    static async register(req, res, next) {

        try {

            const { username, email, password, status } = req.body

            // basic validation
            // if (!username || !email || !password) {
            //     return res.status(400).json({ message: 'username, email and password are required' })
            // }

            const dataUser = await User.create({
                username,
                email,
                password,
                status
            })

            return res.status(201).json({

                id: dataUser.id,
                username: dataUser.username,
                email: dataUser.email,
                status: dataUser.status
                
            })

        } catch (err) {
            next(err)
            // console.error(error)
            // return res.status(500).json({ message: 'Internal server error', error: error.message })
        }
    }

    static async login(req, res, next) {

        try {

            const {email, password} = req.body

            if (!email) throw({name: "BadRequest", message: 'Email is required'})
            if (!password) throw({name: "BadRequest", message: 'Password is required'})

            const dataUser = await User.findOne({
                where: {
                    email
                }
            });

            if (!dataUser) throw({name: "Unauthorized", message: 'Email/Password is invalid'})

            const isPasswordMatch = comparePassword(password, dataUser.password)
            
            if (!isPasswordMatch) throw({name: "Unauthorized", message: 'Email/Password is invalid'})
            
            const access_token = signToken({id: dataUser.id})
            console.log(access_token, 'ini token user');
            res.status(200).json({access_token})

            
        } catch (err) {
            console.log(err, '<<<<<<<< ini error yang terjadi');
            next(err)
            
        }

    }

    

}
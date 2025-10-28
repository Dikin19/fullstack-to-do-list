const { User } = require("../models")

module.exports = class UserController {
    

    static async register(req, res, next) {
        try {
            const { username, email, password } = req.body

            // basic validation
            // if (!username || !email || !password) {
            //     return res.status(400).json({ message: 'username, email and password are required' })
            // }

            const dataUser = await User.create({
                username,
                email,
                password
            })

            return res.status(201).json({
                id: dataUser.id,
                username: dataUser.username,
                email: dataUser.email
            })

        } catch (err) {
            next(err)
            // console.error(error)
            // return res.status(500).json({ message: 'Internal server error', error: error.message })
        }
    }

}
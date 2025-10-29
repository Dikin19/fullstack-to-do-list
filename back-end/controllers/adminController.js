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


}


module.exports = AdminController
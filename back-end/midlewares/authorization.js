
const {User} = require('../models')

async function authorizationStaff(req, res, next) {

    try {

        // id dari token yg berisi id dan iat
    console.log('ini adalah id dari token: ',req.user.id);

    // id dari params request client(req.params.id)
    const newUser = await User.findByPk(req.params.id)
        console.log('apakah data user masuk?: ',newUser);

    if (!newUser) throw({name: 'NotFound', message: `User id of ${req.params.id} is not found` })
    // if (!user) throw({name: 'NotFound', message: 'User id of' + req.params.id + 'is not found' })

    if (newUser.status === 'admin') return next()

    if (newUser.status === 'customer' && newUser.id !== req.user.id)
        throw({name: 'Forbidden', message: 'You are not authorize'})
        next()

    } catch (err) {
        next(err)
        
    }
    
}

module.exports = authorizationStaff
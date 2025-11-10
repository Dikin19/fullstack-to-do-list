
const {User} = require('../models')

async function authorizationStaff(req, res, next) {

    try {

        // isLogging adalah dataValues user dari authentication
    const isLogging = req.user.get()
        console.log('ini adalah dataValues dari user yang sedang login: ', isLogging);

    // id dari params request client(req.params.id)
    // targetData adalah id data yang ingin dirubah membawa semua datanya
    const targetData = await User.findByPk(req.params.id)
        console.log('apakah target data masuk?: ',targetData.dataValues);

    if (!targetData) throw({name: 'NotFound', message: `Target data dengan id of ${req.params.id} is not found` })
    // if (!user) throw({name: 'NotFound', message: 'User id of' + req.params.id + 'is not found' })

    if (isLogging.status === 'admin') return next()

        // jika yang sedang login adalah customer dan id targetdata tidak sama dengan id isLoging = forbiden
        // else customer dan id targer data sama dengan isLogging = true silahkan edit
    if (isLogging.status === 'customer' && targetData.id !== isLogging.id)
        throw({name: 'Forbidden', message: 'You are not authorize'})
        next()

    } catch (err) {
        next(err)
        
    }
    
}

module.exports = authorizationStaff
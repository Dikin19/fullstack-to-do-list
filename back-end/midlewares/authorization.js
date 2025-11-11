const {Todo} = require('../models')

async function authorizationTodo(req, res, next) {

    try {

        // isLogging adalah dataValues user dari authentication
    const isLogging = req.user.get()
        console.log('ini adalah dataValues dari user yang sedang login: ', isLogging);

        const {id} = req.params;
    // id dari params request client(req.params.id)
    // targetData adalah id data yang ingin dirubah membawa semua datanya
    const targetData = await Todo.findByPk(id);
        console.log('apakah target data masuk?: ',targetData?.dataValues);

    if (!targetData) throw({name: 'NotFound', message: `Target data of Todo id ${id} is not found` })
    // if (!user) throw({name: 'NotFound', message: 'User id of' + req.params.id + 'is not found' })

    if (isLogging.status === 'admin') return next()

        // jika yang sedang login adalah customer dan userId targetdata tidak sama dengan id isLoging = forbiden
        // else customer dan userId targetdata sama dengan isLogging.id = true silahkan edit
    if (isLogging.status === 'customer' && targetData.userId !== isLogging.id)
        throw({name: 'Forbidden', message: 'You are not authorize'})
        next()

    } catch (err) {
        console.log(err);
        next(err)
        
    }
    
}

async function authorizationUser(req, res, next) {

    try {

        // isLogging adalah dataValues user dari authentication
    const isLogging = req.user.get()
        console.log('ini adalah dataValues dari user yang sedang login: ', isLogging);

    if (isLogging.status !== 'admin') throw({name: 'Forbidden', message: 'you are not admin'})

        next()

    } catch (err) {
        console.log(err);
        next(err)
        
    }
    
}

module.exports = {authorizationTodo, authorizationUser}
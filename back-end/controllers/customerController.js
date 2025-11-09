const {Todo} = require('../models')


module.exports = class CustomerController {

    static async findAllTodo (req, res,next) {

        try {
            

            const data = await Todo.findAll()

            // ini langsung mengambil data dari datavalues
            // const data = await Todo.findAll()
            // const cleanData = data.map(item => item.toJSON())
            // console.log(cleanData)
            // res.status(200).json(cleanData)

            console.log('apakah data todo masuk: ', data);

            // res.json sama dengan memakai methode to.JSON()
            // mengembalikan data langsung berbentuk jso
            res.status(200).json(data)
            
        } catch (err) { 

            next(err)
        }
    }
}
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

    static async createTodo(req, res, next){

        try {
            
            const {title, description, status, priority, userId, dueDate} = req.body

            console.log(`
            ==============================
            Request Body Masuk:
            ==============================
            Title      : ${title}
            Description: ${description}
            Status     : ${status}
            Priority   : ${priority}
            Due Date   : ${dueDate}
            ==============================
            `)

            const newTodo = await Todo.create({
                title,
                description,
                status,
                priority,
                userId,
                dueDate
            })

            console.log('apakah data baru di variable newTodo masuk: ', newTodo);

            return res.status(200).json({

                title: newTodo.title,
                description: newTodo.description,
                status: newTodo.status,
                priority: newTodo.priority,
                userId: newTodo.userId,
                dueDate: newTodo.dueDate
            })

        } catch (err) {
            console.log(err);
            next(err)
            
        }

    }

}
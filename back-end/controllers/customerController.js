const { where } = require('sequelize');
const {Todo} = require('../models')


module.exports = class CustomerController {

    static async findAllTodo (req, res, next) {

        try {
            
            const data = await Todo.findAll()

            if (!data) throw({name: 'NotFound', message: 'Data is not found'})

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

    static async createTodo(req, res, next) {

        try {
            
            const {title, description, status, priority, userId, dueDate} = req.body

            console.log(`\n
            ==============================
            Request Body Masuk:
            ==============================
            Title      : ${title}
            Description: ${description}
            Status     : ${status}
            Priority   : ${priority}
            Due Date   : ${dueDate}
            ==============================\n
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

    static async updateTodo(req,res, next) {

        try {

            const {id} = req.params
        console.log(
        '\n==============================',
        '\nApakah params sudah masuk?:', id,
        '\n==============================\n'
        );


        const oldTodo = await Todo.findByPk(id)
        console.log(
        '\n==============================',
        '\nApakah data Todo masuk? :', oldTodo,
        '\n==============================\n'
        );

        if (!oldTodo) throw({name: 'NotFound', message: 'Data is not found'})
        
        const {title, description, status, priority, dueDate} = req.body
        console.log(`
            ==============================
            Request Body Masuk:
            ==============================
            Title      : ${title}
            Description: ${description}
            Status     : ${status}
            Priority   : ${priority}
            Due Date   : ${dueDate}
            ==============================\n
            `)
        
        // versi 1
        // count → jumlah baris yang terupdate
        // data → array of instance hasil update
        // const [count, data] = await Todo.update(

        //     {
        //         title,
        //         description,
        //         status,
        //         priority,
        //         dueDate
        //     },

        //     {
        //         where:{
        //             id: id
        //         },
        //         returning: true
        //     }

        // )

        // console.log(JSON.stringify(data[0], null, 2)); 
        // // atau
        // console.log(data[0].toJSON());



        // versi 2
        const updateTodo = await Todo.update(

            {
                title,
                description,
                status,
                priority,
                dueDate
            },

            {
                where:{
                    id: id
                },
                returning: true
            }

        )

        // console.log(updateTodo[1][0]);

        //menampilkan data bentuk json
        console.log(updateTodo[1][0].toJSON());

        // hanya mengambil dataValues
        console.log(JSON.stringify(updateTodo[1][0], null, 2));
        
        res.status(200).json(updateTodo[1][0])
            
        } catch (err) {
            next(err)
            
        }

    }

    

}
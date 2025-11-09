const express = require('express');
const AuthController = require('../controllers/queryController');
const { pool } = require('../config/db');
const query = express.Router()



query.post('/', (req, res) => {

    const {name} = req.body

    console.log('masuk gak nama dari body: ', name);

});

query.post('/register', AuthController.register )
query.post('/login', AuthController.login )
query.get('/getAllUsers', AuthController.getAllUsers)
query.put('/updatePut/:id', AuthController.updateUserReturning )
// query.put('/updatePut/:id', AuthController.updateUser) sama dengan updateUserReturning hanya beda logic.
query.patch('/updatePatch/:id', AuthController.updateUserByPatch )
query.patch('/updatePatch', AuthController.updateUserByPatchQuery)
query.delete('/:id',AuthController.deleteById)


query.post('/create', async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const result = await pool.query(
            `INSERT INTO "Users" (username, email, password, "createdAt", "updatedAt")
             VALUES ($1, $2, $3, NOW(), NOW())
             RETURNING id, username, email, "createdAt"`,
            [username, email, password]
        );

        res.status(201).json({
            message: "User created successfully",
            data: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
});

query.get('/users', async (req, res, next) => {
    try {
        const result = await pool.query(`
            SELECT id, username, email, status, "createdAt", "updatedAt"
            FROM "Users"
            WHERE "isDeleted" = false OR "isDeleted" IS NULL
            ORDER BY id ASC
        `);

        res.status(200).json({
            message: "All users fetched successfully",
            count: result.rowCount,
            data: result.rows
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
});





module.exports = query
const {pool} = require('../config/db')
const { comparePassword, hashPassword} = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

module.exports = class AuthController {

    static async register(req, res, next) {
        try {

            const { username, email, password } = req.body;

            console.log(username,email,password);

            if (!username || !email || !password) {
                return res.status(400).json({ message: 'username, email, and password are required' });
            }

            const hashedPassword = hashPassword(password)

            const query = `
            INSERT INTO "Users" ("username", "email", "password", "createdAt", "updatedAt")
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, username, email
            `;

            const createdAt = new Date();
            const updatedAt = new Date();

            const values = [username, email, hashedPassword, createdAt, updatedAt];

            console.log('values masuk gak', values);

            const result = await pool.query(query, values);

            console.log('ada gak result', result);

            console.log('ada gak result', result.rows[0]);

            // ada gak result Result {
            // command: 'INSERT',
            // rowCount: 1,
            // oid: 0,
            // rows: [ { id: 10, username: 'dikin11', email: 'dikin11@mail.com' } ],
            // fields: [
            //     Field {
            //     name: 'id',
            //     tableID: 66158,
            //     columnID: 1,
            //     dataTypeID: 23,
            //     dataTypeSize: 4,
            //     dataTypeModifier: -1,
            //     format: 'text'
            //     },

            res.status(201).json(result.rows[0]);

        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email) throw({ name: "BadRequest", message: "Email is required" });
            if (!password) throw({ name: "BadRequest", message: "Password is required" });

            //$1 adalah email yang ingin dikirim
            const query = `SELECT * FROM "Users" WHERE email = $1`;
            console.log('ada ga hasil query', query);

            // email dalam array ini sama dengan $1
            const user = await pool.query(query, [email]);

            console.log('ada gak hasilnya', result.rows[0]);


            const isPasswordMatch = comparePassword(password, user.password);

            if (!isPasswordMatch) {
                throw({ name: "Unauthorized", message: "Email/Password is invalid" });
            }

            const access_token = signToken({ id: user.id });

            res.status(200).json({ access_token });

        } catch (err) {
            next(err);
        }
    }

    // GET /users
    static async getAllUsers(req, res, next) {
        try {

        const query = `SELECT id, username, email, "createdAt", "updatedAt", "isDeleted" FROM "Users" WHERE "isDeleted" = false;`;
        
        const result = await pool.query(query);
        
        res.status(200).json(result.rows);

        } catch (err) {
        console.error(err, 'findAllUsers error');
        next(err);
        }
    }

    // PUT /users/:id (dengan returning)
    static async updateUserReturning(req, res, next) {
        try {
        const { id } = req.params;
        const { username, email } = req.body;

        // Cek apakah user ada
        const userCheck = await pool.query(`SELECT * FROM "Users" WHERE id = $1`, [id]);
        if (userCheck.rows.length === 0)
            throw { name: 'NotFound', message: 'User is not found' };

        const query = `
            UPDATE "Users"
            SET username = $1, email = $2, "updatedAt" = NOW()
            WHERE id = $3
            RETURNING id, username, email, "createdAt", "updatedAt";
        `;

        const result = await pool.query(query, [username, email, id]);
        res.status(200).json(result.rows[0]);

        } catch (err) {
        console.error(err, 'updateUserReturning error');
        next(err);
        }
    }

    // PUT /users/:id (tanpa returning)
    static async updateUser(req, res, next) {
        try {
        const { id } = req.params;
        const { username, email } = req.body;

        const userCheck = await pool.query(`SELECT * FROM "Users" WHERE id = $1`, [id]);
        if (userCheck.rows.length === 0)
            throw { name: 'NotFound', message: 'User is not found' };

        // Update user
        await pool.query(
            `UPDATE "Users" SET username = $1, email = $2, "updatedAt" = NOW() WHERE id = $3`,
            [username, email, id]
        );

        // Ambil data user setelah update
        const updatedUser = await pool.query(
            `SELECT id, username, email, "createdAt", "updatedAt" FROM "Users" WHERE id = $1`,
            [id]
        );

        res.status(200).json(updatedUser.rows[0]);

        } catch (err) {
        console.error(err, 'updateUser error');
        next(err);
        }
    }

    // PATCH /users/:id
    static async updateUserByPatch(req, res, next) {

        try {

        const { id } = req.params;
        const { username, email } = req.body;

        const userCheck = await pool.query(`SELECT * FROM "Users" WHERE id = $1`, [id]);

        if (userCheck.rows.length === 0)
            throw { name: 'NotFound', message: 'User is not found' };

        // Buat query dinamis tergantung input
        const fields = [];
        const values = [];
        let i = 1;

        if (username) {
            fields.push(`username = $${i++}`);
            values.push(username);
        }
        if (email) {
            fields.push(`email = $${i++}`);
            values.push(email);
        }

        if (fields.length === 0)
            throw { name: 'BadRequest', message: 'There is no data to update' };

        values.push(id);
        const query = `
            UPDATE "Users"
            SET ${fields.join(', ')}, "updatedAt" = NOW()
            WHERE id = $${i}
            RETURNING id, username, email, "createdAt", "updatedAt";
        `;

        const result = await pool.query(query, values);

        res.status(200).json({
            message: 'Data user berhasil diubah',
            data: result.rows[0],
        });
        } catch (err) {
        console.error(err, 'updateUserByPatch error');
        next(err);
        }
    }

    // PATCH /users?id= (pakai query param)
    static async updateUserByPatchQuery(req, res, next) {

        try {
        const { id } = req.query;
        const { username, email } = req.body;

        const userCheck = await pool.query(`SELECT * FROM "Users" WHERE id = $1`, [id]);
        
        if (userCheck.rows.length === 0)
            throw { name: 'NotFound', message: 'User is not found' };

        const fields = [];
        const values = [];
        let i = 1;

        if (username) {
            fields.push(`username = $${i++}`);
            values.push(username);
        }
        if (email) {
            fields.push(`email = $${i++}`);
            values.push(email);
        }

        if (fields.length === 0)
            throw { name: 'BadRequest', message: 'There is no data to update' };

        values.push(id);
        const query = `
            UPDATE "Users"
            SET ${fields.join(', ')}, "updatedAt" = NOW()
            WHERE id = $${i}
            RETURNING id, username, email, "createdAt", "updatedAt";
        `;

        const result = await pool.query(query, values);

        res.status(200).json({
            message: 'Data user berhasil diubah',
            data: result.rows[0],
        });
        } catch (err) {
        console.error(err, 'updateUserByPatchQuery error');
        next(err);
        }
    }

    // DELETE /users/:id
    static async deleteById(req, res, next) {
        try {
        const { id } = req.params;

        const userCheck = await pool.query(`SELECT * FROM "Users" WHERE id = $1`, [id]);
        
        const user = userCheck.rows[0];

        if (!user) throw { name: 'NotFound', message: 'User is not found' };
        
        if (user.isDeleted)
            throw { name: 'BadRequest', message: 'User already deleted' };

        await pool.query(
            `UPDATE "Users" SET "isDeleted" = true, "updatedAt" = NOW() WHERE id = $1`,
            [id]
        );

        res.status(200).json({
            status: 'success',
            message: `User ${user.username} deleted successfully`,
            data: { deletedAt: new Date().toISOString() },
        });
        
        } catch (err) {
        console.error(err, 'deleteById error');
        next(err);
        }
    }


    
};

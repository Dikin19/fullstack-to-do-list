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

            const query = `SELECT * FROM "Users" WHERE email = $1`;
            console.log('ada ga hasil query', query);

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
};

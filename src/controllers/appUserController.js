const sql = require('mssql');
const config = require('../../config.json');

const app_user_index = async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM AppUser');
        res.send(result);
    } catch (err) {
        // error checks
        res.send(err);
    }
};

const app_user_create = async (req, res) => {
    const email = req.query.email;
    const userPassword = req.query.userPassword;
    const timeCreated = Date.now();

    if (email === undefined || userPassword === undefined) {
        let errorCode = 400;
        res.send(errorCode, {status: errorCode, message: 'bad query parameters'});
    } 

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .input('user_password', sql.VarChar, userPassword)
            .input('time_created', sql.VarChar, timeCreated)
            .query('INSERT INTO AppUser (Email, UserPassword, TimeCreated) VALUES (@email, @user_password, @time_created); SELECT SCOPE_IDENTITY() AS AppUserId');
        
        res.send(result);
    } catch (err) {
        // error checks
        res.send(err);
    }
};

const app_user_delete = async (req, res) => {
    const appUserId = req.params.id;

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('app_user_id', sql.Int, appUserId)
            .query('DELETE FROM AppUser WHERE AppUserId = @app_user_id');
        
        res.send(result);
    } catch (err) {
        // error checks
        res.send(err);
    }
};

const app_user_login = async (req, res) => {
    const email = req.query.email;
    const password = req.query.userPassword;

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .query('SELECT * FROM AppUser WHERE Email = @email AND UserPassword = @password');
        
        res.send(result);
    } catch (err) {
        res.send(err);
    }
}

module.exports = {
    app_user_index, 
    app_user_create,
    app_user_delete,
    app_user_login
}
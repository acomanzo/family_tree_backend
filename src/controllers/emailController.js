const sql = require('mssql');
const config = require('../../config.json');

const email_index = async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM Email');
        console.log(result);
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const email_create = async (req, res) => {
    const email = req.query.email;
    const contactInformationId = req.query.contactInformationId;

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .input('contact_information_id', sql.Int, contactInformationId)
            .query('INSERT INTO Email (Email, ContactInformationId) VALUES (@email, @contact_information_id); SELECT SCOPE_IDENTITY() AS EmailId');
        
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const email_delete = async (req, res) => {
    const EmailId = req.params.id;

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('email_id', sql.Int, EmailId)
            .query('DELETE FROM Email WHERE EmailId = @email_id');
        
        console.log(result);
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const email_update = async (req, res) => {
    const EmailId = req.params.id; 

    const email = req.query.email;

    sql.connect(config).then(() => {
        return sql.query`UPDATE Email SET Email = ${email} WHERE EmailId = ${EmailId}`;
    }).then(result => {
        console.log(result);
        res.send(result);
    }).catch(err => {
        // error checks
    });
}

module.exports = {
    email_index, 
    email_create, 
    email_delete,
    email_update
}
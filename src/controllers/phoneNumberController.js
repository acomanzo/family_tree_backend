const sql = require('mssql');
const config = require('../../config.json');

const phone_number_index = async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM PhoneNumber');
        console.log(result);
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const phone_number_create = async (req, res) => {
    const phoneNumber = req.query.phoneNumber;
    const contactInformationId = req.query.contactInformationId;

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('phone_number', sql.VarChar, phoneNumber)
            .input('contact_information_id', sql.Int, contactInformationId)
            .query('INSERT INTO PhoneNumber (PhoneNumber, ContactInformationId) VALUES (@phone_number, @contact_information_id); SELECT SCOPE_IDENTITY() AS PhoneNumberId');
        
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const phone_number_delete = async (req, res) => {
    const phoneNumberId = req.params.id;

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('phone_number_id', sql.Int, phoneNumberId)
            .query('DELETE FROM PhoneNumber WHERE PhoneNumberId = @phone_number_id');
        
        console.log(result);
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const phone_number_update = async (req, res) => {
    const phoneNumberId = req.params.id; 

    const phoneNumber = req.query.phoneNumber;

    sql.connect(config).then(() => {
        return sql.query`UPDATE PhoneNumber SET PhoneNumber = ${phoneNumber} WHERE PhoneNumberId = ${phoneNumberId}`;
    }).then(result => {
        console.log(result);
        res.send(result);
    }).catch(err => {
        // error checks
    });
}

module.exports = {
    phone_number_index, 
    phone_number_create, 
    phone_number_delete,
    phone_number_update
}
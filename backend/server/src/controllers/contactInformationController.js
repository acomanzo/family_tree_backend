const sql = require('mssql');
const config = require('../../config.json');

const contact_information_index = async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM ContactInformation');
        console.log(result);
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const contact_information_create = async (req, res) => {
    const familyMemberId = req.query.familyMemberId;

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('family_member_id', sql.Int, familyMemberId)
            .query('INSERT INTO ContactInformation (FamilyMemberId) OUTPUT INSERTED.* VALUES (@family_member_id); SELECT SCOPE_IDENTITY() AS ContactInformationId');
        
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const contact_information_delete = async (req, res) => {
    const ContactInformationId = req.params.id;

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('contact_information_id', sql.Int, ContactInformationId)
            .query('DELETE FROM ContactInformation WHERE ContactInformationId = @contact_information_id');
        
        console.log(result);
        res.send(result);
    } catch (err) {
        // error checks
    }
};

module.exports = {
    contact_information_index, 
    contact_information_create, 
    contact_information_delete
}
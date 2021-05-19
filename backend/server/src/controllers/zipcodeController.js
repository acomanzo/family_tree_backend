const sql = require('mssql');
const config = require('../../config.json');

const zipcode_index = async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM Zipcode');
        console.log(result);
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const zipcode_create = async (req, res) => {
    const label = req.query.label;

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('label', sql.VarChar, label)
            .query('INSERT INTO Zipcode (Label) VALUES (@label); SELECT SCOPE_IDENTITY() AS ZipcodeId');
        
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const zipcode_delete = async (req, res) => {
    const zipcodeId = req.params.id;

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('zipcode_id', sql.Int, zipcodeId)
            .query('DELETE FROM Zipcode WHERE ZipcodeId = @zipcode_id');
        
        console.log(result);
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const zipcode_update = async (req, res) => {
    const zipcodeId = req.params.id; 

    const label = req.query.label;

    sql.connect(config).then(() => {
        return sql.query`UPDATE Zipcode SET Label = ${label} WHERE ZipcodeId = ${zipcodeId}`;
    }).then(result => {
        console.log(result);
        res.send(result);
    }).catch(err => {
        // error checks
    });
}

module.exports = {
    zipcode_index, 
    zipcode_create, 
    zipcode_delete,
    zipcode_update
}
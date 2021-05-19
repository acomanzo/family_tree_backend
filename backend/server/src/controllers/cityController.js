const sql = require('mssql');
const config = require('../../config.json');

const city_index = async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM City');
        console.log(result);
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const city_create = async (req, res) => {
    const label = req.query.label;

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('label', sql.VarChar, label)
            .query('INSERT INTO City (Label) VALUES (@label); SELECT SCOPE_IDENTITY() AS CityId');
        
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const city_delete = async (req, res) => {
    const cityId = req.params.id;

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('city_id', sql.Int, cityId)
            .query('DELETE FROM City WHERE CityId = @city_id');
        
        console.log(result);
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const city_update = async (req, res) => {
    const cityId = req.params.id; 

    const label = req.query.label;

    sql.connect(config).then(() => {
        return sql.query`UPDATE City SET Label = ${label} WHERE CityId = ${cityId}`;
    }).then(result => {
        console.log(result);
        res.send(result);
    }).catch(err => {
        // error checks
    });
}

module.exports = {
    city_index, 
    city_create, 
    city_delete,
    city_update
}
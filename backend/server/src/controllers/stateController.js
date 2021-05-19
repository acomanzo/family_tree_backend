const sql = require('mssql');
const config = require('../../config.json');

const state_index = async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM State');
        console.log(result);
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const state_create = async (req, res) => {
    const label = req.query.label;

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('label', sql.VarChar, label)
            .query('INSERT INTO State (Label) VALUES (@label); SELECT SCOPE_IDENTITY() AS StateId');
        
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const state_delete = async (req, res) => {
    const stateId = req.params.id;

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('state_id', sql.Int, stateId)
            .query('DELETE FROM State WHERE StateId = @state_id');
        
        console.log(result);
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const state_update = async (req, res) => {
    const stateId = req.params.id; 

    const label = req.query.label;

    sql.connect(config).then(() => {
        return sql.query`UPDATE State SET Label = ${label} WHERE StateId = ${stateId}`;
    }).then(result => {
        console.log(result);
        res.send(result);
    }).catch(err => {
        // error checks
    });
}

module.exports = {
    state_index, 
    state_create, 
    state_delete,
    state_update
}
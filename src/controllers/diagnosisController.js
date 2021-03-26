const sql = require('mssql');
const config = require('../../config.json');

const diagnosis_index = async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM Diagnosis');
        console.log(result);
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const diagnosis_create = async (req, res) => {
    const label = req.query.label;

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('label', sql.VarChar, label)
            .query('INSERT INTO Diagnosis (Label) VALUES (@label); SELECT SCOPE_IDENTITY() AS DiagnosisId');
        
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const diagnosis_delete = async (req, res) => {
    const diagnosisId = req.params.id;

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('diagnosis_id', sql.Int, diagnosisId)
            .query('DELETE FROM Diagnosis WHERE DiagnosisId = @diagnosis_id');
        
        console.log(result);
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const diagnosis_update = async (req, res) => {
    const diagnosisId = req.params.id; 

    const label = req.query.label;

    sql.connect(config).then(() => {
        return sql.query`UPDATE Diagnosis SET Label = ${label} WHERE DiagnosisId = ${diagnosisId}`;
    }).then(result => {
        console.log(result);
        res.send(result);
    }).catch(err => {
        // error checks
    });
}

module.exports = {
    diagnosis_index, 
    diagnosis_create, 
    diagnosis_delete,
    diagnosis_update
}
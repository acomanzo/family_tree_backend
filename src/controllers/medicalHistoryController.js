const sql = require('mssql');
const config = require('../../config.json');

const medical_history_index = async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM MedicalHistory');
        console.log(result);
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const medical_history_index_by_family_member = async (req, res) => {
    const familyMemberId = req.query.familyMemberId;

    sql.connect(config).then(() => {
        return sql.query`SELECT * FROM MedicalHistory WHERE FamilyMemberId = ${familyMemberId};`;
    }).then(result => {
        console.log(result);
        res.send(result);
    }).catch(err => {
        // error checks
    });
}

const medical_history_create = async (req, res) => {
    const dateDiagnosed = req.query.dateDiagnosed;
    const note = req.query.note;
    const diagnosisId = req.query.diagnosisId;
    const familyMemberId = req.query.familyMemberId;

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('date_diagnosed', sql.Int, dateDiagnosed)
            .input('note', sql.VarChar, note)
            .input('diagnosis_id', sql.Int, diagnosisId)
            .input('family_member_id', sql.Int, familyMemberId)
            .query('INSERT INTO MedicalHistory (DateDiagnosed, Note, DiagnosisId, FamilyMemberId) VALUES (@date_diagnosed, @note, @diagnosis_id, @family_member_id); SELECT SCOPE_IDENTITY() AS MedicalHistoryId');
        
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const medical_history_delete = async (req, res) => {
    const MedicalHistoryId = req.params.id;

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('medical_history_id', sql.Int, MedicalHistoryId)
            .query('DELETE FROM MedicalHistory WHERE MedicalHistoryId = @medical_history_id');
        
        console.log(result);
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const medical_history_update = async (req, res) => {
    const MedicalHistoryId = req.params.id; 

    const dateDiagnosed = req.query.dateDiagnosed;
    const note = req.query.note;
    const diagnosisId = req.query.diagnosisId;
    const familyMemberId = req.query.familyMemberId;

    sql.connect(config).then(() => {
        return sql.query`UPDATE MedicalHistory SET DateDiagnosed = ${dateDiagnosed}, Note = ${note}, DiagnosisId = ${diagnosisId}, FamilyMemberId = ${familyMemberId} WHERE MedicalHistoryId = ${MedicalHistoryId}`;
    }).then(result => {
        console.log(result);
        res.send(result);
    }).catch(err => {
        // error checks
    });
}

const medical_history_update_date_diagnosed = async (req, res) => {
    const MedicalHistoryId = req.params.id; 

    const dateDiagnosed = req.query.dateDiagnosed;

    sql.connect(config).then(() => {
        return sql.query`UPDATE MedicalHistory SET DateDiagnosed = ${dateDiagnosed} WHERE MedicalHistoryId = ${MedicalHistoryId}`;
    }).then(result => {
        console.log(result);
        res.send(result);
    }).catch(err => {
        // error checks
    });
}

const medical_history_update_note = async (req, res) => {
    const MedicalHistoryId = req.params.id; 

    const note = req.query.note;

    sql.connect(config).then(() => {
        return sql.query`UPDATE MedicalHistory SET Note = ${note} WHERE MedicalHistoryId = ${MedicalHistoryId}`;
    }).then(result => {
        console.log(result);
        res.send(result);
    }).catch(err => {
        // error checks
    });
}

const medical_history_update_diagnosis_id = async (req, res) => {
    const MedicalHistoryId = req.params.id; 

    const diagnosisId = req.query.diagnosisId;

    sql.connect(config).then(() => {
        return sql.query`UPDATE MedicalHistory SET DiagnosisId = ${diagnosisId} WHERE MedicalHistoryId = ${MedicalHistoryId}`;
    }).then(result => {
        console.log(result);
        res.send(result);
    }).catch(err => {
        // error checks
    });
}

module.exports = {
    medical_history_index, 
    medical_history_index_by_family_member,
    medical_history_create, 
    medical_history_delete,
    medical_history_update,
    medical_history_update_date_diagnosed,
    medical_history_update_note,
    medical_history_update_diagnosis_id
}
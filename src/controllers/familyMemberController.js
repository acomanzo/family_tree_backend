const sql = require('mssql');
const config = require('../../config.json');

const family_member_index = async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM FamilyMember');
        console.log(result);
        res.send(result);
    } catch (err) {
        // error checks
        console.log(err);
        res.send(err);
    }
};

const family_member_index_by_tree = async (req, res) => {
    const familyTreeId = req.params.id;
    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('family_tree_id', sql.Int, familyTreeId)
            .query('SELECT * FROM FamilyMember WHERE FamilyTreeId = @family_tree_id;');
        // const result = await sql.query('SELECT * FROM FamilyMember WHERE FamilyTreeId = @family_tree_id;');
        res.send(result);
    } catch (err) {
        // error checks
        res.send(err);
    }
}

const family_member_create = async (req, res) => {
    // const firstName = req.query.firstName;
    // const lastName = req.query.lastName;
    // const age = req.query.age;
    // const genderId = req.query.genderId;

    // if (firstName === undefined || lastName === undefined || age === undefined || genderId === undefined) {
    //     let errorCode = 400;
    //     res.send(errorCode, {status: errorCode, message: 'bad query parameters'});
    // } 

    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const birthDate = req.query.birthDate;
    const gender = req.query.gender;
    const familyTreeId = req.query.familyTreeId;

    if (firstName === undefined || lastName === undefined || birthDate === undefined || gender === undefined || familyTreeId === undefined) {
        let errorCode = 400;
        res.send(errorCode, {status: errorCode, message: 'bad query parameters'});
    } 

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('first_name', sql.VarChar, firstName)
            .input('last_name', sql.VarChar, lastName)
            .input('birth_date', sql.VarChar, birthDate)
            .input('gender', sql.VarChar, gender)
            .input('family_tree_id', sql.Int, familyTreeId)
            .query('INSERT INTO FamilyMember (FirstName, LastName, BirthDate, Gender, FamilyTreeId) OUTPUT INSERTED.* VALUES (@first_name, @last_name, @birth_date, @gender, @family_tree_id); SELECT SCOPE_IDENTITY() AS FamilyMemberId');
        
        res.send(result);
    } catch (err) {
        // error checks
        console.log(err);
        res.send(err);
    }
};

const family_member_delete = async (req, res) => {
    const familyMemberId = req.params.id;

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('family_member_id', sql.Int, familyMemberId)
            .query('DELETE FROM FamilyMember WHERE FamilyMemberId = @family_member_id');
        
        console.log(result);
        res.send(result);
    } catch (err) {
        // error checks
        console.log(err);
        res.send(err);
    }
};

const family_member_update = async (req, res) => {
    const familyMemberId = req.params.id; 

    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const birthDate = req.query.birthDate;
    const gender = req.query.gender;

    sql.connect(config).then(() => {
        return sql.query`UPDATE FamilyMember SET FirstName = ${firstName}, LastName = ${lastName}, BirthDate = ${birthDate}, Gender = ${gender} WHERE FamilyMemberId = ${familyMemberId}`;
    }).then(result => {
        console.log(result);
        res.send(result);
    }).catch(err => {
        // error checks
        console.log(err);
        res.send(err);
    });
}

module.exports = {
    family_member_index, 
    family_member_index_by_tree,
    family_member_create, 
    family_member_delete,
    family_member_update
}
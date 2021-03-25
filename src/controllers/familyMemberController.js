const sql = require('mssql');
const config = require('../../config.json');
const FamilyMember = require('../models/FamilyMember.js');

const family_member_index = async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM FamilyMember');
        console.log(result);
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const family_member_create = async (req, res) => {
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const age = req.query.age;
    const genderId = req.query.genderId;

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('first_name', sql.VarChar, firstName)
            .input('last_name', sql.VarChar, lastName)
            .input('age', sql.Int, age)
            .input('gender_id', sql.Int, genderId)
            .query('INSERT INTO FamilyMember (FirstName, LastName, Age, GenderId) VALUES (@first_name, @last_name, @age, @gender_id); SELECT SCOPE_IDENTITY() AS FamilyMemberId');
        
        res.send(result);
    } catch (err) {
        // error checks
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
    }
};

const family_member_update = async (req, res) => {
    const familyMemberId = req.params.id; 

    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const age = req.query.age;
    const genderId = req.query.genderId;

    sql.connect(config).then(() => {
        return sql.query`UPDATE FamilyMember SET FirstName = ${firstName}, LastName = ${lastName}, Age = ${age}, GenderId = ${genderId} WHERE FamilyMemberId = ${familyMemberId}`;
    }).then(result => {
        console.log(result);
        res.send(result);
    }).catch(err => {
        // error checks
    });
}

module.exports = {
    family_member_index, 
    family_member_create, 
    family_member_delete,
    family_member_update
}
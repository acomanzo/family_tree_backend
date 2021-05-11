const sql = require('mssql');
const config = require('../../config.json');

const family_tree_index = async (req, res) => {
    const appUserId = req.query.appUserId;
    try {
        if (appUserId !== undefined) {
            let pool = await sql.connect(config);
            const result = await pool.request()
                .input('app_user_id', sql.Int, appUserId)
                .query('SELECT * FROM FamilyTree WHERE AppUserId = @app_user_id;');
        
            res.send(result);
        } else {
            await sql.connect(config);
            const result = await sql.query('SELECT * FROM FamilyTree');
            res.send(result);
        }
        
    } catch (err) {
        // error checks
        res.send(err);
    }
};

const family_tree_create = async (req, res) => {
    const appUserId = req.query.appUserId;
    const treeName = req.query.treeName;

    if (appUserId === undefined || treeName === undefined) {
        let errorCode = 400;
        res.send(errorCode, {status: errorCode, message: 'bad query parameters'});
    } 

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('app_user_id', sql.Int, appUserId)
            .input('tree_name', sql.VarChar, treeName)
            .query('INSERT INTO FamilyTree (AppUserId, TreeName) VALUES (@app_user_id, @tree_name); SELECT SCOPE_IDENTITY() AS FamilyTreeId');
        
        res.send(result);
    } catch (err) {
        // error checks
        res.send(err);
    }
};

const family_tree_delete = async (req, res) => {
    const familyTreeId = req.params.id;

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('family_tree_id', sql.Int, familyTreeId)
            .query('DELETE FROM FamilyTree WHERE FamilyTreeId = @family_tree_id');
        
        res.send(result);
    } catch (err) {
        // error checks
        res.send(err);
    }
};

module.exports = {
    family_tree_index, 
    family_tree_create,
    family_tree_delete
}
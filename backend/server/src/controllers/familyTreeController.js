const sql = require('mssql');
const config = require('../../config.json');

const family_tree_index = async (req, res) => {
    const appUserId = req.query.appUserId;
    try {
        if (appUserId !== undefined) {
            let pool = await sql.connect(config);
            const result = await pool.request()
                .input('app_user_id', sql.Int, appUserId)
                .query(
                    `WITH cte_share_family_tree AS (
                        SELECT 
                            FamilyTree.FamilyTreeId, 
                            FamilyTree.AppUserId, 
                            FamilyTree.TreeName, 
                            FamilyTree.CreatedAt, 
                            FamilyTree.UpdatedAt, 
                            Share.ShareeId 
                        FROM FamilyTree INNER JOIN Share ON FamilyTree.FamilyTreeId = Share.FamilyTreeId
                    )
                    SELECT 
                        FamilyTreeId, 
                        AppUserId, 
                        TreeName, 
                        CreatedAt, 
                        UpdatedAt
                    FROM cte_share_family_tree WHERE ShareeId = @app_user_id
                    UNION 
                    SELECT * FROM FamilyTree WHERE AppUserId = @app_user_id;`
                );
        
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
            .query('INSERT INTO FamilyTree (AppUserId, TreeName) OUTPUT INSERTED.* VALUES (@app_user_id, @tree_name); SELECT SCOPE_IDENTITY() AS FamilyTreeId');
        
        res.send(result);
    } catch (err) {
        // error checks
        res.send(err);
    }
};

const family_tree_index_share = async (req, res) => {
    const appUserId = req.query.appUserId;
    try {
        if (appUserId !== undefined) {
            let pool = await sql.connect(config);
            const result = await pool.request()
                .input('sharee_id', sql.Int, appUserId)
                .query(
                `WITH cte_share_family_tree AS (
                    SELECT 
                        FamilyTree.FamilyTreeId, 
                        FamilyTree.AppUserId, 
                        FamilyTree.TreeName, 
                        FamilyTree.CreatedAt, 
                        FamilyTree.UpdatedAt, 
                        Share.ShareeId 
                    FROM FamilyTree INNER JOIN Share ON FamilyTree.FamilyTreeId = Share.FamilyTreeId
                )
                SELECT 
                    FamilyTreeId, 
                    AppUserId, 
                    TreeName, 
                    CreatedAt, 
                    UpdatedAt
                FROM cte_share_family_tree WHERE ShareeId = @sharee_id;`
            );
        
            res.send(result);
        } else {
            await sql.connect(config);
            const result = await sql.query('SELECT * FROM Share;');
            res.send(result);
        }
    } catch (err) {
        // error checks
        res.send(err);
    }
}

const family_tree_share = async (req, res) => {
    const appUserId = req.query.appUserId;
    const familyTreeId = req.query.familyTreeId;
    const email = req.query.email;

    // get family member id by email
    try {
        let pool = await sql.connect(config);
        const appUserResult = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT AppUserId FROM AppUser WHERE Email LIKE @email;');
        
        const shareeId = appUserResult.recordsets[0][0].AppUserId;

        const shareResult = await pool.request()
            .input('sharer_id', sql.Int, appUserId)
            .input('sharee_id', sql.Int, shareeId)
            .input('family_tree_id', sql.Int, familyTreeId)
            .query('INSERT INTO Share (SharerId, ShareeId, FamilyTreeId) OUTPUT INSERTED.* VALUES (@sharer_id, @sharee_id, @family_tree_id);');
        res.send(shareResult);
    } catch (err) {
        res.send(err);
    }
}

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
    family_tree_index_share,
    family_tree_share,
    family_tree_delete
}
const sql = require('mssql');
const config = require('../../config.json');

const ancestor_descendant_index = async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM AncestorDescendant');
        console.log(result);
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const ancestor_descendant_create = async (req, res) => {
    const ancestorId = req.query.ancestorId;
    const descendantId = req.query.descendantId;
    const depth = req.query.depth;
    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('ancestor_id', sql.Int, ancestorId)
            .input('descendant_id', sql.Int, descendantId)
            .input('depth', sql.Int, depth)
            .query('INSERT INTO AncestorDescendant (AncestorId, DescendantId, Depth) OUTPUT INSERTED.* VALUES (@ancestor_id, @descendant_id, @depth);');
        
        // const result = sql.query`INSERT INTO AncestorDescendant (AncestorId, DescendantId, Depth) VALUES (${ancestorId}, ${descendantId}, ${depth}); SELECT SCOPE_IDENTITY() AS AncestorDescendantId');`;
        
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const ancestor_descendant_delete = async (req, res) => {
    const ancestorDescendantId = req.params.id;

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('ancestor_descendant_id', sql.Int, ancestorDescendantId)
            .query('DELETE FROM AncestorDescendant WHERE AncestorDescendantId = @ancestor_descendant_id');
        
        console.log(result);
        res.send(result);
    } catch (err) {
        // error checks
    }
};

module.exports = {
    ancestor_descendant_index, 
    ancestor_descendant_create, 
    ancestor_descendant_delete
}
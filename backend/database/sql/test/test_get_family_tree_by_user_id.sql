USE familyTreeDatabase;
SELECT 
    FamilyTree.FamilyTreeId, 
    FamilyTree.AppUserId, 
    FamilyTree.TreeName, 
    FamilyTree.CreatedAt, 
    FamilyTree.UpdatedAt, 
    Share.ShareeId 
FROM FamilyTree INNER JOIN Share ON FamilyTree.FamilyTreeId = Share.FamilyTreeId;

WITH cte_share_family_tree AS (
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
FROM cte_share_family_tree WHERE ShareeId = 4;
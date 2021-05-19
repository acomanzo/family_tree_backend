-- deletes all tables in a database

USE familyTreeDatabase;

DELETE FROM AppUser;

-- remove contraints that family member has on gender (foreign key)
ALTER TABLE FamilyMember NOCHECK CONSTRAINT ALL;
-- DELETE FROM Gender;

ALTER TABLE MedicalHistory NOCHECK CONSTRAINT ALL;
-- DELETE FROM Diagnosis;
DELETE FROM MedicalHistory;

ALTER TABLE Email NOCHECK CONSTRAINT ALL; 
DELETE FROM Email;
ALTER TABLE PhoneNumber NOCHECK CONSTRAINT ALL;
DELETE FROM PhoneNumber;

ALTER TABLE ContactAddress NOCHECK CONSTRAINT ALL; 
-- DELETE FROM City;
-- DELETE FROM State;
-- DELETE FROM Zipcode;
DELETE FROM ContactAddress;

ALTER TABLE AncestorDescendant NOCHECK CONSTRAINT ALL;
DELETE FROM AncestorDescendant;

ALTER TABLE ContactInformation NOCHECK CONSTRAINT ALL;
DELETE FROM ContactInformation;

DELETE FROM FamilyMember;
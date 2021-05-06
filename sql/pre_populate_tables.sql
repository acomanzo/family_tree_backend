USE familyTreeDatabase;
GO

-- INSERT INTO Gender (Label) VALUES 
--     ('Agender'),
--     ('Androgyne'),
--     ('Androgynous'), 
--     ('Bigender'), 
--     ('Cis'), 
--     ('Cisgender'), 
--     ('Cis Female'), 
--     ('Cis Male'),
--     ('Cis Man'), 
--     ('Cis Woman'), 
--     ('Cisgender Female'), 
--     ('Cisgender Male'), 
--     ('Cisgender Man'), 
--     ('Cisgender Woman'), 
--     ('Male'), 
--     ('Female');

INSERT INTO FamilyMember (FirstName, LastName, Age, GenderId) VALUES 
    ('Tom', 'Hanks', 64, 8),
    ('Tom', 'Holland', 24, 8);

INSERT INTO ContactInformation (FamilyMemberId) VALUES (1), (2);

INSERT INTO Email (Email, ContactInformationId) VALUES 
    ('thanks@gmail.com', 1),
    ('tholland@gmail.com', 2);

INSERT INTO PhoneNumber (PhoneNumber, ContactInformationId) VALUES 
    ('5181234567', 1), 
    ('5187654321', 2);

-- INSERT INTO Diagnosis (Label) VALUES ('AIDS'), ('Herpes'), ('Broken Arm');

-- INSERT INTO MedicalHistory (DateDiagnosed, DiagnosisId, FamilyMemberId) VALUES 
--     (1616727269, 1, 1),
--     (1616727269, 2, 2);

-- INSERT INTO City (Label) VALUES ('Schenectady');

-- INSERT INTO State (Label) VALUES ('New York');

-- INSERT INTO Zipcode (Label) VALUES ('12309');

-- INSERT INTO ContactAddress (StreetName, HouseNumber, CityId, StateId, ZipcodeId, ContactInformationId) VALUES 
--     ('Tamarack Lane', 17, 1, 1, 1, 1),
--     ('Ash Tree Lane', 7, 1, 1, 1, 2);
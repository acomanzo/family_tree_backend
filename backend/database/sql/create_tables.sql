USE familyTreeDatabase;

CREATE TABLE AppUser (
    AppUserId INT NOT NULL IDENTITY PRIMARY KEY, 
    Email VARCHAR(50) NOT NULL, 
    UserPassword VARCHAR(50) NOT NULL, 
    CreatedAt DATETIME CONSTRAINT DF_AppUser_createdat DEFAULT GETDATE(),
    UpdatedAt DATETIME CONSTRAINT DF_AppUser_updatedat DEFAULT GETDATE()
);

GO
CREATE trigger trg_AppUser_update ON AppUser FOR UPDATE AS 
BEGIN   
    UPDATE AppUser 
        SET UpdatedAt = GETDATE()
        FROM AppUser INNER JOIN deleted d 
        ON AppUser.AppUserId = d.AppUserId
END 
GO

-- CREATE TABLE Gender(
--     GenderId INT NOT NULL IDENTITY PRIMARY KEY,
--     Label VARCHAR(50) NOT NULL 
-- );

CREATE TABLE FamilyTree(
    FamilyTreeId INT NOT NULL IDENTITY PRIMARY KEY,
    AppUserId INT NOT NULL FOREIGN KEY REFERENCES AppUser(AppUserId),
    TreeName VARCHAR(50) NOT NULL,
    CreatedAt DATETIME CONSTRAINT DF_FamilyTree_createdat DEFAULT GETDATE(),
    UpdatedAt DATETIME CONSTRAINT DF_FamilyTree_updatedat DEFAULT GETDATE()
);

GO
CREATE trigger trg_FamilyTree_update ON FamilyTree FOR UPDATE AS 
BEGIN   
    UPDATE FamilyTree 
        SET UpdatedAt = GETDATE()
        FROM FamilyTree INNER JOIN deleted d 
        ON FamilyTree.FamilyTreeId = d.FamilyTreeId
END 
GO

CREATE TABLE FamilyMember(
    FamilyMemberId INT NOT NULL IDENTITY PRIMARY KEY, 
    FirstName VARCHAR(50) NOT NULL, 
    LastName VARCHAR(50) NOT NULL, 
    -- Age INT NULL, 
    BirthDate VARCHAR(20) NULL,
    Gender VARCHAR(50) NULL,
    -- GenderId INT NULL FOREIGN KEY REFERENCES Gender(GenderId) 
    FamilyTreeId INT NOT NULL FOREIGN KEY REFERENCES FamilyTree(FamilyTreeId),
    CreatedAt DATETIME CONSTRAINT DF_FamilyMember_createdat DEFAULT GETDATE(),
    UpdatedAt DATETIME CONSTRAINT DF_FamilyMember_updatedat DEFAULT GETDATE()
);

GO
CREATE trigger trg_FamilyMember_update ON FamilyMember FOR UPDATE AS 
BEGIN   
    UPDATE FamilyMember 
        SET UpdatedAt = GETDATE()
        FROM FamilyMember INNER JOIN deleted d 
        ON FamilyMember.FamilyMemberId = d.FamilyMemberId
END 
GO

-- CREATE TABLE Diagnosis(
--     DiagnosisId INT NOT NULL IDENTITY PRIMARY KEY, 
--     Label VARCHAR(100) NOT NULL 
-- );

CREATE TABLE MedicalHistory(
    MedicalHistoryId INT NOT NULL IDENTITY PRIMARY KEY, 
    -- DateDiagnosed INT NULL, 
    DateDiagnosed VARCHAR(20) NULL, 
    Note VARCHAR(500) NULL, 
    Diagnosis VARCHAR(100) NOT NULL,
    -- DiagnosisId INT NOT NULL FOREIGN KEY REFERENCES Diagnosis(DiagnosisId),
    FamilyMemberId INT NOT NULL FOREIGN KEY REFERENCES FamilyMember(FamilyMemberId),
    CreatedAt DATETIME CONSTRAINT DF_MedicalHistory_createdat DEFAULT GETDATE(),
    UpdatedAt DATETIME CONSTRAINT DF_MedicalHistory_updatedat DEFAULT GETDATE()
);

GO
CREATE trigger trg_MedicalHistory_update ON MedicalHistory FOR UPDATE AS 
BEGIN   
    UPDATE MedicalHistory 
        SET UpdatedAt = GETDATE()
        FROM MedicalHistory INNER JOIN deleted d 
        ON MedicalHistory.MedicalHistoryId = d.MedicalHistoryId
END 
GO

CREATE TABLE ContactInformation(
    ContactInformationId INT NOT NULL IDENTITY PRIMARY KEY, 
    FamilyMemberId INT NOT NULL FOREIGN KEY REFERENCES FamilyMember(FamilyMemberId),
    CreatedAt DATETIME CONSTRAINT DF_ContactInformation_createdat DEFAULT GETDATE(),
    UpdatedAt DATETIME CONSTRAINT DF_ContactInformation_updatedat DEFAULT GETDATE()
);

GO
CREATE trigger trg_ContactInformation_update ON ContactInformation FOR UPDATE AS 
BEGIN   
    UPDATE ContactInformation 
        SET UpdatedAt = GETDATE()
        FROM ContactInformation INNER JOIN deleted d 
        ON ContactInformation.ContactInformationId = d.ContactInformationId
END 
GO

CREATE TABLE Email(
    EmailId INT NOT NULL IDENTITY PRIMARY KEY, 
    Email VARCHAR(100) NOT NULL, 
    ContactInformationId INT NOT NULL FOREIGN KEY REFERENCES ContactInformation(ContactInformationId),
    CreatedAt DATETIME CONSTRAINT DF_Email_createdat DEFAULT GETDATE(),
    UpdatedAt DATETIME CONSTRAINT DF_Email_updatedat DEFAULT GETDATE()
);

GO
CREATE trigger trg_Email_update ON Email FOR UPDATE AS 
BEGIN   
    UPDATE Email 
        SET UpdatedAt = GETDATE()
        FROM Email INNER JOIN deleted d 
        ON Email.EmailId = d.EmailId
END 
GO

CREATE TABLE PhoneNumber(
    PhoneNumberId INT NOT NULL IDENTITY PRIMARY KEY, 
    PhoneNumber VARCHAR(15) NOT NULL,
    ContactInformationId INT NOT NULL FOREIGN KEY REFERENCES ContactInformation(ContactInformationId),
    CreatedAt DATETIME CONSTRAINT DF_PhoneNumber_createdat DEFAULT GETDATE(),
    UpdatedAt DATETIME CONSTRAINT DF_PhoneNumber_updatedat DEFAULT GETDATE()
);

GO
CREATE trigger trg_PhoneNumber_update ON PhoneNumber FOR UPDATE AS 
BEGIN   
    UPDATE PhoneNumber 
        SET UpdatedAt = GETDATE()
        FROM PhoneNumber INNER JOIN deleted d 
        ON PhoneNumber.PhoneNumberId = d.PhoneNumberId
END 
GO

-- CREATE TABLE City(
--     CityId INT NOT NULL IDENTITY PRIMARY KEY, 
--     Label VARCHAR(50) NOT NULL
-- );

-- CREATE TABLE State(
--     StateId INT NOT NULL IDENTITY PRIMARY KEY, 
--     Label VARCHAR(20) NOT NULL
-- );

-- CREATE TABLE Zipcode(
--     ZipcodeId INT NOT NULL IDENTITY PRIMARY KEY, 
--     Label VARCHAR(10) NOT NULL
-- );

CREATE TABLE ContactAddress(
    ContactAddressId INT NOT NULL IDENTITY PRIMARY KEY,
    HouseNumber INT NOT NULL, 
    StreetName VARCHAR(50) NOT NULL, 
    Extra VARCHAR(50) NULL,
    -- CityId INT NOT NULL FOREIGN KEY REFERENCES City(CityId),
    -- StateId INT NOT NULL FOREIGN KEY REFERENCES State(StateId), 
    -- ZipcodeId INT NOT NULL FOREIGN KEY REFERENCES Zipcode(ZipcodeId),
    City VARCHAR(50) NOT NULL,
    State VARCHAR(20) NOT NULL, 
    Zipcode VARCHAR(10) NOT NULL, 
    ContactInformationId INT NOT NULL FOREIGN KEY REFERENCES ContactInformation(ContactInformationId),
    CreatedAt DATETIME CONSTRAINT DF_ContactAddress_createdat DEFAULT GETDATE(),
    UpdatedAt DATETIME CONSTRAINT DF_ContactAddress_updatedat DEFAULT GETDATE()
);

GO
CREATE trigger trg_ContactAddress_update ON ContactAddress FOR UPDATE AS 
BEGIN   
    UPDATE ContactAddress 
        SET UpdatedAt = GETDATE()
        FROM ContactAddress INNER JOIN deleted d 
        ON ContactAddress.ContactAddressId = d.ContactAddressId
END 
GO

CREATE TABLE AncestorDescendant(
    AncestorDescendantId INT NOT NULL IDENTITY PRIMARY KEY, 
    AncestorId INT NOT NULL FOREIGN KEY REFERENCES FamilyMember(FamilyMemberId), 
    DescendantId INT NOT NULL FOREIGN KEY REFERENCES FamilyMember(FamilyMemberId), 
    Depth INT NOT NULL,
    CreatedAt DATETIME CONSTRAINT DF_AncestorDescendant_createdat DEFAULT GETDATE(),
    UpdatedAt DATETIME CONSTRAINT DF_AncestorDescendant_updatedat DEFAULT GETDATE()
);

GO
CREATE trigger trg_AncestorDescendant_update ON AncestorDescendant FOR UPDATE AS 
BEGIN   
    UPDATE AncestorDescendant 
        SET UpdatedAt = GETDATE()
        FROM AncestorDescendant INNER JOIN deleted d 
        ON AncestorDescendant.AncestorDescendantId = d.AncestorDescendantId
END 
GO

CREATE TABLE Share(
    ShareId INT NOT NULL IDENTITY PRIMARY KEY, 
    SharerId INT NOT NULL FOREIGN KEY REFERENCES AppUser(AppUserId), 
    ShareeId INT NOT NULL FOREIGN KEY REFERENCES AppUser(AppUserId), 
    FamilyTreeId INT NOT NULL FOREIGN KEY REFERENCES FamilyTree(FamilyTreeId),
    CreatedAt DATETIME CONSTRAINT DF_Share_createdat DEFAULT GETDATE(),
    UpdatedAt DATETIME CONSTRAINT DF_Share_updatedat DEFAULT GETDATE()
);

GO
CREATE trigger trg_Share_update ON Share FOR UPDATE AS 
BEGIN   
    UPDATE Share 
        SET UpdatedAt = GETDATE()
        FROM Share INNER JOIN deleted d 
        ON Share.ShareId = d.ShareId
END 
GO


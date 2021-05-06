USE familyTreeDatabase;

CREATE TABLE AppUser (
    AppUserId INT NOT NULL IDENTITY PRIMARY KEY, 
    Email VARCHAR(50) NOT NULL, 
    UserPassword VARCHAR(50) NOT NULL, 
    TimeCreated INT NOT NULL 
);

-- CREATE TABLE Gender(
--     GenderId INT NOT NULL IDENTITY PRIMARY KEY,
--     Label VARCHAR(50) NOT NULL 
-- );

CREATE TABLE FamilyMember(
    FamilyMemberId INT NOT NULL IDENTITY PRIMARY KEY, 
    FirstName VARCHAR(50) NOT NULL, 
    LastName VARCHAR(50) NOT NULL, 
    -- Age INT NULL, 
    BirthDate VARCHAR(20) NULL,
    Gender VARCHAR(50) NULL
    -- GenderId INT NULL FOREIGN KEY REFERENCES Gender(GenderId) 
);

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
    FamilyMemberId INT NOT NULL FOREIGN KEY REFERENCES FamilyMember(FamilyMemberId)
);

CREATE TABLE ContactInformation(
    ContactInformationId INT NOT NULL IDENTITY PRIMARY KEY, 
    FamilyMemberId INT NOT NULL FOREIGN KEY REFERENCES FamilyMember(FamilyMemberId)
);

CREATE TABLE Email(
    EmailId INT NOT NULL IDENTITY PRIMARY KEY, 
    Email VARCHAR(100) NOT NULL, 
    ContactInformationId INT NOT NULL FOREIGN KEY REFERENCES ContactInformation(ContactInformationId)
);

CREATE TABLE PhoneNumber(
    PhoneNumberId INT NOT NULL IDENTITY PRIMARY KEY, 
    PhoneNumber VARCHAR(15) NOT NULL,
    ContactInformationId INT NOT NULL FOREIGN KEY REFERENCES ContactInformation(ContactInformationId)
);

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
    ContactInformationId INT NOT NULL FOREIGN KEY REFERENCES ContactInformation(ContactInformationId)
);

CREATE TABLE AncestorDescendant(
    AncestorDescendantId INT NOT NULL IDENTITY PRIMARY KEY, 
    AncestorId INT NOT NULL FOREIGN KEY REFERENCES FamilyMember(FamilyMemberId), 
    DescendantId INT NOT NULL FOREIGN KEY REFERENCES FamilyMember(FamilyMemberId), 
    Depth INT NOT NULL
);
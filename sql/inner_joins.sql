USE familyTreeDatabase;
GO 

SELECT 
    f.FirstName, f.LastName, f.Age, g.Label AS Gender, mh.DateDiagnosed, mh.Note, d.Label AS Diagnosis, e.Email, pn.PhoneNumber, a.StreetName, a.HouseNumber, c.Label AS City, s.Label AS State, z.Label AS Zipcode FROM FamilyMember f 
    INNER JOIN Gender g ON f.GenderId = g.GenderId 
    INNER JOIN MedicalHistory mh ON f.FamilyMemberId = mh.FamilyMemberId 
    INNER JOIN Diagnosis d ON mh.DiagnosisId = d.DiagnosisId 
    INNER JOIN ContactInformation ci ON f.FamilyMemberId = ci.FamilyMemberId
    INNER JOIN Email e ON ci.ContactInformationId = e.ContactInformationId
    INNER JOIN PhoneNumber pn ON ci.ContactInformationId = pn.ContactInformationId
    INNER JOIN ContactAddress a ON ci.ContactInformationId = a.ContactInformationId
    INNER JOIN City c ON a.CityId = c.CityId 
    INNER JOIN State s ON a.StateId = s.StateId
    INNER JOIN Zipcode z ON a.ZipcodeId = z.ZipcodeId;

SELECT 
    f.FirstName, f.LastName, f.Age, g.Label AS Gender FROM FamilyMember f 
    INNER JOIN Gender g ON f.GenderId = g.GenderId;

SELECT 
    f.FirstName, f.LastName, f.Age, mh.DateDiagnosed, mh.Note, d.Label AS Diagnosis FROM FamilyMember f 
    INNER JOIN Gender g ON f.GenderId = g.GenderId 
    INNER JOIN MedicalHistory mh ON f.FamilyMemberId = mh.FamilyMemberId 
    INNER JOIN Diagnosis d ON mh.DiagnosisId = d.DiagnosisId;

SELECT 
    f.FirstName, f.LastName, f.Age, e.Email, pn.PhoneNumber, a.StreetName, a.HouseNumber, c.Label AS City, s.Label AS State, z.Label AS Zipcode FROM FamilyMember f 
    INNER JOIN ContactInformation ci ON f.FamilyMemberId = ci.FamilyMemberId
    INNER JOIN Email e ON ci.ContactInformationId = e.ContactInformationId
    INNER JOIN PhoneNumber pn ON ci.ContactInformationId = pn.ContactInformationId
    INNER JOIN ContactAddress a ON ci.ContactInformationId = a.ContactInformationId
    INNER JOIN City c ON a.CityId = c.CityId 
    INNER JOIN State s ON a.StateId = s.StateId
    INNER JOIN Zipcode z ON a.ZipcodeId = z.ZipcodeId;

-- full join replaces the absent values with NULL
SELECT 
    f.FirstName, f.LastName, f.Age, e.Email, pn.PhoneNumber, a.StreetName, a.HouseNumber, c.Label AS City, s.Label AS State, z.Label AS Zipcode FROM FamilyMember f 
    FULL JOIN ContactInformation ci ON f.FamilyMemberId = ci.FamilyMemberId
    FULL JOIN Email e ON ci.ContactInformationId = e.ContactInformationId
    FULL JOIN PhoneNumber pn ON ci.ContactInformationId = pn.ContactInformationId
    FULL JOIN ContactAddress a ON ci.ContactInformationId = a.ContactInformationId
    FULL JOIN City c ON a.CityId = c.CityId 
    FULL JOIN State s ON a.StateId = s.StateId
    FULL JOIN Zipcode z ON a.ZipcodeId = z.ZipcodeId;
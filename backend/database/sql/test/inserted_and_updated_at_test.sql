INSERT INTO AppUser(Email, UserPassword) OUTPUT INSERTED.* VALUES ('test', 'test');

UPDATE AppUser SET Email = 'updated email' WHERE AppUserId = 1;
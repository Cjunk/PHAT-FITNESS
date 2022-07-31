SET client_min_messages = 'error';
-- DATABASE TYPES --------------------------------------------------------
DROP TABLE IF EXISTS messages,hashed_passwords,challenges,users,socialmedialinks,socialmediatypes,profiletype,usertypes,"session";
CREATE TABLE usertypes (-- The types of users could be Developer, Recruiter, Researcher
    id INT PRIMARY KEY NOT NULL,
    typename VARCHAR(30) NOT NULL,
    typedescription VARCHAR(100) NOT NULL 
);
CREATE TABLE profiletype ( -- Public or private
    id SMALLINT PRIMARY KEY NOT NULL,
    thedescription VARCHAR(30) NOT NULL
);
CREATE TABLE socialmediatypes (  -- All the social media link types available 
    id SERIAL PRIMARY KEY,
    mediatype VARCHAR(30) NOT NULL,
    homepage TEXT
);
-- USERS        --------------------------------------------------------
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    memberstatus SMALLINT,
    photo TEXT,
    userType SMALLINT REFERENCES userTypes(id) NOT NULL,
    profiletype SMALLINT REFERENCES profiletype(id),
    aboutmetitle TEXT,
    email varchar(50),
    fname varchar(50),
    lname varchar(50),
    participationscore SMALLINT,
    password_hash varchar(100),
    listofevents SMALLINT,
    datejoined SMALLINT,
    moneypaids SMALLINT,
    CONSTRAINT validate_email CHECK (email LIKE '%___@___%__%') 
);
CREATE TABLE socialmedialinks ( -- Each users social media links kept here
    id SMALLINT REFERENCES users(id),
    socialmediatype SMALLINT REFERENCES socialmediaTypes(id),
    link TEXT NOT NULL 
);
CREATE TABLE challenges (
    theTitle varchar(50),
    theDescription TEXT,
    theLocation VARCHAR(50),
    userrating SMALLINT
);
CREATE TABLE hashed_passwords ( -- Separate table to store only hashed passwords and user ids. Security reasons
    id SMALLINT REFERENCES users(id),
    hashed_password TEXT NOT NULL
);

CREATE TABLE messages ( -- messages left for users
    id SERIAL PRIMARY KEY,
    msgfrom SMALLINT REFERENCES users(id) NOT NULL,
    msgtooID SMALLINT REFERENCES users(id) NOT NULL,
    datereceived DATE NOT NULL,
    timereceived TIME NOT NULL,
    themsg TEXT NOT NULL,
    timetoexpire DATE,
    msgread BIT NOT NULL
);
-- USER TYPES
INSERT INTO usertypes (id, typename,typedescription) VALUES(3,'Developer','Software developers conceive of, design, and build computer programs');
INSERT INTO usertypes (id,typename,typedescription) VALUES(4,'Recruiter','Experts in the finding, screening and attracting of applicants for open positions.');
INSERT INTO usertypes (id,typename,typedescription) VALUES(2,'Database Administrator','Takes care of the GitConnect database');
INSERT INTO usertypes (id,typename,typedescription) VALUES(1,'Site God','Typically the developers of this site');

-- INSERT INTO challenges (theTitle,theDescription,theLocation) VALUES('Human Harbour Bridge','Make a human bridge and take a photo','Sydney');
-- INSERT INTO challenges (theTitle,theDescription,theLocation) VALUES('SNICKERS','CLimb a tree with a snickers bar and take a photo','Anywhere');
-- INSERT INTO challenges (theTitle,theDescription,theLocation) VALUES ('Human Harbour Bridge', 'Make a human bridge and take a photo with the Sydney Harbour Bridge in the background.', '1 Bennelong Point, Sydney NSW 2000');
-- INSERT INTO challenges (theTitle,theDescription,theLocation) VALUES ('Botanic Gardens', 'Take a photo of the weirdest looking plant you can find in the Royal Botanic Gardens.', '4A Macquarie St, Sydney NSW 2000');
-- INSERT INTO challenges (theTitle,theDescription,theLocation) VALUES('Backyard Insect Scavenger Hunt','Take a photo of yourself with an ant in your hand','Your Backyard');
-- INSERT INTO challenges (theTitle,theDescription,theLocation) VALUES('Crack the code','Decypher this "Gnxr n cubgb bs n genva"','Crack the code to find location');
-- INSERT INTO challenges (theTitle,theDescription,theLocation) VALUES ('Color Scavenger Hunt', 'Color in a picture of Snoopy and take a photo of you and it at Macdonalds', 'Where ever you find');
-- INSERT INTO challenges (theTitle,theDescription,theLocation) VALUES ('Lucky Leprechaun', 'Find the Lucky Leprechaun and take the photo', 'Parramatta Station');
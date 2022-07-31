-- psql scavenger_hunt < schema.sql
DROP TABLE IF EXISTS users,"session";
CREATE TABLE challenges (
    
    theTitle varchar(50),
    theDescription TEXT,
    theLocation VARCHAR(50),
    userrating number
);
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    memberstatus number,
    email varchar(50) PRIMARY KEY,
    fname varchar(50),
    lname varchar(50),
    participationscore number,
    password_hash varchar(100),
    listofevents number
    datejoined number,
    moneypaids number
    
);

-- INSERT INTO challenges (theTitle,theDescription,theLocation) VALUES('Human Harbour Bridge','Make a human bridge and take a photo','Sydney');
-- INSERT INTO challenges (theTitle,theDescription,theLocation) VALUES('SNICKERS','CLimb a tree with a snickers bar and take a photo','Anywhere');
-- INSERT INTO challenges (theTitle,theDescription,theLocation) VALUES ('Human Harbour Bridge', 'Make a human bridge and take a photo with the Sydney Harbour Bridge in the background.', '1 Bennelong Point, Sydney NSW 2000');
-- INSERT INTO challenges (theTitle,theDescription,theLocation) VALUES ('Botanic Gardens', 'Take a photo of the weirdest looking plant you can find in the Royal Botanic Gardens.', '4A Macquarie St, Sydney NSW 2000');
-- INSERT INTO challenges (theTitle,theDescription,theLocation) VALUES('Backyard Insect Scavenger Hunt','Take a photo of yourself with an ant in your hand','Your Backyard');
-- INSERT INTO challenges (theTitle,theDescription,theLocation) VALUES('Crack the code','Decypher this "Gnxr n cubgb bs n genva"','Crack the code to find location');
-- INSERT INTO challenges (theTitle,theDescription,theLocation) VALUES ('Color Scavenger Hunt', 'Color in a picture of Snoopy and take a photo of you and it at Macdonalds', 'Where ever you find');
-- INSERT INTO challenges (theTitle,theDescription,theLocation) VALUES ('Lucky Leprechaun', 'Find the Lucky Leprechaun and take the photo', 'Parramatta Station');
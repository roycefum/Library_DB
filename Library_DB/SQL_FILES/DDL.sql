-- ================================================
-- DDL for CS340 Portfolio Project Database
-- Description: This SQL file creates and populates tables as per the schema required for the CS340 database project.
-- This file includes definitions for Patrons, Staff, Books, Book Transactions, Book Transaction Details, Patron Events, and Patron Events Attendance tables.
-- Ensure MariaDB or a compatible MySQL server is used for import.
-- ================================================

SET foreign_key_checks = 0;

-- Dropping existing tables to avoid conflicts during schema creation
DROP TABLE IF EXISTS Patron_Events_Attendance;
DROP TABLE IF EXISTS Book_Transaction_Details;
DROP TABLE IF EXISTS Book_Transactions;
DROP TABLE IF EXISTS Patron_Events;
DROP TABLE IF EXISTS Books;
DROP TABLE IF EXISTS Staff;
DROP TABLE IF EXISTS Patrons;

-- Creating table for Patrons
CREATE TABLE Patrons (
    patronID int NOT NULL AUTO_INCREMENT,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    membershipDate date,
    email varchar(255) UNIQUE NOT NULL,
    address varchar(255),
    phone varchar(255),
    PRIMARY KEY (patronID)
);

-- Creating table for Staff
CREATE TABLE Staff (
    staffID int NOT NULL AUTO_INCREMENT,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    position varchar(255),
    PRIMARY KEY (staffID)
);

-- Creating table for Books
CREATE TABLE Books (
    bookID int NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    author varchar(255),
    isbn varchar(255) UNIQUE,
    publishedYear int,
    genre varchar(255),
    PRIMARY KEY (bookID)
);

-- Creating table for Book Transactions
CREATE TABLE Book_Transactions (
    transactionID int NOT NULL AUTO_INCREMENT,
    patronID int,
    numberBooks int,
    staffID int,
    transactionDate date NOT NULL,
    transactionType ENUM('checkout', 'checkin', 'renewal') NOT NULL DEFAULT 'checkout',
    PRIMARY KEY (transactionID),
    FOREIGN KEY (patronID) REFERENCES Patrons(patronID),
    FOREIGN KEY (staffID) REFERENCES Staff(staffID)
);

-- Creating table for Book Transaction Details
CREATE TABLE Book_Transaction_Details (
    transactionDetailsID int NOT NULL AUTO_INCREMENT,
    transactionID int,
    bookID int,
    dueDate date,
    returnDate date,
    PRIMARY KEY (transactionDetailsID),
    FOREIGN KEY (transactionID) REFERENCES Book_Transactions(transactionID) ON DELETE CASCADE,
    FOREIGN KEY (bookID) REFERENCES Books(bookID)
);

-- Creating table for Patron Events
CREATE TABLE Patron_Events (
    eventID int NOT NULL AUTO_INCREMENT,
    eventName varchar(255) NOT NULL,
    event_Date datetime NOT NULL,
    description text,
    staffID int NOT NULL,
    PRIMARY KEY (eventID),
    FOREIGN KEY (staffID) REFERENCES Staff(staffID)
);

-- Creating table for Patron Events Attendance
CREATE TABLE Patron_Events_Attendance (
    eventsDetailID int NOT NULL AUTO_INCREMENT,
    patronID int,
    eventID int,
    PRIMARY KEY (eventsDetailID),
    FOREIGN KEY (patronID) REFERENCES Patrons(patronID),
    FOREIGN KEY (eventID) REFERENCES Patron_Events(eventID) ON DELETE CASCADE
);

-- Creating table for Settings
CREATE TABLE Settings (
    settingID int NOT NULL AUTO_INCREMENT,
    settingName varchar(255) NOT NULL UNIQUE,
    settingValue varchar(255) NOT NULL,
    PRIMARY KEY (settingID)
);

-- Default loan period
INSERT INTO Settings (settingName, settingValue) VALUES ('loan_period_days', '14');

-- Insert statements for each table
INSERT INTO Patrons (first_name, last_name, membershipDate, email, address, phone) VALUES
('James', 'Kirk', '1964-03-15', 'jkirk@gmail.com', '1324 Random Ln', '555-387-9900'),
('Jean-Luc', 'Picard', '1987-08-29','jlpcapent@hotmail.com','7 Space Ct', '555-617-3568'),
('Benjamin', 'Sisko', '1994-12-02', 'emmisaryds9@gmail.com','1515 Promenade Ave', '555-703-0038'),
('Kathryn','Janeway','2000-06-18','lostindelta@yahoo.com','100367 Long Rd', '555-888-9276');

INSERT INTO Books (title, author, isbn, publishedYear, genre) VALUES
('1984','George Orwell','1234567890123',1946, 'fiction'),
('To Kill a Mockingbird', 'Harper Lee', '2234567890223', 1971, 'courtroom'),
('Robinson Crusoe', 'Daniel Defoe', '3234567890323', 1875, 'survival'),
('The Color Purple','Alice Walker', '4234567890423', 1966, 'drama');

INSERT INTO Book_Transactions (patronID, numberBooks, staffID, transactionDate, transactionType) VALUES
(3,2,1,'2024-04-27','checkout'),
(4,4,1,'2024-04-28','checkout'),
(1,4,2,'2024-04-29','checkout'),
(2,1,2,'2024-04-30','checkout');

INSERT INTO Staff (first_name, last_name, position) VALUES
('William', 'Riker','Manager'),
('Leonard', 'Nimoy','Customer Service'),
('Kira','Nerice','Special Collections'),
('Tom','Paris','Social Media');

INSERT INTO Book_Transaction_Details (transactionID, bookID, dueDate) VALUES
(1,3,'2024-05-27'),
(2,3,'2024-05-01'),
(3,3,'2024-06-29'),
(4,1,'2024-05-30');

INSERT INTO Patron_Events(eventName, event_Date, description, staffID) VALUES
('welcome brunch','2024-04-03','eggs and bacon',1),
('dinner party', '2024-05-01','large buffet',1),
('silent auction','2024-06-04','big fundraiser',2),
('bingo night', '2023-11-18','great for older patrons',3);

INSERT INTO Patron_Events_Attendance (eventID, patronID) VALUES
(1,1),
(1,2),
(1,3),
(2,4),
(2,3),
(2,2),
(2,1);

-- Additional Books (50 classics)
INSERT INTO Books (title, author, isbn, publishedYear, genre) VALUES
('Pride and Prejudice', 'Jane Austen', '9780141439518', 1813, 'romance'),
('Moby Dick', 'Herman Melville', '9780142437247', 1851, 'adventure'),
('War and Peace', 'Leo Tolstoy', '9780199232765', 1869, 'historical fiction'),
('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565', 1925, 'fiction'),
('Jane Eyre', 'Charlotte Bronte', '9780142437209', 1847, 'gothic fiction'),
('Brave New World', 'Aldous Huxley', '9780060850524', 1932, 'dystopian'),
('Crime and Punishment', 'Fyodor Dostoevsky', '9780140449136', 1866, 'psychological fiction'),
('Wuthering Heights', 'Emily Bronte', '9780141439556', 1847, 'gothic fiction'),
('Great Expectations', 'Charles Dickens', '9780141439563', 1861, 'coming of age'),
('Anna Karenina', 'Leo Tolstoy', '9780143035008', 1878, 'historical fiction'),
('The Odyssey', 'Homer', '9780140268867', 1614, 'epic poetry'),
('Don Quixote', 'Miguel de Cervantes', '9780060934347', 1605, 'satire'),
('Hamlet', 'William Shakespeare', '9780743477123', 1603, 'tragedy'),
('Frankenstein', 'Mary Shelley', '9780141439471', 1818, 'gothic fiction'),
('Dracula', 'Bram Stoker', '9780141439846', 1897, 'horror'),
('The Adventures of Huckleberry Finn', 'Mark Twain', '9780142437179', 1884, 'adventure'),
('Middlemarch', 'George Eliot', '9780141439549', 1871, 'realism'),
('The Brothers Karamazov', 'Fyodor Dostoevsky', '9780374528379', 1880, 'philosophical fiction'),
('Madame Bovary', 'Gustave Flaubert', '9780140449129', 1857, 'realism'),
('Les Miserables', 'Victor Hugo', '9780140444308', 1862, 'historical fiction'),
('A Tale of Two Cities', 'Charles Dickens', '9780141439600', 1859, 'historical fiction'),
('The Iliad', 'Homer', '9780140275360', 1614, 'epic poetry'),
('Ulysses', 'James Joyce', '9780141182803', 1922, 'modernism'),
('The Divine Comedy', 'Dante Alighieri', '9780142437223', 1320, 'epic poetry'),
('Catch-22', 'Joseph Heller', '9781451626650', 1961, 'satire'),
('Slaughterhouse-Five', 'Kurt Vonnegut', '9780440180296', 1969, 'satire'),
('One Hundred Years of Solitude', 'Gabriel Garcia Marquez', '9780060883287', 1967, 'magical realism'),
('The Scarlet Letter', 'Nathaniel Hawthorne', '9780142437261', 1850, 'historical fiction'),
('Of Mice and Men', 'John Steinbeck', '9780140177398', 1937, 'tragedy'),
('The Grapes of Wrath', 'John Steinbeck', '9780143039433', 1939, 'historical fiction'),
('Lord of the Flies', 'William Golding', '9780399501487', 1954, 'dystopian'),
('Animal Farm', 'George Orwell', '9780451526342', 1945, 'satire'),
('Fahrenheit 451', 'Ray Bradbury', '9781451673319', 1953, 'dystopian'),
('The Old Man and the Sea', 'Ernest Hemingway', '9780684801223', 1952, 'fiction'),
('For Whom the Bell Tolls', 'Ernest Hemingway', '9780684803357', 1940, 'historical fiction'),
('A Farewell to Arms', 'Ernest Hemingway', '9780684801469', 1929, 'historical fiction'),
('The Sun Also Rises', 'Ernest Hemingway', '9780743297332', 1926, 'fiction'),
('On the Road', 'Jack Kerouac', '9780140283297', 1957, 'fiction'),
('Invisible Man', 'Ralph Ellison', '9780679732761', 1952, 'fiction'),
('Native Son', 'Richard Wright', '9780061148507', 1940, 'fiction'),
('Their Eyes Were Watching God', 'Zora Neale Hurston', '9780061120060', 1937, 'fiction'),
('Beloved', 'Toni Morrison', '9781400033416', 1987, 'historical fiction'),
('The Sound and the Fury', 'William Faulkner', '9780679732242', 1929, 'modernism'),
('As I Lay Dying', 'William Faulkner', '9780679724056', 1930, 'modernism'),
('Tender is the Night', 'F. Scott Fitzgerald', '9780684801544', 1934, 'fiction'),
('Lolita', 'Vladimir Nabokov', '9780679723165', 1955, 'fiction'),
('The Trial', 'Franz Kafka', '9780805209990', 1925, 'philosophical fiction'),
('The Metamorphosis', 'Franz Kafka', '9780553213690', 1915, 'philosophical fiction'),
('In Search of Lost Time', 'Marcel Proust', '9780300116984', 1913, 'modernism'),
('Siddhartha', 'Hermann Hesse', '9780553208849', 1922, 'philosophical fiction');

-- Additional Patrons (20 more)
INSERT INTO Patrons (first_name, last_name, membershipDate, email, address, phone) VALUES
('Spock', 'Vulcan', '1966-09-08', 'spock@starfleet.gov', '1701 Enterprise Way', '555-100-0001'),
('Montgomery', 'Scott', '1966-09-08', 'scotty@starfleet.gov', '1701 Enterprise Way', '555-100-0002'),
('Hikaru', 'Sulu', '1966-09-08', 'sulu@starfleet.gov', '1701 Enterprise Way', '555-100-0003'),
('Nyota', 'Uhura', '1966-09-08', 'uhura@starfleet.gov', '1701 Enterprise Way', '555-100-0004'),
('Pavel', 'Chekov', '1966-09-08', 'chekov@starfleet.gov', '1701 Enterprise Way', '555-100-0005'),
('Leonard', 'McCoy', '1966-09-08', 'bones@starfleet.gov', '1701 Enterprise Way', '555-100-0006'),
('Deanna', 'Troi', '1987-09-28', 'troi@starfleet.gov', '1701D Enterprise Way', '555-200-0001'),
('Geordi', 'La Forge', '1987-09-28', 'laforge@starfleet.gov', '1701D Enterprise Way', '555-200-0002'),
('Worf', 'Son of Mogh', '1987-09-28', 'worf@starfleet.gov', '1701D Enterprise Way', '555-200-0003'),
('Beverly', 'Crusher', '1987-09-28', 'crusher@starfleet.gov', '1701D Enterprise Way', '555-200-0004'),
('Data', 'Android', '1987-09-28', 'data@starfleet.gov', '1701D Enterprise Way', '555-200-0005'),
('Wesley', 'Crusher', '1987-09-28', 'wesley@starfleet.gov', '1701D Enterprise Way', '555-200-0006'),
('Kira', 'Nerys', '1993-01-03', 'kira@ds9.gov', '1 Deep Space Nine', '555-300-0001'),
('Odo', 'Constable', '1993-01-03', 'odo@ds9.gov', '1 Deep Space Nine', '555-300-0002'),
('Jadzia', 'Dax', '1993-01-03', 'dax@ds9.gov', '1 Deep Space Nine', '555-300-0003'),
('Julian', 'Bashir', '1993-01-03', 'bashir@ds9.gov', '1 Deep Space Nine', '555-300-0004'),
('Miles', 'OBrien', '1993-01-03', 'obrien@ds9.gov', '1 Deep Space Nine', '555-300-0005'),
('Quark', 'Ferengi', '1993-01-03', 'quark@ds9.gov', '1 Deep Space Nine', '555-300-0006'),
('Seven', 'of Nine', '1995-01-16', 'seven@voyager.gov', '74656 Voyager Ln', '555-400-0001'),
('Chakotay', 'Commander', '1995-01-16', 'chakotay@voyager.gov', '74656 Voyager Ln', '555-400-0002');

-- Additional Staff (5 more)
INSERT INTO Staff (first_name, last_name, position) VALUES
('Guinan', 'El-Aurian', 'Counselor'),
('Keiko', 'OBrien', 'Archivist'),
('Nog', 'Ferengi', 'Junior Librarian'),
('Jake', 'Sisko', 'Research Assistant'),
('Lwaxana', 'Troi', 'Events Coordinator');

-- View for Books with Availability Status
CREATE VIEW Books_With_Availability AS
SELECT 
    b.bookID,
    b.title,
    b.author,
    b.isbn,
    b.publishedYear,
    b.genre,
    CASE 
        WHEN COUNT(btd.transactionDetailsID) = 0 THEN 'Available'
        WHEN SUM(CASE WHEN btd.returnDate IS NULL THEN 1 ELSE 0 END) > 0 THEN 'Checked Out'
        ELSE 'Available'
    END AS status,
    MAX(CASE WHEN btd.returnDate IS NULL THEN CONCAT(p.first_name, ' ', p.last_name) END) AS checkedOutBy
FROM Books b
LEFT JOIN Book_Transaction_Details btd ON b.bookID = btd.bookID
LEFT JOIN Book_Transactions bt ON btd.transactionID = bt.transactionID
LEFT JOIN Patrons p ON bt.patronID = p.patronID
GROUP BY b.bookID;
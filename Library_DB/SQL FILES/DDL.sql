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
    date date NOT NULL,
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

INSERT INTO Book_Transactions (patronID, numberBooks, staffID, date) VALUES
(3,2,1,'2024-04-27'),
(4,4,1,'2024-04-28'),
(1,4,2,'2024-04-29'),
(2,1,2,'2024-04-30');

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

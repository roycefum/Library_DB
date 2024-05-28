SET foreign_key_checks = 0;

DROP TABLE IF EXISTS Patron_Events_Attendance;
DROP TABLE IF EXISTS Book_Transaction_Details;
DROP TABLE IF EXISTS Book_Transactions;
DROP TABLE IF EXISTS Patron_Events;
DROP TABLE IF EXISTS Books;
DROP TABLE IF EXISTS Staff;
DROP TABLE IF EXISTS Patrons;

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

CREATE TABLE Staff (
    staffID int NOT NULL AUTO_INCREMENT,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    position varchar(255),
    PRIMARY KEY (staffID)
);

CREATE TABLE Books (
    bookID int NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    author varchar(255),
    isbn varchar(255) UNIQUE,
    publishedYear year,
    genre varchar(255),
    PRIMARY KEY (bookID)
);

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

CREATE TABLE Book_Transaction_Details (
    transactionDetailsID int NOT NULL AUTO_INCREMENT,
    transactionID int,
    bookID int,
    date date,
    dueDate date,
    PRIMARY KEY (transactionDetailsID),
    FOREIGN KEY (transactionID) REFERENCES Book_Transactions(transactionID) ON DELETE CASCADE,
    FOREIGN KEY (bookID) REFERENCES Books(bookID)
);

CREATE TABLE Patron_Events (
    eventID int NOT NULL AUTO_INCREMENT,
    eventName varchar(255) NOT NULL,
    event_Date datetime NOT NULL,
    description text,
    attendance int,
    staffID int NOT NULL,
    PRIMARY KEY (eventID),
    FOREIGN KEY (staffID) REFERENCES Staff(staffID)
);

CREATE TABLE Patron_Events_Attendance (
    eventsDetailID int NOT NULL AUTO_INCREMENT,
    patronID int,
    eventID int,
    PRIMARY KEY (eventsDetailID),
    FOREIGN KEY (patronID) REFERENCES Patrons(patronID),
    FOREIGN KEY (eventID) REFERENCES Patron_Events(eventID) ON DELETE CASCADE
);


INSERT INTO Patrons (first_name,last_name,membershipDate,email,address,phone)
VALUES 
('James', 'Kirk', '1964-03-15', 'jkirk@gmail.com', '1324 Random Ln', '555-387-9900'),
('Jean-Luc', 'Picard', '1987-08-29','jlpcapent@hotmail.com','7 Space Ct', '555-617-3568'),
('Benjamin', 'Sisko', '1994-12-02', 'emmisaryds9@gmail.com','1515 Promenade Ave', '555-703-0038'),
('Kathryn','Janeway','2000-06-18','lostindelta@yahoo.com','100367 Long Rd', '555-888-9276');

INSERT INTO Books (title, author, isbn, publishedYear, genre)
VALUES
('1984','George Orwell','1234567890123','1946', 'fiction'),
('To Kill a Mockingbird', 'Harper Lee', '2234567890223', '1971', 'courtroom'),
('Robinson Crusoe', 'Daniel Defoe', '3234567890323', '1875', 'survival'),
('The Color Purple','Alice Walker', '4234567890423', '1966', 'drama');

INSERT INTO Book_Transactions (patronID, numberBooks,staffID,date)
VALUES
(3,2,1,'2024-04-27'),
(4,4,1,'2024-04-28'),
(1,4,2,'2024-04-29'),
(2,1,2,'2024-04-30');

INSERT INTO Staff (first_name,last_name,position)
VALUES
('William', 'Riker','Manager'),
('Leonard', 'Nimoy','Customer Service'),
('Kira','Nerice','Special Collections'),
('Tom','Paris','Social Media');


INSERT INTO Book_Transaction_Details (transactionID,bookID,date,dueDate)
VALUES
(1,3, '2024-04-27', '2024-05-27'),
(2,3,'2024-04-27','2024-05-01'),
(3,3,'2024-04-27','2024-06-29'),
(4,1,'2024-04-28','2024-05-30');

INSERT INTO Patron_Events(eventName,event_Date,description,attendance,staffID)
VALUES
('welcome brunch','2024-04-03','eggs and bacon',3,1),
('dinner party', '2024-05-01','large buffet',4,1),
('silent auction','2024-06-04','big fundraiser',2,2),
('bingo night', '2023-11-18','great for older patrons', 4, 3);

INSERT INTO Patron_Events_Attendance (eventID,patronID)
VALUES
(1,1),
(1,2),
(1,3),
(2,4),
(2,3),
(2,2),
(2,1);


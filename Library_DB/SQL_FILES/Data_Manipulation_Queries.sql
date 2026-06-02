-- ====================================================================
-- DML Queries for the Library Database
-- This file contains SQL queries for adding, updating, deleting, and retrieving data
-- from the library database. Each query corresponds to specific functionalities
-- and entities within the library system.
-- ====================================================================

-- Add entries to each table

-- Insert new patron
INSERT INTO Patrons (first_name, last_name, membershipDate, email, address, phone)
VALUES (:first_nameInput, :last_nameInput, :membershipDateInput, :emailInput, :addressInput, :phoneInput);

-- Insert new book
INSERT INTO Books (title, author, isbn, publishedYear, genre)
VALUES (:titleInput, :authorInput, :isbnInput, :publishedYear_from_dropdown_Input, :genre_from_dropdown_Input);

-- Insert new book transaction
INSERT INTO Book_Transactions (patronID, numberBooks, staffID, date)
VALUES (:patronIDInput, :numberBooksInput, :staffIDInput, :date_from_calendarInput);

-- Insert new book transaction detail
INSERT INTO Book_Transaction_Details (transactionID, bookID, date, dueDate)
VALUES (:transactionIDInput, :bookIDInput, :date_from_calendarInput, :dueDate_from_calendarInput);

-- Insert new event
INSERT INTO Patron_Events (eventName, event_Date, description, attendance, staffID)
VALUES (:eventNameInput, :event_DateInput, :description_from_textboxInput, :attendanceInput, :staffIDInput);

-- Insert new staff member
INSERT INTO Staff (first_name, last_name, position)
VALUES (:first_nameInput, :last_nameInput, :positionInput);

-- Insert new event attendance record
INSERT INTO Patron_Events_Attendance (eventID, patronID)
VALUES (:eventIDInput, :patronIDInput);

-- Update entries based on form data

-- Update patron details
UPDATE Patrons
SET first_name = :first_nameInput, last_name = :last_nameInput, membershipDate = :membershipDateInput, email = :emailInput, address = :addressInput, phone = :phoneInput
WHERE patronID = :patronIDInput;

-- Update book details
UPDATE Books
SET title = :titleInput, author = :authorInput, isbn = :isbnInput, publishedYear = :publishedYearInput, genre = :genreInput
WHERE bookID = :bookIDInput;

-- Update event details
UPDATE Patron_Events
SET eventName = :eventNameInput, event_Date = :event_DateInput, description = :descriptionInput, attendance = :attendanceInput, staffID = :staffIDInput
WHERE eventID = :eventIDInput;

-- Update staff details
UPDATE Staff
SET first_name = :first_nameInput, last_name = :last_nameInput, position = :positionInput
WHERE staffID = :staffIDInput;

-- DELETE operations

-- Delete a patron
DELETE FROM Patrons WHERE patronID = :patronIDInput;

-- Delete a book
DELETE FROM Books WHERE bookID = :bookIDInput;

-- Delete a book transaction
DELETE FROM Book_Transactions WHERE transactionID = :transactionIDInput;

-- Delete a book transaction detail
DELETE FROM Book_Transaction_Details WHERE transactionDetailsID = :transactionDetailsIDInput;

-- Delete an event
DELETE FROM Patron_Events WHERE eventID = :eventIDInput;

-- Delete a staff member
DELETE FROM Staff WHERE staffID = :staffIDInput;

-- Delete an event attendance record
DELETE FROM Patron_Events_Attendance WHERE eventsDetailID = :eventsDetailIDInput;

-- DISPLAY Queries

-- Display all patrons
SELECT * FROM Patrons;

-- Display all books
SELECT * FROM Books;

-- Display all book transactions
SELECT * FROM Book_Transactions;

-- Display all book transaction details
SELECT * FROM Book_Transaction_Details;

-- Display all events
SELECT * FROM Patron_Events;

-- Display all event attendance records
SELECT * FROM Patron_Events_Attendance;

-- Display all staff members
SELECT * FROM Staff;

-- Query to find all books checked out by a specific patron
SELECT Books.title, Books.author, Books.isbn, Books.publishedYear, Books.genre
FROM Book_Transactions
JOIN Book_Transaction_Details ON Book_Transactions.transactionID = Book_Transaction_Details.transactionID
JOIN Books ON Book_Transaction_Details.bookID = Books.bookID
WHERE Book_Transactions.patronID = :patronIDInput;

-- Query to find all events attended by a specific patron
SELECT Patron_Events.eventName, Patron_Events.event_Date, Patron_Events.description, Patron_Events.attendance
FROM Patron_Events_Attendance
JOIN Patron_Events ON Patron_Events_Attendance.eventID = Patron_Events.eventID
WHERE Patron_Events_Attendance.patronID = :patronIDInput;

-- Query to find all events hosted by a specific staff member
SELECT Patron_Events.eventName, Patron_Events.event_Date, Patron_Events.description, Patron_Events.attendance
FROM Patron_Events
WHERE Patron_Events.staffID = :staffIDInput;

-- Query to find all transactions performed by a specific staff member
SELECT *
FROM Book_Transactions
WHERE Book_Transactions.staffID = :staffIDInput;

-- Query to find all transactions performed by a specific patron
SELECT *
FROM Book_Transactions
WHERE Book_Transactions.patronID = :patronIDInput;

-- Query to find all overdue books by a specific patron
SELECT Books.title, Books.author, Books.isbn, Book_Transaction_Details.dueDate
FROM Book_Transaction_Details
JOIN Books ON Book_Transaction_Details.bookID = Books.bookID
JOIN Book_Transactions ON Book_Transaction_Details.transactionID = Book_Transactions.transactionID
WHERE Book_Transactions.patronID = :patronIDInput
AND Book_Transaction_Details.dueDate < CURDATE();

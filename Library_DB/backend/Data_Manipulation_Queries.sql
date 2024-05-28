-- This file contains sample data manipulation queries for the library database

-- Add entries to each table

-- Patrons

INSERT INTO Patrons (first_name,last_name,membershipDate,email,address,phone)
VALUES (:first_nameInput,:last_nameInput,:membershipDateInput,:emailInput,:addressInput,:phoneInput)

-- Books

INSERT INTO Books (title, author, isbn, publishedYear, genre)
VALUES (:titleInput, :authorInput, :isbnInput, :publishedYear_from_dropdown_Input, :genre_from_dropdown_Input)

-- Book Transactions

INSERT INTO Book_Transactions (patronID, numberBooks,staffID,:date_from_calendarInput)
VALUES (:patronIDInput, :numberBooksInput,:staffIDInput,:date_from_calendarInput)

-- Book Transaction Details

INSERT INTO Book_Transaction_Details (transactionID,bookID,date,dueDate)
VALUES (:transactionIDInput,:bookIDInput,:date_from_calendarInput,:dueDate_from_calendarInput)

-- Patron Events

INSERT INTO Patron_Events(eventName,event_Date,description,attendance,staffID)
VALUES (:eventNameInput,:event_DateInput,:description_from_textboxInput,:attendanceInput,:staffIDInput)

-- Staff

INSERT INTO Staff (first_name,last_name,position)
VALUES (:first_nameInput,:last_nameInput,:positionInput)

-- Patron Events Attendance

INSERT INTO Patron_Events_Attendance (eventID,patronID)
VALUES (:eventIDInput,:patronIDInput)


-- Update entries based on form data

UPDATE Patrons SET first_name = :first_nameInput, last_name = :last_nameInput, membershipDate = :membershipDateInput,email = :emailInput,address = :addressInput,:phoneInput
UPDATE Books SET patronID = :patronIDInput, numberBooks = :numberBooksInput,staff = :staffIDInput,date = :date_from_calendarInput
UPDATE Patron_Events SET eventName = :eventNameInput, event_Date = :event_DateInput, description = :description_from_textboxInput, attendance = :attendanceInput, staff = :staffIDInput
UPDATE Staff SET first_name = :first_nameInput,last_name = :last_nameInput,position = :positionInput

-- DELETE

DELETE FROM Patrons WHERE patronID = :patron_ID_selected_from_browse_patron_page
DELETE FROM Books WHERE bookID = :book_ID_selected_from_browse_book_page
DELETE FROM Book_Transactions WHERE transactionID = :transaction_ID_selected_from_browse_transaction_page
DELETE FROM Book_Transaction_Details WHERE transactionDetailsID = transactionDetails_ID_selected_from_browse_transactionDetails_ID_page
DELETE FROM Patron_Events WHERE eventID = :event_ID_selected_from_browse_event_page
DELETE FROM Staff WHERE staffID = :staff_ID_selected_from_browse_staff_page
DELETE FROM Patron_Events_Attendance WHERE patronID = :patron_ID_selected_from_browse_event_attendance_page

-- DISPLAY

-- ALL Tables
SELECT * FROM Patrons
SELECT * FROM Books
SELECT * FROM Book_Transactions
SELECT * FROM Book_Transaction_Details
SELECT * FROM Patron_Events
SELECT * FROM Patron_Events_Attendance
SELECT * FROM Staff

-- Every book checked out by a patron

SELECT Books.title, Books.author, Books.isbn, Books.publishedYear, Books.genre
FROM Book_Transactions
JOIN Book_Transaction_Details ON Book_Transactions.transactionID = Book_Transaction_Details.transactionID
JOIN Books ON Book_Transaction_Details.bookID = Books.bookID
WHERE Book_Transactions.patronID = :patronIDInput;

-- Every event attended by a patron

SELECT Patron_Events.eventName, Patron_Events.event_Date, Patron_Events.description, Patron_Events.attendance
FROM Patron_Events_Attendance
JOIN Patron_Events ON Patron_Events_Attendance.eventID = Patron_Events.eventID
WHERE Patron_Events_Attendance.patronID = :patronIDInput;

-- Every event hosted by a certain staff member

SELECT Patron_Events.eventName, Patron_Events.event_Date, Patron_Events.description, Patron_Events.attendance
FROM Patron_Events
JOIN Staff ON Patron_Events.staffID = Staff.staffID
WHERE Staff.staffID = :staffIDInput;

-- every transaction performed by a staff member

SELECT *
FROM Book_Transactions
WHERE staffID = :staffIDInput;

-- every transaction performed by a certain patron

SELECT *
FROM Book_Transactions
WHERE patronID = :patronIDInput;

-- overdue books by patron

SELECT Books.title, Books.author, Books.isbn, Book_Transaction_Details.dueDate
FROM Book_Transaction_Details
JOIN Books ON Book_Transaction_Details.bookID = Books.bookID
JOIN Book_Transactions ON Book_Transaction_Details.transactionID = Book_Transactions.transactionID
WHERE Book_Transactions.patronID = :patronIDInput
AND Book_Transaction_Details.dueDate < CURDATE();



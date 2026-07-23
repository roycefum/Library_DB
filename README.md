# 📚 Read-Renaissance

A full-stack library management system for libraries and community centers. Manage book checkouts and returns, patron memberships, staff, and events — all through a clean web interface.

---

## 🌐 Live Demo

Try it right now, no setup required: **[librarydb-production-7024.up.railway.app](https://librarydb-production-7024.up.railway.app)**

- Browsing, checkout/check-in, and adding/editing records (books, patrons, staff, events) are all open — feel free to click around and try things out.
- **Delete actions are password-protected** to keep the shared demo data intact. You'll be prompted for an admin key if you try to delete something — that's expected, not a bug.

---

## Table of Contents
- [Live Demo](#-live-demo)
- [Features](#features)
- [Running It Locally](#running-it-locally)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Database Schema](#database-schema)
- [Design Decisions](#design-decisions)
- [Project Structure](#project-structure)
- [Future Improvements](#future-improvements)

---

## Features

- **Book Checkout** — Cart-based checkout flow, checks availability in real time
- **Book Check In** — Pull up a patron and check in individual books, with overdue highlighting
- **Book Inventory** — Full CRUD with availability status (Available / Checked Out) and who has each book
- **Patron Management** — Member profiles, contact details, membership history
- **Transaction History** — Full audit trail with transaction detail lookup
- **Event Management** — Schedule events, manage attendance, view patron event history
- **Staff Administration** — Staff records and roles
- **Configurable Loan Period** — Set loan duration via the Settings table

---

## Running It Locally

Prefer to run it on your own machine instead of using the live demo? Follow the setup steps below.

> ⏱️ **Estimated setup time: 10-20 minutes**

## Tech Stack

| Layer | Technology |
|---|---|
| Database | MySQL |
| Backend | Node.js, Express |
| Database Client | mysql2 |
| Middleware | CORS |
| Frontend | HTML, CSS, Vanilla JavaScript |

---

## Prerequisites

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MySQL 8.0](https://dev.mysql.com/downloads/mysql/)

---

## Getting Started

Jump to your OS:
- [Mac](#mac)
- [Linux](#linux)
- [Windows](#windows)

---

### Mac

**1. Install Homebrew (if not already installed):**
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**2. Install MySQL:**
```bash
brew install mysql
brew services start mysql
```

**3. Secure MySQL (optionally set a root password):**
```bash
mysql_secure_installation
```

**4. Clone the repo:**
```bash
git clone https://github.com/roycefum/Library_DB.git
cd Library_DB
```

**5. Install dependencies:**
```bash
npm install
```

**6. Create the database and import schema:**
```bash
mysql -u root --skip-password -e "CREATE DATABASE read_renaissance;"
mysql -u root --skip-password read_renaissance < SQL_FILES/DDL.sql
```
> If you set a root password, replace `--skip-password` with `-p` and enter your password when prompted.

**7. Create the `.env` file:**

Open the project in VS Code, create a new file called `.env` in the root folder and paste:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=read_renaissance
PORT=3000
```
> Set `DB_PASSWORD` to your MySQL root password if you set one, otherwise leave it blank.

Or create it from the terminal:
```bash
printf "DB_HOST=localhost\nDB_USER=root\nDB_PASSWORD=\nDB_NAME=read_renaissance\nPORT=3000" > .env
```

**8. Start the server:**
```bash
node app.js
```

**9. Open the app:**
```
http://localhost:3000/index.html
```

---

### Linux

**1. Install MySQL:**
```bash
sudo apt-get install mysql-server
sudo service mysql start
```

**2. Clone the repo:**
```bash
git clone https://github.com/roycefum/Library_DB.git
cd Library_DB
```

**3. Install dependencies:**
```bash
npm install
```

**4. Create the database and import schema:**
```bash
sudo mysql -u root -e "CREATE DATABASE read_renaissance;"
sudo mysql -u root read_renaissance < SQL_FILES/DDL.sql
```

**5. Create the `.env` file:**

Open the project in VS Code, create a new file called `.env` in the root folder and paste:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=read_renaissance
PORT=3000
```

Or create it from the terminal:
```bash
printf "DB_HOST=localhost\nDB_USER=root\nDB_PASSWORD=\nDB_NAME=read_renaissance\nPORT=3000" > .env
```

**6. Start the server:**
```bash
node app.js
```

**7. Open the app:**
```
http://localhost:3000/index.html
```

---

### Windows

> ⚠️ Use **Command Prompt** for all commands below. PowerShell does not support the `<` operator needed for importing SQL files.

> ⚠️ Every MySQL command will prompt for your password. If you mistype it you will not see an error — the command will just silently fail. If something isn't working, re-run the command and carefully retype your password.

**1. Install prerequisites:**
- [Git for Windows](https://git-scm.com/download/win) — use default settings
- [Node.js](https://nodejs.org/) — use default settings
- [MySQL 8.0 MSI Installer](https://dev.mysql.com/downloads/mysql/) — download the Windows MSI Installer

**2. Install MySQL 8.0:**
1. Run the installer and choose **Server Only**
2. Click through the configuration wizard leaving everything as default
3. When prompted set a root password — **write it down**
4. Complete the installation

**3. Add MySQL to PATH:**

Open Command Prompt and run:
```cmd
setx PATH "%PATH%;C:\Program Files\MySQL\MySQL Server 8.0\bin"
```
Close and reopen Command Prompt. Verify with:
```cmd
mysql --version
```

**4. Start MySQL Service:**
1. Press **Windows + R**, type `services.msc`, hit Enter
2. Find **MySQL80** in the list
3. If status is blank or stopped, right click → **Start**

**5. Clone the repo:**
```cmd
git clone https://github.com/roycefum/Library_DB.git
```
Then navigate into the project folder:
```cmd
cd Library_DB
```
> After cloning, Command Prompt may return to your home directory. If so, run `cd Library_DB` to navigate into the project folder before continuing.

**6. Install dependencies:**
```cmd
npm install
```

**7. Create the database and import schema:**

First create the database:
```cmd
mysql -u root -p -e "DROP DATABASE IF EXISTS read_renaissance; CREATE DATABASE read_renaissance;"
```
Enter your root password when prompted. Then import the schema:
```cmd
mysql -u root -p read_renaissance < "SQL_FILES\DDL.sql"
```
Enter your root password again when prompted. No output means it worked.

**8. Create the `.env` file:**

Copy and paste each line below into Command Prompt one at a time, pressing Enter after each one. No output after each line is normal and means it worked. When you reach the password line, replace `yourpassword` with your actual MySQL root password before pressing Enter:

```cmd
echo DB_HOST=localhost> .env
```
```cmd
echo DB_USER=root>> .env
```
```cmd
echo DB_PASSWORD=yourpassword>> .env
```
```cmd
echo DB_NAME=read_renaissance>> .env
```
```cmd
echo PORT=3000>> .env
```

> If you have VS Code installed, an easier option is to open the project folder in VS Code, create a new file called `.env` and paste the following — replacing `yourpassword` with your MySQL root password:
> ```
> DB_HOST=localhost
> DB_USER=root
> DB_PASSWORD=yourpassword
> DB_NAME=read_renaissance
> PORT=3000
> ```

**9. Start the server:**
```cmd
node app.js
```

**10. Open the app:**
```
http://localhost:3000/index.html
```

---

## Database Schema

| Table | Description |
|---|---|
| `Patrons` | Library member records |
| `Books` | Book inventory |
| `Book_Transactions` | Checkout/checkin transaction headers |
| `Book_Transaction_Details` — Per-book details for each transaction (due date, return date) |
| `Staff` | Staff records and roles |
| `Patron_Events` | Library event definitions |
| `Patron_Events_Attendance` | Junction table linking patrons to events |
| `Settings` | Configurable system settings (e.g. loan period) |

### Views

- **`Books_With_Availability`** — Books table with real-time availability status and current holder derived from open transactions

---

## Design Decisions

- **Availability is derived, not stored** — Book status is calculated from open transactions via a SQL view, eliminating data redundancy
- **Transactions are immutable** — Once created, transactions can only be deleted, not edited, to preserve data integrity
- **Loan period is configurable** — Stored in the Settings table rather than hardcoded, so it can be changed without touching code
- **Cart-based checkout** — Books are added to an in-memory cart before a single atomic database transaction creates all records at once
- **Normalised schema** — Transaction details are separated from transaction headers to support multi-book checkouts without duplication
- **Availability check on checkout** — The system prevents checking out a book that already has an open transaction

---

## Project Structure

```
Library_DB/
├── app.js                    # Express server entry point
├── package.json
├── .env                      # Database credentials (create this yourself, not in repo)
├── index.html                # Homepage
├── pages/                    # Frontend HTML pages
│   ├── browse_books.html
│   ├── book_checkout.html
│   ├── book_checkin.html
│   ├── view_book_transactions.html
│   ├── browse_patrons.html
│   ├── view_patron_events.html
│   ├── view_staff.html
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── utils.js          # Shared sort utility
├── api/
│   ├── routes/               # Express route definitions
│   ├── controllers/          # Business logic and database queries
│   ├── middleware/
│   │   └── requireAdmin.js   # Shared-secret gate for delete endpoints
│   └── helpers/
│       └── database/
│           └── db-connector.js
└── SQL_FILES/
    └── DDL.sql               # Schema and seed data
```

---

## Future Improvements

- [x] Basic write protection — delete endpoints are gated behind a shared admin key (`api/middleware/requireAdmin.js`)
- [ ] Full authentication and role-based access control (patron vs. staff vs. manager)
- [ ] Overdue notification system
- [ ] Renewal transaction workflow
- [ ] API documentation (Swagger / OpenAPI)

---

## License

MIT
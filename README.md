# 📚 Read-Renaissance

A full-stack library management system for libraries and community centers. Manage book checkouts and returns, patron memberships, staff, and events — all through a clean web interface.

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

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MySQL](https://dev.mysql.com/downloads/mysql/) (v8 or higher)

To verify they're installed, open a terminal and run:

```bash
node -v
mysql --version
```

---

## Getting Started

### 1. Get the Code

**Option A — Git (recommended):**

```bash
git clone https://github.com/roycefum/Library_DB.git
```

**Option B — Download ZIP (no Git required):**
1. Go to https://github.com/roycefum/Library_DB
2. Click the green **Code** button
3. Click **Download ZIP**
4. Unzip the folder

> ⚠️ **Important:** After cloning or unzipping you will have a `Library_DB` folder inside another `Library_DB` folder. Make sure you navigate into the **inner** folder before running any commands:
> ```bash
> cd Library_DB/Library_DB
> ```
> If you run commands from the outer folder, nothing will work.

---

### 2. Install Dependencies

```bash
npm install
```

> ⚠️ **Don't skip this step.** The app will not run without it. Run this from inside the `Library_DB/Library_DB` folder.

*(On Windows, open Command Prompt or PowerShell in the project folder)*

---

### 3. Set Up MySQL

#### Mac

Start MySQL:
```bash
brew services start mysql
```

Log in:
```bash
mysql -u root --skip-password
```

#### Linux

Start MySQL:
```bash
sudo service mysql start
```

Log in:
```bash
mysql -u root --skip-password
```

#### Windows

MySQL on Windows is typically installed via the [MySQL Installer](https://dev.mysql.com/downloads/installer/). Once installed:

1. Open **MySQL Command Line Client** from the Start Menu
2. Enter your root password when prompted (set during installation — if you can't remember it, see [resetting MySQL root password on Windows](https://dev.mysql.com/doc/refman/8.0/en/resetting-permissions.html))

Or use **MySQL Workbench** if you prefer a GUI.

> **Windows tip:** If you set a root password during installation, replace `--skip-password` with `-p` in all MySQL commands below and enter your password when prompted.

---

### 4. Create the Database

Run these commands inside the MySQL prompt:

```sql
CREATE DATABASE read_renaissance;
EXIT;
```

---

### 5. Import the Schema and Seed Data

**Mac / Linux:**
```bash
mysql -u root --skip-password read_renaissance < "SQL FILES/DDL.sql"
```

**Windows (Command Prompt):**
```cmd
mysql -u root -p read_renaissance < "SQL FILES\DDL.sql"
```

**Windows (PowerShell):**
```powershell
Get-Content "SQL FILES\DDL.sql" | mysql -u root -p read_renaissance
```

> **Note:** The folder is called `SQL FILES` with a space. Make sure to include the quotes around it exactly as shown, otherwise the terminal won't find it.

---

### 6. Configure the Database Connection

Create a `.env` file in the `Library_DB/Library_DB` folder with the following contents:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=read_renaissance
PORT=3000
```

> **Important:** The `.env` file is not included in the repository for security reasons — you must create it yourself. Without it the app will not connect to the database.
>
> Set `DB_PASSWORD` to your MySQL root password if you have one, otherwise leave it blank.

---

### 7. Start the Server

```bash
node app.js
```

You should see:
```
Server running on http://localhost:3000
```

---

### 8. Open the App

Open your browser and go to:

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
| `Book_Transaction_Details` | Per-book details for each transaction (due date, return date) |
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
- **Loan period is configurable** — Stored in the `Settings` table rather than hardcoded, so it can be changed without touching code
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
│   └── helpers/
│       └── database/
│           └── db-connector.js
└── SQL FILES/
    └── DDL.sql               # Schema and seed data
```

---

## Future Improvements

- [ ] Authentication and role-based access control (patron vs. staff vs. manager)
- [ ] Overdue notification system
- [ ] Renewal transaction workflow
- [ ] API documentation (Swagger / OpenAPI)

---

## License

MIT
# 📚 Read-Renaissance

A full-stack library management system for libraries and community centers. Manage book checkouts and returns, patron memberships, staff, and events — all through a clean web interface.

---

## Table of Contents
- [Features](#features)
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

Jump to your OS:
- [Mac](#mac)
- [Linux](#linux)
- [Windows](#windows)

---

#### Mac

If you don't have Homebrew installed, get it first:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Install and start MySQL:
```bash
brew install mysql
brew services start mysql
```

Run the secure installation (optionally sets a root password):
```bash
mysql_secure_installation
```

Follow the prompts. If you skip setting a password, use `--skip-password` in all MySQL commands. If you set one, use `-p` instead and enter it when prompted.

Log in to verify it works:
```bash
# If no password:
mysql -u root --skip-password

# If you set a password:
mysql -u root -p
```

---

#### Linux

Install and start MySQL:
```bash
sudo apt-get install mysql-server
sudo service mysql start
```

Log in:
```bash
sudo mysql -u root
```

---

#### Windows

**Step 1 — Download**
1. Go to [dev.mysql.com/downloads/installer](https://dev.mysql.com/downloads/installer/)
2. Download the **MySQL Installer for Windows** (the larger "Full" version is easier for beginners)
3. Run the installer

**Step 2 — Choose Setup Type**
Select **Developer Default** or **Server Only** — either works for this project

**Step 3 — Installation**
Click **Execute** to download and install the components. Wait for all items to show a green checkmark.

**Step 4 — Product Configuration**
Click **Next** to begin configuring MySQL Server

**Step 5 — Type and Networking**
- Config Type: **Development Computer**
- Port: **3306** (leave as default)
- Click **Next**

**Step 6 — Authentication Method**
Select **Use Strong Password Encryption** (recommended) and click **Next**

**Step 7 — Accounts and Roles (Root Password)**
- Set a root password — **write this down**, you will need it later
- Leave the user accounts section empty
- Click **Next**

**Step 8 — Windows Service**
- Configure MySQL Server as a Windows Service: **Yes** (leave checked)
- Windows Service Name: **MySQL80** (leave as default)
- Start the MySQL Server at System Startup: **Yes** (recommended)
- Run Windows Service as: **Standard System Account** (leave as default)
- Click **Next**

**Step 9 — Apply Configuration**
Click **Execute** and wait for all steps to complete with green checkmarks, then click **Finish**

**Step 10 — Complete the Wizard**
Click through any remaining screens and click **Finish**

**Step 11 — Verify MySQL is Running**

MySQL should start automatically as a Windows Service. If you get connection errors:

1. Press **Windows + R**, type `services.msc`, hit Enter
2. Find **MySQL80** in the list
3. If status is not **Running**, right click → **Start**

Or via Command Prompt (run as Administrator):
```cmd
net start mysql80
```

**Step 12 — Open MySQL Command Line Client**

Open **MySQL Command Line Client** from the Start Menu and enter your root password. You should see the `mysql>` prompt.

> **Note:** All MySQL commands for Windows in this README are run inside MySQL Command Line Client, not PowerShell or Command Prompt.

---

### 4. Create the Database and Import Schema

> ⚠️ **Mac/Linux:** Run these commands in your regular terminal.
> ⚠️ **Windows:** Run these commands inside **MySQL Command Line Client**.

**Step 1 — Log into MySQL (Mac/Linux only — Windows users are already in MySQL Command Line Client)**

```bash
# If no password:
mysql -u root --skip-password

# If you set a password:
mysql -u root -p
```

**Step 2 — Create the database** (you are now inside MySQL, the prompt shows `mysql>`)

```sql
CREATE DATABASE read_renaissance;
EXIT;
```

**Step 3 — Import the schema** 

> ⚠️ You should now be back in your regular terminal (not inside MySQL). If you still see `mysql>`, type `EXIT;` and press Enter first.

**Mac / Linux:**
```bash
mysql -u root --skip-password read_renaissance < SQL_FILES/DDL.sql
```

**Windows — run this inside MySQL Command Line Client:**
```sql
USE read_renaissance;
SOURCE C:/Users/YourUsername/Library_DB/Library_DB/SQL_FILES/DDL.sql;
```

> Replace `YourUsername` with your actual Windows username and adjust the path if you saved the project in a different location. Use forward slashes `/` not backslashes `\`.

---

### 5. Configure the Database Connection

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

### 6. Start the Server

```bash
node app.js
```

You should see:
```
Server running on http://localhost:3000
```

---

### 7. Open the App

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
└── SQL_FILES/
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

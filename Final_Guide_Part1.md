# ZYNDEX – COMPLETE FULL-STACK DEVELOPMENT GUIDE
## Web-Based Educational Resource Library - Part 1

---

## 📚 TABLE OF CONTENTS

1. [Project Overview](#project-overview)
2. [System Requirements](#system-requirements)
3. [Installation Guide](#installation-guide)
4. [Theory & Concepts](#theory-and-concepts)
5. [Database Setup](#database-setup)

---

## PROJECT OVERVIEW

### Problem Statement

Educational institutions and learners often struggle to find, organize, and share quality educational resources in a centralized manner. Resources are scattered across multiple platforms, making it difficult to maintain, access, and manage educational content effectively.

**Zyndex** solves this problem by providing a centralized, web-based educational resource library where:
- **Users** can browse, search, download educational resources, and provide feedback
- **Admins** can upload, manage, and organize educational resources
- All resources are categorized, rated, and easily searchable
- The system maintains quality through admin moderation

### User Roles

**1. ADMIN**
- Upload educational resources (PDFs, videos, documents)
- Manage all resources (edit, delete)
- View all user feedback
- Moderate content
- Access admin dashboard with statistics

**2. USER (Regular Student/Learner)**
- Browse and search resources
- Download resources
- Rate resources
- Provide feedback
- View personal profile
- Track download history

### System Flow (Frontend → Backend → Database)

```
USER INTERACTION (Browser)
         ↓
REACT FRONTEND (UI Components)
         ↓
AXIOS HTTP REQUESTS (API Calls)
         ↓
SPRING BOOT BACKEND (REST Controllers)
         ↓
SERVICE LAYER (Business Logic)
         ↓
REPOSITORY LAYER (JPA/Hibernate)
         ↓
MYSQL DATABASE (Data Storage)
         ↓
RESPONSE flows back through same layers
```

**Example: User Downloads a Resource**
1. User clicks "Download" button in React frontend
2. React sends GET request via Axios to `/api/resources/{id}/download`
3. Spring Boot Controller receives request
4. Service layer checks user permissions
5. Repository fetches resource details from MySQL
6. File is retrieved from server storage
7. Response with file is sent back to frontend
8. User's browser downloads the file

---

## SYSTEM REQUIREMENTS

### Hardware Requirements
- **Processor**: Intel Core i3 or higher
- **RAM**: Minimum 8GB (16GB recommended)
- **Storage**: At least 10GB free space
- **Internet**: Stable internet connection for downloads

### Software Requirements
- **Operating System**: Windows 10/11, macOS, or Linux
- **Browser**: Chrome, Firefox, Edge (latest versions)

---

## INSTALLATION GUIDE

This section will guide you through installing all necessary tools from scratch.

---

### 1. INSTALLING GIT

**What is Git?**
Git is a version control system that tracks changes in your code. It allows you to save different versions of your project and collaborate with others.

**Step-by-Step Installation:**

**For Windows:**
1. Go to https://git-scm.com/download/windows
2. Download the latest version (64-bit Git for Windows Setup)
3. Run the downloaded `.exe` file
4. Click "Next" through the installation wizard
5. **Important selections:**
   - Select "Git from the command line and also from 3rd-party software"
   - Choose "Use Visual Studio Code as Git's default editor" (or your preferred editor)
   - Select "Checkout as-is, commit Unix-style line endings"
6. Click "Install"
7. Click "Finish"

**For macOS:**
1. Open Terminal (press Cmd + Space, type "Terminal")
2. Install Homebrew first (if not installed):
   ```
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. Install Git:
   ```
   brew install git
   ```

**For Linux (Ubuntu/Debian):**
1. Open Terminal (Ctrl + Alt + T)
2. Run:
   ```
   sudo apt update
   sudo apt install git
   ```

**Verify Installation:**
1. Open Command Prompt (Windows) or Terminal (macOS/Linux)
2. Type: `git --version`
3. You should see something like: `git version 2.41.0`

---

### 2. INSTALLING JAVA 17 (JDK)

**What is Java?**
Java is the programming language used to build the backend of Zyndex. JDK (Java Development Kit) contains tools to compile and run Java programs.

**Step-by-Step Installation:**

**For Windows:**
1. Go to https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html
2. Download "Windows x64 Installer"
3. Run the downloaded `.exe` file
4. Click "Next" through the installation
5. Note the installation path (e.g., `C:\Program Files\Java\jdk-17`)
6. Click "Close" when finished

**Setting Environment Variables (Windows):**
1. Right-click "This PC" → Properties
2. Click "Advanced system settings"
3. Click "Environment Variables"
4. Under "System variables", click "New"
5. Variable name: `JAVA_HOME`
6. Variable value: Your JDK installation path (e.g., `C:\Program Files\Java\jdk-17`)
7. Click OK
8. Find "Path" in System variables, select it, click "Edit"
9. Click "New", add: `%JAVA_HOME%\bin`
10. Click OK on all windows

**For macOS:**
1. Download from Oracle website (same link as above) - macOS installer
2. Open the downloaded `.dmg` file
3. Double-click the package icon
4. Follow installation prompts
5. Add to bash profile:
   ```
   echo 'export JAVA_HOME=$(/usr/libexec/java_home)' >> ~/.bash_profile
   source ~/.bash_profile
   ```

**For Linux:**
```
sudo apt update
sudo apt install openjdk-17-jdk
```

**Verify Installation:**
1. Open new Command Prompt/Terminal
2. Type: `java -version`
3. Type: `javac -version`
4. Both should show version 17.x.x

---

### 3. INSTALLING SPRING TOOL SUITE (STS)

**What is STS?**
Spring Tool Suite is an IDE (Integrated Development Environment) specifically designed for developing Spring Boot applications. It's like a smart text editor with many helpful features.

**Step-by-Step Installation:**

1. Go to https://spring.io/tools
2. Download "Spring Tools 4 for Eclipse" for your operating system
3. Extract the downloaded zip file to a location like `C:\STS` (Windows) or `/Applications` (macOS)
4. Open the extracted folder
5. Double-click `SpringToolSuite4.exe` (Windows) or `SpringToolSuite4.app` (macOS)
6. Choose a workspace location (this is where your projects will be saved)
   - Example: `C:\Users\YourName\workspace`
7. Click "Launch"

**First Time Setup:**
1. STS will open with a Welcome screen
2. Close the welcome tab
3. You'll see the main workspace
4. Go to Window → Preferences
5. Navigate to Java → Installed JREs
6. Click "Add" → Standard VM → Next
7. Browse to your JDK 17 installation directory
8. Click Finish → Apply and Close

---

### 4. INSTALLING MYSQL DATABASE

**What is MySQL?**
MySQL is a database management system that stores all data for Zyndex (users, resources, feedback, etc.)

**Step-by-Step Installation:**

**For Windows:**
1. Go to https://dev.mysql.com/downloads/installer/
2. Download "MySQL Installer" (larger file, ~300MB)
3. Run the downloaded `.msi` file
4. Choose "Developer Default" setup type
5. Click "Next" and "Execute" to install all components
6. **MySQL Server Configuration:**
   - Config Type: Development Computer
   - Port: 3306 (default)
   - Authentication: Use Strong Password Encryption
   - Root Password: Enter a password (e.g., `root123`)
   - **REMEMBER THIS PASSWORD!**
7. Create a user account:
   - Username: `zyndex_admin`
   - Password: `zyndex123`
   - Role: DB Admin
8. Windows Service Name: MySQL80 (default)
9. Run as Windows Service: ✓ (checked)
10. Click "Execute" to apply configuration
11. Click "Finish"

**For macOS:**
1. Go to https://dev.mysql.com/downloads/mysql/
2. Download macOS DMG Archive
3. Open the `.dmg` file
4. Install the `.pkg` file
5. Remember the temporary root password shown
6. Open System Preferences → MySQL
7. Start MySQL Server
8. Open Terminal and set password:
   ```
   mysql -u root -p
   (enter temporary password)
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'root123';
   ```

**For Linux:**
```
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

**Verify Installation:**
1. Open Command Prompt/Terminal
2. Type: `mysql -u root -p`
3. Enter your root password
4. You should see: `mysql>`
5. Type: `exit` to quit

**Installing MySQL Workbench (GUI Tool):**
1. Go to https://dev.mysql.com/downloads/workbench/
2. Download for your operating system
3. Install it
4. Open MySQL Workbench
5. Click on "Local instance 3306"
6. Enter root password
7. You now have a visual interface to manage databases

---

### 5. INSTALLING VISUAL STUDIO CODE (VS CODE)

**What is VS Code?**
VS Code is a lightweight, powerful code editor perfect for React frontend development.

**Step-by-Step Installation:**

**For Windows:**
1. Go to https://code.visualstudio.com/
2. Click "Download for Windows"
3. Run the downloaded installer
4. Accept the agreement
5. **Important:** Check all boxes:
   - ✓ Add "Open with Code" action to context menu
   - ✓ Add to PATH
6. Click "Install"
7. Click "Finish"

**For macOS:**
1. Go to https://code.visualstudio.com/
2. Download for macOS
3. Open the downloaded `.zip`
4. Drag "Visual Studio Code" to Applications folder
5. Open VS Code from Applications

**For Linux:**
```
sudo snap install --classic code
```

**Install Essential Extensions:**
1. Open VS Code
2. Click Extensions icon (or press Ctrl+Shift+X)
3. Search and install:
   - "ES7+ React/Redux/React-Native snippets"
   - "Prettier - Code formatter"
   - "ESLint"
   - "Auto Rename Tag"
   - "Path Intellisense"

---

### 6. INSTALLING NODE.JS (LTS VERSION)

**What is Node.js?**
Node.js allows you to run JavaScript on your computer (not just in browsers) and comes with npm (Node Package Manager) to install React and other libraries.

**Step-by-Step Installation:**

**For Windows:**
1. Go to https://nodejs.org/
2. Download "LTS" version (Long Term Support) - recommended for most users
3. Run the downloaded `.msi` file
4. Click "Next" through installation
5. Accept license agreement
6. **Important:** Keep all default components checked, especially "npm package manager"
7. Check "Automatically install necessary tools" (optional but helpful)
8. Click "Install"
9. Click "Finish"

**For macOS:**
1. Go to https://nodejs.org/
2. Download macOS Installer (LTS)
3. Open the downloaded `.pkg`
4. Follow installation prompts
5. Or use Homebrew:
   ```
   brew install node
   ```

**For Linux:**
```
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Verify Installation:**
1. Open NEW Command Prompt/Terminal
2. Type: `node -v`
3. Should show: `v20.x.x` (or similar LTS version)
4. Type: `npm -v`
5. Should show: `10.x.x` (or similar)

---

## DATABASE SETUP

Before running the application, set up the MySQL database.

**Step 1: Open MySQL Workbench**
1. Launch MySQL Workbench
2. Connect to "Local instance 3306"
3. Enter root password

**Step 2: Create Database**

Run this SQL script:

```sql
-- Create database
CREATE DATABASE IF NOT EXISTS zyndex_db;

-- Use the database
USE zyndex_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('USER', 'ADMIN') DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT,
    file_type VARCHAR(50),
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    download_count INT DEFAULT 0,
    uploaded_by BIGINT NOT NULL,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_category (category),
    INDEX idx_uploaded_by (uploaded_by)
);

-- Create ratings table
CREATE TABLE IF NOT EXISTS ratings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resource_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    rating_value INT NOT NULL CHECK (rating_value BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_resource_rating (user_id, resource_id),
    INDEX idx_resource_id (resource_id),
    INDEX idx_user_id (user_id)
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('PENDING', 'REVIEWED', 'RESOLVED') DEFAULT 'PENDING',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status)
);

-- Insert sample admin user
-- Password: admin123 (BCrypt encoded)
INSERT INTO users (name, email, password, role) 
VALUES ('Admin User', 'admin@zyndex.com', '$2a$10$N3GVZh1UznLNfM4nQKgCQuTNmNVJFxJdWRPb9K.xGh3yVcQPGqR0m', 'ADMIN');

-- Insert sample regular user
-- Password: user123 (BCrypt encoded)
INSERT INTO users (name, email, password, role) 
VALUES ('John Doe', 'user@zyndex.com', '$2a$10$5Y3Q4OTZ5zzwG2VPNnVmfuN.xDWFZxI2J9yTnXVLFYKXjK0VXQxOW', 'USER');

-- Verify tables created
SHOW TABLES;

-- Check users
SELECT id, name, email, role FROM users;
```

**Alternative: Let Hibernate Create Tables**

If you set `spring.jpa.hibernate.ddl-auto=update` in application.properties, Hibernate will automatically create tables. But you'll need to manually insert the admin user.

---

**Continue to Part 2 for Theory & Concepts, and Part 3 for Complete Source Code**

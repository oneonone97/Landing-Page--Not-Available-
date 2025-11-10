# Login Credentials Guide - MyShop E-commerce

## Authentication System Overview

MyShop uses a **JWT-based authentication system** with user registration. There are **NO DEFAULT/PRE-CREATED ACCOUNTS**. You must register a new user first.

---

## How to Login - Step by Step

### Step 1: Start Both Servers

**Backend Server:**
```bash
cd "c:\Users\rohan\Rohan\Ecommerce Website\MyShop-backend"
npm run dev
```
Should display:
```
Server running on port 5000
SQLite database connection established successfully
```

**Frontend Server (New Terminal):**
```bash
cd "c:\Users\rohan\Rohan\Ecommerce Website\myshopReact\my-project"
npm run dev
```
Should display:
```
Local: http://localhost:5175/
```

---

### Step 2: Register Your First User

1. **Open Browser:** Navigate to [http://localhost:5175/login](http://localhost:5175/login)

2. **Click "Sign Up"** button at the bottom of the login form

3. **Fill Registration Form:**
   - **Full Name:** `John Doe` (or any name)
   - **Email:** `john@example.com` (must be valid email format)
   - **Password:** `password123` (minimum 6 characters)
   - **Confirm Password:** `password123` (must match)

4. **Click "Sign Up"** button

5. **Success!** You'll be automatically logged in and redirected to the homepage

---

### Step 3: Login with Your Account

1. **Visit Login Page:** [http://localhost:5175/login](http://localhost:5175/login)

2. **Enter Credentials:**
   - **Email:** `john@example.com` (the email you registered with)
   - **Password:** `password123` (the password you chose)

3. **Click "Sign In"**

4. **Logged In!** You should see:
   - Your name in the header (top right)
   - Cart badge showing "0"
   - Full access to all features

---

## Example Test Accounts to Create

Since there are no pre-existing accounts, here are suggested test accounts you can create:

### User Account 1
```
Name: John Doe
Email: john@example.com
Password: password123
```

### User Account 2
```
Name: Jane Smith
Email: jane@example.com
Password: password123
```

### Admin Account (Optional)
```
Name: Admin User
Email: admin@myshop.com
Password: admin123456
```
*Note: By default, all users have role='user'. Admin role needs to be set manually in the database.*

---

## Frontend Login Component

**File:** `myshopReact/my-project/src/pages/Login.jsx`

### Login Form Fields:
```javascript
// Login Mode
{
  email: '',      // Required, must be valid email
  password: ''    // Required, minimum 6 characters
}

// Register Mode
{
  name: '',              // Required
  email: '',             // Required, must be valid email
  password: '',          // Required, minimum 6 characters
  confirmPassword: ''    // Required, must match password
}
```

### Validation Rules:
- **Name:** 1-50 characters, required for registration
- **Email:** Valid email format (e.g., user@example.com)
- **Password:** Minimum 6 characters
- **Confirm Password:** Must match password field

---

## Backend Authentication System

**Location:** `MyShop-backend/`

### User Registration Endpoint
```
POST http://localhost:5000/api/users/register

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response (Success):
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### User Login Endpoint
```
POST http://localhost:5000/api/users/login

Request Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response (Success):
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "lastLoginAt": "2025-10-19T14:30:00.000Z"
  }
}
```

---

## User Database Schema

**Table:** `Users`

**File:** `MyShop-backend/models/User.js`

```javascript
{
  id: INTEGER (Primary Key, Auto-increment),
  name: STRING(50) (Required),
  email: STRING (Required, Unique, Valid Email),
  password: STRING (Required, Min 6 chars, Hashed with bcrypt),
  role: ENUM('user', 'admin') (Default: 'user'),
  isActive: BOOLEAN (Default: true),
  lastLoginAt: DATE,
  loginAttempts: INTEGER (Default: 0),
  lockUntil: DATE,
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP
}
```

### Password Security:
- Passwords are **automatically hashed** using bcrypt with salt rounds of 10
- Stored in database as hashed values (never plain text)
- Compared using `bcrypt.compare()` during login

---

## How Authentication Works

### 1. Registration Flow
```
Frontend → POST /api/users/register → Backend
                                       ↓
                                   Validate Data
                                       ↓
                                   Hash Password
                                       ↓
                                   Create User in DB
                                       ↓
                                   Generate JWT Token
                                       ↓
Frontend ← Return Token + User Data
    ↓
Save to localStorage
    ↓
Update AuthContext
    ↓
Redirect to Homepage
```

### 2. Login Flow
```
Frontend → POST /api/users/login → Backend
                                    ↓
                                Find User by Email
                                    ↓
                                Check Account Lock
                                    ↓
                                Verify Password
                                    ↓
                                Generate JWT Token
                                    ↓
Frontend ← Return Token + User Data
    ↓
Save to localStorage
    ↓
Update AuthContext
    ↓
Redirect to Homepage
```

### 3. Auto Token Refresh
```
API Request → 401 Unauthorized → Frontend Intercepts
                                      ↓
                                POST /api/users/refresh-token
                                      ↓
                                Get New Access Token
                                      ↓
                                Retry Original Request
```

---

## Testing Authentication

### Using the Frontend UI

1. **Register:**
   - Go to: http://localhost:5175/login
   - Click "Sign Up"
   - Fill form and submit

2. **Login:**
   - Enter email and password
   - Click "Sign In"

3. **Verify Login:**
   - Check header shows your name
   - Cart badge appears
   - Can add products to cart

4. **Logout:**
   - Click your name in header
   - Click "Logout"
   - Redirected to login page

### Using API Testing Tools (Postman/Thunder Client)

**Register:**
```bash
POST http://localhost:5000/api/users/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123"
}
```

**Login:**
```bash
POST http://localhost:5000/api/users/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "test123"
}
```

**Get Current User (Protected Route):**
```bash
GET http://localhost:5000/api/users/me
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

---

## Environment Configuration

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=MyShop
VITE_APP_VERSION=1.0.0
```

### Backend (.env)
```bash
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secure_secret_key_here
JWT_EXPIRE=7d
REFRESH_TOKEN_EXPIRE=30d
CORS_ORIGIN=http://localhost:5175
DATABASE_URL=sqlite:./database/myshop.sqlite
```

---

## Security Features

### Account Protection:
- ✅ Password hashing with bcrypt (salt rounds: 10)
- ✅ JWT token expiration (7 days for access token)
- ✅ Refresh token rotation (30 days)
- ✅ Account lockout after 5 failed login attempts (locked for 2 hours)
- ✅ Email uniqueness validation
- ✅ Password minimum length (6 characters)
- ✅ Protected routes requiring authentication
- ✅ CORS configuration

### Failed Login Protection:
```javascript
// After 5 failed attempts:
{
  "success": false,
  "message": "Account locked due to multiple failed login attempts. Try again later."
}
```

---

## Troubleshooting

### "Invalid credentials" Error
**Causes:**
1. Email not registered
2. Wrong password
3. Account locked (5+ failed attempts)

**Solution:**
- Verify email is correct
- Check password (case-sensitive)
- Wait 2 hours if account is locked
- Register a new account

### "User already exists" Error
**Cause:** Email already registered

**Solution:**
- Use different email
- Login with existing account
- Reset database if needed

### Backend Not Responding
**Check:**
1. Backend server is running on port 5000
2. No errors in backend console
3. Database file exists: `MyShop-backend/database/myshop.sqlite`

**Fix:**
```bash
# Restart backend server
cd "c:\Users\rohan\Rohan\Ecommerce Website\MyShop-backend"
npm run dev
```

### Token Expired Error
**Cause:** JWT token expired (after 7 days)

**Solution:**
- Frontend automatically refreshes token
- If fails, logout and login again
- Clear localStorage:
  ```javascript
  localStorage.clear();
  ```

---

## Where Credentials Are Stored

### Frontend (Browser)
**Location:** `localStorage`

**Items Stored:**
```javascript
localStorage.getItem('token')         // JWT access token
localStorage.getItem('refreshToken')  // Refresh token
localStorage.getItem('user')          // User object (JSON)
```

**View in Browser:**
1. Open Developer Tools (F12)
2. Go to "Application" tab
3. Click "Local Storage" → "http://localhost:5175"

### Backend (Database)
**Location:** `MyShop-backend/database/myshop.sqlite`

**Table:** `Users`

**View Users:**
```bash
# Using SQLite CLI
cd "c:\Users\rohan\Rohan\Ecommerce Website\MyShop-backend"
sqlite3 database/myshop.sqlite

# SQL Query
SELECT id, name, email, role, isActive, createdAt FROM Users;
```

---

## Quick Reference

### Create Test Account
```
URL: http://localhost:5175/login
Click: "Sign Up"
Name: Test User
Email: test@example.com
Password: test123
```

### Login
```
URL: http://localhost:5175/login
Email: test@example.com
Password: test123
Click: "Sign In"
```

### Check If Logged In
```javascript
// Browser Console
console.log(localStorage.getItem('user'));
console.log(localStorage.getItem('token'));
```

### Logout
```
Click your name (top right) → Click "Logout"
```

---

## Summary

🔐 **NO DEFAULT CREDENTIALS** - You must register first

📝 **To Get Started:**
1. Start backend server (port 5000)
2. Start frontend server (port 5175)
3. Visit http://localhost:5175/login
4. Click "Sign Up" and create account
5. Login with your credentials

✅ **Features:**
- Secure JWT authentication
- Auto token refresh
- Account lockout protection
- Password hashing
- Protected routes

📁 **Files:**
- Frontend: `myshopReact/my-project/src/pages/Login.jsx`
- Backend: `MyShop-backend/routes/users.js`
- Model: `MyShop-backend/models/User.js`
- Auth Service: `myshopReact/my-project/src/services/authService.js`
- Auth Context: `myshopReact/my-project/src/context/AuthContext.jsx`

---

**Happy Shopping!** 🛒

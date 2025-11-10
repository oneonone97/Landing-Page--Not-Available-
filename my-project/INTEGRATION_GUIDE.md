# MyShop E-commerce - Full Stack Integration Guide

This guide explains the complete integration between the React frontend and Node.js backend.

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Backend API Endpoints](#backend-api-endpoints)
3. [Frontend Setup](#frontend-setup)
4. [Running the Full Stack](#running-the-full-stack)
5. [Authentication Flow](#authentication-flow)
6. [Features](#features)
7. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

### Technology Stack

**Frontend (myshopReact/my-project)**
- React 19.1.1
- React Router DOM - Client-side routing
- Axios - HTTP client
- Context API - State management
- Vite - Build tool

**Backend (MyShop-backend)**
- Node.js + Express
- SQLite database with Sequelize ORM
- JWT authentication
- Redis for session management
- bcryptjs for password hashing

### Communication Flow
```
Frontend (Port 5175) ←→ Backend API (Port 5000) ←→ SQLite Database
```

---

## Backend API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/users/register` | Register new user | No |
| POST | `/users/login` | Login user | No |
| POST | `/users/logout` | Logout user | Yes |
| GET | `/users/me` | Get current user | Yes |
| POST | `/users/refresh-token` | Refresh JWT token | No |

**Request Body (Register):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Request Body (Login):**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

### Product Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/products` | Get all products (paginated) | No |
| GET | `/products/:id` | Get single product | No |
| GET | `/products/search?q=query` | Search products | No |
| GET | `/products/categories` | Get all categories | No |
| GET | `/products/new` | Get new arrivals | No |
| GET | `/products/sale` | Get products on sale | No |
| POST | `/products` | Create product (admin) | Yes (Admin) |
| PUT | `/products/:id` | Update product (admin) | Yes (Admin) |
| DELETE | `/products/:id` | Delete product (admin) | Yes (Admin) |

**Query Parameters (GET /products):**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `category` - Filter by category
- `minPrice` - Minimum price
- `maxPrice` - Maximum price

### Cart Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/cart` | Get user's cart | Yes |
| POST | `/cart` | Add item to cart | Yes |
| PUT | `/cart/:itemId` | Update cart item quantity | Yes |
| DELETE | `/cart/:itemId` | Remove item from cart | Yes |
| DELETE | `/cart` | Clear entire cart | Yes |

**Request Body (Add to Cart):**
```json
{
  "productId": 1,
  "quantity": 2
}
```

### Order Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/orders` | Get user's orders | Yes |
| GET | `/orders/:id` | Get single order | Yes |
| POST | `/orders` | Create new order | Yes |

### Wishlist Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/wishlists` | Get user's wishlist | Yes |
| POST | `/wishlists` | Add item to wishlist | Yes |
| DELETE | `/wishlists/:productId` | Remove from wishlist | Yes |

---

## Frontend Setup

### Environment Configuration

Create `.env` file in the frontend root:

```bash
# Backend API URL
VITE_API_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=MyShop
VITE_APP_VERSION=1.0.0
```

### API Service Layer

The frontend uses a service-oriented architecture:

```
src/services/
├── api.js              # Axios instance with interceptors
├── authService.js      # Authentication methods
├── productService.js   # Product operations
└── cartService.js      # Cart operations
```

**Key Features:**
- Automatic token injection in requests
- Token refresh on expiry
- Error handling and retry logic
- Request/response interceptors

### State Management (Context API)

```
src/context/
├── AuthContext.jsx     # Authentication state
└── CartContext.jsx     # Cart state
```

**AuthContext provides:**
- `user` - Current user object
- `isAuthenticated` - Boolean auth status
- `login(credentials)` - Login function
- `register(userData)` - Register function
- `logout()` - Logout function

**CartContext provides:**
- `cart` - Cart object with items
- `cartCount` - Total items in cart
- `addToCart(productId, quantity)` - Add to cart
- `updateCartItem(itemId, quantity)` - Update quantity
- `removeFromCart(itemId)` - Remove item
- `clearCart()` - Clear all items

---

## Running the Full Stack

### Step 1: Start Backend Server

```bash
# Navigate to backend directory
cd "c:\Users\rohan\Rohan\Ecommerce Website\MyShop-backend"

# Create .env file (if not exists)
# Copy from env.example and configure

# Install dependencies (if needed)
npm install

# Start the server
npm start
# OR for development with auto-reload:
npm run dev
```

**Backend will start on:** http://localhost:5000

**Check health:** http://localhost:5000/health

**API Documentation:** http://localhost:5000/api-docs

### Step 2: Start Frontend Server

```bash
# Navigate to frontend directory
cd "c:\Users\rohan\Rohan\Ecommerce Website\myshopReact\my-project"

# Install dependencies (already done)
npm install

# Start development server
npm run dev
```

**Frontend will start on:** http://localhost:5175

### Step 3: Test the Integration

1. **Open browser:** http://localhost:5175

2. **Register a new user:**
   - Click "Sign Up" on login page
   - Fill in name, email, password
   - Submit form

3. **Login:**
   - Use registered credentials
   - Should redirect to homepage
   - Header should show your name

4. **Browse products:**
   - Products loaded from backend (if available)
   - Falls back to local data if backend unavailable

5. **Add to cart:**
   - Click "Add to Cart" on any product
   - Cart count in header should update

6. **Logout:**
   - Click on account dropdown
   - Click "Logout"

---

## Authentication Flow

### Registration Flow

```
1. User fills registration form
   ↓
2. Frontend validates input
   ↓
3. POST /api/users/register
   ↓
4. Backend validates and hashes password
   ↓
5. User saved to database
   ↓
6. JWT token generated
   ↓
7. Response with token + user data
   ↓
8. Frontend stores token in localStorage
   ↓
9. AuthContext updates user state
   ↓
10. Redirect to homepage
```

### Login Flow

```
1. User enters credentials
   ↓
2. Frontend validates input
   ↓
3. POST /api/users/login
   ↓
4. Backend verifies credentials
   ↓
5. JWT token generated
   ↓
6. Response with token + user data
   ↓
7. Frontend stores token in localStorage
   ↓
8. AuthContext updates user state
   ↓
9. Redirect to homepage
```

### Token Management

**Access Token:**
- Short-lived (30 days default)
- Sent in Authorization header
- Auto-refreshed on expiry

**Refresh Token:**
- Long-lived
- Used to get new access token
- Stored separately in localStorage

**Auto-Refresh Logic:**
```javascript
// In api.js interceptor
if (error.response?.status === 401) {
  try {
    // Get new token using refresh token
    const newToken = await refreshToken();
    // Retry original request with new token
    return retryRequest(originalRequest);
  } catch {
    // Refresh failed, logout user
    logout();
    redirect('/login');
  }
}
```

---

## Features

### ✅ Implemented Features

1. **Authentication**
   - User registration with validation
   - Email/password login
   - JWT token-based auth
   - Auto token refresh
   - Logout functionality

2. **User Management**
   - User profile data
   - Role-based access (customer/admin)
   - Session persistence

3. **Products**
   - Product listing with pagination
   - Product search
   - Category filtering
   - New arrivals section
   - Featured products
   - Sale products

4. **Shopping Cart**
   - Add items to cart
   - Update quantities
   - Remove items
   - Clear cart
   - Cart count badge
   - Persistent cart (backend)

5. **UI/UX**
   - Responsive design
   - Professional theme (html_simen inspired)
   - Loading states
   - Error handling
   - User feedback (alerts/messages)

### 🚧 Pending Features

1. **Product Details Page**
   - Full product view
   - Image gallery
   - Variant selection
   - Reviews section

2. **Checkout**
   - Multi-step checkout
   - Address management
   - Payment integration (Stripe/Razorpay)

3. **Orders**
   - Order history
   - Order tracking
   - Order details

4. **Wishlist**
   - Add/remove products
   - Wishlist page

5. **User Account**
   - Profile editing
   - Password change
   - Address book

6. **Admin Panel**
   - Product management
   - Order management
   - User management
   - Analytics dashboard

---

## Troubleshooting

### Common Issues

#### 1. CORS Errors

**Problem:** Frontend can't connect to backend

**Solution:**
```javascript
// Backend server.js should have:
const corsOptions = {
  origin: 'http://localhost:5175',
  credentials: true
};
app.use(cors(corsOptions));
```

#### 2. 401 Unauthorized

**Problem:** Requests fail with 401 status

**Possible Causes:**
- Token expired
- Token not sent in request
- Invalid token

**Solution:**
- Check if token exists in localStorage
- Verify VITE_API_URL in .env
- Clear localStorage and login again
- Check backend JWT_SECRET is set

#### 3. Backend Not Running

**Problem:** Frontend shows "using local data"

**Solution:**
- Start backend server: `npm run dev`
- Check backend is on port 5000
- Verify .env file exists in backend

#### 4. Products Not Loading

**Problem:** Empty product list

**Solution:**
- Run product seeder: `npm run seed:products`
- Check database file exists: `database/myshop.sqlite`
- Verify backend logs for errors

#### 5. Cart Not Updating

**Problem:** Cart actions fail

**Possible Causes:**
- Not logged in
- Backend cart endpoint error
- Token expired

**Solution:**
- Login first
- Check browser console for errors
- Verify backend cart routes working
- Check backend logs

### Debug Mode

**Enable detailed logging:**

Frontend (browser console):
```javascript
localStorage.setItem('debug', 'true');
```

Backend (.env):
```bash
LOG_LEVEL=debug
NODE_ENV=development
```

### Health Checks

**Backend Health:**
```bash
curl http://localhost:5000/health
```

**Expected Response:**
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2025-10-19T13:30:00.000Z",
  "uptime": 123.456,
  "environment": "development"
}
```

---

## API Testing

### Using Swagger UI

Visit: http://localhost:5000/api-docs

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

**Get Products:**
```bash
curl http://localhost:5000/api/products?limit=10
```

**Add to Cart (with token):**
```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"productId":1,"quantity":2}'
```

---

## Database Schema

### Users Table
```sql
- id (INTEGER PRIMARY KEY)
- name (STRING)
- email (STRING UNIQUE)
- password (STRING HASHED)
- role (ENUM: customer|admin)
- createdAt (DATE)
- updatedAt (DATE)
```

### Products Table
```sql
- id (INTEGER PRIMARY KEY)
- name (STRING)
- description (TEXT)
- price (DECIMAL)
- discountPrice (DECIMAL)
- category (STRING)
- stock (INTEGER)
- images (JSON)
- isFeatured (BOOLEAN)
- isNew (BOOLEAN)
- createdAt (DATE)
- updatedAt (DATE)
```

### Cart Table
```sql
- id (INTEGER PRIMARY KEY)
- userId (INTEGER FK)
- items (JSON)
- createdAt (DATE)
- updatedAt (DATE)
```

---

## Security Features

1. **Password Security**
   - bcryptjs hashing (10 rounds)
   - Minimum 6 characters

2. **JWT Tokens**
   - Signed with secret key
   - Expiry time configured
   - Refresh token rotation

3. **CORS Protection**
   - Whitelisted origins
   - Credentials support

4. **Rate Limiting**
   - 100 requests per 15 minutes (general)
   - 5 requests per 15 minutes (auth endpoints)

5. **Input Validation**
   - express-validator on all inputs
   - XSS protection
   - SQL injection prevention (Sequelize)

6. **Session Management**
   - Redis-based sessions
   - Secure cookies in production

---

## Production Deployment Checklist

### Backend
- [ ] Set NODE_ENV=production
- [ ] Use PostgreSQL/MySQL instead of SQLite
- [ ] Configure Redis for sessions
- [ ] Set strong JWT_SECRET
- [ ] Enable HTTPS
- [ ] Set proper CORS_ORIGIN
- [ ] Configure rate limiting
- [ ] Set up logging (Winston)
- [ ] Database backups
- [ ] Environment variables secure

### Frontend
- [ ] Build production bundle: `npm run build`
- [ ] Update VITE_API_URL to production backend
- [ ] Enable analytics
- [ ] Optimize images
- [ ] Configure CDN
- [ ] Set up error tracking (Sentry)
- [ ] Enable service worker (PWA)
- [ ] Configure caching

---

## Contact & Support

For issues or questions:
- Check backend logs: `MyShop-backend/logs/`
- Check browser console for frontend errors
- Review API docs: http://localhost:5000/api-docs

---

**Last Updated:** October 19, 2025
**Version:** 1.0.0

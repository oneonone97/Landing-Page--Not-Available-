# MyShop - Quick Start Guide

Get MyShop up and running in 5 minutes!

## Prerequisites

- Node.js v16+ installed
- npm or yarn
- Terminal/Command Prompt

## Option 1: Frontend Only (Standalone)

Use this if you just want to see the UI without backend functionality.

```bash
# 1. Navigate to frontend
cd "c:\Users\rohan\Rohan\Ecommerce Website\myshopReact\my-project"

# 2. Start dev server (dependencies already installed)
npm run dev

# 3. Open browser
# Visit: http://localhost:5175
```

**Features Available:**
- ✅ Browse UI and design
- ✅ View sample products (from local JSON)
- ✅ Test responsive design
- ❌ No login/authentication
- ❌ No cart persistence
- ❌ No real data

---

## Option 2: Full Stack (Recommended)

Use this for complete e-commerce functionality with backend.

### Step 1: Configure Backend

```bash
# Navigate to backend
cd "c:\Users\rohan\Rohan\Ecommerce Website\MyShop-backend"

# Check if .env file exists
# If not, copy from .env.example
copy env.example .env

# Edit .env and set:
# PORT=5000
# NODE_ENV=development
# JWT_SECRET=your_secret_key_here (any long random string)
# CORS_ORIGIN=http://localhost:5175
```

### Step 2: Start Backend Server

```bash
# Still in MyShop-backend directory

# Install dependencies (if needed)
npm install

# Start backend server
npm run dev
```

You should see:
```
Server running on port 5000
API available at http://localhost:5000
SQLite database connection established successfully
```

**Test backend:** Open http://localhost:5000/health

Should return:
```json
{
  "success": true,
  "status": "healthy"
}
```

### Step 3: Start Frontend (New Terminal)

```bash
# Open NEW terminal window

# Navigate to frontend
cd "c:\Users\rohan\Rohan\Ecommerce Website\myshopReact\my-project"

# Start frontend (already configured with .env)
npm run dev
```

You should see:
```
ROLLDOWN-VITE v7.1.14  ready in X ms

➜  Local:   http://localhost:5175/
```

### Step 4: Access Application

Open browser: **http://localhost:5175**

---

## Testing the Integration

### 1. Register a New User

1. Click **"Sign Up"** on login page
2. Fill in:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `test123`
3. Click **"Sign Up"**
4. Should redirect to homepage with your name in header

### 2. Browse Products

- Homepage shows products from backend (if available)
- Products have "Add to Cart" functionality

### 3. Test Cart

1. Click **"Add to Cart"** on any product
2. Check header cart badge (should increment)
3. Cart is persisted in backend database

### 4. Logout

1. Click on your name in header
2. Click **"Logout"**
3. Should redirect to login page

---

## Troubleshooting

### Backend Not Starting

**Problem:** Port 5000 already in use

**Solution:**
```bash
# Change PORT in .env to different port (e.g., 5001)
# Also update VITE_API_URL in frontend .env
```

**Problem:** Database error

**Solution:**
```bash
# Delete database and restart
cd MyShop-backend
rm -rf database/myshop.sqlite
npm run dev
```

### Frontend Can't Connect to Backend

**Check:**
1. Backend is running on port 5000
2. Frontend .env has `VITE_API_URL=http://localhost:5000/api`
3. No CORS errors in browser console

**Fix CORS:**
```javascript
// MyShop-backend/server.js
const corsOptions = {
  origin: 'http://localhost:5175',  // Make sure this matches
  credentials: true
};
```

### Login Fails

**Check:**
1. Backend server is running
2. Check backend logs for errors
3. Try registering a new user first
4. Clear browser localStorage:
   ```javascript
   // In browser console:
   localStorage.clear();
   ```

---

## What's Working

### ✅ Authentication
- User registration
- User login
- Auto token refresh
- Logout
- Protected routes

### ✅ Products
- Product listing
- Search products
- Filter by category
- Featured products
- New arrivals

### ✅ Shopping Cart
- Add to cart (authenticated)
- Cart count badge
- Backend persistence

### ✅ UI/UX
- Professional design
- Fully responsive
- Loading states
- Error messages

---

## Next Steps

After you have the app running:

1. **Explore the Code**
   - `src/services/` - API integration
   - `src/context/` - State management
   - `src/components/` - Reusable UI components

2. **Add More Features**
   - Product detail page
   - Shopping cart page
   - Checkout flow
   - User profile
   - Order history

3. **Read Documentation**
   - [README.md](./README.md) - Full project documentation
   - [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) - Backend API details

---

## Useful Commands

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Check code quality
```

### Backend
```bash
npm run dev              # Start with auto-reload
npm start                # Start production mode
npm run test             # Run tests
npm run seed:products    # Seed sample products
```

---

## Environment Variables

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
JWT_SECRET=your_super_secure_secret
CORS_ORIGIN=http://localhost:5175
DATABASE_URL=sqlite:./database/myshop.sqlite
```

---

## Support

**Issues?** Check:
1. Both servers are running
2. No port conflicts
3. .env files are configured correctly
4. Browser console for errors
5. Backend logs for errors

**Need Help?**
- Check [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
- Review [README.md](./README.md)
- Check backend API docs: http://localhost:5000/api-docs

---

**Happy Coding!** 🚀

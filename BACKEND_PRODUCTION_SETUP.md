# 🚀 Backend Production Configuration Guide

## 🎯 **Current Issue**
Your backend is currently running in **development mode** with these settings:
```
PORT=5000
NODE_ENV=development
```

## ✅ **Solution: Switch to Production Mode**

### **Step 1: Update Backend Environment Variables**

Create or update your backend's `.env` file with production settings:

#### **For MyShop-backend/.env:**
```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database (Production)
DB_DIALECT=sqlite
DB_STORAGE=./database/myshop.sqlite
DB_LOGGING=false

# JWT Configuration (CHANGE THESE SECRETS!)
JWT_SECRET=your_super_secure_jwt_secret_here_change_in_production
JWT_REFRESH_SECRET=your_super_secure_refresh_secret_here_change_in_production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# CORS Configuration - CRITICAL FIX FOR YOUR ISSUE
CORS_ORIGIN=https://www.notavailable.co.in,https://your-vercel-app.vercel.app
CORS_CREDENTIALS=true

# Session Configuration
SESSION_SECRET=your_super_secure_session_secret_here_change_in_production

# Logging (Production)
LOG_LEVEL=error
LOG_FILE=logs/production.log

# Security (Production)
BCRYPT_ROUNDS=12
CSRF_SECRET=your_csrf_secret_here_change_in_production
```

### **Step 2: Fix CORS Issue (CRITICAL)**

Your current CORS configuration only allows `http://localhost:5173`. Update it to include your production domain:

```javascript
// In your backend's server.js or cors middleware
const corsOptions = {
  origin: [
    'http://localhost:5173',        // Keep for development
    'https://www.notavailable.co.in', // YOUR PRODUCTION DOMAIN
    'https://your-vercel-app.vercel.app' // Vercel preview URLs
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-Session-Id']
};
```

### **Step 3: Update Security Secrets**

**CHANGE ALL THESE VALUES IN PRODUCTION:**
- `JWT_SECRET` - Use a strong random string (64+ characters)
- `JWT_REFRESH_SECRET` - Different from JWT_SECRET
- `SESSION_SECRET` - Strong random string
- `CSRF_SECRET` - Strong random string

**Generate secure secrets:**
```bash
# Linux/Mac
openssl rand -base64 64

# Windows PowerShell
[System.Web.Security.Membership]::GeneratePassword(64, 10)
```

### **Step 4: Database Considerations**

For SQLite in production:
```env
DB_LOGGING=false  # Disable SQL logging in production
```

For PostgreSQL/MySQL (recommended for production):
```env
DB_DIALECT=postgres
DB_HOST=your_db_host
DB_PORT=5432
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_SSL=true
```

### **Step 5: Environment-Specific Configuration**

Create separate config files:

#### **config/production.js:**
```javascript
module.exports = {
  port: process.env.PORT || 5000,
  env: 'production',
  cors: {
    origin: ['https://www.notavailable.co.in'],
    credentials: true
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    expiresIn: '15m',
    refreshExpiresIn: '7d'
  },
  security: {
    bcryptRounds: 12,
    sessionSecret: process.env.SESSION_SECRET,
    csrfSecret: process.env.CSRF_SECRET
  },
  logging: {
    level: 'error',
    file: 'logs/production.log'
  }
};
```

### **Step 6: Deploy Backend to Production**

#### **Vercel Deployment:**
```bash
cd MyShop-backend
vercel --prod
```

#### **Environment Variables in Vercel:**
Set these in your Vercel project settings:

```
NODE_ENV=production
PORT=5000
JWT_SECRET=your_secure_jwt_secret
JWT_REFRESH_SECRET=your_secure_refresh_secret
SESSION_SECRET=your_secure_session_secret
CSRF_SECRET=your_secure_csrf_secret
CORS_ORIGIN=https://www.notavailable.co.in
```

### **Step 7: Verify Production Setup**

**Test Commands:**
```bash
# Test backend health
curl https://my-shop-backend-zeta.vercel.app/health

# Test CORS (should allow your domain)
curl -H "Origin: https://www.notavailable.co.in" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS \
     https://my-shop-backend-zeta.vercel.app/api/products

# Test API endpoint
curl https://my-shop-backend-zeta.vercel.app/api/products?limit=1
```

### **Step 8: Monitoring & Logging**

Add production monitoring:
```javascript
// Add to your server.js
if (process.env.NODE_ENV === 'production') {
  // Add production logging
  // Add error monitoring (Sentry, etc.)
  // Add performance monitoring
}
```

---

## 🔍 **Quick Fix for CORS Issue**

If you just want to fix the CORS error quickly:

### **Option 1: Update Vercel Environment Variables**
In Vercel dashboard → Project Settings → Environment Variables:

```
CORS_ORIGIN=https://www.notavailable.co.in,https://your-vercel-app.vercel.app
NODE_ENV=production
```

### **Option 2: Direct Code Update**
In your backend's CORS configuration:

```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://www.notavailable.co.in']
    : ['http://localhost:5173'],
  credentials: true
}));
```

---

## 📊 **Production Checklist**

- [x] NODE_ENV changed to `production`
- [ ] CORS updated to allow production domain
- [ ] JWT secrets changed to secure values
- [ ] Session secrets changed to secure values
- [ ] CSRF secrets changed to secure values
- [ ] Database logging disabled
- [ ] Error logging configured
- [ ] Backend redeployed to Vercel
- [ ] Frontend CORS errors resolved
- [ ] API endpoints working
- [ ] Authentication working
- [ ] Cart/checkout functional

---

## 🎯 **Expected Result**

After production configuration:

1. ✅ **CORS errors resolved** - Frontend can communicate with backend
2. ✅ **Secure authentication** - Strong JWT secrets
3. ✅ **Optimized performance** - Reduced logging, compression
4. ✅ **Production monitoring** - Error tracking enabled
5. ✅ **Full e-commerce functionality** - All features working

---

**Action Required:** Update your backend's CORS configuration and environment variables, then redeploy!

**This will fix both the CORS error and switch your backend to production mode.** 🚀

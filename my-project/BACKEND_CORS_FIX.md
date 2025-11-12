# 🔧 CORS FIX: Backend Configuration Update

## ❌ **CORS ERROR DETAILS**
```
Access to XMLHttpRequest at 'https://my-shop-backend-zeta.vercel.app/api/products/categories'
from origin 'https://www.notavailable.co.in' has been blocked by CORS policy:
The 'Access-Control-Allow-Origin' header has a value 'http://localhost:5173'
that is not equal to the supplied origin.
```

## 🎯 **ROOT CAUSE**
Your backend is configured to only allow requests from `http://localhost:5173` (development), but your frontend is now deployed at `https://www.notavailable.co.in` (production).

## ✅ **SOLUTION: Update Backend CORS Configuration**

### **Option 1: Quick Fix (Recommended for Production)**

Update your backend's CORS configuration to allow your production domain:

#### **For Express.js (server.js or app.js):**
```javascript
const cors = require('cors');

// Configure CORS
const corsOptions = {
  origin: [
    'http://localhost:5173',        // Development
    'https://www.notavailable.co.in', // Production domain
    'https://your-vercel-app.vercel.app' // Vercel preview URLs
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-Session-Id']
};

app.use(cors(corsOptions));
```

#### **For Vercel Deployment:**
If using Vercel's serverless functions, add CORS headers in your API routes:

```javascript
// In your API routes (e.g., pages/api/products.js)
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://www.notavailable.co.in');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token, X-Session-Id');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Your API logic here...
}
```

### **Option 2: Environment-Based CORS (Best Practice)**

Create an environment-based CORS configuration:

```javascript
// config/cors.js
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',        // Development
      'http://localhost:3000',        // Alternative dev port
      'https://www.notavailable.co.in', // Production domain
      'https://your-project.vercel.app' // Vercel production
    ];

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-Session-Id']
};

module.exports = corsOptions;
```

Then use it in your server:
```javascript
const corsOptions = require('./config/cors');
app.use(cors(corsOptions));
```

### **Option 3: Vercel Configuration (Alternative)**

Add CORS headers via Vercel configuration:

```json
// vercel.json (backend)
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "https://www.notavailable.co.in" },
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Methods", "value": "GET, POST, PUT, DELETE, PATCH, OPTIONS" },
        { "key": "Access-Control-Allow-Headers", "value": "Content-Type, Authorization, X-CSRF-Token, X-Session-Id" }
      ]
    }
  ]
}
```

## 🚀 **IMPLEMENTATION STEPS**

### **Step 1: Locate Your Backend Files**
Find your backend CORS configuration. It could be in:
- `server.js` or `app.js` (main server file)
- `middleware/cors.js` (dedicated CORS middleware)
- `config/cors.js` (configuration file)

### **Step 2: Update CORS Origins**
Add your production domain to the allowed origins list:

```javascript
origin: [
  'http://localhost:5173',        // Keep for development
  'https://www.notavailable.co.in' // Add your production domain
]
```

### **Step 3: Deploy Backend Changes**
Redeploy your backend to Vercel with the updated CORS configuration.

### **Step 4: Test**
After deployment, test your frontend at `https://www.notavailable.co.in` - the CORS error should be resolved.

## 🔍 **VERIFICATION**

### **Test CORS Fix:**
```bash
# Test API endpoint
curl -H "Origin: https://www.notavailable.co.in" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS \
     https://my-shop-backend-zeta.vercel.app/api/products/categories
```

Expected response should include:
```
Access-Control-Allow-Origin: https://www.notavailable.co.in
Access-Control-Allow-Credentials: true
```

## 🎯 **PRODUCTION CHECKLIST**

- [ ] Backend CORS updated to allow `https://www.notavailable.co.in`
- [ ] Credentials enabled for cookie-based auth
- [ ] All required headers allowed
- [ ] Backend redeployed to Vercel
- [ ] Frontend API calls tested
- [ ] Authentication flow working
- [ ] Cart and checkout functional

## 📞 **IMMEDIATE ACTION NEEDED**

**You need to update your backend's CORS configuration to include your production domain: `https://www.notavailable.co.in`**

Once updated and redeployed, the CORS error will be resolved and your e-commerce site will work perfectly!

---

**Quick Fix:** Find your backend's CORS configuration and add `'https://www.notavailable.co.in'` to the allowed origins array.

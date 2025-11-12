# 🚀 Deployment Guide - MyShop E-commerce

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI**: Install globally
   ```bash
   npm install -g vercel
   ```
3. **Backend Deployed**: Your backend is already live at:
   - Production: `https://my-shop-backend-zeta.vercel.app`

## 🔧 Configuration Files

### Environment Variables (.env)
```env
# Backend API Configuration
VITE_API_BASE_URL=https://my-shop-backend-zeta.vercel.app/api
VITE_API_URL=https://my-shop-backend-zeta.vercel.app/api

# Error Tracking (Optional)
VITE_SENTRY_DSN=your_sentry_dsn_here

# Environment
NODE_ENV=production
```

### Vercel Configuration (vercel.json)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "NODE_ENV": "production",
    "VITE_API_BASE_URL": "https://my-shop-backend-zeta.vercel.app/api",
    "VITE_API_URL": "https://my-shop-backend-zeta.vercel.app/api"
  }
}
```

## 🚀 Deployment Methods

### Method 1: Automated Script (Recommended)

#### Windows:
```bash
# Run the deployment script
deploy.bat
```

#### Linux/Mac:
```bash
# Make script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

### Method 2: Manual Deployment

#### Step 1: Login to Vercel
```bash
vercel login
```

#### Step 2: Deploy
```bash
cd my-project

# First deployment (will ask questions)
vercel

# Production deployment
vercel --prod
```

### Method 3: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub repository (if using Git)
4. Or drag & drop the `my-project` folder
5. Configure build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: my-project
   - **Build Command**: npm run build
   - **Output Directory**: dist

## 🔍 Environment Variables in Vercel

### Via Vercel Dashboard:
1. Go to your project in Vercel dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Add these variables:
   ```
   VITE_API_BASE_URL = https://my-shop-backend-zeta.vercel.app/api
   VITE_API_URL = https://my-shop-backend-zeta.vercel.app/api
   NODE_ENV = production
   ```

### Via Vercel CLI:
```bash
# Add environment variables
vercel env add VITE_API_BASE_URL
# Enter: https://my-shop-backend-zeta.vercel.app/api

vercel env add VITE_API_URL
# Enter: https://my-shop-backend-zeta.vercel.app/api

vercel env add NODE_ENV
# Enter: production
```

## 🧪 Testing Deployment

### Health Check:
```bash
# Test if your app loads
curl https://your-vercel-url.vercel.app

# Check API connectivity
curl https://your-vercel-url.vercel.app/api/health
```

### Functional Testing:
1. **Homepage**: Should load products from backend
2. **Login**: Try logging in with test credentials
3. **Cart**: Add items to cart (requires authentication)
4. **Admin**: Access admin panel (admin role required)

### Test Credentials:
- **Email**: `demo@example.com`
- **Password**: `demo123`

## 🔧 Troubleshooting

### Build Fails:
```bash
# Check for errors
npm run build

# Clear cache and retry
rm -rf node_modules package-lock.json
npm install
npm run build
```

### API Connection Issues:
1. Check backend is running: `https://my-shop-backend-zeta.vercel.app/health`
2. Verify environment variables in Vercel dashboard
3. Check browser network tab for API calls

### Admin Routes Not Working:
1. Ensure user has admin role in backend
2. Check browser console for errors
3. Verify routes are not commented out (they should be enabled)

### CORS Issues:
- Backend should allow requests from your Vercel domain
- Check backend CORS configuration

## 📊 Performance Optimization

### Vercel Optimizations:
- **Static Assets**: Automatically optimized
- **CDN**: Global CDN included
- **Compression**: Gzip/Brotli enabled
- **Caching**: Intelligent caching headers

### Build Optimizations Applied:
- ✅ Code splitting (vendor chunks)
- ✅ Minification (Terser)
- ✅ Console logs removed in production
- ✅ Sentry error tracking
- ✅ Admin routes enabled

## 🌐 Domain Configuration

### Custom Domain (Optional):
1. Go to Vercel dashboard → Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

### Update Backend CORS (if needed):
Ensure backend allows requests from your Vercel domain:
```javascript
// In backend CORS configuration
origins: [
  'https://your-vercel-url.vercel.app',
  'https://your-custom-domain.com'
]
```

## 🎯 Post-Deployment Checklist

- [ ] Homepage loads correctly
- [ ] Products display from backend
- [ ] Login/registration works
- [ ] Cart functionality works
- [ ] Admin panel accessible (admin users)
- [ ] No console errors in production
- [ ] API calls work correctly
- [ ] Mobile responsive
- [ ] Fast loading times

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify backend connectivity
3. Test with browser developer tools
4. Check environment variables

## 🎉 Success!

Once deployed, your e-commerce application will be live with:
- ✅ Full frontend functionality
- ✅ Backend integration
- ✅ Admin panel
- ✅ Error tracking
- ✅ Production optimizations

**Your app will be available at:** `https://your-project-name.vercel.app`

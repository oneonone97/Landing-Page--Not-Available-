#!/bin/bash

echo "🚀 Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install optional dependencies (terser for minification)
echo "📦 Installing optional dependencies..."
npm install terser --save-optional

# Build for production
echo "🔨 Building for production..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"

    # Install Vercel CLI if not installed
    if ! command -v vercel &> /dev/null; then
        echo "📥 Installing Vercel CLI..."
        npm install -g vercel
    fi

    # Deploy to Vercel
    echo "🚀 Deploying to Vercel..."
    vercel --prod

    echo "🎉 Deployment complete!"
    echo "🌐 Your app should be live at the Vercel URL shown above"

else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi

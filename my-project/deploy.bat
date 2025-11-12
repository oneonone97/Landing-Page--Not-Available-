@echo off
echo 🚀 Starting deployment process...

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Install optional dependencies (terser for minification)
echo 📦 Installing optional dependencies...
call npm install terser --save-optional

REM Build for production
echo 🔨 Building for production...
call npm run build

REM Check if build was successful
if %ERRORLEVEL% EQU 0 (
    echo ✅ Build successful!

    REM Install Vercel CLI if not installed
    where vercel >nul 2>nul
    if %ERRORLEVEL% NEQ 0 (
        echo 📥 Installing Vercel CLI...
        call npm install -g vercel
    )

    REM Deploy to Vercel
    echo 🚀 Deploying to Vercel...
    call vercel --prod

    echo 🎉 Deployment complete!
    echo 🌐 Your app should be live at the Vercel URL shown above

) else (
    echo ❌ Build failed! Please check the errors above.
    exit /b 1
)

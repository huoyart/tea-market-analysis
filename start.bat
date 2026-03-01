@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Current directory: %CD%
echo.
if not exist node_modules (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo Failed to install dependencies!
        pause
        exit /b 1
    )
)
echo.
echo Starting development server...
echo Server will be available at http://localhost:3000
echo.
call npm run dev
if errorlevel 1 (
    echo.
    echo Failed to start development server!
    pause
    exit /b 1
)

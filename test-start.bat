@echo off
chcp 65001
cd /d "%~dp0"
echo Testing npm...
npm --version
echo.
echo Testing node...
node --version
echo.
echo Checking if node_modules exists...
if exist node_modules (
    echo node_modules found
) else (
    echo node_modules NOT found - need to install
)
pause

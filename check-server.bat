@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ========================================
echo 服务器状态检查
echo ========================================
echo.

echo [1] 检查 Node.js...
where node >nul 2>&1
if errorlevel 1 (
    echo ❌ 未找到 Node.js
    echo 请先安装 Node.js: https://nodejs.org/
    pause
    exit /b 1
) else (
    echo ✅ Node.js 已安装
    node --version
)
echo.

echo [2] 检查依赖...
if not exist "node_modules" (
    echo ❌ 依赖未安装
    echo 正在安装依赖...
    call npm install
    if errorlevel 1 (
        echo ❌ 依赖安装失败
        pause
        exit /b 1
    )
) else (
    echo ✅ 依赖已安装
)
echo.

echo [3] 检查端口 3000...
netstat -ano | findstr ":3000" >nul 2>&1
if errorlevel 1 (
    echo ⚠️  端口 3000 未被占用，服务器可能未启动
) else (
    echo ✅ 端口 3000 正在使用中
    netstat -ano | findstr ":3000"
)
echo.

echo [4] 尝试启动服务器...
echo 如果服务器已经在运行，请按 Ctrl+C 停止后重新运行
echo.
call npm run dev

pause

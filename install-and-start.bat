@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul 2>&1
echo ========================================
echo 茶叶市场行情分析系统 - 启动脚本
echo ========================================
echo.

cd /d "%~dp0"
echo 当前目录: %CD%
echo.

echo [1/3] 检查 Node.js 和 npm...
where node >nul 2>&1
if errorlevel 1 (
    echo 错误: 未找到 Node.js，请先安装 Node.js
    pause
    exit /b 1
)
node --version
if errorlevel 1 (
    echo 错误: 无法获取 Node.js 版本
    pause
    exit /b 1
)
npm --version
if errorlevel 1 (
    echo 错误: 无法获取 npm 版本
    pause
    exit /b 1
)
echo.
echo 第1步完成，继续执行...
echo.

echo [2/3] 检查依赖...
if not exist "node_modules" (
    echo 依赖未安装，开始安装...
    call npm install
    if errorlevel 1 (
        echo.
        echo 错误: 依赖安装失败！
        echo 请检查网络连接或尝试使用国内镜像：
        echo npm install --registry https://registry.npmmirror.com
        pause
        exit /b 1
    )
    echo 依赖安装完成！
) else (
    echo 依赖已存在，跳过安装
)
echo.

echo [3/3] 启动开发服务器...
echo.
echo ========================================
echo 服务器将在 http://localhost:3000 启动
echo 按 Ctrl+C 可停止服务器
echo ========================================
echo.

call npm run dev

pause

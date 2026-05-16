@echo off
set "ROOT=%~dp0"
start "SMART CHEF Backend" cmd /k "cd /d "%ROOT%backend" && start-backend.cmd"
timeout /t 6 /nobreak >nul
start "SMART CHEF Frontend" cmd /k "cd /d "%ROOT%frontend" && start-frontend.cmd"
echo SMART CHEF is starting.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
pause

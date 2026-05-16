@echo off
cd /d "%~dp0"
node --use-system-ca .\src\seed\seedData.js

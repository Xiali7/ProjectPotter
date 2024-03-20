@echo off
start cmd /k "npm run serve"
timeout /t 5 >nul
start http://localhost:8080/

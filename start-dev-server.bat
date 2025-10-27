@echo off
cd /d "%~dp0"
start "A Timer to Write - Dev Server" pwsh.exe -NoExit -Command "npm run dev"

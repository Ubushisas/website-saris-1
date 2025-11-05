@echo off
echo Iniciando Auto-Push a GitHub...
powershell -ExecutionPolicy Bypass -File "%~dp0auto-push.ps1"
pause

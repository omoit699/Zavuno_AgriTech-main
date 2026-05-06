@echo off
cd /d c:\Users\LORIS E-9 TRADERS\Documents\CAT1 EXAM 2026\Zavuno_Complete_Platform
del purge_output.txt purge_status.txt 2>nul
python purge_vsix.py > purge_output.txt 2>&1
echo %errorlevel% > purge_status.txt
type purge_output.txt


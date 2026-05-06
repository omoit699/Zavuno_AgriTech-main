@echo off
if exist "C:\Program Files (x86)\Microsoft SDKs\Azure\CLI2\wbin\az.cmd" (
echo found1
"C:\Program Files (x86)\Microsoft SDKs\Azure\CLI2\wbin\az.cmd" --version
) else (
echo no1
)
if exist "C:\Program Files\Microsoft SDKs\Azure\CLI2\wbin\az.cmd" (
echo found2
"C:\Program Files\Microsoft SDKs\Azure\CLI2\wbin\az.cmd" --version
) else (
echo no2
)
if exist "C:\Program Files\Microsoft Azure CLI\wbin\az.cmd" (
echo found3
"C:\Program Files\Microsoft Azure CLI\wbin\az.cmd" --version
) else (
echo no3
)
if exist "C:\Program Files (x86)\Microsoft Azure CLI\wbin\az.cmd" (
echo found4
"C:\Program Files (x86)\Microsoft Azure CLI\wbin\az.cmd" --version
) else (
echo no4
)
pause

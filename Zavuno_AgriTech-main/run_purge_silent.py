import subprocess
import sys

# Run the purge script as a Windows subprocess without terminal
result = subprocess.run([
    'C:\\Python314\\python.exe',
    'c:\\Users\\LORIS E-9 TRADERS\\Documents\\CAT1 EXAM 2026\\Zavuno_Complete_Platform\\standalone_purge.py'
], cwd='c:\\Users\\LORIS E-9 TRADERS\\Documents\\CAT1 EXAM 2026\\Zavuno_Complete_Platform')

sys.exit(result.returncode)

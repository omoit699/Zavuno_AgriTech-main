import subprocess
import os

os.chdir('c:/Users/LORIS E-9 TRADERS/Documents/CAT1 EXAM 2026/Zavuno_Complete_Platform')
files = subprocess.check_output(['git','rev-list','--objects','--all']).decode('utf-8','ignore').splitlines()
vsix = [f for f in files if f.lower().endswith('.vsix')]
print('\n'.join(vsix))

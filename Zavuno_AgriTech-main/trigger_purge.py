import os
import subprocess

# Remove old log files
repo_dir = r'c:\Users\LORIS E-9 TRADERS\Documents\CAT1 EXAM 2026\Zavuno_Complete_Platform'
os.chdir(repo_dir)

for old_log in ['git_purge_log.txt', 'purge_run.log']:
    try:
        os.remove(old_log)
    except:
        pass

# Now run the purge
result = subprocess.run(['python', 'standalone_purge.py'])
exit(result.returncode)

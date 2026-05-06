import subprocess
import os

repo_dir = r'c:\Users\LORIS E-9 TRADERS\Documents\CAT1 EXAM 2026\Zavuno_Complete_Platform'
os.chdir(repo_dir)

cmd = [
    'git', 'filter-branch', '--force',
    '--index-filter', 'git rm --cached --ignore-unmatch Zavuno_Complete_Platform/src/*.vsix',
    '--prune-empty', '--tag-name-filter', 'cat', '--', '--all'
]
print('Running:', ' '.join(cmd))
subprocess.run(cmd, check=True)

print('Expiring reflog and pruning unreachable objects...')
subprocess.run(['git', 'reflog', 'expire', '--expire=now', '--all'], check=True)
subprocess.run(['git', 'gc', '--prune=now', '--aggressive'], check=True)
print('Done.')

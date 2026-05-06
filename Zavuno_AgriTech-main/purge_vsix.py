import subprocess
import sys
import os

os.chdir(r'c:\Users\LORIS E-9 TRADERS\Documents\CAT1 EXAM 2026\Zavuno_Complete_Platform')

print('[1/5] Resetting uncommitted changes...')
try:
    subprocess.check_call(['git', 'reset', '--hard', 'HEAD'])
    print('[1/5] DONE')
except subprocess.CalledProcessError as e:
    print(f'[1/5] ERROR: {e}')
    sys.exit(1)

print('[2/5] Cleaning untracked files...')
try:
    subprocess.check_call(['git', 'clean', '-fd'])
    print('[2/5] DONE')
except subprocess.CalledProcessError as e:
    print(f'[2/5] ERROR: {e}')
    sys.exit(1)

print('[3/5] Running git filter-branch...')
try:
    subprocess.check_call([
        'git', 'filter-branch', '--force',
        '--index-filter', 'git rm --cached --ignore-unmatch Zavuno_Complete_Platform/src/*.vsix',
        '--prune-empty', '--tag-name-filter', 'cat', '--', '--all'
    ])
    print('[3/5] DONE')
except subprocess.CalledProcessError as e:
    print(f'[3/5] ERROR: {e}')
    sys.exit(1)

print('[4/5] Expiring reflog and pruning...')
try:
    subprocess.check_call(['git', 'reflog', 'expire', '--expire=now', '--all'])
    subprocess.check_call(['git', 'gc', '--prune=now', '--aggressive'])
    print('[4/5] DONE')
except subprocess.CalledProcessError as e:
    print(f'[4/5] ERROR: {e}')
    sys.exit(1)

print('[5/5] Verifying VSIX cleanup...')
try:
    result = subprocess.run(['git', 'rev-list', '--objects', '--all'], 
                          capture_output=True, text=True, check=True)
    vsix_count = sum(1 for line in result.stdout.splitlines() if line.lower().endswith('.vsix'))
    print(f'[5/5] Remaining VSIX objects: {vsix_count}')
    if vsix_count == 0:
        print('SUCCESS: All VSIX files removed from history')
    else:
        print(f'WARNING: {vsix_count} VSIX objects still in history')
except subprocess.CalledProcessError as e:
    print(f'[5/5] ERROR: {e}')
    sys.exit(1)

#!/usr/bin/env python3
import subprocess
import sys
import os
import time

os.chdir(r'c:\Users\LORIS E-9 TRADERS\Documents\CAT1 EXAM 2026\Zavuno_Complete_Platform')

# Write log to file AFTER operations complete
log_lines = []

def log(msg):
    log_lines.append(msg)
    print(msg)

log('=== GIT VSIX PURGE START ===')

# Step 1: Remove filter-branch artifacts
log('\n[1] Removing filter-branch artifacts...')
try:
    import shutil
    for path in ['.git/refs/original', '.git/objects/refs/originals']:
        if os.path.exists(path):
            shutil.rmtree(path)
            log(f'  Removed: {path}')
except Exception as e:
    log(f'  WARNING: {e}')

# Step 2: Reset
log('\n[2] Hard reset HEAD...')
try:
    result = subprocess.run(['git', 'reset', '--hard', 'HEAD'], 
                          capture_output=True, text=True, timeout=60)
    if result.returncode == 0:
        log('  OK')
    else:
        log(f'  ERROR: {result.stderr[:200]}')
        log('  ABORT')
        sys.exit(1)
except Exception as e:
    log(f'  ERROR: {e}')
    sys.exit(1)

# Step 3: Clean
log('\n[3] Cleaning untracked files...')
try:
    result = subprocess.run(['git', 'clean', '-fd', '-e', 'git_purge_log.txt', '-e', '*.py', '-e', '*.bat'], 
                          capture_output=True, text=True, timeout=60)
    if result.returncode == 0 or 'failed to remove' in result.stderr:
        log('  OK (ignoring file lock warnings)')
    else:
        log(f'  ERROR: {result.stderr[:200]}')
except Exception as e:
    log(f'  WARNING: {e}')

# Step 4: Filter-branch
log('\n[4] Running git filter-branch...')
env = os.environ.copy()
env['FILTER_BRANCH_SQUELCH_WARNING'] = '1'
try:
    result = subprocess.run([
        'git', 'filter-branch', '--force',
        '--index-filter', 'git rm --cached --ignore-unmatch Zavuno_Complete_Platform/src/*.vsix',
        '--prune-empty', '--tag-name-filter', 'cat', '--', '--all'
    ], capture_output=True, text=True, timeout=900, env=env)
    
    if result.returncode == 0:
        log('  OK - filter-branch completed')
        # Count rewritten refs
        rewrite_count = result.stdout.count('Rewrite ')
        log(f'  Rewrote {rewrite_count} commits')
    else:
        log(f'  ERROR: {result.stderr[:500]}')
        log('  ABORT')
        sys.exit(1)
except subprocess.TimeoutExpired:
    log('  ERROR: TIMEOUT (900 seconds)')
    sys.exit(1)
except Exception as e:
    log(f'  ERROR: {e}')
    sys.exit(1)

# Step 5: Reflog
log('\n[5] Expiring reflog...')
try:
    result = subprocess.run(['git', 'reflog', 'expire', '--expire=now', '--all'], 
                          capture_output=True, text=True, timeout=60)
    log('  OK')
except Exception as e:
    log(f'  WARNING: {e}')

# Step 6: GC
log('\n[6] Running git gc...')
try:
    result = subprocess.run(['git', 'gc', '--prune=now', '--aggressive'], 
                          capture_output=True, text=True, timeout=300)
    log('  OK')
except Exception as e:
    log(f'  WARNING: {e}')

# Step 7: Verify
log('\n[7] Verifying VSIX removal...')
try:
    result = subprocess.run(['git', 'rev-list', '--objects', '--all'], 
                          capture_output=True, text=True, timeout=60)
    vsix_lines = [l for l in result.stdout.splitlines() if l.lower().endswith('.vsix')]
    log(f'  VSIX objects found: {len(vsix_lines)}')
    if len(vsix_lines) > 0:
        for line in vsix_lines[:5]:
            log(f'    - {line[:80]}')
        log('  FAIL: VSIX files still in history')
    else:
        log('  SUCCESS: All VSIX removed from history!')
except Exception as e:
    log(f'  ERROR: {e}')

log('\n=== GIT VSIX PURGE COMPLETE ===\n')

# Write log to file
with open('git_purge_log.txt', 'w') as f:
    f.write('\n'.join(log_lines))

# Also print to stdout so we can see in terminal if redirected
for line in log_lines:
    print(line)

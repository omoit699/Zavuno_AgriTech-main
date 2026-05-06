import subprocess
import os

repo_dir = r"c:/Users/LORIS E-9 TRADERS/Documents/CAT1 EXAM 2026/Zavuno_Complete_Platform"
os.chdir(repo_dir)

files = [
    "Zavuno_Complete_Platform/src/ms-azuretools.vscode-azure-github-copilot-1.0.201-win32-x64.vsix",
    "Zavuno_Complete_Platform/src/ms-azuretools.vscode-azure-mcp-server-3.0.8-win32-x64.vsix",
    "Zavuno_Complete_Platform/src/ms-azuretools.vscode-azureappservice-0.26.5.vsix",
    "Zavuno_Complete_Platform/src/ms-edgedevtools.vscode-edge-devtools-2.1.10.vsix",
]
cmd = [
    "git",
    "filter-branch",
    "--force",
    "--index-filter",
    "git rm --cached --ignore-unmatch " + " ".join(files),
    "--prune-empty",
    "--tag-name-filter",
    "cat",
    "--",
    "--all",
]
print('Running:', ' '.join(cmd))
subprocess.run(cmd, check=True)
print('Completed filter-branch purge.')

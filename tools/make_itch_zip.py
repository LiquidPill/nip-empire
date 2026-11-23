"""Build the game and pack it for itch.io as nip-empire-itch.zip (index.html at the root)."""
import os, subprocess, sys, zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
subprocess.run([sys.executable, os.path.join(ROOT, 'build.py')], check=True)
out = os.path.join(ROOT, 'nip-empire-itch.zip')
with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as z:
    z.write(os.path.join(ROOT, 'dist', 'index.html'), 'index.html')
print(f'wrote nip-empire-itch.zip ({os.path.getsize(out) // 1024} KB)')

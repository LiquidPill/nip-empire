"""Build dist/test.html: the game plus a test hook, for the bot in tools/bot.js.

Open http://localhost:8000/dist/test.html?debug=1 (serve the repo folder with
`python -m http.server`). With ?debug in the address the game makes no sound.
Then, in the browser console:

    eval(await (await fetch('../tools/bot.js')).text()); B.combo = true;
    B.run(60)      // play 60 in-game months, prints chapter times
    B.status()     // current chapter goals
"""
import os, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
HOOK = ("if(TEST)window.__nip={get G(){return G;},step(sec){for(let t=0;t<sec;t+=.05)update(.05);render();hud();},"
        "custs:()=>custs,act,render,canPlace,travel,progressCheck,talkSkip,openJournal,applyReward,placeAt,"
        "LOCS,FAC,CHAPTERS,objDone,objText,computeRate};//DEBUG")
subprocess.run([sys.executable, os.path.join(ROOT, 'build.py')], check=True)
s = open(os.path.join(ROOT, 'dist', 'index.html'), encoding='utf8').read()
anchor = 'requestAnimationFrame(frame);\n})();'
if anchor not in s:
    sys.exit('could not find where to add the test hook')
s = s.replace(anchor, HOOK + '\n' + anchor)
open(os.path.join(ROOT, 'dist', 'test.html'), 'w', encoding='utf8', newline='\n').write(s)
print('wrote dist/test.html')

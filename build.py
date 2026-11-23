"""Build dist/index.html: one self-contained file that plays offline.

The game source is src/game.html (the page body, without <html>/<head>).
This script wraps it in a full page and embeds the DotGothic16 pixel font,
trimmed to the characters the game actually uses.

Usage:  python build.py
Needs:  Python 3. fonttools (pip install fonttools) is optional: without it the
        whole font is embedded and the file is about 2.7 MB instead of ~100 KB.
"""
import base64, io, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'src', 'game.html')
FONT = os.path.join(HERE, 'fonts', 'DotGothic16-Regular.ttf')
OUT = os.path.join(HERE, 'dist', 'index.html')


def font_data(text):
    """Return (mime, format, bytes) for the font, subset to `text` when possible."""
    raw = open(FONT, 'rb').read()
    try:
        from fontTools import subset
        from fontTools.ttLib import TTFont
    except ImportError:
        print('fonttools not installed: embedding the full font')
        return 'font/ttf', 'truetype', raw
    chars = set(text) | set(chr(c) for c in range(32, 127))
    font = TTFont(io.BytesIO(raw))
    opts = subset.Options()
    opts.layout_features = ['*']
    opts.name_IDs = ['*']
    opts.notdef_outline = True
    try:
        import brotli  # noqa: F401  (woff2 needs brotli)
        opts.flavor = 'woff2'
        mime, fmt = 'font/woff2', 'woff2'
    except ImportError:
        mime, fmt = 'font/ttf', 'truetype'
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=[ord(c) for c in chars])
    sub.subset(font)
    font.flavor = opts.flavor
    buf = io.BytesIO()
    font.save(buf)
    return mime, fmt, buf.getvalue()


def main():
    body = open(SRC, encoding='utf8').read()
    if '//DEBUG' in body:
        sys.exit('src/game.html still contains the debug hook (a line ending in //DEBUG). Remove it first.')
    # drop the online font links: the font is embedded below
    body = re.sub(r'<link[^>]*fonts\.(googleapis|gstatic)\.com[^>]*>\s*', '', body)
    mime, fmt, data = font_data(body)
    face = ("@font-face{font-family:'DotGothic16';font-style:normal;font-weight:400;font-display:block;"
            f"src:url(data:{mime};base64,{base64.b64encode(data).decode()}) format('{fmt}')}}")
    page = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
            '<meta name="theme-color" content="#1b1534">\n<title>Nip Empire</title>\n'
            f'<style>{face}</style>\n</head>\n<body>\n{body}\n</body>\n</html>\n')
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    open(OUT, 'w', encoding='utf8', newline='\n').write(page)
    print(f'wrote dist/index.html ({len(page) // 1024} KB, font {len(data) // 1024} KB {fmt})')


if __name__ == '__main__':
    main()

# Nip Empire

A pocket-sized business sim about upright, pants-wearing cats and the city's
hottest product: catnip. Start with two flowerpots in Old Whiskers' garage and
build a catnip empire across eight buildings, from a shipping container on
Pier 7 to a penthouse at the top of the city.

**Play it:** download [`dist/index.html`](dist/index.html) and open it in any
browser (phone or computer). It's a single file and works offline. It is also on
itch.io: *(link coming soon)*.

## Features

- 8 chapters, each with its own building, product line, rival and story, plus a
  post-game chapter
- Grow, process and refine catnip, then sell it to 24 kinds of customers who
  each have a favorite
- Hire and train crew with traits and personal requests, and keep the Dog Squad
  off your back with guards (and bluffs)
- Combos, side quests, regular customers with their own stories, visitors,
  dialogue choices, rival showdowns, hidden golden mice and a scrapbook
- Day and night, chiptune music and sound, all drawn and synthesized in code:
  no image or audio files
- Saves in the browser, with save codes to move a game between devices

## Project layout

| Path | What it is |
| --- | --- |
| `src/game.html` | The whole game: markup, styles and script in one file (the page body). Edit this. |
| `build.py` | Wraps `src/game.html` into `dist/index.html` and embeds the font. |
| `dist/index.html` | The built game. This is the file to share or upload. |
| `fonts/` | DotGothic16, the pixel font, and its licence. |
| `tools/` | A test bot that plays the game, and a script that builds a test page for it. |

## Building

```
python build.py
```

Needs Python 3. With [fonttools](https://pypi.org/project/fonttools/) and
brotli installed (`pip install fonttools brotli`) the font is trimmed to the
characters the game uses (about 11 KB). Without them, the full font is embedded
and the file is about 2.7 MB.

## Testing

```
python tools/make_test.py
python -m http.server
```

Open `http://localhost:8000/dist/test.html?debug=1`. With `?debug` in the
address the game is silent. See `tools/make_test.py` for how to run the bot.

## Licence

The game (code, story text, pixel art and music, everything in this repository
except the font) is dedicated to the public domain under
[CC0 1.0](LICENSE). You can copy, change, sell and remix it without asking or
giving credit.

The font, **DotGothic16** by the DotGothic16 Project Authors (Fontworks), is
*not* covered by CC0. It is licensed under the SIL Open Font License 1.1; see
[`fonts/OFL.txt`](fonts/OFL.txt). Keep that licence with the font if you
redistribute it.

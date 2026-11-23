# itch.io page

Notes for publishing Nip Empire on itch.io. The upload is `nip-empire-itch.zip`,
made by `python tools/make_itch_zip.py`. It holds `dist/index.html`, renamed to
`index.html` at the root of the zip, which is what itch.io needs.

## Automatic updates

Every push to `main` that changes the game (src/, fonts/, build.py) runs the
GitHub Action in `.github/workflows/itch.yml`. It builds the zip and uploads it to
itch.io with butler, on GitHub's servers. You can also run it by hand from the
repo's Actions tab ("Publish to itch.io" › Run workflow).

One-time setup:
1. On itch.io, create an API key: https://itch.io/user/settings/api-keys
2. Add it to the repo as a secret named `BUTLER_API_KEY`
   (`gh secret set BUTLER_API_KEY --repo LiquidPill/nip-empire`, then paste it).
3. Set the repo variable `ITCH_TARGET` to `your-itch-username/nip-empire`.
4. After the first automatic upload, open Edit game on itch.io, tick
   "This file will be played in the browser" on the new `html` upload, and
   delete any older manually uploaded zip. Later uploads replace it automatically.

Butler can't post devlogs, so write those on itch.io yourself.

## Settings (Create new project)

- **Title:** Nip Empire
- **Project URL:** nip-empire
- **Short description:** Build a catnip empire with a crew of upright cats. A pocket business sim.
- **Classification:** Games
- **Kind of project:** HTML
- **Upload:** `nip-empire-itch.zip`, then tick "This file will be played in the browser"
- **Embed options:**
  - Embed in page, viewport 480 × 854 (portrait; the game is laid out for a phone screen)
  - Tick "Mobile friendly", orientation Portrait
  - Tick "Fullscreen button"
  - Leave "Automatically start on page load" off (the game starts on a click anyway, and sound needs a tap)
  - Scrollbars off; SharedArrayBuffer support not needed
- **Release status:** Released
- **Pricing:** "No payments", or "$0 or donate" if you'd like tips
- **Genre:** Simulation
- **Tags:** tycoon, management, cats, pixel-art, business, story-rich, singleplayer, cute, open-source
- **AI disclosure:** Yes. Tick Graphics, Sound, Text & Dialog and Code (all made with AI assistance)
- **App store links / Source code:** add the GitHub repo, https://github.com/LiquidPill/nip-empire
- **Custom noun:** leave as "game"
- **Community:** Comments
- **Visibility:** Draft while you check it, then Public

Saves are kept in the player's browser and survive game updates. Players can back
up or move a save with Menu › Transfer with a save code.

## Description (paste into the page)

> The cats stand upright now. They wear pants. They have jobs. And every one of
> them wants the good leaf.
>
> Old Whiskers lends you his garage and two flowerpots. Grow catnip, dry it,
> press it, and sell it to a city full of cats, then expand into a shipping
> container, a motel room, a houseboat, a moving truck, an observatory, an old
> cinema and finally the penthouse at the top of the city.
>
> - 8 chapters plus a post-game chapter, each with its own building, products, rival, production twist and unique furniture
> - Hire crew with quirky traits, train them, and keep them loyal
> - Keep the heat down or Captain Rex and the Dog Squad come sniffing
> - Find combos, help regular customers, make choices, win showdowns, and hunt for hidden golden mice
> - Saves in your browser, with save codes to move between devices
>
> Plays on phones and computers. Tap once to start the music.
>
> **Made with AI assistance.** Code, art, sound and writing were all created with
> AI help, and it's fully open source, so take it apart and see how it works.
>
> **Open source and public domain (CC0).** The full project is on GitHub: https://github.com/LiquidPill/nip-empire
> Copy it, mod it, remix it, sell it, no permission needed.
> Font: DotGothic16 (SIL Open Font License).

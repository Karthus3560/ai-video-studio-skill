# Recipe: the "N tools" listicle

Distilled from a study of popular AI / GitHub / Claude Code guide videos in English and Arabic (late 2026): what the hits share, turned into a template for a 7-8 minute video with a cartoon presenter.

## What the hits have in common

- **Proof first.** The best output plays in the first seconds, before any talk: "Everything you're watching was made by…". No logo sting, no title card, no "welcome back".
- **A number and a pain.** "$320 a month", "100,000 repos and most are a waste of time", "800 hours".
- **A navigator that stays on screen.** A corner counter, a numbered map of tiles, "Level N". The viewer always knows where they are and how many are left.
- **A name card per tool:** logo or README hero, `owner/repo`, GitHub stars, licence.
- **One big element per beat:** a giant number, a price tag with a strike, a before/after.
- **A visual change every 2-3 s in the hook and every 3-5 s in demos.**
- **Cartoon presenters work.** A mascot-led repo list had the best like ratio of the videos studied.
- **Pace:** English hits speak at 205-250 words a minute; Arabic hits at about 135-180 (Arabic words are longer, so compare Arabic with Arabic).
- **What fails:** a pure feed of many tools with no opinion, no demo and no personality.

## Timeline for 7 tools (~7:30)

| Time | Beat | On screen |
|---|---|---|
| 0:00-0:03 | **Proof cold open** | The most impressive real output, full screen, hard sound, one huge line ("$0 / month"). |
| 0:03-0:12 | **Pain + number** | Presenter pops in. Price tags of paid apps stack up, a counter rolls to the total, a thick STRIKE goes through it. |
| 0:12-0:22 | **Promise + map** | The navigator appears: 7 numbered tiles. "I tested 30+, these 7 are worth installing, and #1 is the one I use daily." |
| 0:22-0:28 | **Rules card** | Chips like FREE · OPEN SOURCE · RUNS LOCAL. Only claim what you checked. |
| 0:28-6:50 | **7 segments, ~55 s each** | See below. |
| 6:50-7:15 | **Recap** | All tiles with verdict stickers ("Start here", "For coders", "Skip if…"). Presenter points at "Start here". |
| 7:15-7:30 | **Outro** | One line ("every link is in the description") and an end screen. No long goodbye. |

## One segment (~55 s)

| s | Beat | On screen |
|---|---|---|
| 0-3 | **Name card** | Navigator zooms into tile N: big number, logo, `owner/repo`, ★ stars counting up, licence chip. Whoosh + pop. |
| 3-10 | **Analogy** | Presenter, one held pose: "It's like Docker for AI models." Caption with one coloured keyword. |
| 10-35 | **Demo** | Framed screen recording, 1.3-2x zoom onto the action, the command highlighted, the result revealed. Presenter small in a corner. A cut or zoom every 3-5 s. |
| 35-45 | **Money / time angle** | One big element: "$0 vs $20/mo", the paid app it replaces struck through, or who could sell this as a service. |
| 45-52 | **Verdict** | Sticker: "Use it if… / Skip if…", a 1-5 rating or GOOD FOR tag. |
| 52-55 | **Back to the map** | Tile N gets a ✓, tile N+1 lights up. |

Placement tricks:

- A joke or reaction cut-in every 30-40 s (a presenter variant pose works).
- Put the strongest tool at #1 or #7, and a surprise at #5 or #6 to hold the middle.

## Build it from one data file

```json
[{ "name": "Kokoro", "repo": "hexgrad/kokoro", "stars": "verify on the day", "license": "check repo",
   "oneLiner": "...", "analogy": "...", "demoClip": "captures/kokoro.mp4",
   "moneyAngle": "...", "verdict": "Start here", "forWho": "..." }]
```

Both language versions render from the same file. Check star counts and licences on the day you write the script, and say "as of <date>" if they appear on screen.

## Audio

- Narration -16 LUFS, music ~18 dB under.
- SFX (Mixkit): whoosh on navigator moves, pop on stickers and stars, keyboard clicks under terminal demos, a ding on verdicts.

## Titles, thumbnails, descriptions

- Title formulas that hit: `N [free/open-source] AI tools that replace paid apps`, `I tried 100+ X. These N are the best`, `Learn 80% of X in 10 minutes`, `X - full tutorial for beginners`. Arabic search loves "من الصفر", "مجاني", "بالعربي".
- Thumbnail: 2-4 huge words, presenter with a strong expression, tool logos as props, one saturated accent.
- Description: what the viewer gets, then every tool with its link (numbered), chapters with tool names, then socials.

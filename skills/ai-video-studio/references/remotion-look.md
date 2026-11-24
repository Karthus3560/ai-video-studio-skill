# Phases 6-7: the neo-brutalism look in Remotion, and real captures

## Why Remotion

Remotion renders React components to video. Claude writes the code, the user says what they like and don't, and every time on screen comes from the data file, so re-voicing never breaks the edit. Remotion is free for individuals and for companies with up to 3 employees; larger companies need a company licence (check remotion.dev/license). HyperFrames (HTML/CSS rendered to video, from HeyGen) is a good alternative if the user prefers plain HTML.

Setup: `npx create-video@latest`, 1920x1080, 30 fps. Load Google Fonts with `@remotion/google-fonts` (Cairo for Arabic and body text, Anton for big Latin numbers and labels).

## The look

| Token | Value | Use |
|---|---|---|
| paper | `#FFF7E0` | page background, with a 96 px grid of 2 px ink lines at ~13% opacity |
| ink | `#16120F` | all borders (6-8 px), text, hard shadows |
| yellow | `#FFC928` | main blocks, title bars, highlights |
| blue | `#2F6BFF` | accents, arrows, bursts, "paid" strips, shadow colour on dark cards |
| white | `#FFFFFF` | cards |
| red | `#FF4D3D` | stamps, "fail" marks |
| green | `#2BD67B` | "free" pills |

- **Blocks:** thick ink border, 14-16 px radius, a **hard offset shadow** with no blur (`box-shadow: 14px 14px 0 #16120F`). Slight rotations (-2° to 2°) make it feel hand-placed.
- **Type:** Cairo Black (900) for Arabic and body, Anton for numbers and English labels. Big: 80-150 px for headlines.
- **Motion:** things slap onto the page. A spring (damping ~11, stiffness ~180) on scale 0.7 → 1, a drop from above and a rotation settle. The shadow grows from 0 to full as the block lands. Exits are quick (~0.22 s fade + shrink).
- **Ticker:** a thin ink strip across the top with the channel name scrolling in yellow.
- **Stamps:** a bordered word ("OFFICIAL", "FREE FIRST", "YOU APPROVE") that thumps down from scale 2.2 → 1 at an angle.
- **Bursts:** three short blue bars fanned out, popping next to an important block.

## Components

Build these once and reuse them. Each takes `a` and `b` (seconds on screen) taken from the data file, never typed by hand: `a={S(17)} b={E(19)}` where `S(n)` and `E(n)` read line n's start and end.

| Component | What it shows |
|---|---|
| `Paper`, `Ticker` | background grid paper; top channel ticker |
| `NBBox` | the basic sticker block: text or children, colour, rotation |
| `Stamp`, `Burst`, `Arrow`, `Pill` | accents; the arrow points in the reading direction unless told otherwise |
| `StepBanner` | chapter banner: big number + title slams in for ~2 s, then tucks into a corner tag |
| `ScreenFrame` | an app window (yellow title bar, three squares) holding a screenshot or screen recording, with zoom keyframes `[time, scale, focusX, focusY]` |
| `Terminal` | a terminal replay: real commands typed out, real output lines revealed at set times |
| `ToolCard` | one job (icon + name) with its FREE tools on a green strip; the PAID strip slides in later |
| `ABPlayer` | two cards, free voice vs paid voice; the one playing lifts, shows a live waveform and 🔊 |
| `CodeCard` | a dark code window that types out real code lines |
| `WordsCard` | Whisper word chips popping in with their timestamps, the current word highlighted |
| `CostTable` | rows that stamp FREE one by one, then a PAID UPGRADE column fades in |
| `Caption` | ~7-word phrases of the script's words, active word in yellow, on an ink pill with a yellow shadow |
| `Meter` | voice vs music level bars (for the "keep music quiet" point) |
| `PresenterHolds` | the held poses + variants (see `presenter.md`) |

## Right-to-left and left-to-right

Make every component direction-aware so the Arabic and English versions share one codebase:

```tsx
export type Dir = "rtl" | "ltr";
export const DirCtx = React.createContext<Dir>("rtl");
export const useDir = () => React.useContext(DirCtx);

// in a component
const dir = useDir();
<div dir={dir} style={{ textAlign: "start" }}>…</div>

// at the top of each composition
<DirCtx.Provider value="rtl"> … </DirCtx.Provider>   // GuideAR
<DirCtx.Provider value="ltr"> … </DirCtx.Provider>   // GuideEN
```

- Use `marginInlineStart`, `textAlign: "start"` and `dir="auto"` instead of left/right where you can.
- Latin tool names inside Arabic text: wrap them in `<span dir="ltr">`.
- Code, terminals and timestamps are always `dir="ltr"`.

## One composition per language

```tsx
const L = (n: number) => DATA.lines[n - 1];
const S = (n: number) => L(n).s;
const E = (n: number) => L(n).e;

<AbsoluteFill>
  <Paper /><Ticker />
  <StepBanner a={S(17)} b={E(22)} num="02" title="الصوت" en="VOICE" />
  <ToolCard a={S(19)} b={E(19)} cx={640} y={260} icon="🎙️" title="الصوت"
            free="Kokoro · Chatterbox" paid="ElevenLabs" freeLabel="مجاني" paidLabel="مدفوع" paidAt={S(20)} />
  <Caption lines={CAPS} cx={640} y={930} w={1150} />
  <PresenterHolds holds={HOLDS} words={WORDS} />
  <Audio src={staticFile("audio/narration.wav")} />
  <Audio src={staticFile("audio/music_bed.wav")} />
</AbsoluteFill>
```

A helper that finds the time of a word inside a line lets a box land exactly on the word that names it: `W(n, "Remotion")` returns the start of the first matching word in line n.

## Real captures (phase 7)

Real footage is the proof. Show the actual app, the actual terminal, the actual files.

- Record a window or a region on Windows with ffmpeg:
  ```bash
  ffmpeg -f gdigrab -framerate 30 -offset_x 0 -offset_y 80 -video_size 1600x900 -i desktop -t 20 -c:v libx264 -crf 18 -pix_fmt yuv420p capture.mp4
  ```
  (`-i title="Window title"` records one window.) On macOS use `avfoundation`, on Linux `x11grab`.
- **Crop for privacy before anything else.** Sidebars with other projects, account names, emails, notifications, API keys in terminals: crop them out or blur them, then check the crop frame by frame on a contact sheet.
- Prefer showing real artifacts: the script file scrolling, a real pose sheet, the real Whisper word list, the real cost table.
- Put captures inside `ScreenFrame` with slow zooms toward the action (1.3-2x).

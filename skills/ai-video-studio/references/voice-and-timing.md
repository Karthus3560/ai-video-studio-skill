# Phases 1-4: script, voice, narration, timing

## 1. The script

Every line carries three things: the words, a presenter pose and an on-screen visual. Group lines into chapters (one chapter = one TTS call later).

```markdown
## 4. Step two: the voice

17. Step two: the voice. And here I have to confess something…
   - pose `oo` · visual: step banner "02 VOICE"
18. [whispers] The voice you're hearing right now… is paid. It's a clone of my voice.
   - pose `hand_chest` · visual: ElevenLabs card with PAID tag
19. But there's a free one that runs on my laptop: Kokoro for ready-made voices, and Chatterbox, which clones you from twenty seconds of audio.
   - pose `present` · visual: Kokoro + Chatterbox cards with FREE tag, terminal capture
20. Listen to the difference. This is the free one…
   - pose `point_left` · visual: A/B player, FREE side plays [narration pauses ~4 s for the clip]
```

Rules that paid off:

- **Write in the spoken dialect,** in short sentences. Read it aloud in your head.
- **Write tool names the way the voice should say them.** In Arabic, write them in Arabic letters (كلود كود, ريموشن) so the voice pronounces them; the screen shows the Latin name.
- **Audio tags** like `[excited]`, `[whispers]`, `[laughs]` work in ElevenLabs v3-class models. Strip them for other engines.
- **Pose names** come from your presenter's pose list (see `presenter.md`). Pick by meaning: `point_you` for "you can do this", `think_chin` for a question, `shrug` for a failure.
- **Visuals** say what is on screen in plain words. They become your build list for Remotion.
- **Plan the gaps.** If a sample clip or a song snippet plays on its own, mark the pause in the script.
- Hook first: action and proof at second 0, no logo sting, no "welcome back". The channel name can come at the end.

The user reviews the script before anything is voiced. Change it as often as they like now; after voicing, every change costs a retake.

## 2. Voice: one call per chapter, two takes

- Split the script into chapters (`voice_chunks.json`: `[{"id": "c03", "text": "..."}]`). Per-chapter calls keep the tone steady inside a chapter and make retakes cheap.
- Generate **2 takes per chapter**. Name them `takes/c03_t1.mp3`, `takes/c03_t2.mp3`.
- Long chapters (over ~90 s) can drift in pace. Split them (c04a, c04b, c04c), and split around any A/B clip.
- Free route: Kokoro for stock voices, Chatterbox for a clone (reference clip 10-30 s, clean, same mic as you'll judge by). Paid route: ElevenLabs, instant voice clone, latest multilingual model.

## 3. QC every take with faster-whisper

Transcribe each take and score it against its chapter text. Normalise both sides first.

```python
from faster_whisper import WhisperModel
import difflib, re

model = WhisperModel("medium", device="cpu", compute_type="int8")   # CPU is fine; GPU if CUDA libs are present

def norm(t):
    t = re.sub(r"\[.*?\]", "", t)                 # drop audio tags
    t = re.sub(r"[ً-ْـ]", "", t)   # Arabic diacritics + tatweel
    for a, b in (("أ","ا"), ("إ","ا"), ("آ","ا"), ("ة","ه"), ("ى","ي")):
        t = t.replace(a, b)
    return re.sub(r"[^\w\s]", " ", t).split()

segs, _ = model.transcribe("takes/c03_t1.mp3", language="ar", word_timestamps=True)
hyp = " ".join(w.word.strip() for s in segs for w in s.words)
score = difflib.SequenceMatcher(None, norm(chapter_text), norm(hyp)).ratio()
```

How to read the scores:

- **0.75-0.9 is normal for a good take** when the script has tool names. Whisper writes them in Latin letters ("11 Labs", "KOKORO") while your script has them in Arabic letters, and that drags the score down. Compare takes of the same chapter with each other, not against 1.0.
- A take far below its sibling usually has a skipped or repeated phrase. Listen to that spot.
- **A short isolated line can be misheard** (in our run, one paid/free word came back as nonsense). Before paying for a retake, re-transcribe with `initial_prompt=chapter_text`. If the prompted pass matches, the take is fine.
- Always listen to the chosen takes once, start to end.

## 4. Join the narration

Build one narration file from the chosen takes:

1. Loudness-normalise each take (`ffmpeg -af loudnorm=I=-16:TP=-1.5:LRA=11`), trim silence below about -45 dBFS at both ends (keep ~50 ms before, ~120 ms after).
2. Put a gap before each piece: ~0.75 s between chapters (room for the chapter banner), ~0.45 s before an A/B sample clip, 0 before the first piece.
3. Slot the A/B sample clips (the free voice vs the paid voice saying the same sentence) into their planned gaps.
4. Normalise the whole file again to -16 LUFS, true peak -1.5 dB.
5. Write `segments.json`: `[{"id": "c03", "file": "...", "start": 61.2, "end": 79.8}]`. Everything later uses these times.

Then run Whisper once on the joined file with `word_timestamps=True` and save `words.json`: `[{"w": "...", "s": 61.31, "e": 61.62}]`.

## 5. Align script lines to the words

Nothing is hand-timed. For each chapter:

1. Take the Whisper words inside the chapter's segment.
2. Normalise script tokens and Whisper tokens the same way (as in QC).
3. Run `difflib.SequenceMatcher(None, script_tokens, whisper_tokens, autojunk=False)` and walk `get_matching_blocks()`: the first and last matched word of each script line give the line's start and end.
4. Fill lines with no match from their neighbours (previous end + 0.05 s), and pin the chapter's first line to the segment start so the pose lands with the breath.
5. **Captions use the script's words, not Whisper's.** Whisper misspells tool names and dialect words. Spread the script's tokens over the line's Whisper word times (token i gets word round(i·(n_words-1)/(n_tokens-1))).
6. If a clip or song plays alone (a gap you add after alignment), insert the silence into the audio and shift every later time by the gap.

Write one data file for the video (`video_data.json`):

```json
{ "lang": "ar", "duration": 297.4,
  "segments": { "c03": { "s": 61.2, "e": 79.8 } },
  "lines": [ { "n": 17, "text": "...", "pose": "oo", "visual": "...",
               "s": 82.1, "e": 85.9,
               "words": [ { "w": "...", "s": 82.2, "e": 82.6 } ],
               "cap":   [ { "w": "...", "s": 82.2, "e": 82.6 } ] } ] }
```

Print a table (line, start, end, pose, word count) and read it. A line with 0 words or a line longer than its chapter means the alignment slipped; fix the script text or the chunk mapping, not the times.

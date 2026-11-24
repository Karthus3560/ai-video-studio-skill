# Phases 8-9: music, render, review, publish

## Music

- **Free route:** Mixkit (free licence, no attribution needed, check mixkit.co/license for the current terms). **Local route:** ACE-Step 1.5 writes full songs with vocals on a consumer GPU. **Paid:** Suno.
- **Levels:** narration at **-16 LUFS**, music bed at about **-34 LUFS**, so about **18 dB under the voice**. Small sound effects lower still (~-39). In stretches with no voice (a silent intro) the music may come up, but stay at least ~7 dB under the narration level. Our channel owner called the music "too loud" twice at 3 dB and 11 dB under; 18 dB under was right. When in doubt, go quieter.
- **Ducking:** when a song clip or a sample plays with its own audio, fade the bed down by another 10-15 dB over ~0.3 s and back up after.
- Loop or crossfade the bed to cover the full length, and fade it out over the last 2-3 s.
- Measure, don't trust the meter in your head:
  ```bash
  ffmpeg -i music_bed.wav -af ebur128 -f null - 2>&1 | tail -12
  ```

## Render in parts

A five-minute 1080p render takes a while, and long renders crash. Render per chapter:

1. Bundle once: `npx remotion bundle src/index.ts --out-dir build`.
2. Compute chapter frame ranges from the data file (midpoint between the last line of a chapter and the first line of the next).
3. Render each part **muted**: `npx remotion render build GuideEN out/parts/part03.mp4 --frames=1830-2711 --muted --codec=h264 --crf=18`.
4. Render the audio **once** for the whole video: `npx remotion render build GuideEN out/parts/audio.wav --codec=wav`.
5. Join the parts with stream copy, then add the audio:
   ```bash
   ffmpeg -f concat -safe 0 -i list.txt -c copy video.mp4
   ffmpeg -i video.mp4 -i audio.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart final.mp4
   ```

One audio render avoids clicks and drift at part boundaries. A failed part can be re-rendered alone. Raise Remotion's concurrency (`Config.setConcurrency`) if the CPU is not maxed out.

## Check before you send

- **Contact sheet** of the whole video (one frame every ~10 s) and a dense one of the **first 15 seconds** (one frame per second). Look for: empty frames, overlapping boxes, text under the presenter, a box on screen after its line ended, private info in captures.
  ```bash
  ffmpeg -i final.mp4 -vf "fps=1/10,scale=480:-1,tile=6x5" -frames:v 1 sheet.png
  ```
- **Loudness** of the final file: integrated about -16 LUFS for narration-led videos (YouTube normalises louder uploads down anyway).
- **Length and sync:** `ffprobe` the final file; play the start, one chapter change and the end.

## Review, second language, extras

1. **User review of the first cut.** Collect notes as a numbered list with timestamps. Fix, re-render only the parts that changed.
2. **Second language.** Translate the script into the second language's spoken style (not word for word), voice it, QC, join, align, and render the second composition from the same components with the other `dir`. Keep visuals identical unless a label needs translating.
3. **Thumbnails.** 2-4 huge words, the presenter with a strong expression, one or two tool logos as props, high contrast. Make one per language; Arabic text on the Arabic thumbnail, Latin tool names stay Latin.
4. **Description.** First lines: what the viewer gets and the main link. Then every tool with its official link, chapters with timestamps (from the data file's chapter starts), the channel's links, then hashtags. Tags: 15-25 relevant ones, both languages if both audiences search.
5. **Captions file.** Export the script-word captions as SRT/VTT and upload them too; they help search and accessibility.

## Upload

- **Only on the user's explicit go,** every time. Show them the final file, title, description, tags, thumbnail, playlist and visibility first.
- Use the YouTube Data API (`videos.insert`, then `thumbnails.set` and `playlistItems.insert`) or let the user upload in YouTube Studio. Default to **private** or **unlisted** until the user says public.
- **AI or synthetic-content disclosure:** ask the user how they want to answer the platform's question (YouTube Studio's "altered or synthetic content", TikTok and Meta's AI-generated labels). Read the platform's current policy with them; it decides what must be disclosed. Record the user's answer and follow it within the platform's rules. Never set it yourself without asking, and never recommend hiding something a platform requires you to disclose.

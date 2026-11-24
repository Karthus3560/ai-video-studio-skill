# The tools: free route first, paid upgrades named

Claude Code is the only subscription this method needs. Every other job has a free route. Offer the paid upgrade only where it clearly buys quality, and let the user decide.

| Job | Free route | Paid upgrade | Notes |
|---|---|---|---|
| Director (plans, writes, runs everything) | — | [Claude Code](https://claude.com/product/claude-code) (Claude subscription) | The one required subscription. It writes the script and code, runs the tools, opens the browser and checks the output. |
| Script | Claude Code | — | Ask for the user's dialect and tone; the user reviews every line. |
| Voice | [Kokoro](https://github.com/hexgrad/kokoro) (preset voices, local, fast) · [Chatterbox](https://github.com/resemble-ai/chatterbox) (voice clone from ~20 s, local) | [ElevenLabs](https://elevenlabs.io) | Free is excellent in English. In Arabic dialects the paid clone was clearly cleaner in our tests. |
| Speech timing and QC | [faster-whisper](https://github.com/SYSTRAN/faster-whisper) (local, CPU works) | — | Word timestamps drive every pose, box and caption. |
| Images and the presenter | [ChatGPT](https://chatgpt.com) free tier (a few images a day) · [Google Flow](https://labs.google/flow) · [ComfyUI](https://github.com/Comfy-Org/ComfyUI) (local) | ChatGPT Plus | Character sheets, pose sheets, thumbnails, backgrounds. |
| Animation | [Remotion](https://www.remotion.dev) (free for individuals and companies up to 3 employees) · [HyperFrames](https://github.com/heygen-com/hyperframes) (HTML to video) | Remotion company licence (bigger teams) | Everything on screen is code, timed from the data file. |
| Songs | [ACE-Step 1.5](https://github.com/ace-step/ACE-Step-1.5) (full songs with vocals, local GPU) | [Suno](https://suno.com) | For jingles, theme songs, kids songs. |
| Background music and SFX | [Mixkit](https://mixkit.co/free-stock-music/) ([licence](https://mixkit.co/license/)) | — | Keep it ~18 dB under the voice. |
| Audio and video glue | [ffmpeg](https://ffmpeg.org) | — | Loudness, joins, captures, contact sheets. |
| Upload | [YouTube Data API](https://developers.google.com/youtube/v3) or YouTube Studio by hand | — | Only on the user's explicit go. |

## Hardware it ran on

The first Ghaith Works guide was made on an ordinary laptop with an **NVIDIA RTX 4050 (6 GB VRAM)**, 12 CPU threads and Windows 11:

- Kokoro, Chatterbox and ACE-Step ran on the GPU.
- faster-whisper ran on the CPU (`compute_type="int8"`, `medium` model). That is fine for a 5-minute narration; if the CUDA libraries for faster-whisper are installed, the GPU is faster.
- Remotion rendering is CPU-bound. Rendering per chapter with higher concurrency kept a 5-minute 1080p video to roughly 10 minutes.

No GPU? Use ChatGPT / Google Flow for images, ElevenLabs' free tier or Kokoro on CPU for voice, Mixkit for music, and Whisper on CPU.

## Before suggesting a paid tool

1. Say which job it upgrades and what the free route gives today.
2. Give the price only if you just checked it on the official page; otherwise say "check the current price".
3. Make a short A/B sample (same sentence, free vs paid) so the user hears the difference before paying.

## Keys and accounts

- Keep API keys in environment variables or a git-ignored `.env`. Never paste them into scripts you commit, screenshots or video captures.
- Use the user's own accounts. Never sign in for them; ask them to sign in.

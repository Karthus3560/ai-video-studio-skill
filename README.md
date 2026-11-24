# AI Video Studio: a Claude Code skill

**Website (AR · EN · FR):** https://karthus3560.github.io/ai-video-studio-skill/
**Channel:** [Ghaith Works on YouTube](https://www.youtube.com/@ghaithworks)

A free skill that teaches your AI agent (Claude Code) how to make narrated explainer and guide videos with a cartoon presenter and mostly free tools. It is the method behind the Ghaith Works guides, written for the next agent: it interviews you first, writes a script where every line has a pose and an on-screen visual, voices it, checks it with Whisper, times everything from the speech, animates it in Remotion and hands you a cut to review. Uploads happen only on your go.

The skill is text only. There are no project files, art or voices in this repo. Your agent builds everything in your own folder with your own art, voice and accounts.

## Install

```bash
git clone https://github.com/Karthus3560/ai-video-studio-skill
cp -r ai-video-studio-skill/skills/ai-video-studio ~/.claude/skills/
```

Windows (PowerShell):

```powershell
Copy-Item -Recurse ai-video-studio-skill\skills\ai-video-studio "$HOME\.claude\skills\"
```

Then start Claude Code and ask: *"make me a 5 minute guide video about …"*.

## What's inside

| File | What it covers |
|---|---|
| [`SKILL.md`](skills/ai-video-studio/SKILL.md) | When to use it, the ground rules, the 10-phase workflow, how the pieces connect, the done checklist |
| [`references/interview.md`](skills/ai-video-studio/references/interview.md) | The ~20 questions to ask before building, in batches, and the plan template |
| [`references/voice-and-timing.md`](skills/ai-video-studio/references/voice-and-timing.md) | Script format (pose + visual per line), TTS per chapter, Whisper QC, joining the narration, aligning lines to words |
| [`references/presenter.md`](skills/ai-video-studio/references/presenter.md) | Character sheet, 4×2 pose sheets on green, cutting aligned frames, subtle variants, holding one pose per sentence |
| [`references/remotion-look.md`](skills/ai-video-studio/references/remotion-look.md) | The neo-brutalism look, the component kit, RTL/LTR, real screen captures |
| [`references/finish-and-publish.md`](skills/ai-video-studio/references/finish-and-publish.md) | Music levels and ducking, rendering in parts, checks, review, second language, thumbnails, upload and AI disclosure |
| [`references/tools.md`](skills/ai-video-studio/references/tools.md) | Free route vs paid upgrade for every job, with official links, and the hardware it ran on |
| [`references/listicle-recipe.md`](skills/ai-video-studio/references/listicle-recipe.md) | The "N tools" video recipe: proof cold open, navigator, per-tool segment template |

The website lives in [`docs/`](docs) (plain HTML, CSS and JS, no build step) and is served by GitHub Pages.

## The tools (free route first)

Claude Code is the only subscription the method needs. Kokoro and Chatterbox (voice), faster-whisper (timing), ChatGPT free tier / Google Flow / ComfyUI (images), Remotion or HyperFrames (animation), ACE-Step 1.5 (songs), Mixkit (music), ffmpeg and the YouTube Data API. Paid upgrades the skill names: ElevenLabs, ChatGPT Plus, Suno. Check each tool's licence and price on its own site.

## A note on AI disclosure

Platforms such as YouTube, TikTok and Meta ask whether content is AI-generated or synthetic. The skill tells the agent to ask you how to answer, read the platform's current rules with you and follow them. It never advises hiding a disclosure a platform requires.

---

**عربي:** سكِل مجاني لـ Claude Code يعلّم وكيلك الذكي صناعة فيديوهات شرح بصوت راوٍ وشخصية كرتونية، بأدوات مجانية في الغالب. يبدأ بأسئلة كثيرة لك، ثم يكتب السكربت، ويسجّل الصوت، ويوقّت كل شيء من الكلام، ويحرّك بـ Remotion. الرفع بموافقتك فقط. [الموقع بالعربي](https://karthus3560.github.io/ai-video-studio-skill/?lang=ar)

**Français :** un skill gratuit pour Claude Code qui apprend à votre agent IA à réaliser des vidéos explicatives narrées avec un présentateur cartoon et des outils surtout gratuits. Il commence par vous interroger, écrit le script, fait la voix, cale tout sur la parole et anime avec Remotion. La mise en ligne se fait seulement sur votre feu vert. [Le site en français](https://karthus3560.github.io/ai-video-studio-skill/?lang=fr)

---

Made by Ghaith Works with Claude Code. MIT licence.

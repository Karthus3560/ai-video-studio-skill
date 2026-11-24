# Phase 0: the interview

Ask before you build. A wrong guess about language, voice or presenter costs hours of re-work and real money in TTS credits. Ask in batches of 4-6 questions, give a suggested default for each one, and accept "you decide" as an answer. Keep a running notes file (`plan.md`) so later sessions can read the answers.

## Batch 1: the video

1. **Topic.** What is the video about, in one sentence? What should the viewer be able to do after watching?
2. **Audience.** Beginners, creators, developers, business owners? What do they already know?
3. **Format.** Pick one:
   - *Process walkthrough:* "how I made X, step by step" (chapters = steps).
   - *Listicle:* "N tools / repos that do X" (chapters = items, see `listicle-recipe.md`).
   - *Explainer:* "what is X and why it matters" (chapters = ideas).
4. **Length.** Default 5-8 minutes. As a guide, Arabic speech runs about 100 words a minute and English about 150-200, so 5 minutes is roughly 500 Arabic or 800 English words.
5. **Proof.** What finished thing can we show in the first 3 seconds? (A real output beats any title card.)
6. **Deadline.** When does it need to be ready? Is there a publish date?

## Batch 2: language and voice

7. **Language and dialect.** Which language first? Which dialect (for Arabic: Iraqi, Egyptian, Gulf, Levantine, MSA)? Scripts must be written in the dialect, not translated from MSA.
8. **Second language.** Will there be a second version? (Build both from one data file: same visuals, `dir="rtl"` or `"ltr"`.)
9. **Voice.** Their own cloned voice, or a stock voice?
   - Free: Kokoro (preset voices, fast, local) or Chatterbox (clones a voice from ~20 s of clean speech, local).
   - Paid: ElevenLabs (best Arabic quality in our tests, instant clone on the Creator plan).
   - If cloning: do they have 1-3 minutes of clean recording? A quiet room matters more than the mic.
10. **Tone.** Calm teacher, hype, funny, serious? Are jokes OK?

## Batch 3: the presenter

11. **Presenter.** Their own cartoon avatar, a mascot, or faceless (screen + text only)?
12. **Style.** If a cartoon: what look? (Flat sticker, comic with thick outlines, neo-brutalism, pixel, 3D.) Do they have a reference picture or an existing avatar? Ask for 1-2 photos only if they want a likeness, and never publish the photos themselves.
13. **Body.** Head and shoulders, or half body with hands? (Hands make poses like pointing and thumbs-up readable.)

## Batch 4: tools, money and machine

14. **Hardware.** OS, GPU and VRAM, RAM, free disk. A laptop GPU with 6 GB VRAM runs Kokoro, Chatterbox, faster-whisper (CPU is fine too) and ACE-Step for songs. No GPU: use the online free tiers instead.
15. **Budget.** Zero, or a monthly amount? Which subscriptions do they already pay for? Claude Code (the director) is the only subscription this method needs.
16. **Music.** Free-licence library music (Mixkit), a locally generated song (ACE-Step), or a paid generator (Suno)? Any song of theirs to feature?
17. **Captions.** Burned-in captions, YouTube captions only, or none? Word-highlight style?

## Batch 5: the channel

18. **Channel.** Channel name and handle, brand colours and fonts if any, logo.
19. **Playlists.** Which playlist does this go into? One per language?
20. **Publishing.** Who uploads? (Default: you prepare everything, the user uploads or gives an explicit go each time.) How do they want to answer each platform's AI or synthetic-content question? Record their answer; don't decide it for them.
21. **Links.** What goes in the description: their site, socials, a repo, affiliate links?

## Then: write and confirm the plan

Write `plan.md` with this shape and ask for a yes before doing anything else:

```markdown
# Plan: <title>
- Format: process walkthrough · 6 chapters · ~5 min · Iraqi Arabic first, English second
- Voice: user's ElevenLabs clone (paid) · fallback Chatterbox clone (free)
- Presenter: user's cartoon, neo-brutalism, 32 poses + subtle variants
- Look: neo-brutalism (off-white grid paper, yellow/blue ink blocks, Cairo + Anton)
- Music: Mixkit track, ~18 dB under the voice
- Captions: burned-in, script words, active word highlighted
- Chapters: 0 Hook · 1 The director · 2 Toolbox · 3 Script · 4 Voice · ... · 9 Outro
- Proof cold open: <what we show in the first 3 s>
- Costs: Claude subscription + ~N TTS credits; everything else free
- Approvals: plan → script → first cut → second language → upload (user's go)
- Deadline: <date>
```

If the user says "decide everything yourself", still write the plan and show it. Deciding for them is fine; surprising them is not.

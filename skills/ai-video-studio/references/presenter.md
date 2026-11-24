# Phase 5: the cartoon presenter

A presenter that holds a clear pose per sentence reads better than one that flaps its mouth. Our viewers and the channel owner both preferred few, meaningful pose changes over constant motion.

## 1. The character sheet

- Make it in **ChatGPT (free tier: a few images a day)** or **Google Flow (free)**. ComfyUI is the local, fully free route if the user has the GPU and patience.
- Start from 1-2 photos of the user *only* if they want a likeness, or from a description. Ask for a **front-facing character sheet**: same character, neutral pose, plain background, thick outlines, flat colours.
- Iterate on style before making poses. Expect several rejected directions. In our run a 3D voxel version, a looping talking head and a circle-badge layout were all rejected before a neo-brutalism sticker style won. Show the user small samples (one sheet, one 15-second clip) before building a whole set.
- Save the approved sheet as the style anchor. Attach it to every later image request.

## 2. Pose sheets: 4x2 grids on flat green

Ask for **pose sheets of 8 poses in a 4 columns x 2 rows grid**, on a **flat pure green background (#00FF00)**, same scale, same framing, character centred in each cell, no text, no shadows on the background. Attach the character sheet (and, after the first one, a finished pose sheet) as the style anchor.

Four sheets give 32 poses. A set that covered everything in a five-minute guide:

| Sheet | Poses |
|---|---|
| Talking | neutral, talk_smile, wow, oo, grin, serious, happy_talk, content |
| Hands | hands_low, hands_up, palms_open, steeple, present, one, two, shrug_open |
| Pointing | hand_chest, point_left, idea_up, point_you, point_right, finger_up_right, thumb_back, point_down |
| Reactions | think_chin, think_temple, aha, thumbs_up, wink, shrug, arms_crossed, wave |

Gotchas:

- Image models sometimes return an empty reply or a failed image. Resend.
- One sheet may come out a few percent bigger than the others. Fix it in the cutting step by matching the head size to a reference frame.
- Image models like to draw pupils toward the nose. If eyes look crossed, ask for a redraw with "both pupils looking at the camera" or fix them in code.

## 3. Cut the sheets into aligned frames

Write a small Python script (Pillow + NumPy):

1. **Key the green:** pixels where G is high and R, B are low become transparent; soften the edge by 1-2 px and remove green spill (clamp G to max(R, B) on edge pixels).
2. **Find the cells:** split the image into the 4x2 grid. If the model drew grid lines, detect them as columns/rows that are almost entirely dark (> 85% dark pixels). Thick outlines and striped clothes can fool a lower threshold and slice through figures.
3. **Crop each cell to its content,** then place it on a fixed canvas (for example 1000x1200) so that the head sits at the same point in every frame: find the head's top and centre, and shift. Frames that don't align make the character jump on every pose change.
4. Save as `poses/<name>.png` with an alpha channel.

## 4. Subtle variants

For each pose, make one **variant** with the same body and hands but a small change: mouth open/closed, an eyebrow, a slight head tilt. Ask the image model to redraw the pose sheet with "exactly the same poses, only small changes to mouth and eyebrows". Align the variants to their originals the same way.

The presenter can swap between a pose and its variant on word starts (at most once every ~1.5 s). That gives life without the busy look of lip-sync.

## 5. Holding poses in the video

```tsx
type Hold = { t: number; e: string };   // time (s) and pose name

// one pose per sentence; a line shorter than 2 s keeps the previous pose
const HOLDS: Hold[] = lines.reduce<Hold[]>((acc, l, i) => {
  const next = lines[i + 1];
  const span = (next ? next.s : l.e) - l.s;
  if (acc.length && (span < 2 || acc[acc.length - 1].e === l.pose)) return acc;
  acc.push({ t: Math.max(0, l.s - 0.12), e: l.pose });
  return acc;
}, []);
```

- Hold each pose for about 2-4 s. Change it rarely.
- A pose change is a **hard cut with a small settle** (scale 1.03 → 1 over ~6 frames). Cross-fading two drawings double-exposes them and looks broken.
- **No loudness-driven mouth flapping.** It looked cheap in every test.
- Placement: the presenter stands bottom-right (bottom-left for an RTL-first layout is fine too), on a coloured card with a thick border and a hard shadow. Keep on-screen text in the other 2/3 of the frame.
- A name tag on the card ("Ghaith", the channel name) helps new viewers.

# Roblox Classic Template Notes

## Canvas size

The canonical Roblox classic clothing template is **585 × 559 pixels**.

Both shirt and pants use this same canvas size.

## Shirt template panel regions (approximate pixel coordinates)

| Region | x | y | w | h |
|--------|---|---|---|---|
| Torso Front | 98 | 2 | 192 | 248 |
| Torso Back | 292 | 2 | 192 | 248 |
| Torso Left | 2 | 2 | 94 | 248 |
| Torso Right | 486 | 2 | 94 | 248 |
| Right Arm Front | 98 | 252 | 64 | 192 |
| Right Arm Back | 164 | 252 | 64 | 192 |
| Right Arm Top | 98 | 446 | 64 | 48 |
| Right Arm Bottom | 164 | 446 | 64 | 48 |
| Left Arm Front | 400 | 252 | 64 | 192 |
| Left Arm Back | 466 | 252 | 64 | 192 |
| Left Arm Top | 400 | 446 | 64 | 48 |
| Left Arm Bottom | 466 | 446 | 64 | 48 |

## Pants template panel regions (approximate pixel coordinates)

| Region | x | y | w | h |
|--------|---|---|---|---|
| Waist Front | 2 | 2 | 192 | 32 |
| Waist Back | 196 | 2 | 192 | 32 |
| Waist Left | 390 | 2 | 64 | 32 |
| Waist Right | 456 | 2 | 64 | 32 |
| Right Leg Front | 2 | 36 | 96 | 256 |
| Right Leg Back | 100 | 36 | 96 | 256 |
| Right Leg Left | 198 | 36 | 32 | 256 |
| Right Leg Right | 232 | 36 | 32 | 256 |
| Left Leg Front | 296 | 36 | 96 | 256 |
| Left Leg Back | 394 | 36 | 96 | 256 |
| Left Leg Left | 492 | 36 | 32 | 256 |
| Left Leg Right | 526 | 36 | 32 | 256 |

## Notes

- The Roblox template is a flat UV-unwrapped texture atlas.
- Transparent pixels outside panels are ignored by the engine.
- PNG must be uploaded as-is; Roblox scales it internally to the avatar.
- The file format must be PNG with an alpha channel (RGBA).
- Maximum upload size is 1 MB (Roblox limit).
- These coordinates are derived from community-published template guides and should be validated against the official Roblox template PNGs before production use.

## References

- Roblox Creator Documentation – Classic Clothing
- Roblox DevForum community template guides

# Add Visualization Toggle

## Goal
Add a filter at top to switch between "Line" and "Square" visualization modes.

## Plan

- [x] Add state for visualization mode in App.tsx
- [x] Create simple toggle UI in header
- [x] Pass mode to CurveCard → CurvePreview
- [x] Show only selected visualization type
- [x] Build and verify

## Design
```
┌─────────────────────────┐
│  Easing Curves          │
│  [Line] [Square]        │  <- toggle
├─────────────────────────┤
│  Cards...               │
└─────────────────────────┘
```

## Review
- Toggle works as expected
- Line mode: animated dot follows curve on hover
- Square mode: 32px square at 50% opacity, fades up to 100% on hover
- Square animates from +4px to 0 using each curve's easing
- Build passes

Design Principles
Spacing
Pick a base unit and stick to multiples. Consistency matters more than the specific number. Random values signal no system.

Padding
Keep it symmetrical. If one side is 16px, others should match unless there's a clear reason.

Depth
Choose ONE approach and commit:

Borders-only — Clean, technical. For dense tools.
Subtle shadows — Soft lift. For approachable products.
Layered shadows — Premium, dimensional. For cards that need presence.
Don't mix approaches.

Border Radius
Sharper feels technical. Rounder feels friendly. Pick a scale and apply consistently.

Typography
Headlines need weight and tight tracking. Body needs readability. Data needs monospace. Build a hierarchy.

Color & Surfaces
Gray builds structure. Color communicates — status, action, emphasis, identity. Unmotivated color is noise. Color that reinforces the product's world is character.

Build from primitives: foreground (text hierarchy), background (surface elevation), border (separation hierarchy), brand, and semantic (destructive, warning, success). Every color should trace back to these. No random hex values — everything maps to the system.

Animation
Fast micro-interactions (~150ms), smooth easing. No bouncy/spring effects.

States
Every interactive element needs states: default, hover, active, focus, disabled. Data needs states too: loading, empty, error. Missing states feel broken — this is often what separates polished interfaces from amateur ones.

Controls
Native <select> and <input type="date"> can't be styled. Build custom components.

Avoid
Harsh borders — if borders are the first thing you see, they're too strong. Use low opacity rgba.
Dramatic surface jumps — elevation changes should be whisper-quiet, not obvious color shifts
Inconsistent spacing — the clearest sign of no system
Mixed depth strategies — if borders, commit to borders throughout
Missing interaction states — hover, focus, disabled, loading, error
Dramatic drop shadows — shadows should be subtle layers, not attention-grabbing
Large radius on small elements
Pure white cards on colored backgrounds
Thick decorative borders
Gradients and color for decoration — color should communicate meaning
Multiple accent colors — dilutes focus
Self-Check
Before finishing:

Squint test — can you still see hierarchy with blurred eyes? Nothing jumping out?
Border check — are borders subtle enough to disappear when not needed?
Surface check — are elevation changes whisper-quiet, not dramatic?
Depth consistency — one strategy throughout?
States complete — hover, focus, disabled, loading, error?
The swap test, everywhere. You already know to ask: if I swapped my visual choices for the most common alternatives, would the design feel meaningfully different? Now ask it about the parts that feel like infrastructure. If you swapped the typeface for your usual one — would it matter? If you swapped the metrics for number-on-label — would anyone notice? If you removed the navigation and left the page floating — would it still feel like a product? The places where swapping wouldn't matter are the places you defaulted.

The standard: looks like Vercel, Supabase, Linear — quiet, professional, every detail considered.


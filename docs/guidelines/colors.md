# Color System

SafeSwap uses the **Visual Identity brand palette** exposed as **semantic design
tokens**. The single source of truth is
[`p2p-safe-swap/app/globals.css`](../../p2p-safe-swap/app/globals.css); this
document mirrors it.

> **Rule of thumb:** build UI with the **semantic tokens** (`bg-card`,
> `text-foreground`, `text-muted-foreground`, `bg-primary`, …) so it adapts to
> light/dark automatically. Reach for a **raw brand color** only for fixed brand
> artwork (e.g. the logo). Never hardcode hex in components.

---

## 1. Brand palette

| Swatch | Name | Hex | Tailwind |
|---|---|---|---|
| ![#101B1D](https://placehold.co/20x20/101B1D/101B1D.png) | Ink (Rich Black) | `#101B1D` | `*-ink` |
| ![#0A1213](https://placehold.co/20x20/0A1213/0A1213.png) | Ink deep | `#0A1213` | `*-ink-deep` |
| ![#16282A](https://placehold.co/20x20/16282A/16282A.png) | Ink 700 | `#16282A` | `*-ink-700` |
| ![#01A78F](https://placehold.co/20x20/01A78F/01A78F.png) | Persian Green | `#01A78F` | `*-green` |
| ![#016B5B](https://placehold.co/20x20/016B5B/016B5B.png) | Green dark | `#016B5B` | `*-green-dark` |
| ![#02201A](https://placehold.co/20x20/02201A/02201A.png) | Green deep | `#02201A` | `*-green-deep` |
| ![#5FD6AC](https://placehold.co/20x20/5FD6AC/5FD6AC.png) | Turquoise (Mint) | `#5FD6AC` | `*-mint` |
| ![#9CE7CC](https://placehold.co/20x20/9CE7CC/9CE7CC.png) | Mint soft | `#9CE7CC` | `*-mint-soft` |
| ![#E6FBF2](https://placehold.co/20x20/E6FBF2/E6FBF2.png) | Mint pale | `#E6FBF2` | `*-mint-pale` |
| ![#1446F0](https://placehold.co/20x20/1446F0/1446F0.png) | Spark | `#1446F0` | `*-spark` |

Meaning: **Ink** = reliability/security (canvas), **Persian Green** =
innovation/growth (primary), **Turquoise** = accessibility (accent/CTA),
**Spark** = the logo arrow accent (use sparingly).

---

## 2. Semantic tokens (light / dark)

These are the tokens to use in components. Values are defined per theme in
`globals.css` (`:root` = light, `.dark` = dark).

| Token | Utility | Light | Dark |
|---|---|---|---|
| Background | `bg-background` | `#F5FCF9` | `#0A1213` |
| Foreground | `text-foreground` | `#101B1D` | `#E6FBF2` |
| Card | `bg-card` | `#FFFFFF` | `#101B1D` |
| Muted | `bg-muted` | `#EBF4F0` | `#16282A` |
| Muted foreground | `text-muted-foreground` | `#54615B` | `#7F9A93` |
| Accent | `bg-accent` | `#E6FBF2` | `#16282A` |
| Accent foreground | `text-accent-foreground` | `#016B5B` | `#E6FBF2` |
| Primary | `bg-primary` | `#01A78F` | `#01A78F` |
| Primary foreground | `text-primary-foreground` | `#FFFFFF` | `#FFFFFF` |
| Secondary | `bg-secondary` | `#5FD6AC` | `#5FD6AC` |
| Secondary foreground | `text-secondary-foreground` | `#101B1D` | `#101B1D` |
| Border / Input | `border-border` | `#D2DED8` | `#1C2E2C` |
| Ring | `ring-ring` | `#01A78F` | `#5FD6AC` |
| Destructive | `text-destructive` | `#FF5957` | `#FF5957` |
| Chat bubble (outgoing) | `bg-chat-bubble-outgoing` | `#02201A` | `#016B5B` |
| Chat bubble fg | `text-chat-bubble-outgoing-foreground` | `#E6FBF2` | `#E6FBF2` |

---

## 3. Usage notes

- **Primary action** = Persian Green (`bg-primary` + `text-primary-foreground`).
  For a high-contrast brand CTA, the Mint fill + Ink text pair
  (`bg-secondary text-secondary-foreground`) reaches ~9.8:1 in both themes.
- **Avatars / chips** use token pairs (`bg-muted`, `bg-primary/15`, `bg-accent`,
  `bg-secondary`) so contrast holds across themes.
- **Logo** (`frontend/components/brand/Logo.tsx`) intentionally keeps fixed brand
  fills (green `#01A78F` + mint `#5FD6AC`) — a brand mark must not re-theme.
- To change a color globally, edit the token in `globals.css`; do **not** add hex
  in components.

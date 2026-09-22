---
name: OneVoice27 Portugal
description: Signup site for Portuguese Adventist churches joining OneVoice27, styled as a night sky lit by one light per church.
colors:
  night-0: "oklch(0.14 0.05 288)"
  night-1: "oklch(0.18 0.075 287)"
  night-2: "oklch(0.225 0.085 287)"
  night-3: "oklch(0.28 0.09 288)"
  line: "oklch(0.55 0.08 290 / 0.28)"
  line-strong: "oklch(0.7 0.07 295 / 0.5)"
  ink: "oklch(0.97 0.008 310)"
  ink-2: "oklch(0.87 0.02 305)"
  ink-3: "oklch(0.72 0.035 298)"
  pink: "oklch(0.81 0.085 345)"
  teal: "oklch(0.79 0.07 200)"
  lilac: "oklch(0.76 0.1 295)"
  danger: "oklch(0.8 0.11 22)"
  surface-plum: "oklch(0.42 0.11 335)"
  surface-indigo: "oklch(0.46 0.13 275)"
  surface-sea: "oklch(0.5 0.07 210)"
typography:
  display:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "clamp(2.9rem, 7.4vw, 6.6rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.4vw, 3.4rem)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "clamp(1.35rem, 2.2vw, 1.9rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Noto Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  field-label:
    fontFamily: "Noto Sans, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    lineHeight: 1.4
  nav-label:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 650
    lineHeight: 1
    letterSpacing: "-0.015em"
  label:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.1em"
rounded:
  option: "8px"
  item: "10px"
  field: "12px"
  header: "18px"
  panel: "20px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 56px)"
  field-gap: "22px"
  block-gap: "clamp(28px, 4vw, 44px)"
  section: "clamp(72px, 10vw, 130px)"
  max-width: "1240px"
components:
  button-primary:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    typography: "{typography.label}"
    padding: "0 28px"
    height: "52px"
  button-ghost:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    typography: "{typography.label}"
    padding: "0 28px"
    height: "52px"
  chip:
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
    height: "42px"
  chip-selected:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.night-0}"
    rounded: "{rounded.pill}"
  input:
    backgroundColor: "{colors.night-0}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "12px 16px"
    height: "50px"
  tab-selected:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.night-0}"
    rounded: "{rounded.pill}"
    height: "44px"
  nav-cta:
    backgroundColor: "{colors.pink}"
    textColor: "{colors.night-0}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
  header-bar:
    height: "80px"
    rounded: "{rounded.header}"
  submit-panel:
    rounded: "{rounded.panel}"
    padding: "24px"
---

# Design System: OneVoice27 Portugal

## 1. Overview

**Creative North Star: "Uma luz por igreja" (one light per church)**

The site is Portugal at night, seen from above: a deep indigo sky with one small light for each Adventist church, 120 of them from Bragança to Faro and out to the Açores and Madeira. Everything comes from that picture. The hero map is literal: one light per church, with real coordinates. The steps of "O caminho" are lights joined by a thread, and a successful signup ends with a new light kindling. The identity carries over from onevoice27.org and stays faithful to it: the same indigo night, the same pink/teal/lilac glow, Figtree over Noto Sans, the slanted edges, and the pill button with a beam of light orbiting its border. It is a local chapter of a worldwide movement, not a rebrand.

The audience is church members on a phone after the Sabbath service or at home in the evening, not designers. The pages are long, calm and full of room to breathe: one idea per viewport on the landing sections, then a dense but orderly form. The forms are the product. Everything above them exists to get a person to pick one of three roles and finish it.

This system rejects the generic SaaS landing page: no hero-metric tiles, no grids of identical icon cards, no eyebrow chip above the headline, no glassmorphism, no gradient text. It also rejects "churchy" clichés such as stained-glass palettes, parchment and ornamental serifs. The mood is quiet devotion lit from within, not a tech launch and not a hymnal.

**Key Characteristics:**
- Dark theme only: a night-indigo base (`night-0`), with sections set apart by lighter indigo layers and slanted `clip-path` edges.
- Three tones (pink, teal, lilac), each tied to one role, never used at random.
- Heavy, tight Figtree display type against a readable Noto Sans body.
- Glow is kept for things that are literally lights: map dots, path steps, the confirmation light and the button beam.
- Pills everywhere you can interact: buttons, chips, tabs, the header CTA.
- All copy is in European Portuguese (pt-PT), with no em dashes.

## 2. Colors: The Night-Sky Palette

The strategy is **Committed**. Night indigo covers nearly the whole surface, and three luminous pastels mark meaning. Every neutral is tinted toward the brand hue (about 290); nothing is pure black, white or grey.

### Primary
- **Candle Pink** (`pink`): the brand's warm light. It marks the *Criador de conteúdo* role and is also used for the second line of the hero headline, the header "Inscrever" CTA, required-field asterisks and inline links.

### Secondary
- **Harbour Teal** (`teal`): the *Instrutor* role and the default form tone. It is also used for focus rings, the "prefilled from the directory" note and the lead's date emphasis.

### Tertiary
- **Dusk Lilac** (`lilac`): the *Igreja aderente* role only.

### Button Surface
- **Plum → Indigo → Sea** (`surface-plum`, `surface-indigo`, `surface-sea`): the 125° gradient behind every primary button. Its darkest stop keeps white label text at 4.5:1 or better. Never lighten these stops.

### Neutral
- **Midnight** (`night-0`): the page background and form-field backgrounds.
- **Deep Indigo** (`night-1`): the signup section and the path gradient.
- **Raised Indigo** (`night-2`): the combobox dropdown and rail hover.
- **Tip Indigo** (`night-3`): map tooltips and the active dropdown option.
- **Starlight** (`ink`): headings, field labels, text on buttons and anything that must read first.
- **Moonlit** (`ink-2`): body copy.
- **Haze** (`ink-3`): hints, captions, counts and "opcional" markers. Never use it for anything a person must read to finish the form.
- **Thread** (`line`, `line-strong`): hairline dividers and input and chip borders.
- **Ember** (`danger`): error text and the error badge, softened so it reads as a correction rather than an alarm.

### Named Rules
**The Tone-Is-Role Rule.** Pink = creators, teal = instructors, lilac = churches. Every tab, panel, step light, section number, selected chip and focus ring within a role takes that role's `--tone`. A new role gets a new tone; an existing tone is never reused for decoration.

**The Tinted-Dark Rule.** Never use `#000`, `#fff` or neutral grey. Every neutral carries 0.005–0.09 chroma toward hue 285–310.

## 3. Typography

**Display Font:** Figtree (with system-ui, sans-serif), variable weight axis 600–900 (loaded as `wght@600..900` so in-between weights such as 650 are real, not synthesised)
**Body Font:** Noto Sans (with system-ui, sans-serif), weights 400–700

**Character:** Figtree at 900 with tight negative tracking gives the headlines the dense, confident voice of onevoice27.org. Noto Sans keeps long form questions readable and has full coverage of Portuguese diacritics. Both families come from the reference site; keep them.

### Hierarchy
- **Display** (900, `clamp(2.9rem, 7.4vw, 6.6rem)`, 0.92): the hero headline only. Two lines, and the second line is Candle Pink.
- **Headline** (900, `clamp(2rem, 4.4vw, 3.4rem)`, 1.05): section titles ("O caminho…", "Inscrição"). Maximum width 18ch.
- **Title** (800, `clamp(1.35rem, 2.2vw, 1.9rem)`): step role names and fieldset legends, with legends paired with a numbered tone disc.
- **Body** (400, 1rem, 1.6): paragraphs are capped at 52–62ch. The hero lead scales up to 1.15rem.
- **Field Label** (Noto Sans 600, 0.95rem, 1.4): every question, in Starlight. Questions are full sentences taken verbatim from the requirements document.
- **Nav Label** (Figtree 650, 1rem, −0.015em tracking, uppercase): header links only, as on onevoice27.org. They are set tight, not tracked out; that tightness is what makes the header read as confident rather than timid.
- **Label** (Figtree 700, 0.72–0.82rem, 0.1–0.16em tracking, uppercase): button text, step phase markers ("1 · Conteúdo") and combobox group headers. Keep these to three words or fewer.

### Named Rules
**The Short-Caps Rule.** Uppercase is only for labels of three words or fewer. Never put uppercase on a sentence, never put an uppercase kicker directly above the hero H1, and never repeat an uppercase eyebrow as the grammar above every section.

**The Question-Is-The-Label Rule.** Form labels are the full question in sentence case, not shortened field names. Hints explain *why* ("Para sabermos a quem pedir referências…"), not *what*.

## 4. Elevation

Depth comes mostly from layers of colour: `night-0` → `night-1` → `night-2` → `night-3`, plus slanted section edges. Shadows are neutral, dark and short. They lift the few things that float (the primary button, the dropdown); they never decorate. Coloured glow is a separate vocabulary, used only for literal lights.

### Shadow Vocabulary
- **Button rest** (`box-shadow: 0 0 0 1px oklch(0.9 0.02 280 / 0.3) inset, 0 8px 20px -8px oklch(0.06 0.03 290 / 0.8)`): the primary button at rest.
- **Button lifted** (`box-shadow: 0 0 0 1px oklch(0.92 0.03 300 / 0.5) inset, 0 12px 26px -10px oklch(0.06 0.03 290 / 0.9)`): hover or focus, together with `translateY(-2px)`.
- **Dropdown** (`box-shadow: 0 10px 16px -10px oklch(0.05 0.03 290 / 0.9)`): the church combobox list, with a 1px `line-strong` border.
- **Light halo** (no box-shadow): every light on the site, including the path step lights, glows with layered radial gradients, never with a spread shadow. A path role light is a 27px `radial-gradient(circle, ink 0 6%, mix(ink 55%, tone) 14%, tone 80% 28%, tone 28% 46%, transparent 72%)`, with a `::before` halo inset −22px (71px across) of `radial-gradient(circle, tone 34%, tone 14% 38%, transparent 70%)`. The person light is 13px of `radial-gradient(circle, ink 0, ink-2 85% 30%, ink-2 30% 52%, transparent 76%)` with a halo inset −16px of `ink-2 22% → ink-2 8% at 40% → transparent 70%`. All mixes are `color-mix(in oklch, … , transparent)`.

### Named Rules
**The Only-Lights-Glow Rule.** A coloured glow means "this is a light". Only map dots, path step lights, the confirmation light and the button beam may glow. Buttons, cards, rail dots and inputs never get a coloured halo.

## 5. Components

### Buttons
- **Shape:** full pill (999px), 52px tall, uppercase Figtree 700 label at 0.1em tracking.
- **Primary (`.btn--glow`):** the Plum → Indigo → Sea gradient with a sheen, plus the signature orbiting beam ported from onevoice27.org. A `::before` ring, masked to 1.5px, holds a conic gradient (teal → pink → white → pink) that rotates through an animated `@property --beam` every 3s. A `::after` layer holds a field of 0.8px dots in a 7px grid, masked by the same conic angle so the stars trail the beam.
- **Hover / Focus:** lifts 2px, the beam alpha goes from 0.85 to 1, and dot opacity goes from 0.42 to 0.62 (0.32s, ease-out-quint `cubic-bezier(0.22, 1, 0.36, 1)`). Motion stops completely under `prefers-reduced-motion`.
- **Ghost (`.btn--ghost`):** transparent with a 1px `line-strong` inset ring and a `night` tint on hover. Use it for secondary or external links ("Projeto mundial ↗") and for "Fazer outra inscrição".
- **Implementation note:** the beam must live on the pseudo-element, not the button background. The pseudo-elements sit at `z-index: -1` inside `isolation: isolate`, so the label needs no wrapping span.

### Chips
- **Style:** a pill with a 1px `line-strong` border, `ink-2` text, 42px minimum height and 8px gaps in a wrapping row. Radios and checkboxes share the look; the real input covers the chip invisibly.
- **Selected:** filled with the role `--tone`, `night-0` text at weight 600, and a small `night-0` dot before the text.
- **Exclusive option:** "Não desempenho atualmente nenhuma função" has a dashed border and clears its siblings when chosen (`data-exclusive`).
- **Flag chips (`.chip--flag`):** a 20px round flag from `assets/images/flags/` (1×1 `flag-icons`, with Spain's civil flag used without arms) replaces the dot. Languages without a flag get a 20px stroked icon in `currentColor` (a hand for LGP, a globe for "Outra").
- **Scale chips (`.choices--scale`):** 64px minimum width, centred, for numeric ranges.

### Cards / Containers
There are almost none, by design. Fieldsets are open sections headed by a numbered tone disc (34px) and a hairline rule, not boxes. The only boxed container is the **submit panel**: radius 20px, a 1px `line` border, a subtle indigo gradient and 24px padding (32px from 720px up). It holds the selection-process disclaimer, the required confirmation checkbox, the error summary and the full-width primary button.

### Inputs / Fields
- **Style:** `night-0` fill, a 1px `line-strong` border, 12px radius, 50px minimum height, and 1rem Noto Sans text in Starlight. The select uses a custom chevron. Textareas can only be resized vertically.
- **Focus:** the border takes the role `--tone`, with a 3px `--tone` ring at 30% and a slightly lifted fill.
- **Required:** a pink " *" after the label, added by CSS (`:has([required])`). Optional fields show a small Haze "opcional".
- **Error:** an Ember border, plus an Ember message below the control with a round "!" badge. Messages are specific and in Portuguese ("Indique um email válido, por exemplo nome@exemplo.pt."). Errors appear on blur, on change, or on submit, never while the person is still typing.
- **Conditional reveals:** follow-up questions open under their parent by animating `grid-template-rows` from 0fr to 1fr, indented 18px behind a 1px thread. Hidden follow-ups are `inert` and disabled, so they are neither validated nor submitted.

### Navigation
- **Header (ported from onevoice27.org):** a sticky bar made of two layers. `::before` is a **1.5px light ring**, a 112° gradient (pink 0.82 → indigo 0.42 at 43% → faint white 0.12 at 68% → teal 0.76) with neutral drop shadows. `::after` is the **surface** inset 1.5px inside it: translucent indigo (0.77) with a 7% top highlight and an 18px backdrop blur. Only these layers slant, never the content. The bar is 64px tall below 768px and 80px from 768px up. From **1280px up** (the original's breakpoint, not earlier) both layers slant 20° with radius 18px, and the padding grows by half the slant's run (14.56px) so the text stays clear of the angled ends. Below 1280px it is a straight bar (radius 12px, or 14px on phones).
- **Hide on scroll:** the header slides up and fades while you scroll down past 120px and returns on any scroll up (420ms, `cubic-bezier(0.32, 0.72, 0, 1)`). It never hides while keyboard focus is inside it.
- **Links:** Nav Label type in Starlight at 90%, 44px tall targets, gaps of `clamp(1.25rem, 2.6vw, 2.75rem)`. On hover or focus, a **colour wipe** passes through the letters: the label is painted by a 230%-wide gradient (pink → indigo → teal → Starlight) that slides from 100% to 0 in 360ms. At rest the text is plain Starlight. Below 640px only the CTA remains.
- **CTA:** the pink "Inscrever" pill (12px 20px, 0.9rem) turns Starlight on hover. It doesn't get the wipe.
- **Wordmark:** "OneVoice**27**" in italic Figtree 900 (1.4rem), with 27 in Candle Pink and a teal "PORTUGAL" tag (0.7rem, 0.2em tracking) centred beneath it, like the reference logo's tagline.
- **Tabs:** a segmented pill track on `night-0`. The selected tab fills with its role tone. Arrow keys, Home and End move between tabs, and the choice syncs to `#instrutor`, `#criador` or `#igreja`. Below 560px the tabs stack.

### Hero Light Map (signature)
`assets/images/portugal.svg` holds the outline (mainland, plus Açores and Madeira insets in dashed frames). An overlaid SVG draws one light per church from `x`/`y` in `igrejas.js`: a 9px radial-gradient halo in a pink, teal or lilac tone assigned by church id, plus a 1.5px Starlight core. Each light twinkles on its own 3–6s cycle. Hovering shows a `night-3` tooltip with the church and "Pr./Pra." pastor.

### Path Steps (signature)
Four steps joined by one 1px gradient thread at 50% opacity: horizontal on desktop (column widths 1.15 / 0.7 / 1.15 / 1.15, thread at `top: 13px`) and vertical below 960px (thread at `gutter + 13px`). The lights are the map lights' larger siblings, built the same way: no solid disc, no ring and no box-shadow, only a tiny Starlight core that melts into the tone and a wide, gentle halo. A role light is a 27px box (centred on the thread at 13.5px) whose background is `radial-gradient(circle, var(--ink) 0 6%, color-mix(in oklch, var(--ink) 55%, var(--tone)) 14%, tone at 80% 28%, tone at 28% 46%, transparent 72%)`, plus a `::before` halo inset −22px of `tone at 34% → tone at 14% at 38% → transparent 70%`. The halo breathes (opacity 0.7 → 1, scale 0.94 → 1.04) on a 7s ease-in-out loop with a different phase per step, and stops under `prefers-reduced-motion`. Each role step also has a phase label, a title, copy and an underlined arrow link. Step 2 ("Apelo") is the interested person: a 13px neutral light (`--glow: var(--ink-2)`, box at `top: 7px; left: 7px`, halo inset −16px at 22% → 8%) and an italic quote, with no call to action. It is deliberately smaller and quieter than the role lights and never takes a tone.

### Progress Rail
A sticky column on desktop showing the role intro, a numbered list of sections with `ok/total` required counts, and the draft status ("Rascunho guardado neste dispositivo. Apagar"). A section's dot fills with the tone once it's complete (no glow). Optional-only sections show "opcional". Below 900px only the intro and draft status remain.

### Church Combobox
A searchable `role="combobox"` with no dependencies. Results are grouped by region with Figtree label headers, the match is highlighted in the role tone, and the city appears in Haze on the right. There is always a final pink "A minha igreja não está na lista" option, which switches the field to free text. Choosing a church fills in the pastor (and, on the church form, its site and social links) only where the person hasn't typed their own value, and says so in a teal note.

## 6. Do's and Don'ts

### Do:
- **Do** tie every accent to a role through `--tone`: pink for creators, teal for instructors, lilac for churches.
- **Do** keep the page dark: `night-0` base, lighter indigo layers for sections and slanted `clip-path` edges (about 4–5vw) between them.
- **Do** use Figtree 900 with negative tracking for display type and Noto Sans for everything a person reads at length.
- **Do** use the orbiting-beam `.btn--glow` for the one main action in a view, and a ghost pill for anything secondary.
- **Do** match onevoice27.org's breakpoints when porting its components (for example, the header slants only from 1280px up). Check the original at the same viewport width before assuming how it looks.
- **Do** write every string in European Portuguese (pt-PT: "contacto", "telemóvel", "equipa"), and write questions verbatim from the requirements document.
- **Do** animate only transform, opacity and `grid-template-rows`, easing with `cubic-bezier(0.22, 1, 0.36, 1)`, and remove all looping motion under `prefers-reduced-motion`.
- **Do** keep text contrast at 4.5:1 or better. Label text on the button gradient relies on the darkened `surface-sea` stop.
- **Do** keep images local in `assets/images/` (flags, map, favicon). Load nothing from third parties except Google Fonts and the churches API.

### Don't:
- **Don't** put a coloured glow on anything that isn't literally a light: no pink halo under buttons, no glowing rail dots, no glowing cards.
- **Don't** place a small uppercase eyebrow or chip directly above the hero headline. Work dates and context into the lead paragraph instead.
- **Don't** use gradient text, glassmorphism cards, hero-metric tiles or grids of identical icon cards. **The one sanctioned exception** is the header nav hover wipe ported from onevoice27.org: it only appears on hover or focus, and the text is a plain solid colour at rest. Never extend it to headings, body text or buttons.
- **Don't** use `border-left` or `border-right` wider than 1px as a coloured accent stripe. The reveal thread is exactly 1px, in `line-strong`.
- **Don't** open a modal. Confirmations, errors and follow-up questions all appear inline.
- **Don't** use emoji flags; Windows shows them as letters. Use the SVGs in `assets/images/flags/`.
- **Don't** use em dashes or `--` in copy. Use commas, colons or full stops.
- **Don't** reach for stained glass, parchment, ornamental serifs or any "church bulletin" styling. The voice is the onevoice27.org night sky.

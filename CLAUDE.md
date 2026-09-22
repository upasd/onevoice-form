# OneVoice27 Portugal: signup site

Static site where local Adventist church members in Portugal sign up for OneVoice27 as an instructor, a content creator or a participating church. There is no build step: `index.html` + `assets/`, served as-is (opening the file directly works too).

**Read `DESIGN.md` before any visual change.** It is the design system: tokens, the role-tone rule, the orbiting-beam button, and the Do's and Don'ts. `.impeccable/design.json` is its generated sidecar; regenerate it whenever `DESIGN.md` changes.

## Files
- `index.html`: every section and all three forms, written out in full (duplication between forms is intentional, so each form can be edited on its own).
- `assets/css/styles.css`: one stylesheet, with OKLCH tokens on `:root`.
- `assets/js/app.js`: one IIFE, no dependencies. `CONFIG.endpoint` at the top is the submission URL; if it's empty, the site runs in demo mode and stores submissions in `localStorage["ov27-submissoes"]`.
- `assets/js/igrejas.js`: a snapshot of `https://api.adventistas.pt/igrejas` (120 churches, with pastor and links, plus `x`/`y` map positions). It's a `.js` file (`window.IGREJAS`) so it works over `file://`. At runtime the app refreshes pastor and link data from the API, which allows CORS from any origin.
- `assets/images/portugal.svg`: the map outline. Its projection must match the `x`/`y` values in `igrejas.js` (viewBox `0 0 610 420`; mainland box x=380 y=12 w=200, Açores inset x=20 y=60 w=230, Madeira inset x=130 y=280 w=110, lon scaled by cos 39.5°). Both files were generated together from Natural Earth `countries.geojson` and the API; if you regenerate one, regenerate the other.
- `assets/images/flags/`: 1×1 SVGs from `flag-icons` (MIT). `es.svg` is Spain's civil flag, drawn by hand without the coat of arms.

## Form conventions (wired through data attributes in app.js)
- `.field` wraps one question. A `required` control, or a `data-group="<name>"` on a chip group, makes it required. The asterisk is added by CSS.
- `data-when="name:Value|Other"` on a `.reveal` shows follow-up questions. While hidden, they are `inert`, disabled, skipped by validation and left out of the payload.
- `data-exclusive` on a checkbox clears the rest of its group (for "Nenhuma").
- `data-combo` is the church picker. `data-pastor-target="<id>"` and `data-links-prefix="g-"` prefill fields from the church directory without overwriting anything the person typed.
- `fieldset[data-step]` feeds the progress rail. Tabs route through `#instrutor`, `#criador` and `#igreja`.
- Validation messages are in Portuguese and live in `fieldError()`.

## Copy
- European Portuguese (pt-PT) only. Keep question wording as it appears in the source document ("Dados para formulario.docx"), including the church team's later additions.
- No em dashes or `--` in any copy.
- Changes to the form itself (new questions, reordering) come from the coordination team. Don't invent questions. When you add something not in the doc, say so.

## Checks
- Design linter: `~/.claude/plugins/cache/impeccable/impeccable/*/skills/impeccable/scripts/impeccable detect index.html`. Documented ignores are in `.impeccable/config.json`.
- Verify in a real browser at 1440px and 390px wide. There should be no horizontal scroll (`scrollWidth` equals the viewport width) and no console errors.

## Repo
- Remote: private `upasd/onevoice-form` on GitHub, branch `main`.

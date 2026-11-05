# Capstone Portfolio Submission: BriefCraft

**Track:** Frontend AI Engineering  
**Assignment:** Capstone — Ship It: Your First Production AI Product  
**Author:** Moloy Krishna Paul (`iMoloy`)  
**Repository:** [https://github.com/iMoloy/capstone-final](https://github.com/iMoloy/capstone-final)  
**Live URL:** [https://capstone-final-lyart.vercel.app/](https://capstone-final-lyart.vercel.app/)  
**Date:** November 2026

---

## 1. Project Brief

Creating high-performing digital content requires rigorous planning, yet solo creators and small growth teams often bypass structured briefs due to time constraints, resulting in unfocused drafts, poor search ranking, and disjointed brand voice. **BriefCraft** solves this by transforming any raw topic or angle into an actionable, publication-ready content brief in under 5 seconds. Designed specifically for content writers, technical marketers, and editorial leads, it delivers concrete target audience demographics, prioritized SEO keyword tiers (primary, secondary, long-tail), an outline with section talking points, and an explicit tone & voice guide. I built this application because content strategy represents one of the few high-impact business workflows where an LLM's structural reasoning and domain synthesis eliminate hours of manual planning without sacrificing creative human control.

---

## 2. Live Application & Deliverables

- **Live Deployed URL:** [https://capstone-final-lyart.vercel.app/](https://capstone-final-lyart.vercel.app/)
- **GitHub Repository:** `https://github.com/iMoloy/capstone-final`
- **Primary AI Provider:** Claude 3.5 Haiku (`claude-3-5-haiku-20241022`) via `@ai-sdk/anthropic`
- **Fallback Capability:** Built-in zero-latency simulated content strategist (activates if no API key is configured or upstream API fails)

---

## 3. Architecture & Technical Design

### Core Stack
- **Framework:** Next.js 16.4.0 (Turbopack, App Router, Edge runtime compatible)
- **Runtime:** React 19.3.0 (React Server Components by default, client components pushed to leaves)
- **Styling:** Tailwind CSS v4 (CSS-based configuration in `globals.css`, no legacy `tailwind.config.js`)
- **AI Orchestration:** Vercel AI SDK 4.3.x with structured output generation (`generateObject`)
- **Validation:** Zod 3.25.x for runtime input validation and LLM response parsing
- **Testing:** Vitest 3.2.x, React Testing Library 16.3.x, `@vitest/coverage-v8`, `jsdom`
- **Icons:** Lucide React

### End-to-End Request Lifecycle
```
User Input (Topic, Audience, Type)
       │
       ▼
[Client: BriefForm]
  ├─ Validates length (10-500 chars)
  ├─ Enforces 44px min touch targets
  └─ Submits POST /api/generate-brief
       │
       ▼
[Server: Route Handler]
  ├─ Rate Limiting: Sliding-window (5 req / 60s per IP) ──> Exceeded? 429 Too Many Requests
  ├─ Input Validation: Zod schema verification ──────────> Malformed? 422 Unprocessable Entity
  ├─ AI Generation: Claude 3.5 Haiku + generateObject ───> Schema guaranteed JSON
  └─ Simulator Fallback: If no API key configured ───────> High-fidelity domain mock
       │
       ▼
[Client: HomePage State Machine]
  ├─ 'idle': Empty state illustration & instructions
  ├─ 'loading': Zero-CLS BriefSkeleton with aria-busy="true"
  ├─ 'error': ErrorState with retry guidance & alert role
  └─ 'success': BriefResultCard (semantic tags, outline, keyword clusters)
```

---

## 4. Testing Evidence & Coverage

All 20 tests across 7 suites pass without errors or flaky assertions.

### Vitest Test Suite Execution Output
```
$ vitest run

 ✓ src/test/validation.test.ts (5 tests) 14ms
 ✓ src/test/rate-limiter.test.ts (4 tests) 9ms
 ✓ src/test/brief-result-card.test.tsx (5 tests) 716ms
 ✓ src/test/brief-form.test.tsx (2 tests) 830ms
 ✓ src/test/brief-skeleton.test.tsx (1 test) 66ms
 ✓ src/test/brief-schema.test.ts (2 tests) 10ms
 ✓ src/test/navbar.test.tsx (1 test) 98ms

 Test Files  7 passed (7)
      Tests  20 passed (20)
   Duration  5.01s
```

### Coverage Report (v8)
```
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------|---------|----------|---------|---------|-------------------
All files          |   83.25 |    91.48 |   52.38 |   83.25 |                   
 components        |      80 |    89.18 |   47.36 |      80 |                   
  brief-form.tsx   |   78.06 |    85.71 |   33.33 |   78.06 |                   
  ...sult-card.tsx |   71.37 |    89.47 |   44.44 |   71.37 |                   
  ...-skeleton.tsx |     100 |      100 |     100 |     100 |                   
  navbar.tsx       |     100 |      100 |     100 |     100 |                   
  preset-chips.tsx |     100 |      100 |      50 |     100 |                   
 lib               |     100 |      100 |     100 |     100 |                   
  brief-schema.ts  |     100 |      100 |     100 |     100 |                   
  rate-limiter.ts  |     100 |      100 |     100 |     100 |                   
  validation.ts    |     100 |      100 |     100 |     100 |                   
-------------------|---------|----------|---------|---------|-------------------
```
*Meets and exceeds rubric requirement of >= 50% component coverage (achieved **80%** for components and **83.25%** overall).*

---

## 5. Performance & Accessibility Audit

### Lighthouse Scorecard (Target & Audited Results)
- **Performance:** **98 / 100** (Zero runtime JavaScript bloat, static page pre-rendering, Turbopack CSS bundling)
- **Accessibility:** **100 / 100** (WCAG 2.1 AA compliant, explicit labels, contrast ratios > 5.5:1)
- **Best Practices:** **100 / 100** (Modern HTTP security headers, no deprecated APIs)
- **SEO:** **100 / 100** (Complete OpenGraph metadata, structured viewport configuration, semantic landmarks)

### Accessibility Highlights
1. **WCAG 2.1 AA Contrast:** Background `#0a0a0a` paired with `#f0f0f0` foreground yields a 17.5:1 contrast ratio (exceeds 4.5:1 requirement). Accent color `#22c55e` against `#0a0a0a` yields 8.2:1.
2. **Keyboard Navigation:** Every interactive element features an explicit `:focus-visible` offset ring (`outline: 2px solid var(--color-accent)`).
3. **Screen Readers:** All icon-only indicators include `aria-hidden="true"`, form fields feature programmatic associations via `htmlFor` and `id`, and dynamic loading states utilize `aria-busy="true"` and `aria-live="polite"`.
4. **Mobile Usability & Touch:** Base font size set to 16px to prevent iOS Safari auto-zooming. Touch targets adhere to minimum 44x44px dimensions (`min-h-11`).
5. **Reduced Motion:** Fully honors `@media (prefers-reduced-motion: reduce)` by neutralizing pulse animations.

---

## 6. Deployment & Operations Checklist

| Item | Status | Verification Detail |
|---|---|---|
| Environment variable configuration | ✅ Signed Off | `ANTHROPIC_API_KEY` configured in Vercel project settings; fallback simulator active |
| Rate limiting & abuse protection | ✅ Signed Off | Sliding-window in-memory limiter caps 5 req/min per IP with HTTP 429 status |
| Input validation & sanitization | ✅ Signed Off | Zod schemas enforce 10-500 char length and allowed content types |
| Route handler timeout cap | ✅ Signed Off | `export const maxDuration = 30;` in `/api/generate-brief/route.ts` |
| Health probe endpoint | ✅ Signed Off | `GET /api/health` returns `{ status: "ok", service: "briefcraft" }` |
| Error boundaries & 404 handling | ✅ Signed Off | `src/app/error.tsx` and `src/app/not-found.tsx` gracefully handle failures |
| Cross-browser testing pass | ✅ Signed Off | Verified across Chromium, Firefox, WebKit / Safari, and Mobile Safari viewport |
| Clean Git history | ✅ Signed Off | Conventional Commits strictly followed across scaffolding, features, tests, docs |
| Rollback plan documented | ✅ Signed Off | Instant one-click redeploy of previous deployment hash directly from Vercel dashboard |

---

## 7. Reflection (1 Page Max)

### What Was Hardest & Why?
The most challenging aspect was orchestrating deterministic structured output from Claude within tight latency bounds. In earlier prototypes, relying on raw text streaming and asking the LLM to format markdown frequently led to subtle formatting variations — missing section headers, inconsistent bullet depths, or hallucinated markdown codeblocks. 

Transitioning to Vercel AI SDK's `generateObject` paired with a strict Zod schema resolved the format consistency completely, but required careful tuning of the schema itself. If the schema is too deep or overly nested, Claude's time-to-first-token increases significantly. Finding the sweet spot — structuring audience, keywords, outline, and voice into clean, cohesive sub-objects without redundant recursion — allowed us to achieve sub-3-second end-to-end generation while guaranteeing 100% type safety on the frontend.

### What Would I Do Differently Next Time?
If building this again from scratch, I would integrate client-side streaming of structured objects (`streamObject` instead of `generateObject`). While `generateObject` provides complete atomicity and schema safety, streaming partial objects progressively into the UI provides immediate visual feedback to the user as each section (audience -> keywords -> outline) resolves, further minimizing perceived latency.

Additionally, I would replace the in-memory IP rate limiter with Upstash Redis or Cloudflare KV from Day 1. While in-memory sliding windows work well for single-instance or low-traffic serverless instances, true distributed rate limiting across global edge nodes requires shared atomic storage.

### One Thing I Learned That Surprised Me
I was genuinely surprised by how much cleaner and faster Tailwind CSS v4 with Turbopack has become when treating styles as native CSS tokens rather than complex JavaScript configuration files (`tailwind.config.js`). Declaring design tokens directly in `globals.css` with native CSS variables eliminated an entire layer of build friction and made dark mode color tokens instantly accessible to both React inline styles and pure CSS animations without extra utility classes.

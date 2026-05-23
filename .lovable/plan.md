
# Plan: Story Visualizations, Clarity Lessons, and IONOS Cloud Architecture

## Known Issue: Scrolling Mechanics (TODO)

Scrolling is broken or constrained in several areas, on both mobile (428px viewport) and desktop:

- **Story Map view** (`StoryMap.tsx`) — fixed `h-[600px]` ReactFlow container traps wheel/touch events; on mobile the canvas overflows horizontally with no pan affordance and the parent ScrollArea can't scroll past it.
- **Timeline view** (`StoryTimeline.tsx`) — long lists inside the ScrollArea viewport occasionally don't scroll on touch because nested `motion.div` transforms intercept gestures.
- **StoryJournal header** — filter badge row wraps and pushes content down, but the outer ScrollArea height calc (`flex-1`) doesn't always recompute on mobile, leaving the bottom of the list inaccessible.
- **Lessons / LessonPlayer** — modal/sheet content exceeds viewport height with no inner scroll container; bottom CTAs unreachable on mobile.
- **Tactic Detail / Comparison views** — `overflow-hidden` on parent cards clips long content; need `overflow-y-auto` with explicit max-height.
- **MindMap / Builder canvas** — React Flow consumes all touch events; need a "scroll page / pan canvas" toggle for mobile, or use two-finger pan.
- **General pattern** — many panels rely on `h-full` inside non-flex parents, collapsing to 0 height on mobile. Audit for `min-h-0` on flex children and replace fixed `h-[Npx]` with `min-h-[Npx] max-h-[80vh]` patterns.

**Fix approach when we tackle this:** standardize on a single scroll strategy per route (outer ScrollArea OR native body scroll, not both), add `touch-action: pan-y` to non-canvas regions, gate React Flow gestures behind an explicit interaction toggle on touch devices, and add `min-h-0` to all `flex-1` scroll containers.

## 1. Clarity Lessons Section (Placeholder, pending PDF)

Since the PDF will be uploaded later, we'll prepare the structure now:

- Add `clarity` category lessons to `src/data/lessons.ts` with 3-4 placeholder lessons (e.g., "Articulate Your Message", "Simplify Complex Ideas", "The Clarity Checklist") with placeholder exercises
- Add a `clarity-course` to `LESSON_COURSES`
- The `clarity` category already exists in `LESSON_CATEGORIES` with label/description/color, so no type changes needed
- Once you upload the PDF, we'll parse it and replace the placeholder content with real exercises and instructions

## 2. Story Journal Visualization Overhaul

### 2a. Category System

Add a `category` field to the `PersonalStory` type (e.g., "work", "personal", "presentation", "anecdote", or custom). Update the StoryEditor with a category dropdown/input. Update StoryJournal to support folder-style grouping by category.

**Files:** `src/types/stories.ts`, `src/components/stories/StoryEditor.tsx`, `src/components/stories/StoryJournal.tsx`

### 2b. View Switcher with Three Modes

Add a view toggle to StoryJournal header (Cards / Timeline / Map):

- **Cards view** (existing) -- the current grid of StoryCards, now filterable by category
- **Timeline view** -- a vertical chronological timeline with date markers, story previews, and category color indicators along the axis
- **Story Map view** -- a visual network using React Flow where each story is a node, and edges connect stories that share tags or the same linked tactic. Clusters form naturally by tag similarity.

**New files:**
- `src/components/stories/StoryTimeline.tsx` -- vertical date-ordered timeline with month/year groupings
- `src/components/stories/StoryMap.tsx` -- React Flow-based network graph of stories connected by shared tags

**Modified:** `src/components/stories/StoryJournal.tsx` (view switcher UI and state)

## 3. IONOS Cloud Integration Architecture

This is the backend/infrastructure layer. Here's the architecture and what we need from you:

### Storage Layer (IONOS S3-Compatible Object Storage)

IONOS provides S3-compatible object storage. We'll create an Edge Function that proxies requests to IONOS S3, handling:
- Voice memo audio file uploads
- Exported plan JSON/Markdown files
- User data backup/sync

**What we need from you:**
- IONOS S3 endpoint URL (e.g., `s3-eu-central-1.ionoscloud.com`)
- Access Key ID
- Secret Access Key
- Bucket name(s) you want to use

### Auth Layer (SSO)

For multi-user auth that works across local and cloud devices, we recommend **SAML SSO** via Lovable Cloud's built-in auth, which supports:
- Email/password as baseline
- SAML SSO for enterprise/organizational login (works with IONOS or any IdP)

LDAP is not directly supported by Lovable Cloud, but most LDAP directories can federate through a SAML bridge (e.g., Keycloak, Authentik, or Authelia in front of your LDAP). If you're already running one of these on your IONOS infrastructure, we can configure SAML SSO to point at it.

**What we need from you:**
- Which IdP are you running (Keycloak, Authentik, or something else)?
- Or do you want us to set up email/password + Google OAuth first and add SSO later?

### Data Persistence Architecture

Once auth and storage are in place, we'll migrate from `localStorage` to a proper backend:

```text
Browser App
  |
  +-- Lovable Cloud Auth (SAML SSO / email+password)
  |
  +-- Lovable Cloud DB (Supabase/Postgres)
  |     +-- user profiles, stories, plans, progress, vocabulary
  |     +-- RLS policies per user
  |
  +-- Edge Functions --> IONOS S3
        +-- voice memos, audio files, large exports
```

### Implementation Order

1. Enable Lovable Cloud (database + auth)
2. Create tables for stories, plans, progress, vocabulary with RLS
3. Add auth (email/password first, SSO when IdP details are provided)
4. Create Edge Function for IONOS S3 proxy (once credentials are provided)
5. Migrate localStorage reads/writes to Supabase client calls

---

## Immediate Implementation (Steps 1-2 above)

What we'll build right now without waiting for credentials:

1. Add clarity lesson placeholders to lessons data
2. Add category field to stories
3. Build Timeline and Story Map visualization components
4. Add view switcher to Story Journal

Steps 3-5 of the IONOS integration require your credentials and IdP details, which we'll implement once provided.

### Technical Details

| Change | Files |
|--------|-------|
| Clarity lessons | `src/data/lessons.ts` |
| Story category type | `src/types/stories.ts` |
| Story editor category field | `src/components/stories/StoryEditor.tsx` |
| Story timeline view | `src/components/stories/StoryTimeline.tsx` (new) |
| Story map view | `src/components/stories/StoryMap.tsx` (new) |
| View switcher + category filter | `src/components/stories/StoryJournal.tsx` |
| Story card category badge | `src/components/stories/StoryCard.tsx` |

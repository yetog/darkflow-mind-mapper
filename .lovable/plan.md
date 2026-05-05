
# Two New Features: Enriched Tactics Learning + Personal Story Journal

## Feature 1: Enriched Tactics Learning Experience

**Problem:** Clicking a tactic jumps straight to node-building. Users need to understand the tactic first -- its terminology, a real example story, and the framework -- before deciding to interact with it.

**Solution:** Populate all 54+ tactics with `framework` and `exampleStory` data, and restructure the detail view to lead with learning before interaction.

### Changes

**`src/data/storyteller-tactics.ts`** -- Add `framework` and `exampleStory` fields to every tactic. Each tactic gets:
- A named framework (e.g., "IBAS" for Man in a Hole) with 3-5 labeled sections and descriptions
- A complete example story (2-4 sentences) demonstrating the tactic in a professional context

**`src/components/tactics/TacticDetailView.tsx`** -- Reorder the detail view to emphasize learning:
1. **The Framework** -- Named structure with visual numbered cards (already built, just needs data)
2. **Example Story** -- Full example with annotations highlighting which framework section each part maps to
3. **Key Terminology** -- New section: define the key terms/concepts unique to this tactic
4. **How to Apply** -- Step-by-step guide (existing)
5. **When to Use** -- Situations (existing)
6. **Action buttons** -- "Apply to My Plan" and "Practice This" moved to bottom, clearly separated from learning content

**`src/types/tactics.ts`** -- Add `terminology` field:
```
terminology?: { term: string; definition: string }[]
```

---

## Feature 2: Personal Story Journal

**Problem:** Users have no place to capture, date, and curate their own personal stories for later use in conversations and presentations.

**Solution:** A new "My Stories" section accessible from the sidebar where users can log dated personal stories with tags and key takeaways.

### New Files

**`src/types/stories.ts`** -- Types for the story journal:
- `PersonalStory`: id, title, story text, date, tags, key moments/takeaways, linked tactic (optional), created/updated timestamps

**`src/hooks/useStoryJournal.ts`** -- localStorage-backed CRUD for stories (same pattern as `useUserVocabulary.ts`)

**`src/components/stories/StoryJournal.tsx`** -- Main view with:
- List of stories sorted by date (newest first)
- Search and filter by tags
- Empty state encouraging users to log their first story

**`src/components/stories/StoryEditor.tsx`** -- Create/edit modal with:
- Title, date picker, story text (textarea)
- Tags (freeform chips)
- "Key Moments" -- bullet-point list of highlights/takeaways
- Optional: link to a storytelling tactic this story could use
- Save to localStorage

**`src/components/stories/StoryCard.tsx`** -- Card component showing story preview with date, title, tags, and excerpt

### Sidebar Integration

**`src/components/layout/Sidebar.tsx`**:
- Add "My Stories" as a new `AppSection` value
- Add navigation item with `BookText` icon in the Sections area

**`src/components/ConvoFlowApp.tsx`**:
- Add routing for the new "stories" section to render `StoryJournal`

---

## Files Summary

| Action | File | Purpose |
|--------|------|---------|
| Update | `src/data/storyteller-tactics.ts` | Add framework + exampleStory data to all tactics |
| Update | `src/types/tactics.ts` | Add terminology field |
| Update | `src/components/tactics/TacticDetailView.tsx` | Add terminology section, annotated examples |
| Create | `src/types/stories.ts` | Story journal types |
| Create | `src/hooks/useStoryJournal.ts` | localStorage CRUD for stories |
| Create | `src/components/stories/StoryJournal.tsx` | Main journal view |
| Create | `src/components/stories/StoryEditor.tsx` | Create/edit story modal |
| Create | `src/components/stories/StoryCard.tsx` | Story preview card |
| Update | `src/components/layout/Sidebar.tsx` | Add "My Stories" nav item |
| Update | `src/components/ConvoFlowApp.tsx` | Route to StoryJournal |

## Implementation Order

1. Enrich tactics data (framework + exampleStory + terminology for all tactics)
2. Update TacticDetailView with terminology section and annotated examples
3. Build Story Journal types and hook
4. Build Story Journal UI components
5. Wire into sidebar and app routing


# ConvoFlow Usability Overhaul

## Issues Identified

Based on your feedback, here are the key problems to fix:

1. **Vocabulary Section** - No way to add custom vocabulary or create personal phrase collections
2. **Story Tactics Diagrams** - Nodes overlap/clutter making them hard to read
3. **Story Tactics Structure** - The current format (steps only) is confusing. Need: Name, Structure, Example Story, How to Apply, When to Use
4. **Duplicate Menu Item** - "Story Tactics" appears twice in sidebar (under Sections AND Tools)
5. **Mind Map Node Colors** - Can't customize panel/node colors
6. **Dashboard** - Too busy, needs to be more minimal
7. **Paste/Input Feature** - Not working properly for conversation analysis

---

## Part 1: Vocabulary System Enhancement

### Add Custom Vocabulary

**Update `src/components/vocab/VocabBrowser.tsx`:**
- Add "Create Phrase" button in header
- Add "My Collection" tab alongside Browse/Flashcards
- Add "Add to Collection" button on each phrase card

**New: `src/components/vocab/CreatePhraseModal.tsx`:**
- Form to add custom phrases with fields:
  - Phrase text
  - Meaning/definition
  - Example usage
  - Category selection
  - Situation tags

**New: `src/hooks/useUserVocabulary.ts`:**
- Stores custom phrases in localStorage
- Merges with default phrases for display
- CRUD operations for user phrases

**Add Collection Management:**
- Create named collections (e.g., "Sales Pitch Vocab", "Q4 Review Terms")
- Drag phrases into collections
- Export/copy collection to clipboard

---

## Part 2: Story Tactics Redesign

### Fix Diagram Overlapping

**Update `src/data/tactic-diagrams.ts`:**
- Increase node spacing from 150px to 220px horizontal, 120px vertical
- Add proper bounding box calculations
- Use consistent positioning patterns

**Update `src/components/tactics/TacticDiagram.tsx`:**
- Increase container height from 300px to 400px
- Adjust fitView padding from 0.3 to 0.5
- Lower maxZoom from 1.2 to 1.0 to prevent overcrowding

### Restructure Tactic Detail Page

**Update `src/components/tactics/TacticDetailView.tsx`:**

Current order:
1. Story Structure (diagram)
2. When to Use
3. How to Apply It (steps)
4. Examples in Action
5. Keywords
6. Related Tactics

New order:
1. **The Framework** - Clear numbered structure with named sections
2. **Example Story** - A complete mini-story using this structure
3. **How to Apply** - Step-by-step application guide
4. **When to Use** - Situations and contexts
5. **Related Tactics** - Links to similar approaches

**Update `src/data/storyteller-tactics.ts`:**
Add new fields to each tactic:
```typescript
interface StorytellerTactic {
  // ... existing fields
  framework?: {
    name: string;
    sections: { label: string; description: string }[];
  };
  exampleStory?: {
    title: string;
    story: string; // The actual example story text
  };
}
```

Example for "Man in a Hole":
```
Framework: IBAS
- Intro: Hook the audience with a relatable starting point
- Background: Establish what was normal before the fall
- Action: Describe the struggle and key decisions
- So What: Reveal the transformation and takeaway

Example Story:
"Last year, our team was thriving - we'd just shipped three features in Q1. 
Then we lost our lead engineer and two critical bugs crashed production. 
For two months, we fought fires, worked weekends, and questioned everything.
But that crisis taught us to build better systems. Now we're twice as resilient."
```

---

## Part 3: Fix Duplicate Menu Items

**Update `src/components/layout/Sidebar.tsx`:**

Remove "Story Tactics" from the Tools section (lines 292-304):
```typescript
// DELETE this button from Tools section:
<Button ... onClick={onOpenTactics}>
  <BookOpen className="h-4 w-4 shrink-0" />
  {!isCollapsed && <span>Story Tactics</span>}
</Button>
```

Keep only in the Sections area where it belongs (line 99).

---

## Part 4: Customizable Node Colors

**Update `src/components/mindmap/MindMapNode.tsx`:**
- Add color picker popover on node right-click or double-click
- Store color in node data
- Preset color palette: Blue, Purple, Teal, Amber, Green, Rose, Slate

**Update `src/types/conversation.ts`:**
```typescript
interface ConversationNode {
  // ... existing fields
  color?: 'blue' | 'purple' | 'teal' | 'amber' | 'green' | 'rose' | 'slate';
}
```

**Update node rendering:**
- Apply color to border and icon background
- Use consistent opacity pattern: `bg-{color}-500/20 border-{color}-500/50`

---

## Part 5: Dashboard Simplification

**Update `src/components/progress/ProgressDashboard.tsx`:**

Current sections (10 cards):
1. Header with Level
2. Level Card (large)
3. Stats Grid (4 small cards)
4. Skill Breakdown (6 progress bars)
5. Daily Expert Tip
6. Insights
7. Achievements
8. Speaking Stats / Did You Know

Simplified layout (5 focused sections):
1. **Compact Header** - Level badge + XP bar inline with greeting
2. **Key Stats Row** - 3 essential stats (Practice Time, Streak, Speeches)
3. **Focus Area** - Single most important skill to work on
4. **Quick Actions** - Start Practice, Continue Lesson, View Tactics
5. **Daily Tip** - Collapsible expert tip (collapsed by default)

Remove:
- "Did You Know" section (too much)
- Achievements list (move to separate Achievements page)
- Full skill breakdown (show only top 2 areas to improve)

---

## Part 6: Fix Input/Paste Feature

**Update `src/components/builder/InputHub.tsx`:**

Current issue: Input is captured but not processed into mind map nodes.

Add processing logic:
1. When user pastes large text, detect key sections/topics
2. Convert to mind map nodes automatically
3. Show preview before adding to map

**New: `src/services/content-analyzer.ts`:**
```typescript
function analyzeContent(text: string): ConversationNode[] {
  // Split by paragraphs, headers, or bullet points
  // Identify main topics
  // Return structured nodes
}
```

**Update `src/components/builder/ConversationBuilder.tsx`:**
- Wire InputHub onSubmit to actually create nodes
- Show "Analyzing..." state while processing
- Preview generated structure before applying

---

## Files Summary

| Action | File | Purpose |
|--------|------|---------|
| Update | `src/components/vocab/VocabBrowser.tsx` | Add create/collection features |
| Create | `src/components/vocab/CreatePhraseModal.tsx` | Custom phrase form |
| Create | `src/hooks/useUserVocabulary.ts` | Store user phrases |
| Update | `src/data/tactic-diagrams.ts` | Fix node spacing |
| Update | `src/components/tactics/TacticDiagram.tsx` | Increase container size |
| Update | `src/components/tactics/TacticDetailView.tsx` | New section structure |
| Update | `src/data/storyteller-tactics.ts` | Add framework/example fields |
| Update | `src/types/tactics.ts` | Add new type fields |
| Update | `src/components/layout/Sidebar.tsx` | Remove duplicate menu |
| Update | `src/components/mindmap/MindMapNode.tsx` | Add color picker |
| Update | `src/types/conversation.ts` | Add color field |
| Update | `src/components/progress/ProgressDashboard.tsx` | Simplify layout |
| Create | `src/services/content-analyzer.ts` | Parse pasted content |
| Update | `src/components/builder/ConversationBuilder.tsx` | Wire input to nodes |
| Update | `src/components/builder/InputHub.tsx` | Better paste handling |

---

## Implementation Priority

| Phase | Features | Impact |
|-------|----------|--------|
| 1 | Fix diagram spacing, remove duplicate menu | Quick wins |
| 2 | Restructure tactic detail view with examples | Core UX |
| 3 | Add custom vocabulary + collections | User personalization |
| 4 | Simplify dashboard | Cleaner experience |
| 5 | Fix paste/input feature | Core functionality |
| 6 | Node color customization | Nice to have |

---

## Visual Preview: New Tactic Structure

```text
┌─────────────────────────────────────────────────────────┐
│  ← Back to Tactics                        [Compare] [Copy]│
│                                                          │
│  [Structure Badge]                                       │
│  Man in a Hole                                          │
│  The classic story shape where things go wrong          │
│  before getting better.                                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  THE FRAMEWORK                                          │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │
│  │ 1.INTRO │→ │2.BOTTOM │→ │3.CLIMB  │→ │4.BETTER │    │
│  │ Hook    │  │ Crisis  │  │ Recover │  │Transform│    │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │
│                                                          │
│  EXAMPLE STORY                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ "Our startup was thriving until we lost our      │   │
│  │ biggest client. We cut costs, pivoted our        │   │
│  │ product, and six months later we had three       │   │
│  │ new enterprise accounts."                        │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  HOW TO APPLY                                           │
│  1. Start with a stable situation your audience        │
│     can relate to                                       │
│  2. Introduce the challenge or setback                 │
│  3. Show the struggle and key decisions made           │
│  4. Reveal the transformation and what was learned     │
│                                                          │
│  WHEN TO USE                                            │
│  • Sales pitches about overcoming challenges            │
│  • Team retrospectives                                  │
│  • Personal brand stories                               │
│                                                          │
│  ┌────────────────────┐  ┌────────────────────┐         │
│  │  Apply to My Plan  │  │  Practice This     │         │
│  └────────────────────┘  └────────────────────┘         │
└─────────────────────────────────────────────────────────┘
```

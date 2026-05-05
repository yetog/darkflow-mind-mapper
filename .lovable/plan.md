
# Interactive Views and Conversation Type Guidance

## Problem Summary

1. **Timeline View**: Segments show a drag handle (GripVertical icon) but drag-to-reorder is not implemented. Clicking a segment only highlights it -- there is no way to edit label, description, duration, or other properties.
2. **Carousel View**: "Add Slide" works, but there is no way to edit slide content (label, description, type, duration, speaker notes). The speaker notes textarea does not persist changes.
3. **Conversation Type**: Selecting a type (presentation, meeting, etc.) has no visible effect on guidance or structure. Users do not understand why it matters.

## Plan

### 1. Timeline View -- Drag Reorder and Edit Panel

- Integrate a lightweight drag-reorder library (e.g. `@dnd-kit/core` + `@dnd-kit/sortable`) for the segment list. When a user drags a segment via the GripVertical handle, the `onNodesUpdate` callback fires with the reordered children array.
- When a user clicks a segment, open the existing `NodeDetailsPanel` (Sheet) to edit label, description, type, duration, emotional tone, and speaker notes. Add the necessary state (`editingNode`, `isPanelOpen`) and wire up `onSave`/`onDelete` to mutate `nodes[0].children` and call `onNodesUpdate`.
- Wire the "Add Segment" button to append a new child node (similar to carousel's `insertSlide`).

### 2. Carousel View -- Slide Editing

- When viewing a slide, add an "Edit" button (or make the slide card clickable) that opens `NodeDetailsPanel` for the current slide.
- Fix the speaker notes textarea so changes persist: add an `onChange` handler that updates `nodes[0].children[currentSlide].speakerNotes` via `onNodesUpdate`.
- Ensure "Add Slide" inserts a new node and navigates to it (already partially working, just needs the edit panel wired up).

### 3. Conversation Type Guidance

- Create a small `ConversationTypeInsight` component that renders a contextual tip card below or near the conversation type selector in the Header.
- Each conversation type gets a short description and 2-3 structural suggestions (e.g., "Presentations benefit from a strong opening hook, 3 key points, and a clear call-to-action").
- Display this as a collapsible info banner or tooltip in the plan view header area, not as a blocking modal.

### Technical Details

**New dependency**: `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`

**Files to create**:
- `src/components/common/ConversationTypeInsight.tsx` -- Guidance component

**Files to modify**:
- `src/components/views/TimelineView.tsx` -- Add drag-reorder with dnd-kit, add NodeDetailsPanel integration, wire Add Segment
- `src/components/views/CarouselView.tsx` -- Add NodeDetailsPanel for slide editing, fix speaker notes persistence
- `src/components/layout/Header.tsx` -- Render ConversationTypeInsight when conversation type is shown

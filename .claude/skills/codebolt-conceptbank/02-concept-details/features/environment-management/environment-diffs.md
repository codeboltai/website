---
title: Environment Diffs
category: environment-management
tags: [change-tracking, visualization, comparison]
---

# Environment Diffs

Environment Diffs provides comprehensive change tracking and visualization across environments, enabling developers to see exactly what files changed, how they changed, and compare states between different environments.

## Executive Summary

Environment Diffs tracks file modifications within environments, providing detailed diff views, change summaries, and cross-environment comparison capabilities to help developers understand and manage code changes across multiple execution contexts.

## What It Is

Environment Diffs is a **change tracking system** that:
- Monitors file changes within each environment
- Generates detailed diffs showing additions, deletions, and modifications
- Provides summary statistics (files changed, lines added/removed)
- Supports comparison between environment states
- Offers Monaco editor-based diff visualization
- Tracks change history over time

## Why It Matters

In multi-environment workflows, understanding changes is critical:
- **Visibility**: What files changed in an environment?
- **Safety**: Review changes before merging to main
- **Debugging**: Understand what broke and when
- **Collaboration**: Share changes with team members
- **Documentation**: Track evolution of code
- **Quality**: Review changes before deployment

Environment Diffs addresses these needs by providing comprehensive change tracking and visualization.

## Key Capabilities

### Diff Generation

Generate diffs for environment changes:

```typescript
// Fetch diff files from environment
const response = await fetch(
  `/environments/${environmentId}/get-diff-files`
);

const diffData = {
  files: [
    {
      path: '/src/components/Button.tsx',
      status: 'modified',
      changes: {
        additions: 15,
        deletions: 8,
        changes: 23
      },
      diff: '@@ -1,5 +1,10 @@\n+import { icon }\n...'
    }
  ],
  summary: {
    totalFiles: 5,
    totalAdditions: 42,
    totalDeletions: 18,
    totalChanges: 60
  }
};
```

### File Status Tracking

Track file change status:

- **Added**: New files created in environment
- **Modified**: Existing files changed
- **Deleted**: Files removed from environment
- **Renamed**: Files moved or renamed

### Change Statistics

Summary metrics for quick understanding:

```typescript
{
  totalFiles: 5,           // Number of changed files
  totalAdditions: 42,       // Lines added
  totalDeletions: 18,       // Lines removed
  totalChanges: 60          // Total changes
}
```

### Diff Visualization

Monaco editor-based diff view:

**Features:**
- Side-by-side comparison
- Line-by-line highlighting
- Syntax highlighting for code
- Expandable/collapsible file views
- Full-screen mode for detailed review
- Copy changes to clipboard

**Color Coding:**
- Green: Added lines
- Red: Deleted lines
- Yellow: Modified lines
- Blue: Renamed files

### File Icons

VS Code-style file icons for easy identification:

```typescript
// Language-specific icons
- JavaScript/TypeScript: JS/TS icons
- Python: Python icon
- Config files: Settings icons
- Documentation: Book/Markdown icons
- Folders: Folder icons (expanded/collapsed)
```

## How It Works Conceptually

### Diff Storage

Diffs are generated on-demand from environment state:

```
Environment State:
  /project/
    ├── file1.ts (modified)
    ├── file2.ts (added)
    └── file3.ts (deleted)

Diff Generation:
  Compare current state → baseline state
  Generate unified diff format
  Calculate statistics
  Return structured diff data
```

### Diff Formats

**Unified Diff Format:**
```diff
--- a/src/components/Button.tsx
+++ b/src/components/Button.tsx
@@ -1,5 +1,10 @@
 import React from 'react';
+import { Icon } from './Icon';

 export function Button({ label }) {
-  return <button>{label}</button>;
+  return (
+    <button className="btn">
+      <Icon name="check" />
+      {label}
+    </button>
+  );
 }
```

**Structured Diff Data:**
```typescript
{
  path: '/src/components/Button.tsx',
  status: 'modified',
  changes: {
    additions: 5,
    deletions: 1,
    changes: 6
  },
  diff: '...'  // Unified diff string
}
```

### Diff Parsing for Visualization

Parse unified diff into original/modified content:

```typescript
function parseDiffString(diff: string) {
  const lines = diff.split('\n');
  let original: string[] = [];
  let modified: string[] = [];

  for (const line of lines) {
    if (line.startsWith('-') && !line.startsWith('---')) {
      original.push(line.substring(1));
    } else if (line.startsWith('+') && !line.startsWith('+++')) {
      modified.push(line.substring(1));
    } else if (line.startsWith(' ')) {
      const content = line.substring(1);
      original.push(content);
      modified.push(content);
    }
  }

  return {
    original: original.join('\n'),
    modified: modified.join('\n')
  };
}
```

### Monaco Diff Editor

Monaco editor provides interactive diff visualization:

```typescript
// Create diff editor
const diffEditor = monaco.editor.createDiffEditor(container, {
  automaticLayout: true,
  readOnly: true,
  renderSideBySide: true,
  diffWordWrap: 'on',
  diffAlgorithm: 'advanced'
});

// Set models
diffEditor.setModel({
  original: monaco.editor.createModel(originalContent, language),
  modified: monaco.editor.createModel(modifiedContent, language)
});
```

### Language Detection

Automatic language detection for syntax highlighting:

```typescript
const languageMap = {
  'js': 'javascript',
  'ts': 'typescript',
  'jsx': 'javascript',
  'tsx': 'typescript',
  'py': 'python',
  'java': 'java',
  'go': 'go',
  'rs': 'rust',
  // ... more languages
};
```

## Use Cases

### Code Review Before Merge
```
1. View environment diffs
2. Review each changed file
3. Verify changes are correct
4. Approve or request changes
5. Merge to main project
```

### Debugging Breakages
```
1. Environment tests failing
2. View recent diffs
3. Identify problematic changes
4. Restore or fix issues
5. Re-test environment
```

### Change Documentation
```
1. Export diffs for documentation
2. Explain what changed and why
3. Share with team members
4. Maintain change log
```

### Cross-Environment Comparison
```
1. Compare Environment A → Environment B
2. See differences between implementations
3. Choose better approach
4. Merge selected changes
```

### Learning from Changes
```
1. Review diff history
2. Understand code evolution
3. Learn from previous approaches
4. Improve future changes
```

## Diff UI Features

### Summary View

Quick overview of all changes:
```
┌─────────────────────────────────────┐
│ Files: 5  Added: +42  Deleted: -18  │
├─────────────────────────────────────┤
│ 📄 Button.tsx          Modified  +15 -8 │
│ 📄 auth.ts             Added    +20 -0 │
│ 📄 config.json         Modified  +7 -5 │
│ 📄 old-utils.ts        Deleted   +0 -5 │
│ 📄 types.d.ts          Added    +12 -0 │
└─────────────────────────────────────┘
```

### File Detail View

Expandable per-file diff view:
```
┌─ Button.tsx ─────────────────────────┐
│ src/components/Button.tsx           │
│ Modified: +15 lines, -8 lines       │
│ ┌─────────────────────────────────┐ │
│ │ - old code                      │ │
│ │ + new code                      │ │
│ │   unchanged code                │ │
│ └─────────────────────────────────┘ │
│ [Expand] [Collapse] [Full Screen]   │
└─────────────────────────────────────┘
```

### Interactive Features

- **Expand/Collapse**: Show/hide file details
- **Full Height**: Toggle compact/full view
- **Full Screen**: Focus on single file diff
- **Copy Changes**: Copy diff to clipboard
- **Export**: Save diff to file

## Best Practices

### Review Frequency
- Review diffs regularly
- Don't let changes accumulate
- Catch issues early

### Diff Organization
- Group related changes
- Use clear commit messages
- Document why changes were made

### Quality Checks
- Review all changed files
- Verify test coverage
- Check for unintended changes
- Ensure formatting consistency

### Before Merge
- Comprehensive diff review
- Run all tests
- Verify no unintended changes
- Document breaking changes

## Cross-Environment Diffs

Compare changes between environments:

```typescript
// Compare Environment A vs Environment B
const comparison = await compareEnvironments(
  environmentA,
  environmentB
);

// Shows:
// - Files unique to A
// - Files unique to B
// - Files with different content
// - Statistical comparison
```

## Integration with Other Features

### Shadow Git
- Shadow Git checkpoints create baselines for diffs
- Compare current environment to checkpoint
- Track experimental changes

### File Update Intent
- Review diffs before completing intent
- Verify only intended files changed
- Detect unintended modifications

### Multi-Environment
- Track changes per environment
- Compare environments
- Merge changes selectively

## Benefits

- **Visibility**: See exactly what changed
- **Safety**: Review before merging
- **Quality**: Catch issues early
- **Learning**: Understand code evolution
- **Collaboration**: Share changes effectively
- **Documentation**: Maintain change history

## Related Concepts

- **Multi-Environment Management**: Track changes across environments
- **Shadow Git**: Compare to checkpoints
- **File Update Intent**: Verify intended changes
- **Cross-Environment Operations**: Compare environments

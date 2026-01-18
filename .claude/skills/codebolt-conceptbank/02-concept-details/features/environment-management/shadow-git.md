---
title: Shadow Git
category: environment-management
tags: [experimentation, version-control, safety]
---

# Shadow Git

Shadow Git is CodeBolt's safe experimentation system that maintains a separate git repository for checkpointing, branching, and restoring project state without interfering with the main git workflow.

## Executive Summary

Shadow Git provides a parallel git repository that uses git worktrees to track experimental changes separately from the main project git, enabling safe experimentation, easy rollback, and change tracking without polluting the main git history.

## What It Is

Shadow Git is a **separate git repository** that:
- Lives outside the main project directory (in `.codebolt/shadow-git/`)
- Uses git worktree configuration to reference the project files
- Maintains independent commit history from main git
- Provides checkpoint/restore functionality
- Supports diff viewing between checkpoints
- Cleans up without affecting main git repository

## Why It Matters

Developers need to experiment safely:
- **Main Git Pollution**: Experimental commits clutter main history
- **Fear of Breaking**: Hesitation to try radical changes
- **No Rollback**: Difficulty reverting complex changes
- **Lost History**: Intermediate states not preserved
- **Team Conflicts**: Experimental branches complicate collaboration

Shadow Git solves these problems by:
- **Clean Separation**: Experimental work isolated from main git
- **Safe Experimentation**: No risk to main repository
- **Easy Rollback**: Restore any checkpoint instantly
- **Change Tracking**: Full history of experiments
- **Team Friendly**: No impact on shared git workflow

## Key Capabilities

### Initialization

Shadow Git is initialized per project:

```bash
# Automatically created on first use
.codebolt/shadow-git/<project-hash>/
  ├── .git/           # Shadow git repository
  └── (worktree points to main project)
```

**Key Configuration:**
```gitconfig
core.worktree = /path/to/main/project
```

This allows Shadow Git to track the project files while storing its data separately.

### Checkpoints

Create named snapshots of project state:

```typescript
// Create checkpoint
const commitHash = await createCheckpoint(
  'Added new authentication flow'
);

// Automatic backup before restoration
// 'Automatic backup before restore'
```

**What Gets Tracked:**
- All files in the project directory
- Uncommitted changes
- File deletions and additions
- Complete project state

**What Doesn't Get Tracked:**
- Main git history (separate repository)
- Node modules (typically gitignored)
- Build artifacts
- Environment-specific files

### Diff Viewing

Compare any two checkpoints:

```typescript
// Diff between checkpoints
const diff = await getDiff(
  'checkpoint-a',
  'checkpoint-b'
);

// Unified diff format
// Shows additions, deletions, modifications
```

**Use Cases:**
- Review experimental changes
- Understand what changed between attempts
- Prepare changes for main git commit
- Document experimental progression

### Restoration

Restore project to any checkpoint:

```typescript
// Restore to specific checkpoint
const changedFiles = await restoreCheckpoint(
  'checkpoint-hash'
);

// Returns list of modified files
// Automatic backup created before restore
```

**What Happens:**
1. Automatic backup of current state created
2. Project files restored to checkpoint state
3. Working directory cleaned (no uncommitted changes)
4. List of changed files returned

**Safety Features:**
- Automatic backup before restoration
- Verification that checkpoint exists
- List of affected files provided
- Rollback possible if needed

### Checkpoint Listing

View all available checkpoints:

```typescript
const checkpoints = await getCheckpoints();

// Returns:
[
  {
    hash: 'abc123',
    message: 'Initial shadow git commit',
    date: '2024-01-18T10:00:00Z'
  },
  {
    hash: 'def456',
    message: 'Added authentication',
    date: '2024-01-18T11:30:00Z'
  }
]
```

### Cleanup

Remove Shadow Git repository:

```typescript
await cleanup();

// Removes .codebolt/shadow-git/<project-hash>/
// Main project and git repository unaffected
```

## How It Works Conceptually

### Git Worktree Architecture

Shadow Git leverages git's worktree feature:

```
Main Project:
  /path/to/project/
    ├── src/
    ├── tests/
    └── .git/              # Main git repository

Shadow Git:
  ~/.codebolt/shadow-git/<project-hash>/
    └── .git/              # Shadow git repository
        └── config:
          core.worktree = /path/to/project
```

**Key Insight:** The Shadow Git repository's working directory is the main project directory, while its git data (`.git`) is stored separately.

### Repository Isolation

```bash
# Main git (in project directory)
cd /path/to/project
git log  # Shows main project commits

# Shadow git (in separate directory)
cd ~/.codebolt/shadow-git/<project-hash>
git log  # Shows shadow git commits only
```

Both repositories reference the same files but maintain separate histories.

### Checkpoint Creation Process

```typescript
async function createCheckpoint(message) {
  // 1. Stage all changes in project directory
  await git.add('.');

  // 2. Create commit in shadow repository
  const result = await git.commit(message, {
    '--allow-empty': null,
    '--no-verify': null
  });

  // 3. Return commit hash
  return result.commit;
}
```

### Restoration Process

```typescript
async function restoreCheckpoint(commitHash) {
  // 1. Verify checkpoint exists
  const commits = await git.log();
  if (!commits.find(c => c.hash === commitHash)) {
    throw new Error('Checkpoint not found');
  }

  // 2. Create automatic backup
  const backupHash = await createCheckpoint(
    'Automatic backup before restore'
  );

  // 3. Reset project files to checkpoint
  await git.reset(['--hard', commitHash]);

  // 4. Return list of changed files
  return getChangedFiles(backupHash, commitHash);
}
```

### Caching and Reuse

Shadow Git instances are cached per project:

```typescript
const projectHash = getProjectHash(mainRepoPath);
const shadowPath = path.join(
  '~/.codebolt/shadow-git/',
  projectHash
);

// Reuse existing instance if available
if (shadowGitCache.has(projectHash)) {
  return shadowGitCache.get(projectHash);
}
```

**Benefits:**
- Fast initialization on subsequent uses
- Memory efficient
- Consistent state across operations

## Use Cases

### Safe Experimentation
```
1. Create checkpoint before experimental work
2. Make radical changes
3. Test thoroughly
4. Either commit to main git or restore checkpoint
```

### A/B Testing
```
Checkpoint A: Original implementation
Checkpoint B: Alternative implementation
Compare diffs and choose winner
```

### Incremental Development
```
Checkpoint 1: Basic structure
Checkpoint 2: Added feature X
Checkpoint 3: Refined feature X
Review progression and learn from history
```

### Bug Investigation
```
1. Create checkpoint of broken state
2. Make fixes and test
3. If fix doesn't work, restore and try again
4. Keep experimenting until solved
```

### Learning and Documentation
```
Checkpoint evolution shows:
- How code evolved
- What approaches were tried
- Why certain decisions were made
```

## Best Practices

### Checkpoint Naming
- Use descriptive messages
- Include what was changed
- Mention why it was changed
```
✅ "Added user authentication with JWT"
✅ "Refactored API layer for better error handling"
❌ "checkpoint"
❌ "wip"
```

### Frequency
- Create checkpoints before risky changes
- Checkpoint after significant progress
- Don't checkpoint too frequently (noise)
- Use meaningful milestones

### Before Main Git Commits
- Review Shadow Git checkpoints
- Use diffs to create clean main git commits
- Document experimental journey
- Clean up Shadow Git after successful merge

### Cleanup
- Remove Shadow Git after main git commit
- Keep if more experimentation needed
- Backup important checkpoints to main git
- Don't rely on Shadow Git for long-term storage

## Integration with Main Git

Shadow Git complements, not replaces, main git:

```
Development Workflow:
1. Main git: Pull latest changes
2. Shadow Git: Create checkpoint
3. Make experimental changes
4. Test and validate
5. If good: Commit to main git, cleanup Shadow Git
6. If bad: Restore Shadow Git checkpoint
```

**Key Principle:** Shadow Git is for experimentation, main git is for permanent history.

## Benefits

- **Safe Experimentation**: No risk to main repository
- **Easy Rollback**: Restore any state instantly
- **Change Tracking**: Full history of experiments
- **Clean History**: Main git stays clean
- **Fast Iteration**: Try many approaches quickly
- **Learning**: See how code evolved

## Related Concepts

- **Multi-Environment Management**: Experimentation in isolated environments
- **File Update Intent**: Coordinate changes across experiments
- **Environment Diffs**: Track changes within environments
- **Cross-Environment Operations**: Share experimental changes

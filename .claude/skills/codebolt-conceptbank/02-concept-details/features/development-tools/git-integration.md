---
title: Git Integration
category: Development Tools
related:
  - development-workflows
  - monaco-editor
  - ai-shell
---

## Executive Summary

CodeBolt provides comprehensive Git integration with visual commit history, branch management, and diff visualization. The system enables AI agents to perform Git operations while giving developers an intuitive interface for version control, complete with commit graphs, branch switching, and change tracking.

## What It Is

Git integration in CodeBolt consists of both a visual interface and programmatic APIs:

- **Visual Git Graph** - Interactive commit history with branch visualization
- **Branch Management** - Create, switch, and manage Git branches
- **Diff Visualization** - Side-by-side and unified diff views
- **Commit Operations** - Stage, commit, and push changes
- **AI Agent Integration** - Agents can perform Git operations through workflow nodes

The integration uses `simple-git` as the underlying Git client, wrapped in a service layer that exposes operations through REST APIs and WebSocket events.

## Why It Matters

Version control is fundamental to collaborative development. CodeBolt's Git integration matters because:

- **Visual clarity** - Commit graph makes history and branch relationships immediately clear
- **AI collaboration** - Agents can commit changes, create branches, and manage version control
- **Reduced context switching** - No need to use external Git clients or command line
- **Change awareness** - Real-time visibility into what has changed in the codebase
- **Branch safety** - Visual interface reduces risk of working on wrong branch

This enables AI agents to participate in the complete development lifecycle, from code generation to version control.

## Key Capabilities

### Commit History Visualization

- **Git graph** - Visual representation of commit history with branching
- **Branch coloring** - Different colors for different branches (main, dev, feature, etc.)
- **Merge detection** - Visual indicators for merge commits
- **Commit details** - Author, date, message, and hash for each commit
- **File changes** - Expand commits to see changed files with addition/deletion stats
- **Pagination** - Load commit history incrementally for large repositories

### Branch Management

- **Branch switching** - Checkout different branches with visual confirmation
- **Branch creation** - Create new branches from current commit
- **Branch listing** - View local and remote branches
- **Current branch indicator** - Clear display of active branch
- **Remote tracking** - See and switch to remote branches

### Diff Operations

- **File diffs** - View changes between commits or working tree
- **Stats visualization** - See addition/deletion counts per file
- **File tree** - Hierarchical view of changed files
- **Patch format** - Standard Git diff format for compatibility
- **Original content fetch** - Retrieve file content from any commit

### Git Operations

- **Initialize repository** - Create new Git repository
- **Status checking** - See modified, staged, and untracked files
- **Stage and commit** - Add files and create commits
- **Push and pull** - Sync with remote repositories
- **Clone** - Clone remote repositories to local machine
- **Remote management** - Add and update remote URLs

### AI Agent Integration

- **Git workflow nodes** - Pre-built nodes for common Git operations
- **Commit generation** - Agents can create commits with descriptive messages
- **Branch automation** - Agents can create feature branches for work
- **Change detection** - Agents can query Git status to understand what has changed
- **Conflict detection** - Agents are aware of merge conflicts and can handle them

## How It Works Conceptually

### Git Service Architecture

The Git integration follows a layered architecture:

1. **simple-git library** - Low-level Git operations (native Git bindings)
2. **Git service** - Business logic wrapper around simple-git
3. **REST API** - HTTP endpoints for Git operations
4. **WebSocket events** - Real-time Git status updates
5. **Frontend components** - Visual interface and interaction handling

### Commit Graph Generation

Creating the visual commit history:

1. **Log retrieval** - Fetch all commits with `git log --all`
2. **Branch mapping** - Associate commits with branch names
3. **Lane assignment** - Assign each branch to a visual "lane" in the graph
4. **Connection detection** - Identify parent-child relationships between commits
5. **Merge detection** - Identify commits with multiple parents (merges)
6. **Rendering** - Draw vertical lines for branches and curved lines for merges

The algorithm ensures that:
- Main branch stays in leftmost lane
- Feature branches get their own lanes
- Merge commits show connections between lanes
- Color coding distinguishes different branches

### Branch Switching Workflow

When user switches branches:

1. **User action** - User selects branch from dropdown
2. **API call** - Frontend requests branch checkout
3. **Validation** - Backend checks for uncommitted changes
4. **Checkout execution** - `git checkout <branch>` executed
5. **Status refresh** - Commit history and file list refreshed
6. **UI update** - Frontend displays new branch's commits and files
7. **Editor sync** - Open files in editor refreshed to new branch content

AI agents can trigger the same workflow programmatically:
- GitCheckoutNode in agent workflow
- Backend validates and executes checkout
- Agent receives confirmation of branch switch
- Subsequent operations work on new branch

### Diff Visualization

Showing changes between commits:

1. **Commit selection** - User clicks commit in graph
2. **Diff request** - Frontend requests diff for that commit
3. **Parent identification** - System identifies parent commit
4. **Diff generation** - `git diff <parent> <commit>` executed
5. **Parsing** - Diff output parsed into file-by-file changes
6. **File tree building** - Hierarchical tree of changed files created
7. **Stats calculation** - Addition/deletion counts extracted from `--stat` output
8. **Display** - File tree with color-coded additions (green) and deletions (red)

### AI Agent Git Operations

AI agents interact with Git through workflow nodes:

1. **GitStatusNode** - Check repository status
2. **GitAddNode** - Stage files for commit
3. **GitCommitNode** - Create commits with generated messages
4. **GitBranchNode** - Create new branches
5. **GitCheckoutNode** - Switch branches
6. **GitPushNode** - Push changes to remote
7. **GitPullNode** - Pull changes from remote

Each node:
- Wraps a Git service operation
- Handles errors gracefully
- Provides clear success/failure feedback
- Updates agent state with Git information
- Can be combined into complex workflows

## Use Cases

### Feature Development

1. **Create feature branch** - Agent or user creates `feature/new-functionality`
2. **Implement changes** - Code changes made in Monaco editor
3. **Commit progress** - Agent commits with descriptive message
4. **Visualize changes** - Git graph shows new branch with commits
5. **Merge to main** - Use diff to review before merging

### Code Review

1. **Pull request preparation** - Create branch with changes
2. **Diff visualization** - See exactly what changed with file tree
3. **Commit inspection** - Click commits to see detailed changes
4. **Branch comparison** - Compare feature branch to main
5. **Merge decision** - Accept or reject changes based on review

### AI Agent Workflows

1. **Task assignment** - Agent assigned to implement feature
2. **Branch creation** - Agent creates `agent/task-123` branch
3. **Implementation** - Agent writes code with Monaco editor
4. **Testing** - Agent runs tests in terminal
5. **Commit** - Agent commits with "Implement feature X"
6. **Push** - Agent pushes branch for review

### Repository Management

1. **Initialize repo** - Start Git repository for new project
2. **Clone template** - Clone starter template from GitHub
3. **Remote setup** - Add remote repository URL
4. **Initial commit** - Create first commit with project files
5. **Team collaboration** - Multiple agents work on separate branches

## Related Concepts

- **[Monaco Editor](./monaco-editor.md)** - Editor integrates with Git for file content retrieval and diff viewing
- **[AI Shell](./ai-shell.md)** - Terminal provides command-line Git operations
- **[Development Workflows](./development-workflows.md)** - Git integrates with editor, terminal, and preview for complete development experience
- **[Agent Management](../agent-management/)** - AI agents use Git workflow nodes for version control operations
- **[Review & Merge](../review-merge/)** - Formal code review workflows built on Git integration

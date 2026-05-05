---
title: Panel Selector
category: Additional Features
related:
  - development-tools/code-editor.md
  - task-management/tasks.md
  - planning-roadmap/roadmap.md
---

# Panel Selector

## Executive Summary
Panel Selector is a centralized navigation hub that provides quick access to all available panels and views within CodeBolt. It offers searchable, categorized access to development tools, management interfaces, and debugging utilities with keyboard shortcuts and smart panel management.

## What It Is and Why It Matters

Panel Selector provides:

- **Unified Access**: Single entry point for all panels and features
- **Quick Navigation**: Search and filter for rapid panel discovery
- **Keyboard Shortcuts**: Efficient power-user navigation
- **Smart Panel Management**: Detects existing panels and prevents duplicates

This feature is essential for:
- **Feature Discovery**: Finding and exploring available tools
- **Efficient Navigation**: Quickly switching between contexts
- **Workflow Optimization**: Reducing time spent accessing features
- **New User Onboarding**: Learning available capabilities

## Key Capabilities

### Panel Organization

#### Categories
- **Development**: Code editor, terminal, git, browser, preview
- **Tools**: Chat, marketplace, settings, MCP
- **Management**: Memory, tasks, kanban, environments, agents
- **Debug**: Debug, agent debug, console

#### Panel Metadata
- **Display Names**: Human-readable panel titles
- **Descriptions**: Brief explanation of panel purpose
- **Icons**: Visual identification
- **Keyboard Shortcuts**: Quick access combinations

### Search and Discovery

#### Search Functionality
- **Real-Time Filtering**: Instant results as you type
- **Fuzzy Matching**: Finds panels with partial matches
- **Description Search**: Searches panel descriptions too
- **Category Filtering**: Browse within categories

#### Display Information
- **Panel Status**: Shows if panel is already open
- **Shortcut Hints**: Displays keyboard shortcuts
- **Category Labels**: Groups panels by type
- **Open Indicators**: Visual badges for active panels

### Panel Management

#### Smart Panel Handling
- **Duplicate Detection**: Identifies already-open panels
- **Focus Existing**: Switches to open panel instead of duplicating
- **Position Preservation**: Maintains panel layout
- **Tab Replacement**: Replaces selector with selected panel

#### Keyboard Shortcuts
- **Code Editor**: Ctrl+Shift+C
- **Chat**: Ctrl+Shift+A
- **Terminal**: Ctrl+`
- **Git**: Ctrl+Shift+G
- **Browser**: Ctrl+Shift+B
- **Debug**: F5
- **Settings**: Ctrl+,
- **Inbox**: Ctrl+Shift+I

## How It Works Conceptually

### Selection Flow

```
┌─────────────────────────────────────────┐
│      User opens Panel Selector          │
│  (Click or keyboard shortcut)           │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│      Panel List Displayed               │
│  • All panels grouped by category       │
│  • Search bar at top                    │
│  • Keyboard shortcuts shown             │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│      User searches or selects           │
│  • Type to filter                       │
│  • Click panel to open                 │
│  • Use arrow keys + Enter               │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│      Smart Panel Handling               │
│  • Check if panel already open          │
│  • If yes: focus existing panel         │
│  • If no: create new panel              │
│  • Replace selector with selection      │
└─────────────────────────────────────────┘
```

### Panel Registry

The panel selector maintains a registry of all available panels:

```typescript
{
  id: ComponentType.Code,
  label: 'Code Editor',
  description: 'Open code editor for writing and editing files',
  icon: <Code className="h-3 w-3" />,
  category: 'Development',
  shortcut: 'Ctrl+Shift+C'
}
```

### Smart Panel Logic

1. **Panel Request**
   - User selects panel from list
   - System retrieves panel metadata
   - Checks for existing instances

2. **Duplicate Check**
   - Queries dockview API for existing panel
   - Compares panel IDs
   - Determines if focus or create needed

3. **Panel Activation**
   - If exists: focus existing panel
   - If new: add panel to layout
   - Replace selector with selected panel
   - Update panel state

## Use Cases

### 1. Quick Feature Access
**Scenario**: Developer needs to open terminal

**Workflow**:
- Activate panel selector (Ctrl+Shift+P or click)
- Type "terminal" or press 'T' key
- Press Enter to open
- Panel selector closes, terminal appears

### 2. Feature Discovery
**Scenario**: New user exploring available tools

**Workflow**:
- Open panel selector
- Browse categories (Development, Tools, Management)
- Read panel descriptions
- Note keyboard shortcuts for frequent use
- Open panels to explore functionality

### 3. Context Switching
**Scenario**: Moving between code, chat, and debugging

**Workflow**:
- Use keyboard shortcuts for quick switching
- Or open panel selector to navigate
- Switch to Code Editor (Ctrl+Shift+C)
- Switch to Chat (Ctrl+Shift+A)
- Switch to Debug (F5)
- Maintain workflow rhythm

### 4. Panel Management
**Scenario**: Opening multiple instances of different panels

**Workflow**:
- Open panel selector
- Check which panels are already open (badges)
- Select closed panels to open
- Existing panels receive focus instead
- Maintain clean workspace

## Available Panels

### Development Panels
- **Code Editor**: File editing and navigation
- **Terminal**: Command line interface
- **Git**: Version control operations
- **Browser**: Built-in web browser
- **Preview**: Application preview

### Tool Panels
- **Chat**: AI assistant interface
- **Marketplace**: Agent marketplace
- **Settings**: Application configuration
- **MCP**: MCP server management

### Management Panels
- **Memory**: Task planning and todos
- **Tasks**: Task management
- **Kanban**: Visual task boards
- **Environment**: Environment configuration
- **Agent List**: Browse and install agents
- **Agent Hooks**: Agent integration hooks
- **Running Agents**: Monitor active agents
- **Inbox**: Agent escalation messages

### Debug Panels
- **Debug**: Application debugging
- **Agent Debug**: AI agent debugging
- **Console**: Application logs

## Integration Points

### With Dockview System
- Panel creation and management
- Layout preservation
- Tab handling
- Panel focus control

### With Keyboard Shortcuts
- Global shortcut registration
- Shortcut conflict resolution
- Context-aware shortcuts
- Custom shortcut configuration

### With Panel Components
- Panel initialization
- Parameter passing
- Lifecycle management
- State persistence

## Best Practices

### For Efficient Navigation
- **Learn Shortcuts**: Memorize frequently used panel shortcuts
- **Use Search**: Type rather than scroll for panel selection
- **Check Status**: Look for "Open" badges before selecting
- **Organize Layout**: Keep frequently used panels accessible

### For Feature Discovery
- **Browse Categories**: Explore all categories systematically
- **Read Descriptions**: Understand panel purposes
- **Experiment**: Open unfamiliar panels to learn
- **Customize**: Configure shortcuts for your workflow

### For Workspace Management
- **Avoid Duplicates**: Check for existing panels before opening
- **Close Unused**: Keep workspace clean
- **Save Layouts**: Preserve useful panel arrangements
- **Use Split Views**: Arrange panels for multitasking

## Advanced Features

### Custom Shortcuts
- **User-Defined**: Configure personal shortcuts
- **Conflict Resolution**: Handle shortcut conflicts
- **Context Awareness**: Different shortcuts per context
- **Import/Export**: Share shortcut configurations

### Panel Favorites
- **Frequently Used**: Pin favorite panels
- **Recent Panels**: Quick access to history
- **Smart Suggestions**: Recommend based on usage
- **Workflow Profiles**: Save panel arrangements

### Search Enhancements
- **Alias Support**: Custom panel nicknames
- **Fuzzy Search**: Typo-tolerant matching
- **Command Syntax**: Special search commands
- **Filter Presets**: Save common filters

## Related Concepts

- **[Code Editor](development-tools/code-editor.md)**: Primary development panel
- **[Tasks](task-management/tasks.md)**: Task management panel
- **[Roadmap](planning-roadmap/roadmap.md)**: Planning panel
- **[Debug](development-tools/debugger.md)**: Debugging panel

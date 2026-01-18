---
title: Swarm UI Customization
description: Panel layout persistence and customization for swarm detail views
category: Swarm Management
tags: [swarm, ui, customization, layout, panels]
lastUpdated: 2026-01-18
---

# Swarm UI Customization

## Executive Summary

Swarm UI Customization enables users to personalize their swarm detail view through a flexible panel system powered by Dockview. Users can show/hide panels, arrange layouts, and have their preferences automatically persisted and restored across sessions.

## What It Is

UI Customization is a user experience enhancement that:

- **Modular Panel System**: 10 different panels for different aspects of swarm management
- **Show/Hide Control**: Toggle individual panels on/off via pill bar
- **Flexible Layouts**: Arrange panels in different configurations using Dockview
- **State Persistence**: Save and restore panel layouts automatically
- **Per-Swarm Customization**: Different layouts for different swarms

This system enables users to focus on relevant information without being overwhelmed by all available data.

## Key Capabilities

### Panel System
The swarm detail view includes 10 customizable panels:

1. **Config Panel** (`swarm-config`): Swarm execution configuration
2. **Agents Panel** (`swarm-agents`): Agent list and management
3. **Teams Panel** (`swarm-teams`): Team organization
4. **Roles Panel** (`swarm-roles`): Role definitions
5. **Vacancies Panel** (`swarm-vacancies`): Open role vacancies
6. **Spawn Requests Panel** (`swarm-spawn-requests`): Pending spawn requests
7. **Spawn Registry Panel** (`swarm-spawn-registry`): Spawn history
8. **Termination Requests Panel** (`swarm-termination-requests`): Pending terminations
9. **Termination Registry Panel** (`swarm-termination-registry`): Termination history
10. **Activity Panel** (`swarm-activity`): Real-time event monitoring

### Panel Toggle Control
- **Pill Bar Interface**: Quick-access buttons for each panel type
- **Visual Indicators**: Badges show counts (e.g., agent count, request count)
- **Active State**: Highlighted pills show currently visible panels
- **One-Touch Toggle**: Single click to show or hide each panel

### Layout Persistence
- **Automatic Saving**: Layouts saved 500ms after changes (debounced)
- **Session Restoration**: Layouts restored when returning to swarm
- **Cross-Session Persistence**: Layouts survive application restarts
- **Per-Project Storage**: Layouts stored in project-specific location

### Dynamic Panel Management
- **Add Panel**: Open closed panel by clicking pill
- **Remove Panel**: Close panel using Dockview controls
- **Reorder Panels**: Drag panels to rearrange (via Dockview)
- **Resize Panels**: Adjust panel proportions (via Dockview)

## How It Works Conceptually

### Layout Lifecycle

```
1. INITIAL LOAD
   User opens swarm detail view
   → Load saved layout from backend
   → If no saved layout, use default panels
   → Render Dockview with loaded panels
   ↓
2. PANEL TOGGLE
   User clicks pill bar button
   → If panel visible: close panel
   → If panel hidden: add panel to layout
   → Update active panels state
   → Trigger layout save (debounced)
   ↓
3. LAYOUT SAVE
   Debounce timer expires (500ms after last change)
   → Serialize Dockview layout to JSON
   → Include active panel IDs
   → POST to /swarm/layout endpoint
   → Layout persisted to disk
   ↓
4. LAYOUT RESTORATION
   User returns to swarm detail view
   → Fetch saved layout from backend
   → Deserialize Dockview layout
   → Restore panel positions and sizes
   → Render panels with saved configuration
```

### Data Flow

```
SwarmDetailPanel
    ↓
loadSavedLayout()
    → GET /swarm/layout
    → Backend returns saved layout data
    → setActivePanels() with saved panel IDs
    ↓
onReady(DockviewReadyEvent)
    → Dockview API available
    → Add panels for each active panel ID
    → Position panels according to layout
    ↓
User toggles panel
    → handlePanelToggle(panelId)
    → Add or remove panel from Dockview
    → Update activePanels state
    ↓
Layout change detected
    → Debounced saveLayout()
    → POST /swarm/layout
    → Layout persisted for next session
```

### Storage Format

**Saved Layout Structure:**
```typescript
{
  activePanels: string[],        // Panel IDs to show
  dockviewLayout: {              // Dockview serialization
    panels: {...},
    grid: {...}
  },
  savedAt: string                // ISO timestamp
}
```

**Default Panels:**
```typescript
['swarm-agents', 'swarm-teams', 'swarm-roles']
```

**All Available Panels:**
```typescript
[
  'swarm-config',
  'swarm-agents',
  'swarm-teams',
  'swarm-roles',
  'swarm-vacancies',
  'swarm-spawn-requests',
  'swarm-spawn-registry',
  'swarm-termination-requests',
  'swarm-termination-registry',
  'swarm-activity'
]
```

## Use Cases

### Focused Workflows
- **Agent Management**: Show only Agents panel, hide others
- **Request Processing**: Show Spawn/Termination Requests panels
- **Monitoring**: Show Activity panel with real-time events
- **Configuration**: Show Config panel for setup, hide during execution

### Role-Based Views
- **Swarm Architects**: Focus on Config, Teams, Roles panels
- **Swarm Operators**: Focus on Agents, Activity panels
- **Request Approvers**: Focus on Spawn/Termination Requests panels
- **Auditors**: Focus on Registries and Activity panels

### Project-Specific Layouts
- **Development Swarms**: Emphasize Config and Agents panels
- **Production Swarms**: Emphasize Activity and Monitoring panels
- **Testing Swarms**: Emphasize Spawn/Termination panels
- **Archived Swarms**: Show only Registry panels

### Screen Size Optimization
- **Large Screens**: Use all panels with detailed views
- **Medium Screens**: Focus on essential panels only
- **Small Screens**: Toggle between panels as needed
- **Presentations**: Show only Activity panel for demo

## Related Concepts

- **[Swarm Management Overview](./swarm-management-overview.md)**: Complete swarm system
- **[Swarm Detail Panel](./swarm-detail-panel.md)**: Main swarm detail interface
- **[Swarm Activity Monitoring](./swarm-activity-monitoring.md)**: Activity panel contents
- **[Dockview Integration](./dockview-integration.md)**: Panel framework (if exists)

## Technical Notes

### Debouncing Strategy

Layout saves are debounced to avoid excessive writes:
- **Debounce Delay**: 500ms
- **Trigger**: Panel toggle, layout change
- **Reset**: Each change resets the timer
- **Execution**: Save occurs 500ms after last change
- **Benefit**: Prevents disk I/O during rapid panel toggling

### Layout Restoration Logic

```typescript
// Pseudocode
async function loadSavedLayout() {
  const response = await fetch('/swarm/layout');
  if (response.ok) {
    const result = await response.json();
    if (result.data?.activePanels) {
      setActivePanels(result.data.activePanels);
    }
  }
}

// In Dockview onReady
function onReady(event) {
  const api = event.api;
  activePanels.forEach((panelId, index) => {
    api.addPanel({
      id: panelId,
      component: panelId,
      title: panelDefs[panelId].title,
      position: calculatePosition(index)
    });
  });
}
```

### Error Handling

- **Missing Layout**: Falls back to default panels
- **Corrupt Layout**: Resets to default panels
- **Network Error**: Uses default panels, retries on next load
- **Invalid Panel IDs**: Filters out non-existent panels

### Panel Statistics

The pill bar displays real-time statistics:
- **Agents**: Total agent count
- **Teams**: Total team count
- **Roles**: Total role count
- **Vacancies**: Total vacancy count
- **Spawn Requests**: Pending request count
- **Spawn Registry**: Total spawned agents
- **Termination Requests**: Pending termination count
- **Termination Registry**: Total terminated agents

These counts update automatically as data changes.

### Performance Considerations

- **Panel Count**: More panels = more rendering overhead
- **Data Refresh**: Each panel can trigger data refresh
- **Layout Size**: Complex layouts serialize to larger JSON
- **Restoration Time**: Proportional to panel count and complexity
- **Recommendation**: Show only necessary panels for optimal performance

### Storage Location

Layouts stored at project level:
```
<project>/.codebolt/swarm-layouts.json
```

Future enhancements may support:
- Per-swarm layouts
- User-specific layouts
- Layout templates
- Layout import/export

### Accessibility

- **Keyboard Navigation**: Pills accessible via tab key
- **Screen Reader**: Panel names announced
- **High Contrast**: Respects theme settings
- **Touch Support**: Works on touch devices

### Future Enhancements

Potential improvements:
- **Layout Templates**: Predefined layouts for common workflows
- **Layout Sharing**: Export/import layouts between users
- **Layout History**: Revert to previous layouts
- **Responsive Layouts**: Automatic layout adjustment for screen size
- **Layout Locking**: Prevent accidental layout changes
- **Mini-Map**: Overview of entire panel layout

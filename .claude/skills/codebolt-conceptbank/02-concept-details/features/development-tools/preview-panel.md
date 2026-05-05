---
title: Live Preview Panel
category: Development Tools
related:
  - development-workflows
  - ai-shell
  - browser-panel
---

## Executive Summary

The Preview Panel provides instant visual feedback for web applications under development, automatically detecting when development servers start and displaying the running application. It eliminates the need to switch between CodeBolt and external browsers, streamlining the develop-preview-test cycle.

## What It Is

The Preview Panel is an Electron webview component that displays web applications running locally on development servers. Key features include:

- **Automatic port detection** - Discovers when dev servers start and opens preview
- **Manual port selection** - Choose specific port from detected servers
- **Custom port input** - Manually specify port for non-standard configurations
- **Live reload** - Refresh preview to see code changes immediately
- **Error handling** - Clear messaging when server isn't running
- **Theme integration** - Preview syncs with CodeBolt's theme preferences

## Why It Matters

Web development requires constant visual feedback during development. The Preview Panel matters because:

- **Rapid iteration** - See code changes instantly without context switching
- **Port automation** - No need to remember which port your server is running on
- **Multi-project support** - Switch between different projects on different ports
- **Error visibility** - Clear feedback when servers crash or fail to start
- **AI agent integration** - Agents can verify their code changes work visually

This reduces the friction between writing code and seeing the results, accelerating development velocity.

## Key Capabilities

### Port Detection

- **Automatic scanning** - Terminal service monitors for newly opened ports
- **Port registry** - Maintains set of active development server ports
- **Auto-selection** - Automatically shows most recently started server
- **Multi-server support** - Switch between multiple running servers
- **Port range limit** - Only detects ports ≤ 9999 to avoid system ports

### Display Controls

- **Refresh button** - Reload preview to see latest changes
- **Port selector** - Dropdown shows all detected ports
- **Custom port input** - Text field for manual port specification
- **URL display** - Shows full localhost URL being previewed
- **Clear actions** - Buttons to refresh or change ports

### Error Handling

- **Connection failure detection** - Catches when server isn't running
- **Clear error messages** - User-friendly explanation of what went wrong
- **Retry guidance** - Suggests checking if server is running
- **Non-disruptive** - Errors don't crash the preview panel

### Theme Integration

- **Theme detection** - Detects system dark/light mode preference
- **CSS variable injection** - Passes theme to previewed application
- **Class application** - Adds `dark` or `light` class to preview
- **Preference respect** - Honors user's theme choice for previewed apps

## How It Works Conceptually

### Port Detection Pipeline

The preview panel relies on the terminal service for port detection:

1. **Pre-scan snapshot** - Before terminal command executes, system scans active ports
2. **Command execution** - Terminal runs `npm run dev` or similar command
3. **Periodic scanning** - Every 2 seconds, system scans ports again
4. **Difference calculation** - New ports (≤ 9999) detected by comparing snapshots
5. **Port registration** - New port added to port registry in agent state
6. **Preview notification** - Preview panel receives port via WebSocket event
7. **Display activation** - Preview panel automatically shows that port

This happens automatically - users just run their dev server and preview appears.

### Port Registry Management

The port registry maintains active development servers:

1. **Port addition** - New ports added when detected by terminal service
2. **Port persistence** - Ports remain in registry even if preview closed
3. **Port deduplication** - Set data structure prevents duplicate ports
4. **Port clearing** - Ports removed when servers stop (detected by port scanning)
5. **Cross-component access** - Registry accessible via Zustand store

### Preview Rendering

The preview uses Electron's webview technology:

1. **URL construction** - `http://localhost:{selectedPort}` built from port state
2. **Webview creation** - `<webview>` element renders the URL
3. **Isolation** - Preview runs in separate process for security
4. **Context isolation** - No node integration, standard browser security
5. **Partition persistence** - Cookies and localStorage persist across sessions

### Manual Port Selection

Users can override automatic port detection:

1. **Port dropdown** - Shows all ports in port registry
2. **Custom selection** - User selects "Custom Port" from dropdown
3. **Input field** - Text input appears for manual port entry
4. **Validation** - Port number validated when user clicks "Go" or presses Enter
5. **Preview update** - Webview reloads with new port

### Theme Propagation

Previewed applications can inherit CodeBolt's theme:

1. **System detection** - `window.matchMedia()` detects system dark/light preference
2. **Webview listeners** - Listens for webview `dom-ready` event
3. **JavaScript injection** - Executes JavaScript in webview to set theme:
   ```javascript
   document.documentElement.setAttribute('data-theme', 'dark');
   document.documentElement.classList.add('dark');
   ```
4. **Reactive updates** - Theme changes propagate when system preference changes
5. **Application support** - Only works if previewed app respects theme attributes

## Use Cases

### Standard Web Development

1. **Start server** - Run `npm run dev` in AI Shell
2. **Automatic preview** - Preview panel opens showing app on port 3000
3. **Make changes** - Edit code in Monaco editor
4. **See results** - Click refresh in preview panel to see changes
5. **Debug** - Use browser DevTools in preview panel to inspect issues

### Multi-Project Development

1. **Project A on port 3000** - Frontend dev server running
2. **Project B on port 4000** - Backend API server running
3. **Switch previews** - Use port selector to switch between projects
4. **Simultaneous testing** - Test frontend and backend interactions
5. **Port management** - All active ports available in dropdown

### AI Agent Verification

1. **Agent generates code** - AI creates React component in Monaco editor
2. **Agent starts server** - Agent runs `npm run dev` in terminal
3. **Port detection** - Terminal detects server started on port 3000
4. **Automatic preview** - Preview panel opens showing component
5. **Agent verification** - Agent takes screenshot to verify rendering
6. **Iterative refinement** - Agent makes changes based on visual inspection

### Custom Server Configurations

1. **Non-standard port** - Server running on port 8080 instead of 3000
2. **Manual selection** - User selects "Custom Port" from dropdown
3. **Port input** - User types "8080" and clicks Go
4. **Preview loads** - Preview panel shows application on custom port
5. **Persistence** - Custom port remembered in port registry

## Related Concepts

- **[AI Shell](./ai-shell.md)** - Terminal commands trigger port detection for preview
- **[Browser Panel](./browser-panel.md)** - Alternative browser for external URLs and advanced debugging
- **[Monaco Editor](./monaco-editor.md)** - Code changes in editor reflected in preview after refresh
- **[Development Workflows](./development-workflows.md)** - Preview integrates with editor and terminal for complete development loop
- **[Agent Management](../agent-management/)** - AI agents can trigger preview verification as part of development tasks

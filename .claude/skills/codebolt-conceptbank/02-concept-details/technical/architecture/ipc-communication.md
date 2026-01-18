---
title: IPC Communication Architecture
category: Technical Architecture
tags: [ipc, electron, communication, messaging]
related: [electron-architecture, main-process, renderer-process, data-flow]
---

## Executive Summary
Inter-Process Communication (IPC) is the secure messaging layer that enables CodeBolt's main and renderer processes to communicate. Through Electron's IPC mechanisms, the frontend can request backend operations and receive updates, while maintaining security boundaries between the sandboxed renderer and privileged main process.

## What This Architecture Aspect Is and Why It Matters

IPC communication is critical because:
- **Security boundary** - Renderer processes are sandboxed and cannot directly access Node.js APIs
- **Cross-process coordination** - Main and renderer processes must collaborate for features
- **Type safety** - TypeScript definitions ensure message contracts
- **Performance** - Efficient message passing avoids expensive serialization

Without properly designed IPC, CodeBolt couldn't securely access files, integrate with the OS, or coordinate between its multiple processes.

## Key Concepts

### IPC Mechanisms
- **ipcMain/ipcRenderer** - Core Electron IPC APIs
- **contextBridge** - Securely expose APIs to renderer
- **Preload script** - Bridge between sandboxed renderer and main process
- **Message validation** - Type-safe message contracts

### Communication Patterns
- **One-way messages** - Renderer sends, main receives (fire-and-forget)
- **Request/response** - Renderer requests, main responds (async)
- **Events** - Main emits, renderer listens (push updates)
- **Synchronous** - Rare, used only for critical startup values

### Security Architecture
- **Sandbox enforcement** - Renderer cannot access Node.js directly
- **API allowlisting** - Only specific operations exposed via contextBridge
- **Message sanitization** - All IPC messages validated
- **Channel restrictions** - Named channels prevent message confusion

## How It Works

### Preload Script Bridge

#### API Exposure Pattern
```typescript
// In preload script
const exposedAPI = {
  // Safe operations exposed to renderer
  openFolderDialog: async () => ipcRenderer.invoke('open-folder-dialog'),
  getServerPort: async () => ipcRenderer.invoke('get-server-port'),
  onOpenFile: (callback) => ipcRenderer.on('open-file', callback),
}

// Expose to renderer via contextBridge
contextBridge.exposeInMainWorld('electron', exposedAPI);

// In renderer, access via window.electron
const folder = await window.electron.openFolderDialog();
```

#### Server Port Synchronization
```typescript
// Synchronous access for critical startup value
let serverPort = ipcRenderer.sendSync('get-server-port-sync');

// Expose via contextBridge for renderer
contextBridge.exposeInMainWorld('env', {
  backendUrl: `http://localhost:${serverPort}`,
  socketPort: serverPort,
});
```

### Main Process Handlers

#### Handler Registration
```typescript
// In main process ipc.ts
export function setupIpcHandlers() {
  // Async handler for complex operations
  ipcMain.handle('get-project-tree', async (event, projectPath) => {
    // Expensive operation with caching
    return await directoryTree(projectPath);
  });

  // Simple sync handler for fast operations
  ipcMain.on('is-mac', (event) => {
    event.returnValue = process.platform === 'darwin';
  });
}
```

#### Event Emission
```typescript
// Main process pushes updates to renderer
mainWindow.webContents.send('open-directory-as-project', directoryPath);
mainWindow.webContents.send('open-file-in-editor', filePath, language, content);
```

### Renderer Process Usage

#### Invoking Main Process
```typescript
// Request/response pattern
const projectTree = await window.electron.getProjectTree(projectPath);

// One-way message
window.electron.ipcRenderer.sendMessage('close-window');
```

#### Listening for Events
```typescript
// Register listener for main process events
window.electron.onOpenFile((filePath) => {
  console.log('File opened:', filePath);
  // Update state or trigger action
});

window.electron.onOpenDirectoryAsProject((directoryPath) => {
  // Handle directory opening
  navigateToProject(directoryPath);
});
```

### Communication Flow Patterns

#### File Opening Flow
```
OS Event → Main Process → IPC Event → Renderer Listener → State Update → UI Render
```

1. User double-clicks file in OS
2. Main process receives `open-file` event
3. Main process reads file and emits IPC event
4. Renderer listener receives event with file data
5. Renderer updates stores and navigates to editor
6. UI renders file content in Monaco editor

#### Project Tree Flow
```
User Action → Renderer Request → IPC Handler → Main Process → File System → IPC Response → Renderer Update
```

1. User selects folder in UI
2. Renderer invokes `getProjectTree(path)` via IPC
3. Main process handler scans directory
4. Main process returns tree structure via IPC response
4. Renderer receives tree and updates store
5. UI renders folder structure

### Specialized IPC Channels

#### Browser Automation
- **Screenshot capture** - `browser-take-screenshot` with webview interaction
- **Coordinate clicking** - `browser-click-coordinate` for automated testing
- **DOM manipulation** - Execute JavaScript in webview context

#### Window Management
- **DevTools integration** - `open-webview-devtools` for webview debugging
- **Window controls** - Minimize, maximize, close operations
- **Screenshot saving** - `save-webview-console-logs` for debugging

#### File Operations
- **Project tree** - Cached directory scanning with progress updates
- **Cache management** - Invalidate and clear project tree caches
- **File dialogs** - Native OS file/folder pickers

## Architectural Patterns

### Channel Naming
- **Descriptive names** - Clear purpose from channel name
- **Consistent conventions** - `browser-*`, `get-*`, `on-*` patterns
- **Type safety** - TypeScript unions for valid channels

### Error Handling
```typescript
// Renderer handles errors from IPC
try {
  const result = await window.electron.someOperation();
} catch (error) {
  // Display error to user
  showErrorToast(error.message);
}
```

### Message Validation
- **Type checking** - TypeScript ensures correct message types
- **Runtime validation** - Handlers validate input data
- **Error responses** - Meaningful errors on validation failure

### Performance Optimization
- **Caching** - Expensive operations cache results
- **Progress updates** - Long operations send progress events
- **Async operations** - Non-blocking handlers prevent UI freezes

## Related Concepts

- **[Electron Architecture](./electron-architecture.md)** - Process model
- **[Main Process](./main-process.md)** - IPC handlers
- **[Renderer Process](./renderer-process.md)** - IPC invocation
- **[Data Flow](./data-flow.md)** - End-to-end data movement

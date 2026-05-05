---
title: Data Flow Architecture
category: Technical Architecture
tags: [data-flow, communication, state-management, websockets]
related: [electron-architecture, main-process, renderer-process, ipc-communication]
---

## Executive Summary
Data flow in CodeBolt moves through multiple layers—renderer stores, WebSocket connections, backend services, and file system—coordinated by event-driven communication patterns. Understanding this flow is essential for debugging, adding features, and maintaining consistency across the application.

## What This Architecture Aspect Is and Why It Matters

Data flow architecture determines:
- **Feature behavior** - How user actions trigger system responses
- **State consistency** - Keeping UI in sync with backend and file system
- **Real-time updates** - AI responses, file changes, and collaborative features
- **Performance** - Efficient data movement prevents bottlenecks

Poorly designed data flow leads to bugs where UI shows stale data, actions don't complete, or features behave unpredictably.

## Key Concepts

### Data Flow Layers
- **UI Layer** - React components capture user actions
- **Store Layer** - Zustand stores manage application state
- **Communication Layer** - WebSocket and IPC move data between processes
- **Service Layer** - Backend services implement business logic
- **Data Layer** - File system, database, and external APIs

### Flow Patterns
- **Unidirectional** - Data flows in predictable directions
- **Event-driven** - Actions emit events that trigger updates
- **Reactive** - State changes automatically update UI
- **Bidirectional** - WebSocket enables real-time two-way communication

### State Synchronization
- **Single source of truth** - Each data piece has one authoritative source
- **Optimistic updates** - UI updates immediately, confirms later
- **Conflict resolution** - Handle concurrent modifications
- **Cache invalidation** - Stale data cleared when sources change

## How It Works

### User Action to UI Update Flow

```
User Input → Component Event → Store Action → WebSocket Message → Backend Service → Business Logic → Response → WebSocket Message → Store Update → Component Re-render → UI Update
```

#### Example: Opening a File in Editor
1. **User Action** - User clicks file in folder tree
2. **Component Event** - FolderStructureComponent emits onFileSelect
3. **Store Action** - EditorStore.openFile() updates active tabs
4. **WebSocket Message** - Send readFile request to backend
5. **Backend Service** - FileService reads file from disk
6. **Response** - WebSocket message with file content
7. **Store Update** - EditorStore updates file content state
8. **Component Re-render** - MonacoEditor displays new content
9. **UI Update** - User sees file content in editor

### AI Chat Flow

```
User Message → Chat Input → ChatStore Action → WebSocket Send → AI Service → LLM API → Streaming Response → WebSocket Messages → ChatStore Updates → UI Renders Stream → Complete
```

#### Detailed Steps
1. User types message and sends
2. ChatStore.addMessage() adds user message to state
3. WebSocket sends message to backend
4. AgentService routes to appropriate AI agent
5. LLM service calls language model API
6. Streaming response received
7. WebSocket sends chunks to frontend
8. ChatStore appends chunks to message
9. UI updates progressively as chunks arrive
10. Final message marked complete

### File System Watch Flow

```
External File Change → File Watcher → Backend Event → WebSocket Broadcast → Renderer Listeners → Store Updates → UI Refresh
```

#### Scenarios
- **External editor** - User modifies file in VS Code
- **Git operations** - Checkout changes files on disk
- **Build process** - Compiler generates new files
- **File deletion** - User deletes file in file manager

### Project Structure Update Flow

```
File Operation → Backend Service → File System Change → Cache Invalidation → WebSocket Event → Renderer Listeners → Store Updates → UI Refresh
```

#### Operations That Trigger Updates
- Create/delete file or folder
- Rename file or folder
- Move file to different location
- Git checkout or merge
- External file modification

### WebSocket Communication Patterns

#### Request/Response Pattern
```typescript
// Renderer sends request
socket.emit('readFile', { path: '/path/to/file.js' });

// Renderer listens for response
socket.on('fileContent', (content) => {
  updateEditor(content);
});
```

#### Event Broadcast Pattern
```typescript
// Backend broadcasts to all clients
io.emit('fileChanged', { path, content });

// All connected renderers receive
socket.on('fileChanged', ({ path, content }) => {
  updateFileInStore(path, content);
});
```

#### Room-Based Pattern
```typescript
// Join room for specific project
socket.emit('joinProject', projectId);

// Receive updates only for this project
socket.on('projectUpdate', (update) => {
  // Only updates for joined project
});
```

### IPC Data Flow

#### Renderer to Main (Request)
```typescript
// Renderer invokes main process
const folderPath = await window.electron.openFolderDialog();

// Main process handles and responds
ipcMain.handle('open-folder-dialog', async () => {
  const result = await dialog.showOpenDialog(...);
  return result.filePaths[0];
});
```

#### Main to Renderer (Push)
```typescript
// Main process emits event
mainWindow.webContents.send('open-file', filePath);

// Renderer listens for event
window.electron.onOpenFile((filePath) => {
  openFileInEditor(filePath);
});
```

### Store Communication Flow

#### Cross-Store Updates
```typescript
// ChatStore updates AgentStore when agent responds
const ChatStore = create((set, get) => ({
  addAgentResponse: (response) => {
    // Update chat messages
    set(state => ({
      messages: [...state.messages, response]
    }));

    // Trigger related store updates
    AgentStore.getState().updateAgentStatus(response.agentId, 'idle');
    TaskStore.getState().completeTask(response.taskId);
  }
}));
```

#### Derived State
```typescript
// Component computes state from multiple stores
const unreadCount = useChatStore(state =>
  state.messages.filter(m => !m.read).length
);

const activeAgent = useAgentStore(state =>
  state.agents.find(a => a.id === currentAgentId)
);
```

## Architectural Patterns

### Event-Driven Updates
- **Loose coupling** - Components react to state changes, not each other
- **Scalability** - Easy to add new listeners to existing events
- **Testability** - Can test state changes independently of UI

### Cache Management
- **TTL-based expiration** - Cached data expires after time limit
- **Invalidation events** - Specific actions clear relevant caches
- **Stale-while-revalidate** - Show stale data, refresh in background

### Error Handling in Data Flow
```typescript
try {
  // Attempt operation
  const result = await fetchData();
  updateStore(result);
} catch (error) {
  // Update store with error state
  setErrorState(error);
  // Show user notification
  showToast({ type: 'error', message: error.message });
}
```

### Performance Optimization
- **Debouncing** - Delay rapid-fire events (search input)
- **Throttling** - Limit frequency of updates (scroll events)
- **Batching** - Group multiple updates into single render
- **Lazy loading** - Load data on-demand vs. upfront

## Common Data Flow Scenarios

### Scenario 1: User Edits File
1. User types in Monaco editor
2. Editor component debounces input
3. Component sends update to store
4. Store schedules auto-save
5. WebSocket sends file write request
6. Backend writes to file system
7. Backend confirms write success
8. Store marks file as saved
9. UI shows "saved" indicator

### Scenario 2: AI Agent Completes Task
1. Agent finishes processing in background
2. Backend service emits completion event
3. WebSocket broadcasts to renderer
4. TaskStore receives and updates task status
5. ChatStore adds completion message
6. UI shows task complete notification
7. Related components re-render with new state

### Scenario 3: External File Change
1. File watcher detects external modification
2. Backend reads new file content
3. WebSocket sends file change event
4. EditorStore receives new content
5. UI prompts user to reload or shows diff
6. User choice triggers reload or keeps current version

## Related Concepts

- **[Electron Architecture](./electron-architecture.md)** - Process model
- **[Main Process](./main-process.md)** - Backend data handling
- **[Renderer Process](./renderer-process.md)** - Frontend state management
- **[IPC Communication](./ipc-communication.md)** - Cross-process messaging

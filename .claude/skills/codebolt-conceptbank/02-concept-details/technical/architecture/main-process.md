---
title: Main Process Architecture
category: Technical Architecture
tags: [electron, node-js, backend, server]
related: [electron-architecture, renderer-process, ipc-communication, data-flow]
---

## Executive Summary
The main process is CodeBolt's Node.js backend that runs outside the browser sandbox. It manages application lifecycle, coordinates backend services, handles native OS integration, and serves as the central hub for IPC communication between renderer processes and system resources.

## What This Architecture Aspect Is and Why It Matters

The main process provides CodeBolt with:
- **System access** - File system, OS dialogs, native menus
- **Server management** - Backend Express server with WebSocket support
- **Process coordination** - Spawning and managing worker processes
- **Security boundary** - Sandboxing renderer processes while providing controlled access

Without the main process, CodeBolt couldn't access files, integrate with the OS, or maintain server connections required for AI features and development tools.

## Key Concepts

### Process Lifecycle Management
- **Single instance** - Only one main process runs per application instance
- **App initialization** - Sets up servers, databases, and IPC handlers
- **Window creation** - Creates and manages browser windows
- **Graceful shutdown** - Closes connections and releases resources

### Backend Server
- **Express server** - REST API for renderer communication
- **WebSocket server** - Real-time bidirectional messaging
- **Port management** - Dynamic port allocation and detection
- **Service registry** - Centralized business logic services

### IPC Coordination
- **IPC handlers** - Respond to renderer requests
- **Event emission** - Push updates to renderer processes
- **Message validation** - Secure communication channels
- **Async operations** - Non-blocking file I/O and API calls

### System Integration
- **File dialogs** - Native OS file/folder pickers
- **Window management** - Creating, positioning, and controlling windows
- **Protocol handlers** - Custom URL schemes (codebolt://)
- **File associations** - Opening files with CodeBolt from OS

## How It Works

### Startup Sequence
1. Electron launches main process with `main.ts` entry point
2. Configure app-level settings (GPU acceleration, extensions)
3. Setup IPC handlers for renderer communication
4. Initialize and start backend Express server
5. Register custom protocol handlers (extension-file://)
6. Create main browser window with preload script
7. Handle startup arguments (files/folders to open)
8. Setup event listeners for app lifecycle

### Server Architecture

#### Express Server Setup
```typescript
// Server initialization flow
1. Find available port (portscanner)
2. Initialize Express app with CORS
3. Register REST API routes
4. Create HTTP server
5. Attach WebSocket server
6. Store server instance globally for IPC access
```

#### Route Organization
- **Project routes** - File operations, project structure
- **Agent routes** - Agent management, execution
- **Editor routes** - File reading/writing, language services
- **System routes** - Settings, authentication, updates

#### WebSocket Channels
- **AI Terminal** - Live command output
- **Code execution** - Running code and results
- **File watching** - Real-time file changes
- **Agent communication** - Multi-agent orchestration

### IPC Handler Patterns

#### Synchronous Handlers
```typescript
// For simple, fast operations
ipcMain.on('get-server-port-sync', (event) => {
  event.returnValue = global.serverPort || null;
});
```

#### Asynchronous Handlers
```typescript
// For I/O operations or complex processing
ipcMain.handle('get-project-tree', async (event, projectPath) => {
  // Check cache
  // Generate tree
  // Return result
});
```

#### Event Emitters
```typescript
// Push updates to renderer
mainWindow.webContents.send('open-directory-as-project', directoryPath);
```

### File System Operations

#### Project Tree Generation
- **Directory scanning** - Recursive file system traversal
- **Caching** - TTL-based cache for repeated requests
- **Progress updates** - Send progress during long operations
- **Invalidation** - Clear cache on file changes

#### File Operations
- **Read files** - Load file content for editing
- **Write files** - Save editor content to disk
- **Watch files** - Detect external changes
- **File dialogs** - Native OS file pickers

### Window Management

#### Main Window
- **Creation** - Initialize with configuration
- **Loading** - Show splash screen during load
- **DevTools** - Debugging in development
- **Positioning** - Restore previous size/location

#### Worker Windows
- **Background tasks** - Run without blocking UI
- **Isolation** - Separate process for stability
- **Communication** - IPC coordination with main

### System Integration

#### Protocol Handling
- **codebolt://** - Custom URL scheme for deep linking
- **File associations** - Open files in CodeBolt from OS
- **Command line args** - Handle launch arguments

#### Native Dialogs
- **Folder picker** - Select project directories
- **File picker** - Select individual files
- **Save dialogs** - Choose export locations

## Architectural Patterns

### Service Layer
- **Separation of concerns** - Business logic in services, IPC in handlers
- **Dependency injection** - Services access shared resources
- **Singleton services** - Single instance per service type

### Event-Driven Updates
- **Communication wrapper** - Centralized event bus
- **Event propagation** - Socket → Service → IPC → Renderer
- **Cache invalidation** - Events trigger cache clearing

### Error Handling
- **Try-catch wrappers** - Prevent crashes from IPC handlers
- **Error forwarding** - Send errors to renderer for display
- **Logging** - Comprehensive error logging
- **Graceful degradation** - Fallbacks for failed operations

## Related Concepts

- **[Electron Architecture](./electron-architecture.md)** - Overall Electron setup
- **[Renderer Process](./renderer-process.md)** - Frontend counterpart
- **[IPC Communication](./ipc-communication.md)** - Communication patterns
- **[Data Flow](./data-flow.md)** - System-wide data movement

---
title: Electron Architecture
category: Technical Architecture
tags: [electron, architecture, desktop-app]
related: [renderer-process, main-process, ipc-communication, data-flow]
---

## Executive Summary
CodeBolt is built on Electron, a framework that enables cross-platform desktop applications using web technologies. The architecture separates the application into a main process (Node.js backend) and renderer processes (React frontends), communicating through secure Inter-Process Communication (IPC).

## What This Architecture Aspect Is and Why It Matters

Electron architecture provides CodeBolt with:
- **Cross-platform compatibility** - Single codebase runs on Windows, macOS, and Linux
- **Native capabilities** - Access to file system, OS integration, and system-level features
- **Web technologies** - Modern React-based UI with familiar development patterns
- **Security boundaries** - Sandboxed renderer processes protect user data

The multi-process architecture is fundamental to CodeBolt's ability to function as both a code editor and an AI-powered development environment.

## Key Concepts

### Multi-Process Model
- **Main Process** - Single Node.js process that manages application lifecycle and system resources
- **Renderer Process** - One or more sandboxed processes running the React UI
- **Preload Scripts** - Secure bridges that expose safe APIs to renderer processes

### Process Responsibilities
- Main process handles: Window management, native dialogs, file system access, server startup
- Renderer processes handle: UI rendering, user interactions, state management, displaying content
- Preload scripts enable: Controlled access to main process features via contextBridge

### Security Architecture
- Renderer processes run in sandboxed environments with restricted Node.js access
- Context bridge exposes only specific, safe APIs to the renderer
- IPC communication validates and sanitizes all messages between processes

## How It Works

### Application Startup
1. Electron launches the main process (`main.ts`)
2. Main process initializes the backend server on an available port
3. Main process creates the main browser window
4. Preload script is injected into the renderer
5. React application loads and establishes communication

### Window Management
- Main process creates and manages all windows using BrowserWindow API
- Each window runs in its own renderer process
- Windows can communicate with main process but not directly with each other
- Worker windows can be spawned for background tasks

### File Association & Protocol Handling
- CodeBolt registers as handler for numerous file types (.js, .ts, .py, .java, etc.)
- Custom `codebolt://` protocol enables deep linking
- OS-level file opening events trigger app to open files or directories as projects

### Process Communication Flow
```
User Action → Renderer Process → IPC Message → Main Process → Node.js API → Result → IPC Response → Renderer Update
```

### Single Instance Lock
- Production builds enforce single instance to prevent conflicts
- Command line flags allow multiple instances in development
- Second instances trigger first instance to focus and open requested files

## Architectural Patterns

### Separation of Concerns
- Main process focuses on system integration and backend coordination
- Renderer processes focus on UI and user experience
- Clear boundaries enforced by Electron's security model

### Event-Driven Architecture
- IPC handlers respond to renderer requests
- Main process emits events for renderer to consume
- WebSocket enables real-time bidirectional communication

### Resource Management
- Main process manages lifecycle of child processes and workers
- Graceful shutdown ensures servers close and resources release
- Memory and process monitoring prevents resource leaks

## Related Concepts

- **[Renderer Process](./renderer-process.md)** - React frontend architecture
- **[Main Process](./main-process.md)** - Node.js backend architecture
- **[IPC Communication](./ipc-communication.md)** - How processes communicate
- **[Data Flow](./data-flow.md)** - How data moves through the system

---
title: Renderer Process Architecture
category: Technical Architecture
tags: [react, frontend, state-management, zustand]
related: [electron-architecture, main-process, ipc-communication, data-flow]
---

## Executive Summary
The renderer process is CodeBolt's React-based frontend, featuring 70+ Zustand stores for state management, a component-based architecture, and real-time communication with the backend through WebSocket connections. It provides the user interface for all editor features, AI interactions, and development tools.

## What This Architecture Aspect Is and Why It Matters

The renderer process is where users interact with CodeBolt. Its architecture determines:
- **User experience** - Responsive UI with instant feedback
- **State consistency** - Coordinated state across complex features
- **Real-time updates** - Live AI responses, file changes, and collaboration
- **Modularity** - Maintainable and extensible feature development

The frontend must handle complex state management for AI agents, code editing, project navigation, and numerous auxiliary features while maintaining performance.

## Key Concepts

### React Application Structure
- **Root component** (`App.tsx`) - Manages routing, providers, and global initialization
- **Page components** - Top-level views for different application modes
- **Feature components** - Reusable UI components organized by feature
- **UI components** - Generic design system components (buttons, dialogs, etc.)

### State Management with Zustand
- **70+ specialized stores** - Each feature domain has its own store
- **Store composition** - Stores can subscribe to and update other stores
- **Selective subscriptions** - Components subscribe only to needed state slices
- **DevTools integration** - Time-travel debugging and state inspection

### Real-Time Communication
- **WebSocket provider** - Global context for socket connections
- **Socket stores** - Specialized stores for different socket channels
- **Event-driven updates** - Socket messages trigger store updates
- **Reconnection handling** - Automatic reconnection with state restoration

### Component Organization
```
/src/renderer/
├── Pages/           # Top-level route components
├── Components/      # Feature-specific UI components
├── ui-components/   # Reusable design system
├── Store/           # Zustand state stores
├── Services/        # API and business logic
├── hooks/           # Custom React hooks
├── Providers/       # React context providers
├── utils/           # Helper functions
└── Types/           # TypeScript type definitions
```

## How It Works

### Application Initialization
1. React app mounts with routing and providers
2. WebSocket connections established to backend server
3. Initial state loaded from localStorage and backend
4. IPC channels registered for main process communication
5. Subscriptions created for real-time updates

### State Management Patterns

#### Store Structure
```typescript
// Typical store pattern
type FeatureStore = {
  // State
  items: Item[],
  selectedId: string | null,
  isLoading: boolean,

  // Actions
  setItems: (items: Item[]) => void,
  selectItem: (id: string) => void,
  addItem: (item: Item) => void,
  updateItem: (id: string, updates: Partial<Item>) => void,
  deleteItem: (id: string) => void,

  // Async Actions
  fetchItems: () => Promise<void>,
  saveItem: (item: Item) => Promise<void>,
}
```

#### Cross-Store Communication
- Stores can import and call actions from other stores
- Common patterns: Chat stores update agent stores, editor stores update project stores
- Event bus pattern for loose coupling between unrelated features

#### Persistence Strategy
- Critical state persisted to localStorage (user preferences, auth tokens)
- Temporary state kept in memory (editor tabs, UI state)
- Backend provides authoritative data source for sync

### Real-Time Data Flow
```
Backend Event → WebSocket Message → Socket Store Update → Component Re-render → UI Update
```

#### Socket Integration
```typescript
// Component subscribes to socket store
const messages = useChatStore(state => state.messages)
const sendMessage = useChatStore(state => state.sendMessage)

// Socket store handles WebSocket communication
socket.on('message', (data) => {
  useChatStore.getState().addMessage(data)
})
```

### Component Communication Patterns

#### Props vs Stores
- **Props** - For component configuration and callbacks
- **Stores** - For shared application state and business logic
- **Context** - For feature-scoped state (editors, panels)

#### Component Composition
```
Page
├── FeatureContainer (connects to stores)
│   ├── UIComponent (presentation only)
│   └── AnotherUIComponent
└── AnotherFeatureContainer
```

### Feature Domains

#### Core Editor Features
- **EditorStore** - Open files, active tabs, editor state
- **ProjectStore** - Current project, workspace settings
- **FolderStructureStore** - File tree, navigation

#### AI & Agent Features
- **ChatStore** - Message history, streaming responses
- **AgentStore** - Agent instances, capabilities, status
- **TaskStore** - Running tasks, background operations

#### Auxiliary Features
- **SettingsStore** - User preferences, LLM providers
- **EnvironmentStore** - Dev environments, configurations
- **MarketPlaceStore** - Agents, tools, extensions

## Architectural Patterns

### Store Organization
- **Co-location** - Stores near components that use them
- **Feature boundaries** - Clear separation between feature domains
- **Shared utilities** - Common store patterns in base store utilities

### Performance Optimization
- **Selective subscriptions** - Components only re-render when their state changes
- **Memoization** - Expensive computations cached with useMemo
- **Virtualization** - Large lists use react-window or similar
- **Code splitting** - Features loaded on-demand

### Error Handling
- **Error boundaries** - Catch and handle component errors
- **Store error state** - Track and display operation failures
- **Toast notifications** - User feedback for errors and successes
- **Retry logic** - Automatic retry for failed operations

## Related Concepts

- **[Electron Architecture](./electron-architecture.md)** - Overall Electron setup
- **[Main Process](./main-process.md)** - Backend counterpart
- **[IPC Communication](./ipc-communication.md)** - Communication with main process
- **[Data Flow](./data-flow.md)** - System-wide data movement

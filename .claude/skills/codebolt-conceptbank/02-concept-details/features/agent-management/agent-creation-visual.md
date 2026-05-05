---
id: "agent-creation-visual"
title: "Agent Creation via Visual Flow Creator"
category: "features"
subcategory: "agent-management"
tags: ["agents", "visual", "drag-drop", "flow-creator", "litegraph"]
audience: ["technical", "business"]
difficulty: "beginner"
last_updated: "2026-01-18"
version: "1.0.0"
related_concepts: ["agent-types", "agent-creation-code", "agent-configuration", "agent-sdk"]
content_type: "concept"
status: "published"
phase: 1
---

# Agent Creation via Visual Flow Creator

## Executive Summary

The Agent Flow Creator provides an intuitive drag-and-drop interface for building agent workflows visually, enabling users to create complex agent behaviors without writing code. Built on LiteGraph, this visual editor lowers the barrier to entry for agent creation while maintaining the power and flexibility of code-based workflows.

## Overview

While code-based agent creation offers precision and version control, the visual Flow Creator makes agent development accessible to:

- **Non-technical Users**: Product managers, designers, and domain experts
- **Rapid Prototyping**: Quick experimentation with workflow ideas
- **Visual Thinkers**: Those who prefer diagrammatic representations
- **Learning**: Understanding agent flow logic through visualization

The Flow Creator is not a simplified alternative—it's a full-featured editor that generates the same `.agentflow` JSON files used by code-based workflows, ensuring seamless interchangeability between visual and code approaches.

## The Visual Interface

### Main Components

#### 1. Canvas Area

**Purpose**: Central workspace where nodes are placed and connected

**Features**:
- Infinite pan and zoom canvas
- Grid-based alignment assistance
- Drag-to-select multiple nodes
- Keyboard shortcuts for common operations
- Visual feedback for valid connections

**Interaction**:
- **Pan**: Click and drag on empty space
- **Zoom**: Mouse wheel or pinch gesture
- **Select Nodes**: Click to select, drag to move
- **Connect Nodes**: Drag from output port to input port
- **Delete**: Select nodes/links and press Delete key

#### 2. Node Palette

**Purpose**: Library of available nodes organized by category

**Categories**:
- **Agent**: Agent execution and control nodes
- **FS** (File System): File and directory operations
- **Git**: Version control operations
- **LLM**: Language model interactions
- **Chat**: User communication
- **Memory**: Persistent storage
- **Debug**: Development tools
- **Events**: Triggers and handlers
- **Crawler**: Web automation
- **MCP**: Model Context Protocol tools

**Features**:
- Searchable node list
- Category-based organization
- Node descriptions and tooltips
- Drag-and-drop node placement
- Favorite nodes marking

#### 3. Properties Panel

**Purpose**: Configure selected node's parameters

**Features**:
- Dynamic form based on node type
- Input validation
- Help text for each property
- Default value indicators
- Reset to defaults option

**Common Properties**:
- **Name**: Node identifier
- **Description**: What this node does
- **Configuration**: Type-specific settings
- **Logging**: Enable debug output

#### 4. Toolbar

**Purpose**: Quick access to common operations

**Actions**:
- **Save**: Persist current workflow
- **Load**: Open existing workflow
- **Undo/Redo**: Navigate edit history
- **Zoom In/Out**: Adjust canvas view
- **Fit to Screen**: Center and scale workflow
- **Clear**: Remove all nodes
- **Export**: Download workflow as JSON
- **Import**: Load workflow from JSON

#### 5. Status Bar

**Purpose**: Display workflow state and information

**Information**:
- **File Name**: Current workflow filename
- **Last Saved**: Timestamp of last save
- **Node Count**: Number of nodes in workflow
- **Link Count**: Number of connections
- **Validation Status**: Workflow health check
- **Unsaved Changes**: Indicator for pending saves

## Node-Based Workflow Building

### Understanding Nodes

**Node Anatomy**:

```
┌─────────────────────────┐
│     Node Title          │  ← Header (drag to move)
├─────────────────────────┤
│ [Inputs]  │  [Outputs]  │  ← Ports (connectors)
│           │             │
│  ● Input1 │ ● Output1   │  ● = Connection point
│  ● Input2 │ ● Output2   │
│           │             │
├─────────────────────────┤
│ Properties:             │
│ □ Property 1            │  ← Configuration widgets
│ □ Property 2            │
└─────────────────────────┘
```

**Port Types**:
- **Inputs** (left side): Data received by node
- **Outputs** (right side): Data produced by node
- **Execution Ports**: Triangle icons for control flow
- **Data Ports**: Circle icons for data flow

**Port Colors** (type indication):
- **Blue**: String/text data
- **Green**: Numeric data
- **Orange**: Boolean data
- **Purple**: Object/complex data
- **Gray**: Execution flow

### Connecting Nodes

**Creating Connections**:

1. **Drag from Output**: Click and hold on output port
2. **Drag to Input**: Move to target input port
3. **Release**: Drop on valid input to connect

**Visual Feedback**:
- **Valid Connection**: Line appears, port highlights
- **Invalid Connection**: X icon, no line created
- **Active Connection**: Solid line
- **Optional Connection**: Dashed line

**Connection Rules**:
- Output ports can connect to multiple inputs
- Input ports accept only one connection
- Type compatibility is enforced
- Execution flow must form valid paths

**Managing Connections**:
- **Disconnect**: Right-click connection → Remove
- **Reconnect**: Drag from existing connection to new port
- **Reroute**: Drag midpoint of connection line

### Common Node Patterns

#### Pattern 1: Linear Chain

Simple sequence of operations:

```
[Read File] → [Process] → [Write File]
```

**Use Case**: Data transformation pipeline

#### Pattern 2: Split and Merge

Parallel processing with aggregation:

```
         → [Process A] ─┐
[Input]                  ├→ [Merge]
         → [Process B] ─┘
```

**Use Case**: Multiple analyses of same data

#### Pattern 3: Branching

Conditional execution:

```
              ┌→ [Path A]
[Decision] ──┤
              └→ [Path B]
```

**Use Case**: Different workflows based on condition

#### Pattern 4: Loop

Iterative processing:

```
    ┌──────────────────┐
    │                  │
    ↓                  │
[Process] ← [Check Loop]
    │
    └→ [Next Step]
```

**Use Case**: Processing list of items

## Building an Agent Workflow

### Step-by-Step Example

Let's build a "Code Review Agent" workflow:

#### Step 1: Start with Trigger

1. **Open**: Agent Flow Creator panel
2. **Add Node**: Drag "Events/OnMessage" node to canvas
3. **Configure**: Set node name to "Receive Code"

```
┌─────────────────────────┐
│   Receive Code          │
│  (OnMessage)            │
├─────────────────────────┤
│ trigger ●              │
└─────────────────────────┘
```

#### Step 2: Add Processing Node

1. **Add Node**: Drag "Agent/AgentStep" node
2. **Position**: Below trigger node
3. **Configure**:
   - Name: "Analyze Code"
   - Instruction: "Review code for bugs and style issues"
   - LLM Role: "assistant"
   - Enable Logging: true

```
┌─────────────────────────┐
│   Analyze Code          │
│  (AgentStep)            │
├─────────────────────────┤
│ input ●          │
├─────────────────────────┤
│ Instruction: "Review    │
│ code for bugs..."       │
│ LLM Role: assistant     │
│ ☐ Enable Logging       │
└─────────────────────────┘
```

#### Step 3: Connect Nodes

1. **Drag**: From "Receive Code" output
2. **Drop**: On "Analyze Code" input
3. **Verify**: Connection line appears

```
┌─────────────────────────┐
│   Receive Code          │
│  (OnMessage)            │
├─────────────────────────┤
│ trigger ●              │
└─────────────────────────┘
         │
         │
         ↓
┌─────────────────────────┐
│   Analyze Code          │
│  (AgentStep)            │
├─────────────────────────┤
│ input ●          │
└─────────────────────────┘
```

#### Step 4: Add Response Node

1. **Add Node**: Drag "Chat/SendMessage" node
2. **Position**: Below processing node
3. **Configure**:
   - Name: "Send Review"
   - Message Template: "{{analysis}}"

```
┌─────────────────────────┐
│   Send Review           │
│  (SendMessage)          │
├─────────────────────────┤
│ message ●         │
├─────────────────────────┤
│ Template: {{analysis}}  │
└─────────────────────────┘
```

#### Step 5: Complete Workflow

1. **Connect**: "Analyze Code" output to "Send Review" input
2. **Save**: Click "Save" button
3. **Test**: Click "Test Workflow" button

```
┌─────────────────────────┐
│   Receive Code          │
├─────────────────────────┤
│ trigger ●              │
└─────────────────────────┘
         │
         ↓
┌─────────────────────────┐
│   Analyze Code          │
├─────────────────────────┤
│ input ●          │
└─────────────────────────┘
         │
         ↓
┌─────────────────────────┐
│   Send Review           │
├─────────────────────────┤
│ message ●         │
└─────────────────────────┘
```

## Advanced Features

### Node Grouping

**Purpose**: Organize related nodes visually

**How to Use**:
1. **Select**: Multiple nodes (drag to select)
2. **Right-Click**: Open context menu
3. **Create Group**: Select "Create Group"
4. **Name Group**: Enter group title
5. **Color**: Optionally set group color

**Benefits**:
- Visual organization
- Collapse/expand sections
- Move groups together
- Logical workflow sections

### Node Templates

**Purpose**: Save and reuse node configurations

**Creating Templates**:
1. **Configure**: Set up node with desired properties
2. **Right-Click**: Select "Save as Template"
3. **Name**: Enter template name
4. **Category**: Choose template category

**Using Templates**:
1. **Open**: Node palette
2. **Navigate**: To "Templates" category
3. **Drag**: Template to canvas

### Workflow Snippets

**Purpose**: Reusable workflow patterns

**Common Snippets**:

**File Processing**:
```
[Read File] → [Process] → [Write File]
```

**User Query**:
```
[On Message] → [Agent Step] → [Send Response]
```

**Git Operations**:
```
[Git Status] → [Git Add] → [Git Commit] → [Git Push]
```

**Loop Pattern**:
```
[List Files] → [For Each] → [Process] → [Aggregate]
```

### Visual Debugging

**Real-time Monitoring**:
- **Node Execution**: Highlighting active nodes
- **Data Flow**: Animated data flow visualization
- **Output Preview**: Hover to see node output
- **Error Indicators**: Visual error markers

**Debug Mode**:
1. **Enable**: Click "Debug Mode" toggle
2. **Execute**: Run workflow with debug
3. **Observe**: Watch node execution order
4. **Inspect**: Check data at each step

### Validation and Error Checking

**Automatic Validation**:
- **Type Checking**: Port type compatibility
- **Connection Validation**: Valid flow paths
- **Required Properties**: Missing configuration detection
- **Circular Dependencies**: Infinite loop detection

**Visual Indicators**:
- **Green Checkmark**: Valid workflow
- **Yellow Warning**: Non-critical issues
- **Red Error**: Critical problems
- **Info Icon**: Suggestions and tips

**Error Messages**:
- Clear, actionable error descriptions
- Click to highlight problematic nodes
- Suggested fixes displayed
- Link to documentation

## Workflow Templates

### Starter Templates

CodeBolt provides pre-built templates for common agent types:

#### 1. Code Assistant Template

**Purpose**: General-purpose coding assistant

**Nodes**:
- On Message
- Agent Step (instruction: "Help with coding task")
- Send Message

**Use Case**: Answering coding questions, generating code

#### 2. File Processor Template

**Purpose**: Batch file operations

**Nodes**:
- Search Files
- For Each (loop)
- Read File
- Process (Agent Step)
- Write File

**Use Case**: Code refactoring, documentation generation

#### 3. Git Automation Template

**Purpose**: Automated Git workflows

**Nodes**:
- Git Pull
- Run Tests
- Git Commit
- Git Push

**Use Case**: CI/CD automation, release workflows

#### 4. Data Pipeline Template

**Purpose**: Data transformation workflows

**Nodes**:
- Read Data
- Transform (Agent Step)
- Validate
- Write Data

**Use Case**: ETL workflows, data migration

#### 5. Testing Agent Template

**Purpose**: Automated test generation

**Nodes**:
- Read Source File
- Generate Tests (Agent Step)
- Write Test File
- Run Tests

**Use Case**: Test suite creation, TDD automation

### Using Templates

1. **Access**: File → New from Template
2. **Select**: Choose appropriate template
3. **Customize**: Modify for your needs
4. **Save**: As new workflow

## Best Practices

### Visual Design

1. **Left-to-Right Flow**: Arrange nodes in execution order
2. **Consistent Spacing**: Even spacing between nodes
3. **Logical Grouping**: Group related operations
4. **Color Coding**: Use node groups for organization
5. **Clear Labels**: Use descriptive node names

### Workflow Organization

1. **Start Simple**: Begin with basic flow, add complexity
2. **Modularize**: Create reusable sub-workflows
3. **Document**: Use node notes and descriptions
4. **Version Control**: Save workflow versions
5. **Test Incrementally**: Test each section before connecting

### Connection Management

1. **Avoid Crossings**: Minimize connection line crossings
2. **Use Groups**: Contain related connections
3. **Clean Up**: Remove unused connections
4. **Label Links**: Add connection descriptions
5. **Consistent Patterns**: Use standard flow patterns

### Performance

1. **Parallelize**: Use parallel flows where possible
2. **Minimize Nodes**: Fewer nodes = faster execution
3. **Cache Results**: Use memory nodes for caching
4. **Batch Operations**: Process multiple items together
5. **Async Operations**: Use non-blocking nodes

## Use Cases

### 1. Product Manager Creating Requirements Agent

**Need**: Agent that converts user stories to technical specs

**Solution**: Build visual workflow:
- On Message (receive story)
- Agent Step (analyze requirements)
- Write File (generate spec.md)

**Benefit**: No coding required, quick iteration on workflow

### 2. QA Engineer Creating Test Generator

**Need**: Agent that generates tests from user stories

**Solution**: Build visual workflow:
- Search Files (find stories)
- For Each (iterate stories)
- Agent Step (generate tests)
- Write File (save test files)

**Benefit**: Visual understanding of test generation pipeline

### 3. DevOps Engineer Creating Deployment Agent

**Need**: Agent that automates deployment workflow

**Solution**: Build visual workflow:
- Git Pull (update code)
- Run Tests (verify)
- Build Project (compile)
- Deploy (push to production)
- Notify (send status)

**Benefit**: Clear visualization of deployment pipeline

### 4. Designer Creating Asset Optimizer

**Need**: Agent that optimizes images and assets

**Solution**: Build visual workflow:
- Search Files (find images)
- For Each (process each)
- Optimize Image (compress)
- Write File (save optimized)

**Benefit**: Visual workflow design without technical knowledge

## Comparison: Visual vs Code

| Aspect | Visual Creator | Code-Based |
|--------|----------------|------------|
| **Learning Curve** | Lower | Higher |
| **Speed (Simple)** | Faster | Slower |
| **Speed (Complex)** | Slower | Faster |
| **Precision** | Good | Excellent |
| **Version Control** | Manual (JSON) | Native (Git) |
| **Collaboration** | Visual review | Code review |
| **Automation** | Limited | Full programmatic |
| **Debugging** | Visual highlighting | Code debugging |
| **Reusability** | Templates/Snippets | Functions/Modules |
| **Best For** | Prototyping, learning | Production, automation |

**Choosing the Right Approach**:

- **Use Visual** when: Learning, prototyping, simple workflows, visual thinking
- **Use Code** when: Complex logic, automation, version control, programmatic generation
- **Use Both**: Start visual, switch to code when complexity increases

## Related Concepts

- **[Agent Types](/conceptbank/features/agent-management/agent-types.md)**: Understanding agent sources and scopes
- **[Agent Creation (Code)](/conceptbank/features/agent-management/agent-creation-code.md)**: JSON-based workflow definition
- **[Agent Configuration](/conceptbank/features/agent-management/agent-configuration.md)**: YAML-based agent settings
- **[Agent SDK](/conceptbank/features/agent-management/agent-sdk.md)**: Available nodes and tools
- **[Agent Debugging](/conceptbank/features/agent-management/agent-debugging.md)**: Monitoring and troubleshooting

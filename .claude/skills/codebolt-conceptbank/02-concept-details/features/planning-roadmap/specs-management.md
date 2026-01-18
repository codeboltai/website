---
title: "Technical Specifications Management"
description: "MDX-based technical documentation with live previews and collaborative commenting"
tags: ["specs", "documentation", "mdx", "collaboration", "technical-writing"]
---

# Technical Specifications Management

## Executive Summary

CodeBolt's specs management system provides a powerful, interactive environment for creating and maintaining technical specifications. Using MDX (Markdown + JSX), it combines the simplicity of Markdown with the expressiveness of interactive components, supporting live code previews, collaborative commenting, and seamless integration with requirement plans and action plans.

## What is Specs Management?

Technical specifications in CodeBolt are `.specs` files stored in the project's `specs/` directory. Unlike traditional documentation tools, CodeBolt's spec system is designed for interactive, collaborative technical writing with built-in support for code examples, diagrams, and team discussions.

### MDX Power

MDX extends Markdown with the ability to use JSX components, enabling:

- **Interactive Code Blocks**: Live Sandpack code execution
- **Rich Media**: Embedded images, videos, and diagrams
- **Custom Components**: Admonitions, callouts, and special blocks
- **Mathematical Notation**: LaTeX-style math expressions
- **Frontmatter**: Metadata and configuration

### Storage Structure

```
project/
└── specs/
    ├── authentication.specs
    ├── api-design.specs
    ├── database/
    │   └── schema.specs
    └── frontend/
        └── component-library.specs
```

## Why It Matters

### Clarity and Precision
- Force detailed thinking about technical decisions
- Create unambiguous technical documentation
- Support architectural decision records
- Maintain design rationale documentation

### Collaboration
- Enable team discussions through inline comments
- Gather feedback on technical proposals
- Collaborative editing in real-time
- Track review and approval process

### Integration
- Link specs to requirement plans
- Reference specs from action plans
- Connect specs to implementation tasks
- Maintain traceability across planning documents

### Knowledge Preservation
- Document technical decisions and rationale
- Create permanent technical knowledge base
- Support onboarding of new team members
- Enable historical analysis of technical choices

## Key Capabilities

### Rich Editing Experience

**MDX Editor Features**
- **Toolbar**: Full formatting toolbar with all common operations
- **Plugins**: Extensible plugin architecture for custom features
- **Syntax Highlighting**: Code blocks with language-specific highlighting
- **Live Preview**: Real-time rendering of MDX content
- **Source Mode**: Direct MDX source editing

**Content Types**
- **Headings**: Hierarchical document structure (H1-H6)
- **Lists**: Ordered, unordered, and task lists
- **Tables**: Structured data presentation
- **Code Blocks**: Syntax-highlighted code with language selection
- **Links**: Internal and external references
- **Images**: Embedded and referenced images
- **Math**: LaTeX-style mathematical expressions
- **Admonitions**: Note, tip, danger, info, caution blocks
- **Sandpack**: Live React code execution
- **Frontmatter**: Document metadata and configuration

### Collaborative Commenting

**Inline Comments**
- Select text to create comment highlights
- Add threaded discussions on any text
- Multiple comment threads per document
- Resolve comments when addressed

**Comment Management**
- View all comments in sidebar
- Filter by resolved/unresolved status
- Navigate between comments
- Reply to existing comments

**Comment Features**
- Rich text formatting in comments
- Mention team members
- Timestamp and author tracking
- Comment resolution workflow

### File Management

**File Operations**
- Create new spec files with custom names
- List all spec files in project
- Recursive directory scanning
- File browser integration

**File Selection**
- Recent file history
- Direct file path input
- Dropdown selector for easy access
- Auto-load last opened spec

**Persistence**
- Auto-save with debouncing
- Manual save with feedback
- Conflict detection and resolution
- Version control integration

### Advanced Features

**Sandpack Integration**
- Live React code execution
- Multiple file support
- Custom templates
- Error handling and display

**Admonition Directives**
- Note blocks for general information
- Tip blocks for helpful suggestions
- Warning blocks for cautions
- Danger blocks for critical issues
- Info blocks for neutral information

**Frontmatter Support**
- Document metadata
- Configuration options
- Custom fields
- Tagging and categorization

**Diff Source Mode**
- Toggle between visual and source editing
- See raw MDX source
- Direct Markdown editing
- Syntax validation

## How It Works

### MDX Syntax

**Basic Markdown**
```markdown
# Heading 1
## Heading 2

**Bold text** and *italic text*

- List item 1
- List item 2

1. Ordered item 1
2. Ordered item 2
```

**Code Blocks**
\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}
\`\`\`

**Admonitions**
\`\`\`{note}
This is a note block with important information.
\`\`\`

**Math**
Inline math: $E = mc^2$

Block math:
$$
\sum_{i=1}^{n} x_i
$$

**Sandpack**
\`\`\`{sandpack}
export default function App() {
  return <h1>Hello Sandpack</h1>;
}
\`\`\`

### Comment System

**Creating Comments**
1. Select text in the editor
2. Click comment icon or use keyboard shortcut
3. Enter comment in popover
4. Submit comment

**Comment Thread**
- Multiple replies per comment
- Threaded discussions
- Resolution workflow
- @mention support

**Comment Display**
- Yellow highlight for active comments
- Gray highlight for resolved comments
- Click to view comment thread
- Navigate between comments

### File Management

**Directory Structure**
- Specs stored in `specs/` directory
- Supports nested subdirectories
- Relative path references
- Automatic directory creation

**File Listing**
- Recursive scanning of specs directory
- Display name (filename without extension)
- Relative path from project root
- Filter and search capabilities

## Use Cases

### API Documentation

**Scenario**: Documenting REST API endpoints

```markdown
# User API

## Authentication

All API requests require authentication using Bearer tokens.

\`\`\`{note}
Contact admin@company.com to obtain API credentials.
\`\`\`

## Endpoints

### Get User

Retrieve user information by ID.

**Request**
\`\`\`http
GET /api/users/:id
Authorization: Bearer <token>
\`\`\`

**Response**
\`\`\`json
{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com"
}
\`\`\`

### Create User

Create a new user account.

**Request**
\`\`\`http
POST /api/users
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securepassword"
}
\`\`\`
```

### Architecture Documentation

**Scenario**: Documenting system architecture

```markdown
# System Architecture

## Overview

The system follows a microservices architecture with the following components:

```mermaid
graph TB
    Client[Client]
    API[API Gateway]
    Auth[Auth Service]
    Users[User Service]
    DB[(Database)]
    
    Client --> API
    API --> Auth
    API --> Users
    Auth --> DB
    Users --> DB
\`\`\`

## Component Details

### API Gateway
- Handles all incoming requests
- Routes to appropriate services
- Implements rate limiting
- Provides authentication layer

### Authentication Service
- Manages user sessions
- Issues JWT tokens
- Handles password reset
- Integrates with OAuth providers

### User Service
- Manages user profiles
- Handles user CRUD operations
- Implements business logic
- Caches frequently accessed data
```

### Component Documentation

**Scenario**: Documenting React components

```markdown
# Button Component

## Usage

\`\`\`{sandpack}
import Button from './Button';

export default function App() {
  return (
    <Button variant="primary" onClick={() => alert('Clicked!')}>
      Click Me
    </Button>
  );
}
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'tertiary' | 'primary' | Visual style variant |
| size | 'small' \| 'medium' \| 'large' | 'medium' | Button size |
| disabled | boolean | false | Disable interaction |
| onClick | function | - | Click handler |

## Examples

### Primary Button
\`\`\`jsx
<Button variant="primary">Save</Button>
\`\`\`

### Secondary Button
\`\`\`jsx
<Button variant="secondary">Cancel</Button>
\`\`\`

### Disabled Button
\`\`\`jsx
<Button disabled>Cannot Click</Button>
\`\`\`
```

## Best Practices

### Document Structure

**Logical Organization**
- Start with overview and purpose
- Follow with detailed specifications
- Include examples and usage
- End with implementation notes
- Use consistent heading hierarchy

**Section Breakdown**
- Use H1 for document title
- Use H2 for main sections
- Use H3 for subsections
- Avoid going deeper than H4
- Maintain consistent structure

### Content Quality

**Clarity and Precision**
- Write clear, unambiguous specifications
- Define all technical terms
- Provide context for decisions
- Include rationale for choices

**Examples and Illustrations**
- Provide code examples for APIs
- Include diagrams for architecture
- Show component usage patterns
- Demonstrate common scenarios

**Completeness**
- Cover all aspects of the specification
- Include edge cases and error conditions
- Document constraints and limitations
- Specify dependencies and requirements

### Collaboration

**Comment Etiquette**
- Keep comments focused and constructive
- Resolve comments when addressed
- Use @mentions for specific feedback
- Thread related discussions

**Review Process**
- Request reviews before finalizing
- Address all review comments
- Document decision outcomes
- Maintain change history

### Maintenance

**Regular Updates**
- Keep specs synchronized with implementation
- Update as requirements change
- Document deprecations clearly
- Maintain version history

**Link Integrity**
- Verify internal links work
- Update cross-references when moving sections
- Use relative paths for portability
- Test all external links

## Related Concepts

- **[Requirements Planning](./requirement-planning.md)**: Specs linked from requirement documents
- **[Action Plan System](./action-plan-system.md)**: Implementation plans linked from specs
- **[Feature Roadmap](./roadmap-system.md)**: High-level feature organization
- **[Planning Workflows](./planning-workflows.md)**: End-to-end planning processes

## Troubleshooting

**Sandpack Not Working**
- Verify React code syntax is correct
- Check browser console for errors
- Ensure all dependencies are available
- Try simplifying the code example

**Comments Not Saving**
- Check network connectivity
- Verify comment text isn't too long
- Ensure user is authenticated
- Try refreshing the page

**File Not Found**
- Verify file exists in specs directory
- Check file path is correct
- Ensure file has .specs extension
- Try listing all specs files

**Preview Not Rendering**
- Check MDX syntax for errors
- Verify all components are properly closed
- Look for unsupported Markdown features
- Try switching to source mode to debug

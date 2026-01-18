---
title: Integrated Browser Panel
category: Development Tools
related:
  - development-workflows
  - preview-panel
  - monaco-editor
---

## Executive Summary

The Browser Panel provides a fully-functional web browser integrated directly into CodeBolt, enabling developers to test web applications, research APIs, and perform in-browser testing without leaving the development environment. It features screenshot capture, element inspection, and annotation tools for AI-assisted web development.

## What It Is

The Browser Panel is an Electron webview that embeds a Chromium browser instance within CodeBolt's interface. Unlike a simple iframe, it provides:

- **Full web browsing** - Navigate to any URL with full CSS/JavaScript support
- **DevTools integration** - Access Chrome DevTools for debugging
- **Screenshot capture** - Take screenshots for AI analysis and documentation
- **Element picker** - Inspect and select DOM elements visually
- **Drawing overlay** - Annotate screenshots with drawings and highlights
- **Console monitoring** - Capture browser console logs for debugging

## Why It Matters

Web development requires constant browser testing during development. By integrating a full browser:

- **Rapid testing** - Test changes immediately without switching applications
- **Visual feedback** - See exactly how the application renders
- **AI collaboration** - AI agents can capture screenshots to understand visual issues
- **Debugging integration** - Use browser DevTools alongside code editor
- **Documentation** - Capture annotated screenshots for bug reports and documentation

This enables a complete web development workflow within a single interface.

## Key Capabilities

### Web Browsing

- **URL navigation** - Navigate to any URL via address bar
- **Back/forward navigation** - Browser history navigation
- **Reload functionality** - Page refresh with cache bypass
- **New window handling** - Popup blocking or controlled opening
- **Session persistence** - Browser state persists across sessions via partition

### Developer Tools

- **DevTools access** - Open Chrome DevTools for inspecting elements
- **Console monitoring** - Capture and save console logs (last 50 entries)
- **Network inspection** - Monitor network requests and responses
- **Performance profiling** - Analyze runtime performance
- **Source debugging** - Set breakpoints and debug JavaScript

### Screenshot & Annotation

- **Full-page screenshots** - Capture entire visible page
- **Element picker** - Click-to-select DOM elements for inspection
- **Drawing overlay** - Draw shapes, arrows, and highlights on screenshots
- **Screenshot export** - Save screenshots for documentation or AI analysis
- **Multi-capture workflow** - Take multiple screenshots in sequence

### Theme Isolation

- **Standard browser appearance** - Browser always renders pages in standard mode
- **Theme independence** - CodeBolt's dark/light theme doesn't affect browser rendering
- **Native CSS variables** - Web pages use their own theme variables
- **Consistent behavior** - Browser behaves identically to external Chrome

## How It Works Conceptually

### Browser Architecture

The browser panel uses Electron's webview technology:

1. **Webview creation** - `<webview>` element creates isolated browser context
2. **Partition isolation** - Each webview gets isolated storage and cookies
3. **Process separation** - Browser runs in separate process for security
4. **Context isolation** - No node integration, preventing code access to Electron APIs
5. **DevTools bridge** - IPC communication enables DevTools control

### Screenshot Capture

Screenshots are captured through two methods:

1. **Native capture** - Webview's built-in `capturePage()` API
2. **IPC fallback** - Electron main process captures WebContents via IPC

Workflow:
- User triggers screenshot capture
- WebContents ID identifies specific browser instance
- Capture API takes screenshot of visible viewport
- Result returned as base64-encoded data URL
- Screenshot stored for AI analysis or user download

### Element Picker

Element inspection workflow:

1. **Picker activation** - User clicks element picker button
2. **Script injection** - JavaScript injected into webview to handle clicks
3. **Hover tracking** - Elements highlight on hover during picker mode
4. **Selection capture** - Click captures element details (selector, attributes, text)
5. **Picker deactivation** - Mode exits after selection
6. **Data storage** - Element information available for AI agent analysis

### Drawing Overlay

Annotation workflow:

1. **Overlay activation** - Drawing mode enabled
2. **Canvas creation** - Transparent canvas overlaid on screenshot
3. **Drawing tools** - User draws shapes, arrows, text
4. **Composite capture** - Original screenshot combined with drawing layer
5. **Export** - Final annotated screenshot saved or analyzed by AI

### Console Monitoring

Browser console events are captured:

1. **Console API interception** - `console-message` events captured
2. **Buffer management** - Last 50 console entries stored in circular buffer
3. **Level tracking** - Log, warn, error, info, debug levels preserved
4. **Source attribution** - Source file and line number captured
5. **Export** - Console logs can be saved for debugging

## Use Cases

### Web Application Testing

1. **Local development** - Navigate to localhost to test development server
2. **Visual regression** - Compare screenshots before and after changes
3. **Responsive design** - Resize browser to test different viewport sizes
4. **Cross-browser testing** - Test against Chromium rendering engine
5. **Interactive testing** - Click through user workflows to verify functionality

### AI-Assisted Bug Reports

1. **Screenshot capture** - Take screenshot of bug or visual issue
2. **Element annotation** - Use drawing tools to highlight problem areas
3. **Context capture** - Browser provides URL, console logs, and element details
4. **AI analysis** - AI understands visual context from screenshot and annotations
5. **Fix generation** - AI generates code fixes with visual reference

### API Testing

1. **Endpoint testing** - Navigate to API endpoints to test responses
2. **Authentication flows** - Test login and authentication workflows
3. **Form submission** - Test form validation and submission
4. **AJAX monitoring** - Use DevTools to inspect network requests
5. **Error reproduction** - Reproduce API errors for debugging

### Documentation

1. **Screenshot capture** - Capture UI states for documentation
2. **Annotation** - Add arrows and text to explain features
3. **Export** - Save annotated screenshots for docs
4. **Consistency** - Ensure documentation matches actual UI

## Related Concepts

- **[Preview Panel](./preview-panel.md)** - Dedicated panel for previewing local development servers
- **[Monaco Editor](./monaco-editor.md)** - Code changes reflected immediately in browser
- **[AI Shell](./ai-shell.md)** - Terminal commands can open URLs in browser panel
- **[Development Workflows](./development-workflows.md)** - Browser integrates with editor and terminal for complete testing workflow
- **[Agent Management](../agent-management/)** - AI agents can use browser for automated testing and screenshot capture

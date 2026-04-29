---
title: Automated Testing
category: Testing & Quality
tags: [testing, automation, quality-assurance, test-management]
---

## Executive Summary

CodeBolt's Automated Testing system provides a comprehensive framework for creating, organizing, and executing test cases within the development environment. It enables teams to manage test suites, define test cases with rich text steps, execute test runs, and track results through an integrated UI that connects directly with the development workflow.

## What is Automated Testing?

Automated Testing in CodeBolt is a native testing management system that allows developers and QA teams to create, organize, and execute tests without leaving the development environment. Unlike external testing tools, CodeBolt's testing system is deeply integrated with the codebase, enabling seamless test management alongside code editing and review.

The system supports both manual test case documentation and test execution tracking, making it ideal for teams practicing test-driven development, manual QA processes, or hybrid testing approaches. Tests are stored locally within the project's `.codebolt/autotests` directory, ensuring they remain version-controlled and accessible to all team members.

## Key Capabilities

- **Test Suite Organization**: Group related test cases into suites for better organization and management
- **Rich Text Test Steps**: Create detailed test steps using a rich text editor with support for images and embedded content
- **Test Run Management**: Execute test suites and track results across multiple test runs
- **Status Tracking**: Monitor test execution at the suite, case, and step levels with granular status updates
- **Real-time Updates**: WebSocket-based communication ensures all team members see test status changes instantly
- **Local Storage**: All test data is stored locally in the project directory, enabling version control and backup
- **Multi-view Interface**: Choose between list view and split view to optimize for different workflows
- **Test Case Metadata**: Support for test case keys, descriptions, labels, priorities, and types

## How It Works

### Test Hierarchy

The testing system organizes tests in a three-level hierarchy:

1. **Test Suites**: Containers that group related test cases together
2. **Test Cases**: Individual test scenarios with unique keys (e.g., TEST-41) and detailed steps
3. **Test Steps**: Atomic actions within a test case, each with its own status and execution details

### Test Lifecycle

1. **Creation**: Users create test suites and test cases through the UI, defining steps and expected outcomes
2. **Organization**: Test cases are added to suites, creating organized test collections
3. **Execution**: Test runs are created from suites, capturing the state of all test cases at that point in time
4. **Tracking**: As tests are executed, statuses are updated at the step, case, and run levels
5. **Reporting**: Test runs provide a historical record of test execution with detailed results

### Storage Structure

All test data is stored in the project's `.codebolt/autotests` directory:

- `index.json`: Central index tracking all suites, cases, and runs
- `suites/`: Individual test suite definitions
- `cases/`: Individual test case definitions
- `runs/`: Test run results and execution history

This structure ensures tests are version-controlled and portable across environments.

### Status Propagation

The system automatically propagates status changes upward through the hierarchy:

- When all steps in a test case pass, the case automatically passes
- When any step fails, the case fails
- When all test cases in a run are completed, the run is marked complete
- Intermediate states (running, pending) are tracked throughout execution

## Use Cases

### Manual QA Processes

QA teams can document test procedures with detailed steps, screenshots, and expected outcomes. Testers execute tests manually and update statuses as they verify each step, providing a clear audit trail of testing activities.

### Test-Driven Development

Developers can create test cases before implementing features, defining acceptance criteria as test steps. As they implement code, they execute tests to verify behavior matches expectations.

### Regression Testing

Organize test suites for different features or components. Before releases, create test runs to verify all functionality continues to work correctly. Track trends in test results over time to identify regressions.

### Acceptance Testing

Work with stakeholders to define acceptance criteria as test cases with clear steps. Execute tests during sprint reviews to demonstrate that requirements have been met.

### Smoke Testing

Create quick test suites with critical paths through the application. Execute smoke tests after deployments to verify core functionality is working before proceeding with deeper testing.

## Related Concepts

- [Test Suites](./test-suites.md) - Understanding test suite organization and management
- [Test Cases](./test-cases.md) - Creating and managing individual test scenarios
- [Test Runs](./test-runs.md) - Executing tests and tracking results
- [Test Steps](./test-steps.md) - Configuring detailed test step instructions
- [Coverage](./coverage.md) - Analyzing test coverage and quality metrics

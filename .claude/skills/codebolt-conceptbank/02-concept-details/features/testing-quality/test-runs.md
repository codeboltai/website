---
title: Test Runs
category: Testing & Quality
tags: [testing, test-execution, test-results, test-tracking]
---

## Executive Summary

Test Runs represent snapshots of test suite execution, capturing the state of all test cases at a specific point in time. They provide a historical record of testing activities, enabling teams to track progress, identify trends, and maintain a comprehensive audit trail of quality assurance efforts.

## What are Test Runs?

A Test Run is an execution instance of a test suite. When you create a test run, CodeBolt captures the current state of all test cases in the suite and creates an immutable record that can be executed and tracked independently. This means test runs are frozen in time—even if the underlying test cases change later, the test run remains as it was created.

Test runs serve several critical purposes:

- **Execution Tracking**: Monitor which tests have been executed and their results
- **Historical Record**: Maintain a history of testing activities over time
- **Trend Analysis**: Compare results across different runs to identify patterns
- **Audit Trail**: Document when tests were executed and by whom
- **Reporting**: Provide stakeholders with visibility into testing progress

## Key Capabilities

- **Suite-Based Execution**: Create runs from entire test suites with one click
- **Automatic Initialization**: Runs capture all test cases and steps automatically
- **Granular Status Tracking**: Track status at the run, case, and step levels
- **Real-time Updates**: Status changes propagate instantly to all connected clients
- **Historical Preservation**: Runs remain unchanged even if source tests are modified
- **Re-run Capability**: Execute the same suite multiple times to track progress
- **Result Comparison**: View results across multiple runs to identify trends

## How It Works

### Test Run Structure

Each Test Run contains:

1. **Identifier**: Unique UUID for system reference
2. **Name**: Auto-generated name (e.g., RUN-87A3F4D2) or custom name
3. **Suite Reference**: Link to the source test suite
4. **Status**: Overall run status (pending, running, completed, cancelled)
5. **Test Cases**: Snapshot of all test cases with execution status
6. **Timestamps**: Creation, update, and completion timestamps

### Status Hierarchy

Test runs implement a hierarchical status system:

- **Run Level**: Overall status of the entire test run
  - `pending`: Not yet started
  - `running`: Currently being executed
  - `completed`: All tests finished
  - `cancelled`: Execution was stopped

- **Case Level**: Status of each test case
  - `pending`: Not yet executed
  - `running`: Currently being executed
  - `passed`: All steps passed
  - `failed`: One or more steps failed
  - `skipped`: Test was not executed

- **Step Level**: Status of individual test steps
  - `pending`: Not yet executed
  - `running`: Currently being executed
  - `passed`: Step completed successfully
  - `failed`: Step failed
  - `skipped`: Step was not executed

### Status Propagation

The system automatically propagates status changes upward:

1. **Step Status**: Updated when a step is executed
2. **Case Status**: Recomputed based on step statuses
   - Any step failed → case failed
   - All steps passed → case passed
   - Any step running → case running
   - All steps skipped → case skipped
3. **Run Status**: Recomputed based on case statuses
   - Any case running → run running
   - Any case failed → run completed (with failures)
   - All cases passed/skipped → run completed

### Creating Test Runs

Users create test runs from test suites:

1. Select a test suite from the list
2. Click "Create Run" to initialize a new test run
3. The system captures all test cases in the suite
4. Each test case's steps are initialized with "pending" status
5. The run is ready for execution

### Executing Test Runs

Test runs can be executed in various ways:

- **Manual Execution**: Testers work through each test case, updating statuses as they go
- **Automated Execution**: Automated systems update step/case statuses via API
- **Hybrid Approach**: Combination of manual and automated execution

As execution progresses:
- Update step statuses as each step is executed
- Add logs or notes to steps with additional context
- Mark cases as passed or failed based on step results
- The run automatically updates its overall status

## Use Cases

### Pre-Release Testing

Create comprehensive test runs before releases:

1. **Create Run**: Initialize a run from the full regression suite
2. **Execute Tests**: QA team executes tests and updates statuses
3. **Track Progress**: Monitor overall run status to gauge completion
4. **Report Results**: Share run results with stakeholders for release decision

### Continuous Testing

Maintain ongoing testing throughout development:

1. **Daily Runs**: Create quick smoke test runs each morning
2. **Feature Runs**: Create focused runs for new features
3. **Integration Runs**: Create runs for integration points
4. **Track Trends**: Compare results across runs to identify quality trends

### Bug Verification

Verify bug fixes with targeted test runs:

1. **Identify Tests**: Find test cases covering the bug
2. **Create Run**: Create a run with just those tests
3. **Execute Tests**: Verify the fix resolves the issue
4. **Document Results**: Use run results as evidence of verification

### Sprint Testing

Organize testing around sprint cycles:

1. **Sprint Start**: Create baseline run to verify existing functionality
2. **Sprint Middle**: Create progress runs to track new feature testing
3. **Sprint End**: Create acceptance runs for sprint completion criteria
4. **Retrospective**: Review runs across the sprint to identify improvements

### Performance Tracking

Monitor testing performance over time:

1. **Baseline Runs**: Establish initial test run as baseline
2. **Comparison Runs**: Create subsequent runs for comparison
3. **Trend Analysis**: Identify which tests consistently fail or pass
4. **Quality Metrics**: Calculate pass rates and track improvements

## Test Run Best Practices

### Naming Conventions

Use descriptive names for easy identification:

- **Default**: Accept auto-generated names (RUN-XXX) for simplicity
- **Date-based**: "2024-01-15 Release Regression", "Daily Smoke - Jan 15"
- **Purpose-based**: "Pre-release Full Regression", "Bug Fix Verification - ABC-123"
- **Version-based**: "v2.1.0 Release Testing", "Hotfix 2.0.1 Verification"

### Execution Strategy

Plan your test run execution:

- **Prioritize**: Execute critical tests first
- **Parallelize**: Run multiple suites in parallel if possible
- **Document**: Add notes and logs for failed tests
- **Review**: Conduct post-run reviews to identify patterns

### Status Management

Use statuses effectively:

- **Be Accurate**: Only mark steps as passed when truly verified
- **Be Timely**: Update statuses promptly to avoid confusion
- **Be Detailed**: Add logs for failed steps to aid debugging
- **Be Consistent**: Follow defined criteria for each status level

### Historical Analysis

Leverage run history:

- **Compare Runs**: Look for patterns in test results
- **Identify Flaky Tests**: Find tests that inconsistently pass/fail
- **Track Improvement**: Monitor pass rate trends over time
- **Inform Decisions**: Use historical data for release decisions

## Related Concepts

- [Automated Testing](./auto-testing.md) - Overview of the testing system
- [Test Suites](./test-suites.md) - Creating runs from test suites
- [Test Cases](./test-cases.md) - Test cases executed in runs
- [Test Steps](./test-steps.md) - Step-level execution tracking

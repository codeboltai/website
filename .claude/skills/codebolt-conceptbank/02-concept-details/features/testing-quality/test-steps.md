---
title: Test Steps
category: Testing & Quality
tags: [testing, test-steps, test-instructions, test-execution]
---

## Executive Summary

Test Steps are the atomic units of test execution in CodeBolt's testing system, defining individual actions and verifications within a test case. Each step provides detailed, rich-text instructions for testers, supporting images, formatted text, and embedded content to ensure clear, unambiguous test execution.

## What are Test Steps?

A Test Step is a single, discrete action or verification within a test case. While a test case defines what to test at a high level, test steps define how to test it by breaking down the test scenario into manageable, executable pieces. Each step represents one action the tester should perform or one verification they should make.

Test steps serve several important purposes:

- **Clarity**: Break down complex tests into simple, actionable steps
- **Consistency**: Ensure different testers execute tests the same way
- **Traceability**: Pinpoint exactly where a test fails
- **Documentation**: Provide detailed instructions for test execution
- **Knowledge Transfer**: Enable new testers to understand test procedures

## Key Capabilities

- **Rich Text Content**: Create detailed steps with formatted text, lists, and emphasis
- **Visual Support**: Include screenshots, diagrams, and embedded images
- **Ordering**: Define the sequence in which steps should be executed
- **Status Tracking**: Track execution status for each step independently
- **Logging**: Add execution logs and notes to steps during test runs
- **Flexible Content**: Support for various content types beyond plain text

## How It Works

### Test Step Structure

Each Test Step contains:

1. **Identifier**: Unique UUID for system reference
2. **Order**: Numerical position defining execution sequence
3. **Content**: Rich text instructions using Tiptap editor format
4. **Status**: Execution status (pending, running, passed, failed, skipped)
5. **Logs**: Optional execution notes and debugging information
6. **User Override**: Flag indicating manual status override

### Creating Test Steps

Users create test steps when building test cases:

1. Navigate to test case creation/editing
2. Add steps one at a time in execution order
3. Use the rich text editor to craft step instructions
4. Include screenshots or images as needed
5. Preview steps to ensure clarity
6. Save the test case with all steps

### Step Content

Test step content can include:

- **Text Instructions**: Clear, actionable descriptions of what to do
- **Formatted Text**: Bold, italic, lists, headings for emphasis
- **Screenshots**: Images showing expected states or procedures
- **Links**: References to documentation or related resources
- **Code Examples**: Sample code or commands to execute
- **Expected Results**: Explicit statements of what should happen

### Step Ordering

Steps are automatically ordered based on their position:

1. Steps are assigned sequential order numbers (1, 2, 3...)
2. The system maintains order even if steps are inserted or removed
3. Test execution follows the numerical order
4. Reordering steps updates their order numbers automatically

### Status Tracking

During test runs, each step can have one of the following statuses:

- **Pending**: Step has not yet been executed
- **Running**: Step is currently being executed
- **Passed**: Step completed successfully with expected results
- **Failed**: Step did not produce expected results
- **Skipped**: Step was intentionally not executed

## Use Cases

### Functional Testing Steps

Break down feature verification into clear actions:

**Example**: User Login Test
- Step 1: Navigate to login page
- Step 2: Enter username "testuser@example.com"
- Step 3: Enter password "SecurePass123!"
- Step 4: Click "Login" button
- Step 5: Verify redirect to dashboard
- Step 6: Verify welcome message displays username

### UI Verification Steps

Document UI checks with visual references:

**Example**: Form Validation Test
- Step 1: Navigate to registration form
- Step 2: Submit form without entering any data
- Step 3: Verify error message "Required field" appears below each field
- Step 4: [Screenshot of expected error display]
- Step 5: Enter invalid email format
- Step 6: Verify email validation error appears

### API Testing Steps

Define API interaction steps clearly:

**Example**: GET User Profile API
- Step 1: Send GET request to `/api/users/123`
- Step 2: Verify response status is 200 OK
- Step 3: Verify response contains user object with id: 123
- Step 4: Verify user object contains required fields: name, email, created_at
- Step 5: Verify response time is less than 500ms

### Multi-Scenario Steps

Handle different scenarios in separate steps:

**Example**: Payment Processing Test
- Step 1: Navigate to checkout page
- Step 2: Add item to cart
- Step 3: Proceed to payment
- Step 4: Enter valid credit card details
- Step 5: Complete payment
- Step 6: Verify success message displays
- Step 7: Verify order confirmation email is received
- Step 8: Verify order appears in order history

### Edge Case Steps

Test boundary conditions and unusual inputs:

**Example**: Input Validation Test
- Step 1: Navigate to search form
- Step 2: Enter search term with special characters: "@#$%^&*()"
- Step 3: Click search button
- Step 4: Verify search executes without errors
- Step 5: Verify results are returned or appropriate message shows
- Step 6: Enter search term with 1000+ characters
- Step 7: Verify system handles long input gracefully

## Test Step Best Practices

### Writing Clear Steps

- **Be Specific**: Clearly state what action to perform
- **Be Atomic**: One step should do one thing
- **Be Verifiable**: Each step should have a clear expected result
- **Be Complete**: Include all necessary information
- **Be Unambiguous**: Avoid vague or interpretable language

### Using Rich Text Effectively

- **Bold Important Words**: **Click** the submit button
- **Use Lists**: Break complex steps into bullet points
- **Include Screenshots**: Show rather than tell when possible
- **Format Code**: Use code blocks for commands or code snippets
- **Add Warnings**: Use emphasis for critical warnings

### Step Granularity

Find the right balance between detail and brevity:

- **Too Granular**: "Move mouse to x,y coordinates", "Press left mouse button"
- **Too Broad**: "Log in and create an account, then make a purchase"
- **Just Right**: "Click the login button", "Enter username and password", "Click submit"

### Expected Results

Make expected outcomes explicit:

- **Implicit**: "Verify the page loads"
- **Explicit**: "Verify the dashboard page loads with user's name in the header"
- **Even Better**: "Verify the page title is 'Dashboard - [Username]' and the sidebar shows navigation options"

### Maintenance

Keep steps up to date:

- Review steps when UI changes
- Update screenshots when visuals change
- Remove obsolete steps
- Add new steps for expanded functionality
- Clarify ambiguous steps based on tester feedback

## Step Templates

### Action-Verification Pattern

Most steps follow this pattern:

1. **Action**: What the tester does
2. **Observation**: What the tester should see
3. **Verification**: Confirmation that it matches expectations

**Example**:
- Action: Click the "Save" button
- Observation: A loading spinner appears for 2 seconds
- Verification: A success message "Settings saved" appears and the new values persist

### Given-When-Then Pattern

For behavior-driven testing:

**Example**:
- Given: User is on the login page
- When: User enters invalid credentials
- Then: Error message "Invalid username or password" displays

### Setup-Execute-Verify Pattern

For technical tests:

**Example**:
- Setup: Create test user with role "editor"
- Execute: Log in as test user, navigate to admin panel
- Verify: Admin panel is inaccessible and 403 error is shown

## Related Concepts

- [Automated Testing](./auto-testing.md) - Overview of the testing system
- [Test Cases](./test-cases.md) - Creating test cases with steps
- [Test Runs](./test-runs.md) - Executing test steps
- [Test Suites](./test-suites.md) - Organizing test cases

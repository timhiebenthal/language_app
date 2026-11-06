# Task List: English-to-German for Expats

## Phase 1: First learner flow

- [ ] Task 1: Add the first A1 workplace lesson and app shell
  - Acceptance: The page identifies the A1 level and workplace introduction situation; lesson copy includes a practical *Eselsbrücke* and explains its limits; content is separated from interaction code.
  - Verify: Open the page in a browser and confirm lesson content is visible and understandable without JavaScript quiz interaction.
  - Dependencies: None
  - Files likely touched: `index.html`, `content/a1-workplace-introduction.js`
  - Estimated scope: Small
- [ ] Task 2: Implement quiz interaction and explanatory feedback
  - Acceptance: Learner can answer the multiple-choice questions; correct and incorrect choices show useful explanations; final score and completion are displayed.
  - Verify: Manually answer correctly and incorrectly and confirm feedback and score; inspect keyboard operation and focus behavior.
  - Dependencies: Task 1
  - Files likely touched: `index.html`, `app.js`, `content/a1-workplace-introduction.js`
  - Estimated scope: Medium
- [ ] Task 3: Persist and restore lesson progress in the browser
  - Acceptance: Completion and score survive reload in the same browser; fresh storage starts uncompleted; storage failure does not block the quiz and is communicated clearly.
  - Verify: Complete, reload, confirm restored state; clear site storage and confirm fresh state; simulate unavailable storage if practical.
  - Dependencies: Task 2
  - Files likely touched: `app.js`
  - Estimated scope: Small

## Checkpoint: First learner flow

- [ ] Complete a lesson from initial load through results.
- [ ] Reload and confirm completion and score restore in the same browser.
- [ ] Confirm a clean browser storage state starts with no progress.

## Phase 2: Responsive usability and sharing readiness

- [ ] Task 4: Make the lesson usable on phone and desktop widths
  - Acceptance: Lesson and quiz fit narrow phone screens without horizontal scrolling; controls remain readable and usable; desktop layout remains comfortable.
  - Verify: Inspect at a narrow phone viewport and a desktop viewport; complete the quiz at both sizes.
  - Dependencies: Tasks 1-3
  - Files likely touched: `styles.css`, `index.html`
  - Estimated scope: Small
- [ ] Task 5: Prepare the static app entry point and GitHub Pages instructions
  - Acceptance: Repository root has a GitHub Pages-compatible entry point and relative asset paths; README explains local use and deployment configuration without claiming an unknown remote is configured.
  - Verify: Open locally, confirm relative resources load, and follow documented GitHub Pages setup when a repository remote is available.
  - Dependencies: Tasks 1-4
  - Files likely touched: `README.md`, `index.html`
  - Estimated scope: Small

## Checkpoint: Release readiness

- [ ] All spec success criteria are met locally.
- [ ] Manual browser verification is complete.
- [ ] GitHub Pages deployment steps are documented; publishing awaits a configured remote.

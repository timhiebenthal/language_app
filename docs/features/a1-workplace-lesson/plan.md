# Implementation Plan: English-to-German for Expats

## Overview

Deliver the first usable slice of the approved spec: a responsive A1 lesson for English-speaking adults working in Germany, with a practical workplace situation, a multiple-choice quiz, explanatory feedback, and browser-local progress. The repository currently has no app code and no Git remote, so implementation and local verification can proceed, while publishing to GitHub Pages depends on selecting/adding the remote repository.

## Architecture Decisions

- Keep the first release static and dependency-free with HTML, CSS, and JavaScript.
- Keep lesson data separate from rendering and quiz behavior so content can grow across A1, A2, and B1.
- Persist per-lesson completion and score in browser storage; no backend, account, or synchronization.
- Use a single A1 workplace introduction lesson as the first vertical slice. The exact questions and mnemonic will be authored and reviewed for natural German during content implementation.
- Do not add a build system or automated test dependency for the initial slice; verify behavior in a browser as specified.

## Task List

### Phase 1: First learner flow

- Task 1: Add the first A1 workplace lesson and app shell.
- Task 2: Implement quiz interaction and explanatory feedback.
- Task 3: Persist and restore lesson progress in the browser.

### Checkpoint: First learner flow

- [ ] Complete a lesson from initial load through results.
- [ ] Reload and confirm completion and score restore in the same browser.
- [ ] Confirm a clean browser storage state starts with no progress.

### Phase 2: Responsive usability and sharing readiness

- Task 4: Make the lesson usable on phone and desktop widths.
- Task 5: Prepare the static app entry point and GitHub Pages instructions.

### Checkpoint: Release readiness

- [ ] All spec success criteria are met locally.
- [ ] Manual browser verification is complete.
- [ ] GitHub Pages deployment steps are documented; publishing is completed after a GitHub remote is selected.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Incorrect or unnatural German undermines learning | High | Keep lesson copy contextual, level-appropriate, and review each answer and explanation during content authoring. |
| Browser storage may be unavailable or cleared | Medium | Handle storage errors without preventing the quiz from working; tell the learner progress could not be saved. |
| No GitHub remote is configured | Medium | Build and verify locally first; deployment waits for a repository remote to be chosen. |
| Direct `file://` behavior may differ from GitHub Pages | Medium | Use relative assets and verify both local opening and the hosted page when a remote exists. |

## Open Questions

- Which GitHub repository/account will host the site? No remote is currently configured.
- The first lesson situation is taken from the spec's recommendation: introducing yourself to a new colleague.
- The first quiz is multiple choice, and browser-native local storage is the intended persistence mechanism.

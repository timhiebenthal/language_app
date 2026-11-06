# Spec: English-to-German for Expats

## Objective

Build a lightweight, phone-friendly language-learning app for English-speaking adults living and working in Germany, with an initial focus on office workers. It teaches practical German from CEFR A1 through B1 through situation-based lessons, quizzes, and useful *Eselsbrücken*.

The first release is a usable A1 lesson that validates the learning format and browser-local progress approach before the app expands to A2 and B1.

## Tech Stack

- Plain HTML, CSS, and JavaScript; no framework or backend.
- Static hosting on GitHub Pages.
- Browser storage for lesson completion and scores; no account or cross-device sync.

## Commands

- Run locally: open `index.html` in a modern browser.
- Test: no automated test framework is selected yet. For the first release, manually verify the lesson and persistence in a browser.
- Publish: configure GitHub Pages for the repository; exact setup depends on the repository's GitHub remote and settings.

## Project Structure

- `index.html` - app shell and first lesson interface.
- `styles.css` - responsive presentation.
- `app.js` - quiz interactions and browser-local progress.
- `content/` - lesson content, organized by CEFR level and practical situation.
- `docs/` - product specification and architecture decisions.

## Code Style

Use semantic HTML, descriptive names, and small functions with one purpose. Keep lesson copy and quiz data separate from interaction logic where practical.

```js
const lesson = {
  level: "A1",
  situation: "Introducing yourself to a new colleague",
  question: "How would you say ‘I work in marketing’?",
  answers: ["Ich arbeite im Marketing."],
};
```

German examples and answer feedback should be natural, clear, and appropriate to the stated level. Accepted answers should account for reasonable punctuation and capitalization differences without accepting a different meaning.

## Testing Strategy

- First release: manually verify quiz answer selection, correct and incorrect feedback, score calculation, completion tracking, browser reload persistence, and layout on phone and desktop widths.
- Verify persisted progress stays in the same browser and does not imply account or cross-device synchronization.
- No coverage target or test framework is set for this static first version. Add automated checks if content or behavior grows enough to benefit from them.

## Boundaries

- Always: keep the experience usable without an account; keep learning content tied to realistic daily-life or office situations; explain quiz answers; keep *Eselsbrücken* contextual and describe their limits; preserve browser-local progress across visits.
- Ask first: add a backend, learner accounts, cross-device synchronization, external dependencies, or a different hosting model.
- Never: present a mnemonic as a universal grammar rule; imply that GitHub Pages stores learner data; expose secrets in the repository.

## Success Criteria

- A learner can open the hosted app from a shareable GitHub Pages link without installing software or creating an account.
- The first release contains at least one complete A1 lesson grounded in a realistic situation relevant to living or working in Germany.
- The lesson includes an interactive quiz with explanatory feedback for correct and incorrect answers.
- Lesson completion and quiz score persist in the same browser after reload, without a server or account.
- The main lesson and quiz are usable at phone and desktop widths.
- The app clearly identifies its content level and the situation being practised.

## Out of Scope

- A2 and B1 lesson library in the first release.
- User accounts, server-side storage, or syncing progress across devices.
- Audio, speech recognition, and pronunciation scoring.
- Adaptive learning paths, streaks, or a complex progression system.
- Google Drive as the web host.

## Open Questions

- Which specific A1 situation should the first lesson teach? A reasonable starting point is introducing yourself to a new colleague.
- Should the first quiz accept typed German, multiple choice, or both? A reasonable first slice is multiple choice, followed by typed practice later.
- Which browser-local storage format should be used? Choose a small browser-native option during implementation and document the behavior.
- What GitHub repository and account will host the app? The local repository currently has no remote configured.

# English → German for Expats

A simple, interactive language-learning app for English speakers learning German. It is aimed at learners from A1 to B1, with quizzes and practical memory aids (*Eselsbrücken*) for situations expats actually encounter.

## Learning approach

- Build useful German for everyday life, from settling in to handling common conversations.
- Use short quizzes to practise and check understanding.
- Explain practical memory aids in context, so learners can remember what to say and when to say it.
- Keep the experience approachable for learners who are still building confidence.

Avoid disconnected phrase lists and arbitrary example sentences. Teach language through realistic situations and explain why a phrase or pattern is useful.

## Sharing the app

The app is intended to use plain HTML, CSS, and JavaScript so it stays lightweight and easy to share. The sharing target is GitHub Pages, which can serve the app as a normal website link.

Google Drive can store and share the HTML file, but its link is not the target for running the interactive app. Learners can use the site without accounts. Quiz activity is temporary during a session; lesson completion and scores should persist in that learner's browser, without cross-device syncing.

The published site files live in `site/`. GitHub Actions deploys that directory to GitHub Pages whenever changes reach `main`, including pull request merges. To enable publishing, open the repository's **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. The workflow can also be run manually from the Actions tab.

## Running locally

The app itself has not been implemented yet. The current page is a deployment placeholder. Local run instructions will be added with the first runnable version.

## Current status

Project scope and learning approach are defined. The app itself has not been implemented yet.

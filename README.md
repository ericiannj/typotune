# TypoTune

TypoTune is a Next.js app for improving English text with the help of Gemini. It sends user input through a server-side API route, returns a revised version, and explains the main changes.

## Features

- Text improvement powered by Google Gemini
- Explanations for suggested edits
- Character counter and copy-to-clipboard support
- Responsive interface built with React and Tailwind CSS

## Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS
- Vitest and React Testing Library
- Google Gemini through a server-side route

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
npm run test:coverage
```

## Project Notes

The browser calls `POST /api/text-improvements`; Gemini is only accessed from the server. The API key is read from `GEMINI_API_KEY`.

Pre-commit checks are handled by Husky and include linting, formatting for staged files, and tests.


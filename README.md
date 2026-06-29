<p align="center">
  <img src="public/typing.png" width="160" height="160" alt="TypoTune icon">
</p>

<h1 align="center">TypoTune</h1>

<p align="center">
  AI-powered English text improvement — paste your text, get a polished revision<br>
  and a clear explanation of every change, right in the browser.
</p>

<p align="center">
  <a href="https://github.com/ericiannj/typotune">
    <img src="https://img.shields.io/badge/GitHub-ericiannj%2Ftypotune-blue?logo=github" alt="GitHub">
  </a>
</p>

## Why TypoTune?

- **Instant feedback** — no sign-up, no setup beyond a free API key
- **Transparent edits** — every suggestion comes with an explanation so you learn, not just copy
- **Server-side only** — your Groq API key never touches the browser
- **Rate-limited by default** — built-in per-IP and global limits protect your quota out of the box

## Features

- Text improvement powered by Groq AI (Llama 3.3 70B)
- Explanations for each suggested edit
- Character counter and copy-to-clipboard support
- Input capped at 5,000 characters per request
- In-process rate limiter (30 req/IP · 200 req global, per hour)
- Responsive interface built with React and Tailwind CSS

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Get a free API key at [console.groq.com](https://console.groq.com) — no credit card required.

### 3. Start the dev server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Scripts

```bash
npm run dev            # start development server
npm run build          # production build
npm run start          # start production server
npm run lint           # lint
npm run test           # run tests
npm run test:coverage  # run tests with coverage
```

## Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS
- Vitest and React Testing Library
- Groq AI through a server-side route

## Project Notes

The browser calls `POST /api/text-improvements`; Groq is only accessed from the server. The API key is read from `GROQ_API_KEY`.

The rate limiter runs in-process (30 requests per IP, 200 globally, per hour). This works correctly in single-instance deployments. In serverless environments where multiple function instances run in parallel, each instance holds its own state, so limits are not enforced across instances. A distributed store such as Redis would be needed for reliable enforcement at scale.

Pre-commit checks are handled by Husky and include linting, formatting for staged files, and tests.

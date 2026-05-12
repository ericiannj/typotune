<div align="center">
  <img src="public/typing.png" alt="TypoTune Logo" width="120" height="120">
  <h1># TypoTune</h1>
</div>

A modern, AI-powered writing improvement tool built with Next.js, React, TypeScript, and Tailwind CSS. TypoTune helps users enhance their English text with AI-powered improvements and detailed explanations.

## ✨ Features

- **AI-Powered Text Improvement**: Get instant suggestions to enhance your writing
- **Detailed Explanations**: Understand why changes were made with clear explanations
- **Real-time Processing**: See improvements as you type
- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Copy to Clipboard**: Easy copying of improved text
- **Character Counter**: Track your text length in real-time
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Tech Stack

- **Framework**: Next.js App Router
- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini AI through a server-side API route
- **UI Components**: Custom component library with shadcn/ui inspiration
- **State Management**: React Hooks
- **Animations**: CSS transitions and transforms
- **Testing**: Vitest + React Testing Library

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd typotune
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## 🏗️ Architecture

TypoTune uses the Next.js App Router in `src/app`.

- `src/app/layout.tsx` defines the root HTML shell and metadata.
- `src/app/page.tsx` composes the page shell.
- Client-side state, DOM events, Framer Motion, clipboard access, and DOMPurify usage stay inside Client Components such as `TextImprovementProvider`, `TextInputPanel`, `TextResultsPanel`, `InputContainer`, and `TextCard`.
- The browser calls the internal `POST /api/text-improvements` route. It does not call Gemini directly.
- `src/app/api/text-improvements/route.ts` validates requests and returns stable JSON.
- Server-only Gemini integration lives under `src/lib/llm` and reads `process.env.GEMINI_API_KEY`.

## 🔧 Configuration

### Google Gemini AI Setup

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to your `.env` file as `GEMINI_API_KEY`
3. The server-side API route will use the key for text improvements

### Build and Deployment

```bash
# Build for production
npm run build

# Start the production server
npm run start

# Lint code
npm run lint

# Run tests
npm run test

# Run coverage
npm run test:coverage
```

### Quality Gate

Husky runs the pre-commit hook in `.husky/pre-commit`. The hook runs `lint-staged`, `npm run lint`, and `npm run test` before a commit is accepted.

## 🎨 Customization

### Styling

The app uses Tailwind CSS for styling. You can customize:

- Color schemes in `tailwind.config.cjs`
- Component styles in individual component files
- Global styles in `src/index.css`

### Components

Each component is self-contained and can be easily modified:

- Update `TextCard` to change the appearance of result cards
- Modify `InputContainer` to adjust input styling
- Customize `ResultsSection` background effects

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for providing the AI capabilities
- **shadcn/ui** for component design inspiration
- **Tailwind CSS** for the utility-first CSS framework
- **Next.js** for the React framework and server-side API routes

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

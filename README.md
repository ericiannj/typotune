# TypoTune

A modern, AI-powered writing improvement tool built with React, TypeScript, and Tailwind CSS. TypoTune helps users enhance their English text with AI-powered improvements and detailed explanations.

## ✨ Features

- **AI-Powered Text Improvement**: Get instant suggestions to enhance your writing
- **Detailed Explanations**: Understand why changes were made with clear explanations
- **Real-time Processing**: See improvements as you type
- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Copy to Clipboard**: Easy copying of improved text
- **Character Counter**: Track your text length in real-time
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **AI Integration**: Google Gemini AI
- **UI Components**: Custom component library with shadcn/ui inspiration
- **State Management**: React Hooks
- **Animations**: CSS transitions and transforms

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
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 🔧 Configuration

### Google Gemini AI Setup

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to your `.env` file
3. The app will automatically use the API key for text improvements

### Build and Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

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
- **Vite** for the fast build tooling

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

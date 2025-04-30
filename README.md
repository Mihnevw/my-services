# Modern Website

A modern, interactive website featuring an engaging intro animation with synchronized video playback and speech synthesis.

## Features

- Interactive video player with custom controls
- Synchronized speech synthesis for subtitles
- Dynamic theme colors with gradient effects
- Keyboard controls for video navigation
- Responsive design for all devices
- Dark mode support
- Smooth animations and transitions

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Web Speech API
- HTML5 Video API

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/modern-website.git
cd modern-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
modern-website/
├── components/
│   ├── intro-animation.tsx    # Main intro animation component
│   ├── animated-section.tsx   # Reusable animation wrapper
│   └── ...
├── contexts/
│   └── theme-color-context.tsx # Theme color management
├── public/
│   ├── intro.mp4             # Intro video
│   └── subtitles.vtt         # Video subtitles
└── ...
```

## Features in Detail

### Video Player
- Custom video controls with play/pause, mute/unmute, and subtitle toggle
- Progress bar with click-to-seek functionality
- Keyboard controls (left/right arrows for seeking)
- Synchronized subtitles with speech synthesis

### Speech Synthesis
- Automatic voice selection for optimal speech quality
- Synchronized speech rate with video playback
- Support for multiple languages
- Graceful fallback when speech synthesis is unavailable

### Theme and Styling
- Dynamic gradient effects
- Responsive design for all screen sizes
- Dark mode support
- Smooth animations and transitions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/) 
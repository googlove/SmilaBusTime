# SmilaBusTime 🚌

Modern bus schedule application for Smila, Cherkasy region, Ukraine. Built with React, TypeScript, and Tailwind CSS.

## Features ✨

- 🕐 **Real-time Schedule** - Current bus schedules with next departure times
- ⭐ **Favorites System** - Save frequently used routes
- 🌙 **Dark/Light Mode** - Theme switching with system preference detection
- 🗺️ **Interactive Maps** - Visual route maps and bus stop locations
- 📱 **Mobile Responsive** - Works perfectly on all devices
- 🔔 **Push Notifications** - Bus arrival alerts
- 🌤️ **Weather Integration** - Weather-aware schedule information
- 🎯 **Route Search** - Quick search by bus number
- 📍 **Real-time Tracking** - Live bus positions (where available)

## Tech Stack 🛠️

- **React 18** with TypeScript
- **Tailwind CSS v4** for styling
- **Radix UI** for accessible components
- **Lucide React** for icons
- **Vite** for fast development and building

## Quick Start 🚀

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/smila-bus-time.git
cd smila-bus-time
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment 🌍

### Netlify (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Build settings are automatically detected from `netlify.toml`
   - Click "Deploy site"

### Vercel

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel --prod
```

### Other Static Hosting

The built files in `dist/` can be deployed to any static hosting service:
- GitHub Pages
- Firebase Hosting
- Surge.sh
- Railway
- Render

## Project Structure 📁

```
smila-bus-time/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── BusMap.tsx       # Interactive map component
│   ├── BusSchedule.tsx  # Schedule display
│   ├── SmilaSchedule.tsx # Main schedule with real data
│   └── ...
├── styles/              # Global styles
│   └── globals.css      # Tailwind CSS and custom styles
├── public/              # Static assets
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── package.json         # Dependencies and scripts
```

## Bus Routes Data 🚌

Current routes include:
- **Route 3**: АС-2 — Вул. Волошкова
- **Route 4**: Тимурівець — Вул. Петра Сагайдачного
- **Route 5**: БК СЕМЗ — Вул. Федорова
- **Route 17**: Ст. Шевченка — АС-1
- **Route 30**: Ст. Шевченка — АС-1 (extended)
- **Route 32**: Ст. Шевченка — КНП "Смілянська міська лікарня"
- **Route 302**: Ст. Шевченка — м. Черкаси

## Contributing 🤝

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits 👨‍💻

**Original Developer**: [Yaroslav Hohulov](https://www.instagram.com/googlove_official/)
- 🚀 Feedback: [Telegram](https://t.me/flame4ost)
- 📺 Channel: [Sergiy Ananko](https://t.me/serhii_ananko)

**Created**: June 20, 2022  
**Last Update**: January 2025

## Support 💖

If you find this project helpful, consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📱 Sharing with friends

---

Made with ❤️ for the people of Smila, Ukraine 🇺🇦
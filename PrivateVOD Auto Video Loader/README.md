# PrivateVOD Auto Video Loader

A TamperMonkey script that automatically loads video players on PrivateVOD.com without autoplay. No more clicking the play button - videos load instantly but don't start playing automatically.

## 🚀 Features

- **⚡ Auto-Loading**: Automatically loads video players without clicking play button
- **⏸️ No Autoplay**: Prevents videos from starting automatically - you control when to play
- **🎯 Smart Detection**: Waits for required functions to be available in real-time
- **🔧 iframe Modification**: Disables autoplay by modifying iframe URL parameters
- **⚡ Instant Execution**: Loads as soon as conditions are met - no delays

## 🎬 How It Works

### Real-Time Function Detection
1. **Waits for required functions** (`loadPlayer`, `AEVideoPlayer`, jQuery) to be available
2. **Calls `loadPlayer()`** immediately when all conditions are met
3. **Modifies iframe URL** after player loads to disable autoplay
4. **No function overriding** - preserves all original functionality

### Technical Flow
```
Page Load → Wait for Functions → Call loadPlayer() → Modify iframe URL → Done
```

## 📦 Installation

### One-Click Install
[![Install PrivateVOD Auto Video Loader](https://img.shields.io/badge/Install-Script-green?style=for-the-badge&logo=tampermonkey)](https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Auto%20Video%20Loader/privatevod%20auto%20video%20loader.user.js)

### Manual Installation
1. **Install TamperMonkey** browser extension
2. **Click the install link above**
3. **TamperMonkey will open** - click "Install"
4. **Done!** - Script will work on all video pages

## 🎯 Usage

### Automatic
- **Just visit any video page** - the script runs automatically
- **Video player loads instantly** - no clicking required
- **Video doesn't start playing** - you control when to play

## 🔧 Technical Details

### Video Player Architecture
```
Current Site: www.privatevod.com
Video Host: www.adultempire.com/gw/player/
```

### What the Script Does
- **Detects video pages** by URL pattern (`*video.html*`, `*videos.html*`)
- **Waits for functions** to be available (no arbitrary delays)
- **Calls `loadPlayer()`** directly when ready
- **Modifies iframe URL** to change `&autoplay=true` to `&autoplay=false`

### Security & Compatibility
- ✅ **Chrome Extension Safe** - Works with all browsers
- ✅ **No Function Overriding** - Preserves original functionality
- ✅ **Real-time Detection** - No hardcoded delays

## 🌐 Browser Compatibility

- ✅ **Chrome** (with TamperMonkey)
- ✅ **Firefox** (with TamperMonkey) 
- ✅ **Edge** (with TamperMonkey)
- ✅ **Safari** (with TamperMonkey)

## 🐛 Troubleshooting

### Script Not Working?
1. **Check URL** - Make sure you're on a video page (`video.html` or `videos.html`)
2. **Check TamperMonkey** - Ensure the extension is installed and enabled
3. **Check Console** - Open Developer Tools (F12) and look for error messages
4. **Refresh Page** - Try reloading the page

### Common Issues
- **"Script not running"** → Check if you're on a video page
- **"Functions not found"** → Wait a moment for the page to fully load
- **"No iframe found"** → The script waits 500ms for iframe creation

## 📝 License

This script is for educational and research purposes only. Use responsibly and in accordance with the website's terms of service.

## 🤝 Contributing

Found a bug or want to improve the script? Feel free to submit issues or pull requests!

---

**Made with ❤️ by [SQ Tech](https://sqtech.dev) for better video browsing experience**

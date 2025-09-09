# PrivateVOD Auto Favourite Video

A TamperMonkey script that automatically favourites videos on PrivateVOD.com when they are not already favourited. Simple and efficient - just checks once when the page loads.

## 🚀 Features

- **⚡ Auto-Favourite**: Automatically favourites videos when not already favourited
- **🎯 Simple Detection**: Waits for favourite button to appear
- **⚡ One-Time Check**: Checks status once when page loads
- **🔄 Smart Waiting**: Waits for button to be available
- **🛡️ No Over-Processing**: Simple, efficient approach

## 🎬 How It Works

### Simple Detection
1. **Page loads** → Script starts
2. **Waits for favourite button** to appear
3. **Checks current status** - is it favourited?
4. **Auto-favourites** if not already favourited
5. **Done** - No more processing

### Technical Flow
```
Page Load → Wait for Button → Check Status → Auto-Favourite (if needed) → Stop
```

## 📦 Installation

### Method 1: Direct Install (Recommended)
1. **Install TamperMonkey** browser extension
2. **Click this link**: [Install PrivateVOD Auto Favourite Video](https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Auto%20Favourite%20Video/privatevod%20auto%20favourite%20video.user.js)
3. **TamperMonkey will open** - click "Install"
4. **Done!** - Script will work on all video pages

### Method 2: Manual Installation
1. **Install TamperMonkey** browser extension
2. **Open TamperMonkey Dashboard**
3. **Click "Create a new script"**
4. **Copy and paste** the code from `privatevod auto favourite video.user.js`
5. **Save** (Ctrl+S)
6. **Visit any video page** on PrivateVOD.com

## 🎯 Usage

### Automatic
- **Just visit any video page** - the script runs automatically
- **Video gets favourited** if not already favourited
- **No manual action required** - completely automated

## 🔧 Technical Details

### Button Detection
- **Selector**: `a[onclick*="ToggleProductFavorite"]`
- **Status Check**: `active` class indicates favourited status
- **Simple Waiting**: Checks every 100ms until button appears

### What the Script Does
- **Detects video pages** by URL pattern (`*video*.html`, `*videos*.html`)
- **Waits for favourite button** to appear
- **Checks favourite status** using `active` class
- **Clicks button** if not already favourited
- **Stops** - No more processing

### Efficiency Features
- ✅ **One-Time Check** - Only checks when page loads
- ✅ **Simple Waiting** - Waits for button to appear
- ✅ **No Over-Processing** - Stops after favouriting
- ✅ **Lightweight** - Minimal resource usage

## 🌐 Browser Compatibility

- ✅ **Chrome** (with TamperMonkey)
- ✅ **Firefox** (with TamperMonkey) 
- ✅ **Edge** (with TamperMonkey)
- ✅ **Safari** (with TamperMonkey)

## 🐛 Troubleshooting

### Script Not Working?
1. **Check URL** - Make sure you're on a video page (`video.html` or `videos.html`)
2. **Check TamperMonkey** - Ensure the extension is installed and enabled
3. **Check Console** - Open Developer Tools (F12) and look for messages
4. **Refresh Page** - Try reloading the page

### Common Issues
- **"Button not found"** → Wait for page to fully load
- **"Already favourited"** → Video is already favourited, no action needed
- **"Auto-favouriting"** → Script is working and favouriting the video

## 📝 License

This script is for educational and research purposes only. Use responsibly and in accordance with the website's terms of service.

## 🤝 Contributing

Found a bug or want to improve the script? Feel free to submit issues or pull requests!

---

**Made with ❤️ by [SQ Tech](https://sqtech.dev) for better video browsing experience**

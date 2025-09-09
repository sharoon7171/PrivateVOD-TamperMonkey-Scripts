# PrivateVOD Favourite & Like Tracker

A TamperMonkey script that tracks favourite and like status changes on PrivateVOD.com and stores scene IDs in localStorage with real-time updates. Works independently of auto-favourite functionality.

## 🚀 Features

- **👀 Real-Time Tracking**: Monitors favourite and like button status changes
- **💾 Local Storage**: Stores scene IDs when favourited/unfavourited and liked/unliked
- **🔄 Instant Updates**: Updates storage immediately when status changes
- **🎯 Scene ID Detection**: Automatically extracts scene IDs from URLs
- **🖥️ HTML Management Interface**: Beautiful web interface for managing favourites and likes
- **🛠️ Console Commands**: Advanced commands for power users
- **⚙️ User Control**: Can be enabled/disabled via configuration

## 🎬 How It Works

### Real-Time Tracking
1. **Page loads** → Script starts monitoring
2. **Finds favourite button** → Sets up real-time observer
3. **Status changes** → Updates storage instantly
4. **Manual clicks** → Storage updates automatically
5. **Page refresh** → Continues monitoring

### Technical Flow
```
Page Load → Find Button → Setup Observer → Monitor Changes → Update Storage
```

## 📦 Installation

### Method 1: Direct Install (Recommended)
1. **Install TamperMonkey** browser extension
2. **Click this link**: [Install PrivateVOD Favourite & Like Tracker](https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Favourite%20%26%20Like%20Tracker/privatevod%20favourite%20and%20like%20tracker.user.js)
3. **TamperMonkey will open** - click "Install"
4. **Done!** - Script will work on all video pages

### Method 2: Manual Installation
1. **Install TamperMonkey** browser extension
2. **Open TamperMonkey Dashboard**
3. **Click "Create a new script"**
4. **Copy and paste** the code from `privatevod favourite and like tracker.user.js`
5. **Save** (Ctrl+S)
6. **Visit any video page** on PrivateVOD.com

## 🎯 Usage

### Automatic
- **Just visit any video page** - the script starts tracking automatically
- **Click favourite button** - storage updates instantly
- **No manual action required** - completely automated tracking

## ⚙️ Configuration

### Local Storage Settings
You can modify the script configuration at the top of the file:

```javascript
const CONFIG = {
    enableLocalStorage: true,  // Set to false to disable local storage tracking
    storageKey: 'privatevod_favourites'
};
```

### Options
- **`enableLocalStorage`**: `true` to track scene IDs, `false` to disable
- **`storageKey`**: The localStorage key name (default: `'privatevod_favourites'`)

### Example Scene IDs
Based on the URLs you provided:
- `1702789` - Maya Rose and Vanessa Hillz scene
- `3237184` - You Owe Me (My Pervy Family) scene

## 🗂️ Local Storage Management

### Web Interface (Recommended)
Open the HTML manager for an easy-to-use interface:

```javascript
// Open HTML management interface
PrivateVODFavourites.openManager()
```

**Features:**
- 📊 **Visual Interface** - See all scenes in a clean, modern list
- 🗑️ **Remove Scenes** - Easy removal with individual buttons
- 📤 **Export Data** - Download your favourites as JSON backup
- 📥 **Import Data** - Restore from backup files
- 🔗 **Open Scenes** - Click to open scenes directly in new tab
- 📈 **Statistics** - See total count and storage usage
- 📋 **Console Commands** - Built-in instructions for advanced users
- 🎨 **Clean Design** - No emoji issues, professional appearance

### Console Commands
For advanced users, open browser console (F12) and use these commands:

```javascript
// View all favourited scenes
PrivateVODFavourites.list()

// Clear all favourites
PrivateVODFavourites.clear()

// Delete specific scene
PrivateVODFavourites.delete("1702789")

// Add specific scene manually
PrivateVODFavourites.add("123456")

// Remove specific scene manually
PrivateVODFavourites.remove("123456")

// Show current status (debug)
PrivateVODFavourites.status()

// View current configuration
PrivateVODFavourites.config
```

### Storage Location
- **Browser**: Developer Tools → Application → Local Storage → `privatevod_favourites`
- **Format**: JSON array of scene IDs as strings
- **Example**: `["1702787", "1702789", "3237184"]`

## 🔧 Technical Details

### Button Detection
- **Selector**: `a[onclick*="ToggleProductFavorite"]`
- **Status Check**: `active` class indicates favourited status
- **Real-Time Monitoring**: MutationObserver watches for class changes

### Local Storage Features
- **Storage Key**: `privatevod_favourites`
- **Data Format**: Array of scene IDs as strings
- **Scene ID Extraction**: Extracts from URL pattern `/(\d+)/`
- **Real-Time Updates**: MutationObserver watches for class changes
- **User Control**: Set `CONFIG.enableLocalStorage = false` to disable

### What the Script Does
- **Detects video pages** by URL pattern (`*video*.html`, `*videos*.html`)
- **Waits for favourite button** to appear
- **Checks favourite status** using `active` class
- **Extracts scene ID** from URL (e.g., `1702789`, `3237184`)
- **Updates local storage** with scene ID status
- **Sets up real-time observer** for status changes
- **Monitors changes** - Updates storage instantly when status changes
- **Provides HTML interface** - Beautiful management interface via `openManager()`
- **Smart logging** - Only shows meaningful add/remove messages

### Efficiency Features
- ✅ **Real-Time Monitoring** - Watches for status changes
- ✅ **Local Storage** - Optional scene ID tracking
- ✅ **HTML Management** - Beautiful interface for easy management
- ✅ **Smart Logging** - Clean console output, no spam
- ✅ **User Control** - Can disable storage if desired
- ✅ **Independent Operation** - Works with or without auto-favourite
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
- **"Storage not working"** → Check if `CONFIG.enableLocalStorage = true`
- **"Can't clear storage"** → Use `PrivateVODFavourites.clear()` in console or HTML interface
- **"Scene not found"** → Use `PrivateVODFavourites.list()` to see current scenes
- **"Storage full"** → Browser localStorage has limits, clear old data
- **"HTML interface not opening"** → Check if popups are blocked, allow popups for the site
- **"Broken emojis in interface"** → Fixed in latest version, no emoji issues

## 📝 License

This script is for educational and research purposes only. Use responsibly and in accordance with the website's terms of service.

## 🤝 Contributing

Found a bug or want to improve the script? Feel free to submit issues or pull requests!

---

**Made with ❤️ by [SQ Tech](https://sqtech.dev) for better video browsing experience**

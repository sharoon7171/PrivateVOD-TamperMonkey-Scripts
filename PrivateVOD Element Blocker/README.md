# PrivateVOD Element Blocker

A Tampermonkey userscript that automatically removes unwanted elements from PrivateVOD video pages.

## Features

- **Automatically blocks unwanted elements** containing keywords: "Scene", "HD", "Stream"
- **Targets specific cards** with class `card m-2`
- **Continuous monitoring** - runs every 2 seconds to catch dynamically added content
- **Console logging** - shows what elements are being blocked
- **Lightweight** - minimal performance impact

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) browser extension
2. Click on the Tampermonkey icon in your browser
3. Go to "Dashboard" → "Utilities" → "Install from URL"
4. Paste this URL: `https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Element%20Blocker/privatevod%20element%20blocker.user.js`
5. Click "Install"

## How it works

1. **Scans for cards** - Looks for elements with class `card m-2`
2. **Checks content** - Examines all divs within those cards
3. **Blocks unwanted** - Removes any div containing "Scene", "HD", or "Stream"
4. **Logs activity** - Shows what's being blocked in the console
5. **Continuous monitoring** - Keeps checking for new unwanted elements

## Console Output

The script provides detailed logging:
- `🛡️ PrivateVOD Element Blocker script loaded`
- `🎯 Found X cards to check`
- `🚫 Blocking unwanted element: [element text]`
- `✅ Blocked X unwanted elements from cards`

## Compatibility

- **Sites:** privatevod.com, www.privatevod.com
- **Pages:** video.html, videos.html
- **Browsers:** Chrome, Firefox, Edge, Safari (with Tampermonkey)

## Version History

- **v1.0** - Initial release with basic element blocking functionality

## Support

For issues or feature requests, please visit the [GitHub repository](https://github.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts).

# PrivateVOD Element Mover

A TamperMonkey script that moves the user-actions div (containing 4K, Favorite, Like, and Screenshots buttons) and video metadata container (release date, studio, director, length, tags) inside the purchase-options div with a professional single-row layout for seamless integration.

## Features

- **Network-level interception** - Modifies HTML before it reaches the browser
- **Zero flickering** - Changes appear instantly as the page loads
- **Professional layout** - User-actions and metadata with clean single-row design
- **Dual approach** - Uses both fetch() and XMLHttpRequest interception
- **Fallback protection** - DOM manipulation as backup if network interception fails
- **Comprehensive coverage** - Works on all PrivateVOD video pages

## How It Works

1. **Intercepts network requests** at the document-start phase
2. **Modifies HTML content** before it's parsed by the browser
3. **Wraps user-actions and metadata in professional layout** with single-row design
4. **Moves styled elements** to the beginning of purchase-options div
5. **Returns modified HTML** to the browser for instant rendering

## Installation

### One-Click Install
[![Install PrivateVOD Element Mover](https://img.shields.io/badge/Install-Script-green?style=for-the-badge&logo=tampermonkey)](https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Element%20Mover/privatevod%20element%20mover.user.js)

### Manual Installation
1. Install TamperMonkey browser extension
2. Click the install link above
3. TamperMonkey will open - click "Install"
4. Visit any PrivateVOD video page
5. The user-actions and metadata will appear inside the purchase options area

## Technical Details

- **Target Elements**: `.user-actions` → `#purchase-options`
- **Method**: Network request interception + HTML modification
- **Fallback**: DOM manipulation if network interception fails
- **Performance**: Zero impact - changes happen before page render

## Compatibility

- Works on all PrivateVOD video pages
- Compatible with all modern browsers
- No conflicts with other TamperMonkey scripts

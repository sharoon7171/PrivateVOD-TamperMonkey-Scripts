# PrivateVOD Element Mover

A TamperMonkey script that moves user-actions and video metadata into purchase options with a clean 2-row layout for better organization.

## Features

- **DOM manipulation** - Works on already-loaded pages
- **2-row layout** - Text-only metadata on top, linked metadata below
- **Basic button styling** - Clean, simple appearance
- **Automatic detection** - Finds and moves elements automatically
- **Separate cards** - Metadata and user actions in different cards
- **Comprehensive coverage** - Works on all PrivateVOD video pages

## How It Works

1. **Waits for elements** to be available in the DOM
2. **Finds metadata container** (.col-sm-5) with all metadata divs
3. **Separates metadata** into text-only and linked categories
4. **Creates two cards** - one for metadata, one for user actions
5. **Moves elements** to the purchase-options area with clean styling

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

- **Target Elements**: `.col-sm-5` metadata container + `.user-actions` → `#purchase-options`
- **Method**: DOM manipulation with element waiting
- **Layout**: 2-row metadata (text-only + linked) + user actions card
- **Styling**: Basic button appearance with clean borders
- **Performance**: Lightweight - runs after page load

## Compatibility

- Works on all PrivateVOD video pages
- Compatible with all modern browsers
- No conflicts with other TamperMonkey scripts

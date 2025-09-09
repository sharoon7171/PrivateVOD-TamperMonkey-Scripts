# PrivateVOD Screenshot Gallery

A TamperMonkey script that automatically creates a screenshot gallery above the scenes section on PrivateVOD pages.

## Features

- **Instant Loading**: Gallery appears immediately when page loads, no delay
- **6 Images Per Row**: Perfect desktop layout with responsive design
- **Full-Width Layout**: Uses entire browser width for maximum space
- **Original Aspect Ratio**: No cropping, maintains image proportions
- **Click to View**: Click any thumbnail to open full-size image in new tab
- **Hover Effects**: Smooth scaling animation on hover
- **Responsive Design**: Adapts to different screen sizes
- **Error Handling**: Broken images are automatically hidden

## Installation

### Method 1: Direct Install (Recommended)
1. Install [TamperMonkey](https://www.tampermonkey.net/) browser extension
2. Click on this link: [Install Screenshot Gallery Script](https://github.com/yourusername/PrivateVOD-TamperMonkey-Scripts/raw/main/PrivateVOD%20Screenshot%20Gallery/privatevod%20screenshot%20gallery.user.js)
3. TamperMonkey will automatically detect the script and show an installation dialog
4. Click "Install" to add the script

### Method 2: Manual Install
1. Install [TamperMonkey](https://www.tampermonkey.net/) browser extension
2. Open TamperMonkey dashboard
3. Click "Create a new script"
4. Delete the default content
5. Copy the entire code from `privatevod screenshot gallery.user.js`
6. Paste the code into the editor
7. Press Ctrl+S (or Cmd+S) to save
8. The script is now active on all PrivateVOD pages

### Verification
- Visit any PrivateVOD video page
- You should see a "Screenshots" gallery appear above the scenes section
- The gallery will show 6 images per row on desktop

## How It Works

The script:
1. Scans the page for the `carouselActive` JavaScript function
2. Extracts all hardcoded screenshot URLs from the function
3. Creates a responsive grid gallery above the scenes section
4. Runs instantly on page load with no delays

## Gallery Layout

- **Desktop**: 6 images per row (col-md-2)
- **Tablet**: 3 images per row (col-sm-4) 
- **Mobile**: 2 images per row (col-6)

## Technical Details

- **No Dependencies**: Pure JavaScript, no external libraries
- **Performance**: Lightweight and fast
- **Compatibility**: Works with all PrivateVOD pages
- **Auto-Update**: Detects page navigation and recreates gallery

## Usage

Once installed, the script runs automatically on all PrivateVOD pages. No user interaction required - the gallery appears instantly when you visit any video page with screenshots.

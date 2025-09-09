# PrivateVOD Hide Favourite Videos

A Tampermonkey userscript that automatically hides grid items containing favourited scene IDs from localStorage with real-time DOM manipulation.

## Features

- **Real-time Hiding**: Automatically hides grid items containing favourited scene IDs
- **Storage Monitoring**: Instantly updates when favourites are added/removed from storage
- **Storage Integration**: Uses the same localStorage as the Favourite Tracker script
- **Console Commands**: Provides console functions for manual control

## How It Works

1. **Reads Favourites**: Gets favourited scene IDs from localStorage (`privatevod_favourites`)
2. **Finds Grid Items**: Locates all `.grid-item` elements on the page
3. **Extracts Scene IDs**: Gets scene ID from multiple sources:
   - `data-scene-id` attribute (grid view)
   - Element ID like "ascene_1749438" (grid view)  
   - href URLs like "/1749438/private-vod-scene-1-streaming-scene-video.html" (list view)
4. **Hides Matches**: Hides grid items that contain favourited scene IDs
5. **Storage Monitoring**: Instantly updates when favourites are added/removed from storage

## Installation

1. Install Tampermonkey browser extension
2. Click on the script file and install it
3. The script will automatically start working on PrivateVOD pages

## Console Commands

Open browser console (F12) and use these commands:

```javascript
// Manually process all grid items
PrivateVODHideFavourites.process()

// Show all hidden elements (cleanup)
PrivateVODHideFavourites.showAll()

// View configuration
PrivateVODHideFavourites.config
```

## Configuration

The script uses these default settings:

```javascript
const CONFIG = {
    storageKey: 'privatevod_favourites',    // localStorage key for favourites
    hideClass: 'privatevod-hidden-favourite', // CSS class for hidden elements
    debugMode: false                        // Enable debug logging
};
```

## Integration

This script works seamlessly with:
- **PrivateVOD Favourite & Like Tracker**: Uses the same localStorage data
- **Other PrivateVOD Scripts**: Compatible with existing scripts

## Technical Details

- **Target Elements**: `.grid-item` containers (supports both grid and list views)
- **Storage**: Uses `localStorage.getItem('privatevod_favourites')`
- **Storage Monitoring**: Watches for localStorage changes for instant updates
- **Performance**: Efficient processing with minimal impact

## Troubleshooting

1. **Script not working**: Check if Favourite Tracker script is installed and has data
2. **Elements not hiding**: Verify scene IDs match between storage and DOM
3. **Not updating**: Check if storage changes are being detected properly

## Version History

- **v1.0**: Initial release with real-time hiding functionality

# PrivateVOD Hide Liked Videos

A Tampermonkey userscript that hides grid items containing ONLY liked (not favourited) scene IDs from localStorage with real-time DOM manipulation.

## Features

- **Smart Hiding**: Hides videos that are liked BUT NOT favourited
- **Storage Monitoring**: Instantly updates when likes/favourites are added/removed from storage
- **Storage Integration**: Uses the same localStorage as the Favourite & Like Tracker script
- **Console Commands**: Provides console functions for manual control

## How It Works

1. **Reads Data**: Gets favourited and liked scene IDs from localStorage
2. **Finds Grid Items**: Locates all `.grid-item` elements on the page
3. **Extracts Scene IDs**: Gets scene ID from multiple sources:
   - `data-scene-id` attribute (grid view)
   - Element ID like "ascene_1749438" (grid view)
   - href URLs like "/1749438/private-vod-scene-1-streaming-scene-video.html" (list view)
4. **Smart Logic**: Hides only videos that are liked but NOT favourited
5. **Storage Monitoring**: Instantly updates when storage changes

## Logic Rules

### Hide Videos When:
- ✅ Video is **liked** AND **not favourited**

### Show Videos When:
- ❌ Video is **not liked** (regardless of favourite status)
- ❌ Video is **both liked AND favourited** (favourited takes priority)

## Installation

1. Install Tampermonkey browser extension
2. Click on the script file and install it
3. The script will automatically start working on PrivateVOD pages

## Console Commands

Open browser console (F12) and use these commands:

```javascript
// Manually process all grid items
PrivateVODHideLiked.process()

// Show all hidden elements (cleanup)
PrivateVODHideLiked.showAll()

// View configuration
PrivateVODHideLiked.config
```

## Configuration

The script uses these default settings:

```javascript
const CONFIG = {
    favouritesStorageKey: 'privatevod_favourites',    // localStorage key for favourites
    likesStorageKey: 'privatevod_likes',              // localStorage key for likes
    hideClass: 'privatevod-hidden-liked',             // CSS class for hidden elements
    debugMode: false                                  // Enable debug logging
};
```

## Integration

This script works seamlessly with:
- **PrivateVOD Favourite & Like Tracker**: Uses the same localStorage data
- **PrivateVOD Hide Favourite Videos**: Works alongside (different hiding logic)
- **Other PrivateVOD Scripts**: Compatible with existing scripts

## Examples

### Scenario 1: Video is only liked
- **Liked**: ✅ Yes
- **Favourited**: ❌ No
- **Result**: 🚫 **HIDDEN**

### Scenario 2: Video is only favourited
- **Liked**: ❌ No
- **Favourited**: ✅ Yes
- **Result**: 👁️ **SHOWN**

### Scenario 3: Video is both liked and favourited
- **Liked**: ✅ Yes
- **Favourited**: ✅ Yes
- **Result**: 👁️ **SHOWN** (favourited takes priority)

### Scenario 4: Video is neither liked nor favourited
- **Liked**: ❌ No
- **Favourited**: ❌ No
- **Result**: 👁️ **SHOWN**

## Technical Details

- **Target Elements**: `.grid-item` containers (supports both grid and list views)
- **Storage**: Uses `localStorage.getItem('privatevod_favourites')` and `localStorage.getItem('privatevod_likes')`
- **Storage Monitoring**: Watches for localStorage changes for instant updates
- **Performance**: Efficient processing with minimal impact

## Troubleshooting

1. **Script not working**: Check if Favourite & Like Tracker script is installed and has data
2. **Elements not hiding**: Verify scene IDs match between storage and DOM
3. **Not updating**: Check if storage changes are being detected properly

## Version History

- **v1.0**: Initial release with smart liked-only hiding functionality

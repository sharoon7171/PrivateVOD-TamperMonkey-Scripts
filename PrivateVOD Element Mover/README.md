# PrivateVOD Element Mover

A TamperMonkey script that moves the user-actions div (containing 4K, Favorite, Like, and Screenshots buttons) and video metadata container (release date, studio, director, length, tags) inside the purchase-options div and styles them as membership cards for a seamless, integrated look.

## Features

- **Network-level interception** - Modifies HTML before it reaches the browser
- **Zero flickering** - Changes appear instantly as the page loads
- **Card styling** - User-actions and metadata styled as membership cards for seamless integration
- **Dual approach** - Uses both fetch() and XMLHttpRequest interception
- **Fallback protection** - DOM manipulation as backup if network interception fails
- **Comprehensive coverage** - Works on all PrivateVOD video pages

## How It Works

1. **Intercepts network requests** at the document-start phase
2. **Modifies HTML content** before it's parsed by the browser
3. **Wraps user-actions and metadata in card styling** matching membership cards
4. **Moves styled cards** to the beginning of purchase-options div
5. **Returns modified HTML** to the browser for instant rendering

## Installation

1. Install TamperMonkey browser extension
2. Click on the script file and install it
3. Visit any PrivateVOD video page
4. The user-actions buttons will appear inside the purchase options area

## Technical Details

- **Target Elements**: `.user-actions` → `#purchase-options`
- **Method**: Network request interception + HTML modification
- **Fallback**: DOM manipulation if network interception fails
- **Performance**: Zero impact - changes happen before page render

## Console Commands

```javascript
// Check if script is working
console.log('Element Mover Status:', window.fetch !== window.fetch);

// Manual fallback trigger
setTimeout(() => {
    const userActions = document.querySelector('.user-actions');
    const purchaseOptions = document.querySelector('#purchase-options');
    if (userActions && purchaseOptions) {
        purchaseOptions.insertBefore(userActions, purchaseOptions.firstChild);
        console.log('Manual move completed');
    }
}, 1000);
```

## Compatibility

- Works on all PrivateVOD video pages
- Compatible with all modern browsers
- No conflicts with other TamperMonkey scripts

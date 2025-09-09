// ==UserScript==
// @name         PrivateVOD Auto Favourite Video
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically favourites videos when not already favourited
// @author       SQ Tech
// @homepageURL  https://sqtech.dev
// @match        https://www.privatevod.com/*video.html*
// @match        https://www.privatevod.com/*videos.html*
// @match        https://privatevod.com/*video.html*
// @match        https://privatevod.com/*videos.html*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    // Debug: Log that script is running
    console.log('❤️ Auto Favourite Video script loaded on:', window.location.href);
    
    // Wait for page to load, then check and favourite
    function waitForFavoriteButton() {
        const favoriteButton = document.querySelector('a[onclick*="ToggleProductFavorite"]');
        
        if (favoriteButton) {
            const isFavorited = favoriteButton.classList.contains('active');
            console.log('❤️ Status:', isFavorited ? 'FAVOURITED' : 'NOT FAVOURITED');
            
            if (!isFavorited) {
                console.log('❤️ Auto-favouriting...');
                favoriteButton.click();
            } else {
                console.log('❤️ Already favourited - no action needed');
            }
        } else {
            // Button not found, try again in 100ms
            setTimeout(waitForFavoriteButton, 100);
        }
    }
    
    // Start checking when page loads
    waitForFavoriteButton();
})();

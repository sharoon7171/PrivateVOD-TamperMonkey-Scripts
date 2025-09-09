// ==UserScript==
// @name         PrivateVOD Auto Favourite Star
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically favourites stars when not already favourited
// @author       SQ Tech
// @homepageURL  https://sqtech.dev
// @match        https://www.privatevod.com/*pornstars.html*
// @match        https://privatevod.com/*pornstars.html*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    // Debug: Log that script is running
    console.log('⭐ Auto Favourite Star script loaded on:', window.location.href);
    
    // Wait for page to load, then check and favourite
    function waitForFavoriteButton() {
        const favoriteButton = document.querySelector('a[onclick*="ToggleProductFavorite"]');
        
        if (favoriteButton) {
            const isFavorited = favoriteButton.classList.contains('active');
            console.log('⭐ Status:', isFavorited ? 'FAVOURITED' : 'NOT FAVOURITED');
            
            if (!isFavorited) {
                console.log('⭐ Auto-favouriting...');
                favoriteButton.click();
            } else {
                console.log('⭐ Already favourited - no action needed');
            }
        } else {
            // Button not found, try again in 100ms
            setTimeout(waitForFavoriteButton, 100);
        }
    }
    
    // Start checking when page loads
    waitForFavoriteButton();
})();

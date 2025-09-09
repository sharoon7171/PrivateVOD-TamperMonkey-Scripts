// ==UserScript==
// @name         PrivateVOD Auto Favourite Video
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Automatically favourites videos when not already favourited and changes active button colors to green
// @author       SQ Tech
// @homepageURL  https://sqtech.dev
// @updateURL    https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Auto%20Favourite%20Video/privatevod%20auto%20favourite%20video.user.js
// @downloadURL  https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Auto%20Favourite%20Video/privatevod%20auto%20favourite%20video.user.js
// @match        https://www.privatevod.com/*video.html*
// @match        https://www.privatevod.com/*videos.html*
// @match        https://privatevod.com/*video.html*
// @match        https://privatevod.com/*videos.html*
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    
    console.log('❤️ Auto Favourite Video script loaded - intercepting network requests');
    
    // Store original fetch function
    const originalFetch = window.fetch;
    
    // Override fetch to intercept HTML responses
    window.fetch = function(...args) {
        const url = args[0];
        
        // Only intercept main document requests
        if (typeof url === 'string' && url.includes('privatevod.com') && !url.includes('.')) {
            console.log('🌐 Intercepting main document request:', url);
            
            return originalFetch.apply(this, args).then(response => {
                // Clone the response to avoid consuming it
                const clonedResponse = response.clone();
                
                // Process the HTML content
                return clonedResponse.text().then(html => {
                    const modifiedHtml = addGreenButtonStyles(html);
                    
                    // Create new response with modified HTML
                    const newResponse = new Response(modifiedHtml, {
                        status: response.status,
                        statusText: response.statusText,
                        headers: response.headers
                    });
                    
                    console.log('✅ HTML modified - green button styles added');
                    return newResponse;
                });
            });
        }
        
        // For all other requests, use original fetch
        return originalFetch.apply(this, args);
    };
    
    // Function to add green button styles to HTML
    function addGreenButtonStyles(html) {
        try {
            // Add CSS styles for green active buttons
            const greenButtonCSS = `
<style>
/* Green Active Button Styles */
a.btn.active[onclick*="ToggleProductFavorite"] {
    background-color: #28a745 !important;
    border-color: #28a745 !important;
    color: white !important;
}

a.btn.active[onclick*="ToggleProductFavorite"]:hover {
    background-color: #218838 !important;
    border-color: #1e7e34 !important;
}

a.btn.active[onclick*="ToggleProductFavorite"]:focus {
    background-color: #28a745 !important;
    border-color: #28a745 !important;
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25) !important;
}

/* SVG icon color for active buttons */
a.btn.active[onclick*="ToggleProductFavorite"] svg {
    color: white !important;
}

a.btn.active[onclick*="ToggleProductFavorite"] svg path {
    fill: white !important;
}
</style>`;
            
            // Insert CSS before closing head tag
            const modifiedHtml = html.replace('</head>', greenButtonCSS + '\n</head>');
            
            console.log('✅ Green button styles added to HTML');
            return modifiedHtml;
            
        } catch (error) {
            console.error('❌ Error adding green button styles:', error);
            return html;
        }
    }
    
    // Also override XMLHttpRequest for additional coverage
    const originalXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function() {
        const xhr = new originalXHR();
        const originalOpen = xhr.open;
        const originalSend = xhr.send;
        
        xhr.open = function(method, url, ...args) {
            this._url = url;
            return originalOpen.apply(this, [method, url, ...args]);
        };
        
        xhr.send = function(...args) {
            // Only intercept main document requests
            if (this._url && this._url.includes('privatevod.com') && !this._url.includes('.')) {
                console.log('🌐 Intercepting XHR request:', this._url);
                
                const originalOnReadyStateChange = this.onreadystatechange;
                
                this.onreadystatechange = function() {
                    if (this.readyState === 4 && this.status === 200) {
                        try {
                            const modifiedHtml = addGreenButtonStyles(this.responseText);
                            
                            // Override responseText getter to return modified HTML
                            Object.defineProperty(this, 'responseText', {
                                get: function() { return modifiedHtml; },
                                configurable: true
                            });
                            
                            console.log('✅ XHR HTML modified - green button styles added');
                        } catch (error) {
                            console.error('❌ Error modifying XHR HTML:', error);
                        }
                    }
                    
                    if (originalOnReadyStateChange) {
                        originalOnReadyStateChange.apply(this, arguments);
                    }
                };
            }
            
            return originalSend.apply(this, args);
        };
        
        return xhr;
    };
    
    // Fallback: DOM manipulation if network interception fails
    function fallbackDOMManipulation() {
        // Add CSS styles
        const style = document.createElement('style');
        style.textContent = `
            a.btn.active[onclick*="ToggleProductFavorite"] {
                background-color: #28a745 !important;
                border-color: #28a745 !important;
                color: white !important;
            }
            a.btn.active[onclick*="ToggleProductFavorite"]:hover {
                background-color: #218838 !important;
                border-color: #1e7e34 !important;
            }
            a.btn.active[onclick*="ToggleProductFavorite"] svg {
                color: white !important;
            }
            a.btn.active[onclick*="ToggleProductFavorite"] svg path {
                fill: white !important;
            }
        `;
        document.head.appendChild(style);
        
        console.log('🔄 Fallback: Green button styles added via DOM manipulation');
    }
    
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
    
    // Run fallback after a short delay to ensure elements are loaded
    setTimeout(fallbackDOMManipulation, 100);
    
    // Start checking when page loads
    waitForFavoriteButton();
})();

// ==UserScript==
// @name         PrivateVOD Element Mover
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Moves user-actions and video metadata divs inside purchase-options div with professional single-row layout
// @author       SQ Tech
// @homepageURL  https://sqtech.dev
// @updateURL    https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Element%20Mover/privatevod%20element%20mover.user.js
// @downloadURL  https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Element%20Mover/privatevod%20element%20mover.user.js
// @match        https://www.privatevod.com/*video.html*
// @match        https://www.privatevod.com/*videos.html*
// @match        https://privatevod.com/*video.html*
// @match        https://privatevod.com/*videos.html*
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    
    console.log('🔄 PrivateVOD Element Mover script loaded - intercepting network requests');
    
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
                    const modifiedHtml = moveUserActionsToPurchaseOptions(html);
                    
                    // Create new response with modified HTML
                    const newResponse = new Response(modifiedHtml, {
                        status: response.status,
                        statusText: response.statusText,
                        headers: response.headers
                    });
                    
                    console.log('✅ HTML modified - user-actions moved to purchase-options');
                    return newResponse;
                });
            });
        }
        
        // For all other requests, use original fetch
        return originalFetch.apply(this, args);
    };
    
    // Function to move user-actions and metadata div inside purchase-options div
    function moveUserActionsToPurchaseOptions(html) {
        try {
            // Find user-actions div with regex
            const userActionsRegex = /<div class="user-actions"[^>]*>.*?<\/div>/s;
            const userActionsMatch = html.match(userActionsRegex);
            
            if (!userActionsMatch) {
                console.log('❌ User-actions div not found in HTML');
                return html;
            }
            
            const userActionsHtml = userActionsMatch[0];
            console.log('🎯 Found user-actions div:', userActionsHtml.substring(0, 100) + '...');
            
            // Find metadata container div with regex
            const metadataRegex = /<div class="container px-0"[^>]*>.*?<\/div>\s*<\/div>\s*<\/div>/s;
            const metadataMatch = html.match(metadataRegex);
            
            let metadataHtml = '';
            if (metadataMatch) {
                metadataHtml = metadataMatch[0];
                console.log('🎯 Found metadata container:', metadataHtml.substring(0, 100) + '...');
            } else {
                console.log('⚠️ Metadata container not found, continuing with user-actions only');
            }
            
            // Find purchase-options div with regex
            const purchaseOptionsRegex = /<div[^>]*id="purchase-options"[^>]*>/;
            const purchaseOptionsMatch = html.match(purchaseOptionsRegex);
            
            if (!purchaseOptionsMatch) {
                console.log('❌ Purchase-options div not found in HTML');
                return html;
            }
            
            const purchaseOptionsStart = purchaseOptionsMatch[0];
            console.log('🎯 Found purchase-options div start:', purchaseOptionsStart);
            
            // Remove user-actions from its original location
            let modifiedHtml = html.replace(userActionsRegex, '');
            
            // Remove metadata from its original location if found
            if (metadataMatch) {
                modifiedHtml = modifiedHtml.replace(metadataRegex, '');
            }
            
            // Create card-styled user-actions div with white background
            const cardStyledUserActions = `
<!-- START USER ACTIONS CARD -->
<div class="card m-2">
    <div class="card-body text-center">
        <h6 class="card-title mb-2">Quick Actions</h6>
        <div class="user-actions d-flex flex-wrap justify-content-center gap-2">
            ${extractUserActionsContent(userActionsHtml)}
        </div>
    </div>
</div>
<!-- END USER ACTIONS CARD -->`;
            
            // Create card-styled metadata div with white background
            let cardStyledMetadata = '';
            if (metadataMatch) {
                cardStyledMetadata = `
<!-- START METADATA CARD -->
<div class="card m-2">
    <div class="card-body">
        <div class="video-metadata d-flex flex-wrap justify-content-between align-items-center">
            ${extractMetadataContent(metadataHtml)}
        </div>
    </div>
</div>
<!-- END METADATA CARD -->`;
            }
            
            // Add styled elements at the beginning of purchase-options div
            const elementsToAdd = cardStyledUserActions + (cardStyledMetadata ? '\n' + cardStyledMetadata : '');
            modifiedHtml = modifiedHtml.replace(
                purchaseOptionsStart,
                purchaseOptionsStart + '\n' + elementsToAdd + '\n'
            );
            
            console.log('✅ Successfully moved and styled user-actions and metadata as membership cards');
            return modifiedHtml;
            
        } catch (error) {
            console.error('❌ Error modifying HTML:', error);
            return html;
        }
    }
    
    // Function to extract content from user-actions div
    function extractUserActionsContent(userActionsHtml) {
        // Extract the inner content (buttons) from the user-actions div
        const contentMatch = userActionsHtml.match(/<div class="user-actions"[^>]*>(.*?)<\/div>/s);
        if (contentMatch) {
            return contentMatch[1].trim();
        }
        return userActionsHtml;
    }
    
    // Function to extract content from metadata container
    function extractMetadataContent(metadataHtml) {
        // Extract the inner content from the metadata container
        const contentMatch = metadataHtml.match(/<div class="container px-0"[^>]*>(.*?)<\/div>\s*<\/div>\s*<\/div>/s);
        if (contentMatch) {
            return contentMatch[1].trim();
        }
        return metadataHtml;
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
                            const modifiedHtml = moveUserActionsToPurchaseOptions(this.responseText);
                            
                            // Override responseText getter to return modified HTML
                            Object.defineProperty(this, 'responseText', {
                                get: function() { return modifiedHtml; },
                                configurable: true
                            });
                            
                            console.log('✅ XHR HTML modified - user-actions moved to purchase-options');
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
        const userActions = document.querySelector('.user-actions');
        const metadataContainer = document.querySelector('.container.px-0');
        const purchaseOptions = document.querySelector('#purchase-options');
        
        if (userActions && purchaseOptions) {
            // Create card-styled container for user-actions
            const userActionsCard = document.createElement('div');
            userActionsCard.className = 'card m-2';
            userActionsCard.innerHTML = `
                <div class="card-body text-center">
                    <h6 class="card-title mb-2">Quick Actions</h6>
                    <div class="user-actions d-flex flex-wrap justify-content-center gap-2">
                        ${userActions.innerHTML}
                    </div>
                </div>
            `;
            
            // Insert the user-actions card at the beginning of purchase-options
            purchaseOptions.insertBefore(userActionsCard, purchaseOptions.firstChild);
            
            // Remove the original user-actions div
            userActions.remove();
            
            console.log('🔄 Fallback: Moved and styled user-actions as membership card via DOM manipulation');
        }
        
        if (metadataContainer && purchaseOptions) {
            // Create card-styled container for metadata
            const metadataCard = document.createElement('div');
            metadataCard.className = 'card m-2';
            metadataCard.innerHTML = `
                <div class="card-body">
                    <div class="video-metadata d-flex flex-wrap justify-content-between align-items-center">
                        ${metadataContainer.innerHTML}
                    </div>
                </div>
            `;
            
            // Insert the metadata card at the beginning of purchase-options
            purchaseOptions.insertBefore(metadataCard, purchaseOptions.firstChild);
            
            // Remove the original metadata container
            metadataContainer.remove();
            
            console.log('🔄 Fallback: Moved and styled metadata as membership card via DOM manipulation');
        }
    }
    
    // Run fallback after a short delay to ensure elements are loaded
    setTimeout(fallbackDOMManipulation, 100);
    
    console.log('🚀 Element Mover ready - monitoring for user-actions and purchase-options elements');
})();

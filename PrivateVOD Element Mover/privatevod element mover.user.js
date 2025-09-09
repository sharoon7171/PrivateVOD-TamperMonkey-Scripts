// ==UserScript==
// @name         PrivateVOD Element Mover
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Moves user-actions div inside purchase-options div at network level for instant, flicker-free movement
// @author       SQ Tech
// @homepageURL  https://sqtech.dev
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
    
    // Function to move user-actions div inside purchase-options div
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
            
            // Add styled user-actions at the beginning of purchase-options div
            modifiedHtml = modifiedHtml.replace(
                purchaseOptionsStart,
                purchaseOptionsStart + '\n' + cardStyledUserActions + '\n'
            );
            
            console.log('✅ Successfully moved and styled user-actions as membership card');
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
        const purchaseOptions = document.querySelector('#purchase-options');
        
        if (userActions && purchaseOptions) {
            // Create card-styled container for user-actions
            const cardContainer = document.createElement('div');
            cardContainer.className = 'card m-2';
            cardContainer.innerHTML = `
                <div class="card-body text-center">
                    <h6 class="card-title mb-2">Quick Actions</h6>
                    <div class="user-actions d-flex flex-wrap justify-content-center gap-2">
                        ${userActions.innerHTML}
                    </div>
                </div>
            `;
            
            // Insert the card at the beginning of purchase-options
            purchaseOptions.insertBefore(cardContainer, purchaseOptions.firstChild);
            
            // Remove the original user-actions div
            userActions.remove();
            
            console.log('🔄 Fallback: Moved and styled user-actions as membership card via DOM manipulation');
        }
    }
    
    // Run fallback after a short delay to ensure elements are loaded
    setTimeout(fallbackDOMManipulation, 100);
    
    console.log('🚀 Element Mover ready - monitoring for user-actions and purchase-options elements');
})();

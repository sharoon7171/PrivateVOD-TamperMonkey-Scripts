// ==UserScript==
// @name         PrivateVOD Element Mover
// @namespace    http://tampermonkey.net/
// @version      1.4
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
            
            // Create single card with both user-actions and metadata in one row
            const combinedCard = `
<!-- START COMBINED CARD -->
<div class="card m-2">
    <div class="card-body">
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <!-- Metadata Section -->
            <div class="video-metadata d-flex flex-wrap align-items-center gap-2">
                ${extractMetadataContent(metadataHtml)}
            </div>
            
            <!-- Divider -->
            <div class="vr opacity-25"></div>
            
            <!-- User Actions Section -->
            <div class="user-actions d-flex flex-wrap align-items-center gap-2">
                ${extractUserActionsContent(userActionsHtml)}
            </div>
        </div>
        
        <style>
            .video-metadata .metadata-btn {
                display: inline-flex;
                align-items: center;
                padding: 0.4rem 0.8rem;
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                border: 1px solid #dee2e6;
                border-radius: 12px;
                font-size: 0.8rem;
                color: #495057;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                transition: all 0.2s ease;
                white-space: nowrap;
                font-weight: 500;
            }
            .video-metadata .metadata-btn:hover {
                background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
                transform: translateY(-1px);
                box-shadow: 0 2px 6px rgba(0,0,0,0.15);
            }
            .video-metadata .metadata-btn strong {
                color: #212529;
                font-weight: 600;
                margin-right: 0.4rem;
            }
            
            .user-actions .btn {
                padding: 0.4rem 0.8rem;
                font-size: 0.8rem;
                border-radius: 12px;
                font-weight: 500;
                transition: all 0.2s ease;
                border: none;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            .user-actions .btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 2px 6px rgba(0,0,0,0.15);
            }
            .user-actions .btn-primary {
                background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
            }
            .user-actions .btn-success {
                background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%);
            }
            .user-actions .btn-secondary {
                background: linear-gradient(135deg, #6c757d 0%, #545b62 100%);
            }
            .user-actions .btn-outline-secondary {
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                color: #495057;
                border: 1px solid #dee2e6;
            }
            .user-actions .btn-outline-secondary:hover {
                background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
                color: #212529;
            }
            
            .vr {
                width: 1px;
                background-color: #dee2e6;
                min-height: 2rem;
            }
            
            @media (max-width: 768px) {
                .d-flex.justify-content-between {
                    flex-direction: column !important;
                    align-items: stretch !important;
                }
                .vr {
                    display: none !important;
                }
                .video-metadata, .user-actions {
                    justify-content: center !important;
                }
            }
        </style>
    </div>
</div>
<!-- END COMBINED CARD -->`;
            
            // Add styled element at the beginning of purchase-options div
            const elementsToAdd = combinedCard;
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
    
    // Function to extract and clean metadata content for button-style display
    function extractMetadataContent(metadataHtml) {
        // Extract the inner content from the metadata container
        const contentMatch = metadataHtml.match(/<div class="container px-0"[^>]*>(.*?)<\/div>\s*<\/div>\s*<\/div>/s);
        if (contentMatch) {
            let content = contentMatch[1].trim();
            
            // Parse the HTML to extract individual metadata items
            const metadataItems = [];
            
            // Extract release date
            const releaseMatch = content.match(/<div class="release-date">.*?<span class="font-weight-bold mr-2">Released:<\/span>(.*?)<\/div>/s);
            if (releaseMatch) {
                metadataItems.push(`<span class="metadata-btn"><strong>Released:</strong> ${releaseMatch[1].trim()}</span>`);
            }
            
            // Extract studio
            const studioMatch = content.match(/<div class="studio">.*?<span class="font-weight-bold mr-2">Studio:<\/span><a[^>]*>(.*?)<\/a>/s);
            if (studioMatch) {
                metadataItems.push(`<span class="metadata-btn"><strong>Studio:</strong> ${studioMatch[1].trim()}</span>`);
            }
            
            // Extract director
            const directorMatch = content.match(/<div class="director">.*?<span class="font-weight-bold mr-2">Director:<\/span><a[^>]*>(.*?)<\/a>/s);
            if (directorMatch) {
                metadataItems.push(`<span class="metadata-btn"><strong>Director:</strong> ${directorMatch[1].trim()}</span>`);
            }
            
            // Extract length
            const lengthMatch = content.match(/<div class="release-date">.*?<span class="font-weight-bold mr-2">Length:<\/span>(.*?)<\/div>/s);
            if (lengthMatch) {
                metadataItems.push(`<span class="metadata-btn"><strong>Length:</strong> ${lengthMatch[1].trim()}</span>`);
            }
            
            return metadataItems.join(' ');
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
    
    
    console.log('🚀 Element Mover ready - monitoring for user-actions and purchase-options elements');
})();

// ==UserScript==
// @name         PrivateVOD Element Mover
// @namespace    http://tampermonkey.net/
// @version      1.5
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
    
    console.log('🔄 PrivateVOD Element Mover script loaded - using DOM manipulation');
    
    // Function to move elements using DOM manipulation
    function moveElementsToPurchaseOptions() {
        const userActions = document.querySelector('.user-actions');
        const metadataContainer = document.querySelector('.container.px-0');
        const purchaseOptions = document.querySelector('#purchase-options');
        
        if (!userActions || !purchaseOptions) {
            console.log('❌ Required elements not found');
            return false;
        }
        
        console.log('🎯 Found user-actions and purchase-options elements');
        
        // Create separate cards for metadata and user actions
        const metadataCard = document.createElement('div');
        metadataCard.className = 'card m-2';
        metadataCard.innerHTML = `
            <div class="card-body">
                <div class="video-metadata d-flex flex-wrap align-items-center gap-2">
                    ${extractMetadataFromDOM(metadataContainer)}
                </div>
            </div>
        `;
        
        const userActionsCard = document.createElement('div');
        userActionsCard.className = 'card m-2';
        userActionsCard.innerHTML = `
            <div class="card-body">
                <div class="user-actions d-flex flex-wrap align-items-center gap-2">
                    ${userActions.innerHTML}
                </div>
            </div>
        `;
        
        // Add CSS styling only for metadata
        const style = document.createElement('style');
        style.textContent = `
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
        `;
        document.head.appendChild(style);
        
        // Insert the cards at the beginning of purchase-options
        purchaseOptions.insertBefore(metadataCard, purchaseOptions.firstChild);
        purchaseOptions.insertBefore(userActionsCard, purchaseOptions.firstChild);
        
        // Remove the original elements
        userActions.remove();
        if (metadataContainer) {
            metadataContainer.remove();
        }
        
        console.log('✅ Successfully moved and styled elements as single card');
        return true;
    }
    
    // Function to extract metadata from DOM elements
    function extractMetadataFromDOM(metadataContainer) {
        if (!metadataContainer) return '';
        
        const metadataItems = [];
        
        // Get all text content and parse it properly
        const allText = metadataContainer.textContent || metadataContainer.innerText || '';
        console.log('📝 Full metadata text:', allText);
        
        // Extract release date
        const releasedMatch = allText.match(/Released:\s*([^\n\r]+)/);
        if (releasedMatch) {
            metadataItems.push(`<span class="metadata-btn"><strong>Released:</strong> ${releasedMatch[1].trim()}</span>`);
        }
        
        // Extract studio
        const studioMatch = allText.match(/Studio:\s*([^\n\r]+)/);
        if (studioMatch) {
            metadataItems.push(`<span class="metadata-btn"><strong>Studio:</strong> ${studioMatch[1].trim()}</span>`);
        }
        
        // Extract director
        const directorMatch = allText.match(/Director:\s*([^\n\r]+)/);
        if (directorMatch) {
            metadataItems.push(`<span class="metadata-btn"><strong>Director:</strong> ${directorMatch[1].trim()}</span>`);
        }
        
        // Extract length
        const lengthMatch = allText.match(/Length:\s*([^\n\r]+)/);
        if (lengthMatch) {
            metadataItems.push(`<span class="metadata-btn"><strong>Length:</strong> ${lengthMatch[1].trim()}</span>`);
        }
        
        console.log('📋 Extracted metadata items:', metadataItems);
        return metadataItems.join(' ');
    }
    
    // Wait for elements to be available and then move them
    function waitForElements() {
        const maxAttempts = 50; // 5 seconds max
        let attempts = 0;
        
        const checkInterval = setInterval(() => {
            attempts++;
            
            if (moveElementsToPurchaseOptions()) {
                clearInterval(checkInterval);
                console.log('🚀 Element Mover completed successfully');
            } else if (attempts >= maxAttempts) {
                clearInterval(checkInterval);
                console.log('❌ Element Mover timeout - elements not found');
            }
        }, 100);
    }
    
    // Start the process
    waitForElements();
    
    
    console.log('🚀 Element Mover ready - monitoring for user-actions and purchase-options elements');
})();

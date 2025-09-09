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
        const purchaseOptions = document.querySelector('#purchase-options');
        
        if (!userActions || !purchaseOptions) {
            console.log('❌ Required elements not found');
            return false;
        }
        
        console.log('🎯 Found user-actions and purchase-options elements');
        
        // Find the col-sm-5 container with all metadata
        const metadataContainer = document.querySelector('.col-sm-5');
        
        if (!metadataContainer) {
            console.log('❌ Metadata container (.col-sm-5) not found');
            return false;
        }
        
        console.log('🎯 Found metadata container (.col-sm-5)');
        
        // Create metadata card with 2 rows
        const metadataCard = document.createElement('div');
        metadataCard.className = 'card m-2';
        metadataCard.innerHTML = `
            <div class="card-body">
                <!-- First row: Text-only metadata -->
                <div class="video-metadata-text d-flex flex-wrap align-items-center gap-2 mb-2">
                    <!-- Text-only metadata will be moved here -->
                </div>
                <!-- Second row: Metadata with links -->
                <div class="video-metadata-links d-flex flex-wrap align-items-center gap-2">
                    <!-- Metadata with links will be moved here -->
                </div>
            </div>
        `;
        
        const textContainer = metadataCard.querySelector('.video-metadata-text');
        const linksContainer = metadataCard.querySelector('.video-metadata-links');
        
        // Move ALL divs from the col-sm-5 container and separate them
        const allMetadataDivs = metadataContainer.querySelectorAll('div');
        allMetadataDivs.forEach(div => {
            const divClone = div.cloneNode(true);
            divClone.className = 'metadata-btn';
            
            // Check if div has links (a tags)
            if (divClone.querySelector('a')) {
                // Has links - put in second row
                linksContainer.appendChild(divClone);
            } else {
                // Text only - put in first row
                textContainer.appendChild(divClone);
            }
        });
        
        // Remove the original metadata container
        metadataContainer.remove();
        
        // Create user actions card
        const userActionsCard = document.createElement('div');
        userActionsCard.className = 'card m-2';
        userActionsCard.innerHTML = `
            <div class="card-body">
                <div class="user-actions d-flex flex-wrap align-items-center gap-2">
                    ${userActions.innerHTML}
                </div>
            </div>
        `;
        
        // Add basic button styling
        const style = document.createElement('style');
        style.textContent = `
            .video-metadata-text .metadata-btn,
            .video-metadata-links .metadata-btn {
                display: inline-block;
                padding: 0.5rem 1rem;
                margin: 0.25rem;
                border: 1px solid #ccc;
                border-radius: 4px;
                background: #f8f9fa;
                text-decoration: none;
            }
            .video-metadata-text .metadata-btn:hover,
            .video-metadata-links .metadata-btn:hover {
                background: #e9ecef;
            }
        `;
        document.head.appendChild(style);
        
        // Insert the cards at the beginning of purchase-options
        purchaseOptions.insertBefore(metadataCard, purchaseOptions.firstChild);
        purchaseOptions.insertBefore(userActionsCard, purchaseOptions.firstChild);
        
        // Remove the original user actions
        userActions.remove();
        
        console.log('✅ Successfully moved individual metadata divs and user actions');
        return true;
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

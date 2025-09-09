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
        
        // Create single card with both user-actions and metadata in one row
        const combinedCard = document.createElement('div');
        combinedCard.className = 'card m-2';
        combinedCard.innerHTML = `
            <div class="card-body">
                <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
                    <!-- Metadata Section -->
                    <div class="video-metadata d-flex flex-wrap align-items-center gap-2">
                        ${extractMetadataFromDOM(metadataContainer)}
                    </div>
                    
                    <!-- Divider -->
                    <div class="vr opacity-25"></div>
                    
                    <!-- User Actions Section -->
                    <div class="user-actions d-flex flex-wrap align-items-center gap-2">
                        ${userActions.innerHTML}
                    </div>
                </div>
            </div>
        `;
        
        // Add CSS styling
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
        `;
        document.head.appendChild(style);
        
        // Insert the combined card at the beginning of purchase-options
        purchaseOptions.insertBefore(combinedCard, purchaseOptions.firstChild);
        
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
        
        // Extract release date
        const releaseDate = metadataContainer.querySelector('.release-date');
        if (releaseDate) {
            const releaseText = releaseDate.textContent.trim();
            const releasedMatch = releaseText.match(/Released:\s*(.+)/);
            if (releasedMatch) {
                metadataItems.push(`<span class="metadata-btn"><strong>Released:</strong> ${releasedMatch[1]}</span>`);
            }
        }
        
        // Extract studio
        const studio = metadataContainer.querySelector('.studio a');
        if (studio) {
            metadataItems.push(`<span class="metadata-btn"><strong>Studio:</strong> ${studio.textContent.trim()}</span>`);
        }
        
        // Extract director
        const director = metadataContainer.querySelector('.director a');
        if (director) {
            metadataItems.push(`<span class="metadata-btn"><strong>Director:</strong> ${director.textContent.trim()}</span>`);
        }
        
        // Extract length
        const length = metadataContainer.querySelector('.release-date');
        if (length) {
            const lengthText = length.textContent.trim();
            const lengthMatch = lengthText.match(/Length:\s*(.+)/);
            if (lengthMatch) {
                metadataItems.push(`<span class="metadata-btn"><strong>Length:</strong> ${lengthMatch[1]}</span>`);
            }
        }
        
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

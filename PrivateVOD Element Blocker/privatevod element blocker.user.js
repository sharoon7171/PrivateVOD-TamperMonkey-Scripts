// ==UserScript==
// @name         PrivateVOD Element Blocker
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes entire cards containing Scene, HD, or Stream keywords
// @author       SQ Tech
// @homepageURL  https://sqtech.dev
// @updateURL    https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Element%20Blocker/privatevod%20element%20blocker.user.js
// @downloadURL  https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Element%20Blocker/privatevod%20element%20blocker.user.js
// @match        https://www.privatevod.com/*video.html*
// @match        https://www.privatevod.com/*videos.html*
// @match        https://privatevod.com/*video.html*
// @match        https://privatevod.com/*videos.html*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    
    console.log('🛡️ PrivateVOD Element Blocker script loaded');
    
    // Function to block unwanted cards completely
    function blockUnwantedElements() {
        const cards = document.querySelectorAll('.card.m-2');
        let blockedCount = 0;
        
        if (cards.length === 0) {
            console.log('❌ No cards with class "card m-2" found');
            return false;
        }
        
        console.log(`🎯 Found ${cards.length} cards to check`);
        
        cards.forEach((card, cardIndex) => {
            const cardText = card.textContent || card.innerText || '';
            
            // Check if entire card contains unwanted keywords
            if (cardText.includes('Scene') || cardText.includes('HD') || cardText.includes('Stream')) {
                console.log(`🚫 Blocking entire card ${cardIndex + 1}:`, cardText.trim().substring(0, 50) + '...');
                card.remove();
                blockedCount++;
            }
        });
        
        if (blockedCount > 0) {
            console.log(`✅ Blocked ${blockedCount} entire cards`);
        } else {
            console.log('✅ No unwanted cards found');
        }
        
        return blockedCount > 0;
    }
    
    // Wait for elements to be available and then block unwanted ones
    function waitForCards() {
        const maxAttempts = 30; // 3 seconds max
        let attempts = 0;
        
        const checkInterval = setInterval(() => {
            attempts++;
            
            if (blockUnwantedElements()) {
                clearInterval(checkInterval);
                console.log('🚀 Element Blocker completed successfully');
            } else if (attempts >= maxAttempts) {
                clearInterval(checkInterval);
                console.log('❌ Element Blocker timeout - no cards found');
            }
        }, 100);
    }
    
    // Start the process
    waitForCards();
    
    // Monitor for dynamically added cards
    function setupCardMonitor() {
        const observer = new MutationObserver((mutations) => {
            let shouldCheck = false;
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            if (node.classList && node.classList.contains('card') && node.classList.contains('m-2')) {
                                shouldCheck = true;
                            } else if (node.querySelector && node.querySelector('.card.m-2')) {
                                shouldCheck = true;
                            }
                        }
                    });
                }
            });
            
            if (shouldCheck) {
                console.log('🔄 New cards detected, checking for unwanted elements');
                blockUnwantedElements();
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        console.log('👀 Card monitor started - watching for new cards');
    }
    
    // Start monitoring after initial check
    setTimeout(setupCardMonitor, 1000);
    
    console.log('🚀 Element Blocker ready - monitoring for unwanted elements');
})();

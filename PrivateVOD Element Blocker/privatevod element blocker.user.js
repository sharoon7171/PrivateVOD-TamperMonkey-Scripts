// ==UserScript==
// @name         PrivateVOD Element Blocker
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes unwanted elements containing Scene, HD, or Stream from cards
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
    
    // Function to block unwanted elements from cards
    function blockUnwantedElements() {
        const cards = document.querySelectorAll('.card.m-2');
        let blockedCount = 0;
        
        if (cards.length === 0) {
            console.log('❌ No cards with class "card m-2" found');
            return false;
        }
        
        console.log(`🎯 Found ${cards.length} cards to check`);
        
        cards.forEach((card, cardIndex) => {
            // Find all divs within the card
            const divs = card.querySelectorAll('div');
            
            divs.forEach(div => {
                const text = div.textContent || div.innerText || '';
                
                // Check if div contains unwanted keywords
                if (text.includes('Scene') || text.includes('HD') || text.includes('Stream')) {
                    console.log(`🚫 Blocking unwanted element from card ${cardIndex + 1}:`, text.trim().substring(0, 50) + '...');
                    div.remove();
                    blockedCount++;
                }
            });
        });
        
        if (blockedCount > 0) {
            console.log(`✅ Blocked ${blockedCount} unwanted elements from cards`);
        } else {
            console.log('✅ No unwanted elements found in cards');
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
    
    // Also run periodically to catch dynamically added cards
    setInterval(() => {
        blockUnwantedElements();
    }, 2000); // Check every 2 seconds
    
    console.log('🚀 Element Blocker ready - monitoring for unwanted elements');
})();

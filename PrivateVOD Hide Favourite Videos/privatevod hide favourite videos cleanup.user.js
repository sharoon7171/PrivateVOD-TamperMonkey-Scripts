// ==UserScript==
// @name         PrivateVOD Hide Favourite Videos - Cleanup
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Cleanup script that shows hidden elements when main script is disabled
// @author       SQ Tech
// @homepageURL  https://sqtech.dev
// @updateURL    https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Hide%20Favourite%20Videos/privatevod%20hide%20favourite%20videos%20cleanup.user.js
// @downloadURL  https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Hide%20Favourite%20Videos/privatevod%20hide%20favourite%20videos%20cleanup.user.js
// @match        https://www.privatevod.com/*
// @match        https://privatevod.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    
    console.log('🧹 PrivateVOD Hide Favourite Videos Cleanup script loaded');
    
    const HIDE_CLASS = 'privatevod-hidden-favourite';
    let lastCheckTime = 0;
    
    // Function to show all hidden elements
    function showAllHiddenElements() {
        const hiddenItems = document.querySelectorAll(`.${HIDE_CLASS}`);
        if (hiddenItems.length > 0) {
            hiddenItems.forEach(item => {
                item.classList.remove(HIDE_CLASS);
                item.style.display = '';
            });
            console.log(`👁️ Cleanup: Shown ${hiddenItems.length} previously hidden elements`);
            return true;
        }
        return false;
    }
    
    // Check if main script is running
    function isMainScriptRunning() {
        return window.PrivateVODHideFavourites && 
               typeof window.PrivateVODHideFavourites.process === 'function';
    }
    
    // Monitor for main script status
    function monitorMainScript() {
        const now = Date.now();
        
        // Only check every 2 seconds to avoid spam
        if (now - lastCheckTime < 2000) {
            setTimeout(monitorMainScript, 1000);
            return;
        }
        
        lastCheckTime = now;
        
        if (!isMainScriptRunning()) {
            // Main script is not running, show all hidden elements
            showAllHiddenElements();
        }
        
        // Continue monitoring
        setTimeout(monitorMainScript, 1000);
    }
    
    // Start monitoring
    monitorMainScript();
    
    // Also listen for page visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            setTimeout(() => {
                if (!isMainScriptRunning()) {
                    showAllHiddenElements();
                }
            }, 500);
        }
    });
    
    // Expose cleanup function globally
    window.PrivateVODCleanup = {
        showAll: showAllHiddenElements,
        check: () => {
            const running = isMainScriptRunning();
            console.log(`🔍 Main script running: ${running}`);
            if (!running) {
                showAllHiddenElements();
            }
            return running;
        }
    };
    
    console.log('🧹 Cleanup monitor started - will show hidden elements if main script is disabled');
    console.log('💡 Use PrivateVODCleanup.showAll() to manually show all hidden elements');
})();

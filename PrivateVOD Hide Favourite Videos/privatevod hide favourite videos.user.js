// ==UserScript==
// @name         PrivateVOD Hide Favourite Videos
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Hides grid items containing favourited scene IDs from localStorage with real-time DOM manipulation
// @author       SQ Tech
// @homepageURL  https://sqtech.dev
// @updateURL    https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Hide%20Favourite%20Videos/privatevod%20hide%20favourite%20videos.user.js
// @downloadURL  https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Hide%20Favourite%20Videos/privatevod%20hide%20favourite%20videos.user.js
// @match        https://www.privatevod.com/*
// @match        https://privatevod.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    
    console.log('👁️ PrivateVOD Hide Favourite Videos script loaded');
    
    // Configuration
    const CONFIG = {
        storageKey: 'privatevod_favourites',
        hideClass: 'privatevod-hidden-favourite',
        debugMode: false,
        toggleKey: 'privatevod_hide_enabled'
    };
    
    // Get script enabled state
    function isScriptEnabled() {
        try {
            const stored = localStorage.getItem(CONFIG.toggleKey);
            return stored !== 'false'; // Default to enabled if not set
        } catch (e) {
            return true; // Default to enabled on error
        }
    }
    
    // Set script enabled state
    function setScriptEnabled(enabled) {
        try {
            localStorage.setItem(CONFIG.toggleKey, enabled.toString());
        } catch (e) {
            console.log('❌ Error saving script state:', e);
        }
    }
    
    // Get favourited scenes from localStorage
    function getFavouritedScenes() {
        try {
            const stored = localStorage.getItem(CONFIG.storageKey);
            return stored ? new Set(JSON.parse(stored)) : new Set();
        } catch (e) {
            console.log('❌ Error reading favourites from localStorage:', e);
            return new Set();
        }
    }
    
    // Hide a grid item by adding CSS class
    function hideGridItem(gridItem) {
        if (!gridItem.classList.contains(CONFIG.hideClass)) {
            gridItem.classList.add(CONFIG.hideClass);
            gridItem.style.display = 'none';
            if (CONFIG.debugMode) {
                console.log('🚫 Hidden grid item:', gridItem);
            }
            return true;
        }
        return false;
    }
    
    // Show a grid item by removing CSS class
    function showGridItem(gridItem) {
        if (gridItem.classList.contains(CONFIG.hideClass)) {
            gridItem.classList.remove(CONFIG.hideClass);
            gridItem.style.display = '';
            if (CONFIG.debugMode) {
                console.log('👁️ Shown grid item:', gridItem);
            }
            return true;
        }
        return false;
    }
    
    // Extract scene ID from grid item
    function getSceneIdFromGridItem(gridItem) {
        // Look for data-scene-id attribute in the article element
        const article = gridItem.querySelector('article[data-scene-id]');
        if (article) {
            return article.getAttribute('data-scene-id');
        }
        
        // Fallback: extract from id attribute like "ascene_1749438"
        const id = gridItem.id;
        if (id && id.startsWith('ascene_')) {
            return id.replace('ascene_', '');
        }
        
        return null;
    }
    
    // Process all grid items and hide/show based on favourites
    function processGridItems() {
        const gridItems = document.querySelectorAll('.grid-item');
        const favouritedScenes = getFavouritedScenes();
        const scriptEnabled = isScriptEnabled();
        let hiddenCount = 0;
        let shownCount = 0;
        
        if (gridItems.length === 0) {
            if (CONFIG.debugMode) {
                console.log('❌ No grid items found');
            }
            return { hidden: 0, shown: 0 };
        }
        
        if (CONFIG.debugMode) {
            console.log(`🎯 Processing ${gridItems.length} grid items`);
            console.log(`💾 Favourited scenes: [${Array.from(favouritedScenes).join(', ')}]`);
            console.log(`🔧 Script enabled: ${scriptEnabled}`);
        }
        
        gridItems.forEach((gridItem, index) => {
            const sceneId = getSceneIdFromGridItem(gridItem);
            
            if (sceneId) {
                const isFavourited = favouritedScenes.has(sceneId);
                
                if (scriptEnabled && isFavourited) {
                    // Hide favourited scenes when script is enabled
                    if (hideGridItem(gridItem)) {
                        hiddenCount++;
                        if (CONFIG.debugMode) {
                            console.log(`🚫 Hidden scene ${sceneId} (item ${index + 1})`);
                        }
                    }
                } else {
                    // Show all scenes when script is disabled or scene not favourited
                    if (showGridItem(gridItem)) {
                        shownCount++;
                        if (CONFIG.debugMode) {
                            console.log(`👁️ Shown scene ${sceneId} (item ${index + 1})`);
                        }
                    }
                }
            } else if (CONFIG.debugMode) {
                console.log(`⚠️ Could not extract scene ID from grid item ${index + 1}`);
            }
        });
        
        if (hiddenCount > 0 || shownCount > 0) {
            console.log(`✅ Processed grid items: ${hiddenCount} hidden, ${shownCount} shown (Script: ${scriptEnabled ? 'ENABLED' : 'DISABLED'})`);
        }
        
        return { hidden: hiddenCount, shown: shownCount };
    }
    
    // Wait for grid items to be available
    function waitForGridItems() {
        const maxAttempts = 30; // 3 seconds max
        let attempts = 0;
        
        const checkInterval = setInterval(() => {
            attempts++;
            const gridItems = document.querySelectorAll('.grid-item');
            
            if (gridItems.length > 0) {
                clearInterval(checkInterval);
                console.log(`🎯 Found ${gridItems.length} grid items`);
                processGridItems();
            } else if (attempts >= maxAttempts) {
                clearInterval(checkInterval);
                console.log('❌ Timeout - no grid items found');
            }
        }, 100);
    }
    
    // Monitor localStorage changes for instant updates
    function setupStorageMonitor() {
        // Listen for storage events (changes from other tabs/windows)
        window.addEventListener('storage', (e) => {
            if (e.key === CONFIG.storageKey) {
                console.log('🔄 Favourites storage changed, updating visibility');
                processGridItems();
            }
        });
        
        // Monitor localStorage changes in the same tab
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            originalSetItem.apply(this, arguments);
            if (key === CONFIG.storageKey) {
                console.log('🔄 Favourites storage updated, updating visibility');
                setTimeout(() => processGridItems(), 10); // Small delay to ensure storage is updated
            }
        };
        
        console.log('👀 Storage monitor started');
    }
    
    
    // Expose functions to global scope for console access
    window.PrivateVODHideFavourites = {
        process: processGridItems,
        toggle: toggleScript,
        enable: () => {
            setScriptEnabled(true);
            processGridItems();
            console.log('✅ Script ENABLED');
        },
        disable: () => {
            setScriptEnabled(false);
            processGridItems();
            console.log('❌ Script DISABLED');
        },
        status: () => {
            const enabled = isScriptEnabled();
            console.log(`🔧 Script is currently: ${enabled ? 'ENABLED' : 'DISABLED'}`);
            return enabled;
        },
        getFavourites: getFavouritedScenes,
        config: CONFIG,
        hide: (sceneId) => {
            const gridItem = document.querySelector(`#ascene_${sceneId}`);
            if (gridItem) {
                hideGridItem(gridItem);
                console.log(`🚫 Manually hidden scene ${sceneId}`);
            } else {
                console.log(`❌ Scene ${sceneId} not found`);
            }
        },
        show: (sceneId) => {
            const gridItem = document.querySelector(`#ascene_${sceneId}`);
            if (gridItem) {
                showGridItem(gridItem);
                console.log(`👁️ Manually shown scene ${sceneId}`);
            } else {
                console.log(`❌ Scene ${sceneId} not found`);
            }
        }
    };
    
    // Add CSS for hidden elements
    function addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .${CONFIG.hideClass} {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
        console.log('🎨 Styles added for hidden elements');
    }
    
    
    // Initialize the script
    function init() {
        addStyles();
        waitForGridItems();
        setupStorageMonitor();
        setupToggleControls();
        
        console.log('🚀 PrivateVOD Hide Favourite Videos ready');
        console.log('💡 Use PrivateVODHideFavourites.process() to manually process');
        console.log('⌨️ Press Ctrl+Shift+H to toggle script on/off');
        console.log(`🔧 Script is currently: ${isScriptEnabled() ? 'ENABLED' : 'DISABLED'}`);
    }
    
    
    // Toggle script functionality
    function toggleScript() {
        const currentState = isScriptEnabled();
        const newState = !currentState;
        setScriptEnabled(newState);
        
        console.log(`🔄 Script ${newState ? 'ENABLED' : 'DISABLED'} - ${newState ? 'hiding' : 'showing'} favourited videos`);
        processGridItems();
        
        return newState;
    }
    
    // Setup keyboard shortcut and toggle functionality
    function setupToggleControls() {
        // Keyboard shortcut: Ctrl + Shift + H
        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.shiftKey && event.key === 'H') {
                event.preventDefault();
                toggleScript();
            }
        });
        
        // Listen for storage changes (from other tabs)
        window.addEventListener('storage', (e) => {
            if (e.key === CONFIG.toggleKey) {
                console.log('🔄 Script state changed from another tab');
                processGridItems();
            }
        });
        
        console.log('⌨️ Toggle controls ready - Press Ctrl+Shift+H to toggle');
    }
    
    // Start the script
    init();
})();

// ==UserScript==
// @name         PrivateVOD Scripts Update Checker
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically checks for updates to all PrivateVOD scripts and notifies users
// @author       SQ Tech
// @homepageURL  https://sqtech.dev
// @updateURL    https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/update-checker.js
// @downloadURL  https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/update-checker.js
// @match        https://www.privatevod.com/*
// @match        https://privatevod.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    
    console.log('🔄 PrivateVOD Update Checker loaded');
    
    // Script configurations
    const SCRIPTS = {
        'Auto Favourite Video': {
            url: 'https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Auto%20Favourite%20Video/privatevod%20auto%20favourite%20video.user.js',
            currentVersion: '1.1',
            checkInterval: 24 * 60 * 60 * 1000 // 24 hours
        },
        'Auto Favourite Star': {
            url: 'https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Auto%20Favourite%20Star/privatevod%20auto%20favourite%20star.user.js',
            currentVersion: '1.1',
            checkInterval: 24 * 60 * 60 * 1000 // 24 hours
        },
        'Element Mover': {
            url: 'https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Element%20Mover/privatevod%20element%20mover.user.js',
            currentVersion: '1.0',
            checkInterval: 24 * 60 * 60 * 1000 // 24 hours
        },
        'Favourite & Like Tracker': {
            url: 'https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Favourite%20%26%20Like%20Tracker/privatevod%20favourite%20and%20like%20tracker.user.js',
            currentVersion: '1.0',
            checkInterval: 24 * 60 * 60 * 1000 // 24 hours
        }
    };
    
    // Storage keys
    const STORAGE_KEYS = {
        lastCheck: 'privatevod_last_update_check',
        scriptVersions: 'privatevod_script_versions',
        updateNotifications: 'privatevod_update_notifications'
    };
    
    // Check if enough time has passed since last check
    function shouldCheckForUpdates() {
        const lastCheck = localStorage.getItem(STORAGE_KEYS.lastCheck);
        if (!lastCheck) return true;
        
        const timeSinceLastCheck = Date.now() - parseInt(lastCheck);
        return timeSinceLastCheck > (24 * 60 * 60 * 1000); // 24 hours
    }
    
    // Get version from script content
    function extractVersion(scriptContent) {
        const versionMatch = scriptContent.match(/@version\s+([^\s]+)/);
        return versionMatch ? versionMatch[1] : null;
    }
    
    // Check for updates
    function checkForUpdates() {
        if (!shouldCheckForUpdates()) {
            console.log('⏰ Update check skipped - checked recently');
            return;
        }
        
        console.log('🔍 Checking for script updates...');
        
        // Update last check time
        localStorage.setItem(STORAGE_KEYS.lastCheck, Date.now().toString());
        
        // Check each script
        Object.entries(SCRIPTS).forEach(([scriptName, config]) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: config.url,
                onload: function(response) {
                    if (response.status === 200) {
                        const remoteVersion = extractVersion(response.responseText);
                        const currentVersion = config.currentVersion;
                        
                        if (remoteVersion && remoteVersion !== currentVersion) {
                            console.log(`🆕 Update available for ${scriptName}: ${currentVersion} → ${remoteVersion}`);
                            notifyUpdate(scriptName, currentVersion, remoteVersion, config.url);
                        } else {
                            console.log(`✅ ${scriptName} is up to date (${currentVersion})`);
                        }
                    }
                },
                onerror: function(error) {
                    console.error(`❌ Failed to check updates for ${scriptName}:`, error);
                }
            });
        });
    }
    
    // Show update notification
    function notifyUpdate(scriptName, currentVersion, newVersion, downloadUrl) {
        // Check if we've already notified about this version
        const notifications = JSON.parse(localStorage.getItem(STORAGE_KEYS.updateNotifications) || '{}');
        const notificationKey = `${scriptName}_${newVersion}`;
        
        if (notifications[notificationKey]) {
            console.log(`🔕 Already notified about ${scriptName} v${newVersion}`);
            return;
        }
        
        // Show notification
        GM_notification({
            text: `🆕 ${scriptName} v${newVersion} available!\nCurrent: v${currentVersion}\nClick to update`,
            title: 'PrivateVOD Script Update',
            timeout: 10000,
            onclick: function() {
                window.open(downloadUrl, '_blank');
                // Mark as notified
                notifications[notificationKey] = true;
                localStorage.setItem(STORAGE_KEYS.updateNotifications, JSON.stringify(notifications));
            }
        });
        
        // Also show console message
        console.log(`🔔 Update notification sent for ${scriptName}`);
    }
    
    // Manual update check function
    function manualUpdateCheck() {
        console.log('🔄 Manual update check triggered');
        checkForUpdates();
    }
    
    // Expose manual check to global scope
    window.PrivateVODUpdateCheck = {
        check: manualUpdateCheck,
        scripts: SCRIPTS
    };
    
    // Start checking for updates
    checkForUpdates();
    
    // Set up periodic checking (every 6 hours)
    setInterval(checkForUpdates, 6 * 60 * 60 * 1000);
    
    console.log('✅ Update checker initialized - use PrivateVODUpdateCheck.check() for manual check');
})();

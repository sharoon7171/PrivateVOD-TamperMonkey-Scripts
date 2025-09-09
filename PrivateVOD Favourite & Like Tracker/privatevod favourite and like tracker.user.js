// ==UserScript==
// @name         PrivateVOD Favourite & Like Tracker
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Tracks favourite and like status changes and stores scene IDs in localStorage with real-time updates
// @author       SQ Tech
// @homepageURL  https://sqtech.dev
// @match        https://www.privatevod.com/*video.html*
// @match        https://www.privatevod.com/*videos.html*
// @match        https://privatevod.com/*video.html*
// @match        https://privatevod.com/*videos.html*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    // Debug: Log that script is running
    console.log('💾 Favourite Storage Tracker script loaded on:', window.location.href);
    
    // Configuration - User can modify these settings
    const CONFIG = {
        enableLocalStorage: true, // Set to false to disable local storage tracking
        storageKey: 'privatevod_favourites',
        enableLikeTracking: true, // Set to false to disable like tracking
        likeStorageKey: 'privatevod_likes'
    };
    
    // Extract scene ID from URL
    function getSceneId() {
        const url = window.location.href;
        const match = url.match(/\/(\d+)\//);
        return match ? match[1] : null;
    }
    
    // Local storage functions
    function getFavouritedScenes() {
        if (!CONFIG.enableLocalStorage) return new Set();
        try {
            const stored = localStorage.getItem(CONFIG.storageKey);
            return stored ? new Set(JSON.parse(stored)) : new Set();
        } catch (e) {
            console.log('❌ Error reading from localStorage:', e);
            return new Set();
        }
    }
    
    function saveFavouritedScenes(scenes) {
        if (!CONFIG.enableLocalStorage) return;
        try {
            localStorage.setItem(CONFIG.storageKey, JSON.stringify([...scenes]));
        } catch (e) {
            console.log('❌ Error saving to localStorage:', e);
        }
    }
    
    function addSceneToFavourites(sceneId) {
        if (!CONFIG.enableLocalStorage || !sceneId) return;
        const scenes = getFavouritedScenes();
        if (!scenes.has(sceneId)) {
            scenes.add(sceneId);
            saveFavouritedScenes(scenes);
            console.log(`💾 Scene ${sceneId} added to favourites storage`);
        } else {
            console.log(`💾 Scene ${sceneId} already in favourites storage`);
        }
    }
    
    function removeSceneFromFavourites(sceneId) {
        if (!CONFIG.enableLocalStorage || !sceneId) return;
        const scenes = getFavouritedScenes();
        if (scenes.has(sceneId)) {
            scenes.delete(sceneId);
            saveFavouritedScenes(scenes);
            console.log(`💾 Scene ${sceneId} removed from favourites storage`);
        } else {
            console.log(`💾 Scene ${sceneId} not in favourites storage`);
        }
    }
    
    // Local storage management functions
    function clearAllFavourites() {
        if (!CONFIG.enableLocalStorage) return;
        try {
            localStorage.removeItem(CONFIG.storageKey);
            console.log('🗑️ All favourites cleared from storage');
        } catch (e) {
            console.log('❌ Error clearing storage:', e);
        }
    }
    
    function getFavouritesList() {
        if (!CONFIG.enableLocalStorage) return [];
        const scenes = getFavouritedScenes();
        const list = Array.from(scenes).sort((a, b) => parseInt(a) - parseInt(b));
        return list;
    }
    
    function deleteSpecificScene(sceneId) {
        if (!CONFIG.enableLocalStorage || !sceneId) return;
        const scenes = getFavouritedScenes();
        if (scenes.has(sceneId)) {
            scenes.delete(sceneId);
            saveFavouritedScenes(scenes);
            console.log(`🗑️ Scene ${sceneId} deleted from storage`);
        } else {
            console.log(`❌ Scene ${sceneId} not found in storage`);
        }
    }
    
    // Like tracking functions
    function getLikedScenes() {
        if (!CONFIG.enableLikeTracking) return new Set();
        try {
            const stored = localStorage.getItem(CONFIG.likeStorageKey);
            return stored ? new Set(JSON.parse(stored)) : new Set();
        } catch (e) {
            console.log('❌ Error reading likes from localStorage:', e);
            return new Set();
        }
    }
    
    function saveLikedScenes(scenes) {
        if (!CONFIG.enableLikeTracking) return;
        try {
            localStorage.setItem(CONFIG.likeStorageKey, JSON.stringify([...scenes]));
        } catch (e) {
            console.log('❌ Error saving likes to localStorage:', e);
        }
    }
    
    function addSceneToLikes(sceneId) {
        if (!CONFIG.enableLikeTracking || !sceneId) return;
        const scenes = getLikedScenes();
        if (!scenes.has(sceneId)) {
            scenes.add(sceneId);
            saveLikedScenes(scenes);
            console.log(`👍 Scene ${sceneId} added to likes storage`);
        } else {
            console.log(`👍 Scene ${sceneId} already in likes storage`);
        }
    }
    
    function removeSceneFromLikes(sceneId) {
        if (!CONFIG.enableLikeTracking || !sceneId) return;
        const scenes = getLikedScenes();
        if (scenes.has(sceneId)) {
            scenes.delete(sceneId);
            saveLikedScenes(scenes);
            console.log(`👍 Scene ${sceneId} removed from likes storage`);
        } else {
            console.log(`👍 Scene ${sceneId} not in likes storage`);
        }
    }
    
    function clearAllLikes() {
        if (!CONFIG.enableLikeTracking) return;
        try {
            localStorage.removeItem(CONFIG.likeStorageKey);
            console.log('🗑️ All likes cleared from storage');
        } catch (e) {
            console.log('❌ Error clearing likes storage:', e);
        }
    }
    
    function getLikesList() {
        if (!CONFIG.enableLikeTracking) return [];
        const scenes = getLikedScenes();
        const list = Array.from(scenes).sort((a, b) => parseInt(a) - parseInt(b));
        return list;
    }
    
    function deleteSpecificLike(sceneId) {
        if (!CONFIG.enableLikeTracking || !sceneId) return;
        const scenes = getLikedScenes();
        if (scenes.has(sceneId)) {
            scenes.delete(sceneId);
            saveLikedScenes(scenes);
            console.log(`🗑️ Scene ${sceneId} deleted from likes storage`);
        } else {
            console.log(`❌ Scene ${sceneId} not found in likes storage`);
        }
    }
    
    // Debug function to show current status
    function showCurrentStatus() {
        const sceneId = getSceneId();
        const favoriteButton = document.querySelector('a[onclick*="ToggleProductFavorite"]');
        const likeButton = document.querySelector('a[onclick*="ToggleLike"]');
        const isFavorited = favoriteButton ? favoriteButton.classList.contains('active') : false;
        const isLiked = likeButton ? likeButton.classList.contains('active') : false;
        const scenes = getFavouritedScenes();
        const likedScenes = getLikedScenes();
        const isInStorage = sceneId ? scenes.has(sceneId) : false;
        const isInLikesStorage = sceneId ? likedScenes.has(sceneId) : false;
        
        console.log('🔍 Current Status:');
        console.log(`  Scene ID: ${sceneId || 'Not found'}`);
        console.log(`  Favourited: ${isFavorited ? 'YES' : 'NO'}`);
        console.log(`  In Favourites Storage: ${isInStorage ? 'YES' : 'NO'}`);
        console.log(`  Liked: ${isLiked ? 'YES' : 'NO'}`);
        console.log(`  In Likes Storage: ${isInLikesStorage ? 'YES' : 'NO'}`);
        console.log(`  Favourites Count: ${scenes.size}`);
        console.log(`  Likes Count: ${likedScenes.size}`);
        console.log(`  All Favourited Scenes: [${Array.from(scenes).join(', ')}]`);
        console.log(`  All Liked Scenes: [${Array.from(likedScenes).join(', ')}]`);
    }
    
    // Create HTML management interface
    function createManagementInterface() {
        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Favourite Storage Manager</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
                .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                .header { text-align: center; color: #333; margin-bottom: 30px; }
                .stats { display: flex; gap: 20px; margin-bottom: 20px; }
                .stat-box { flex: 1; background: #e3f2fd; padding: 15px; border-radius: 8px; text-align: center; }
                .controls { margin-bottom: 20px; }
                .btn { background: #2196f3; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 5px; }
                .btn:hover { background: #1976d2; }
                .btn-danger { background: #f44336; }
                .btn-danger:hover { background: #d32f2f; }
                .btn-success { background: #4caf50; }
                .btn-success:hover { background: #388e3c; }
                .scene-list { background: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 20px; }
                .scene-item { display: flex; justify-content: space-between; align-items: center; padding: 8px; border-bottom: 1px solid #eee; }
                .scene-item:last-child { border-bottom: none; }
                .scene-id { font-weight: bold; color: #333; }
                .scene-actions { display: flex; gap: 5px; }
                .btn-small { padding: 5px 10px; font-size: 12px; }
                input[type="text"] { padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin: 5px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Favourite & Like Storage Manager</h1>
                    <p>Manage your PrivateVOD favourite and liked scenes</p>
                </div>
                
                <div class="stats">
                    <div class="stat-box">
                        <h3 id="favouritesCount">0</h3>
                        <p>Favourited Scenes</p>
                    </div>
                    <div class="stat-box">
                        <h3 id="likesCount">0</h3>
                        <p>Liked Scenes</p>
                    </div>
                    <div class="stat-box">
                        <h3 id="storageSize">0 KB</h3>
                        <p>Storage Used</p>
                    </div>
                </div>
                
                <div class="controls">
                    <button class="btn btn-success" onclick="refreshList()">Refresh</button>
                    <button class="btn btn-danger" onclick="clearAll()">Clear All</button>
                    <button class="btn" onclick="exportData()">Export</button>
                    <button class="btn" onclick="importData()">Import</button>
                </div>
                
                <div class="scene-list">
                    <h3>Favourited Scenes</h3>
                    <div id="favouritesList">Loading...</div>
                </div>
                
                <div class="scene-list">
                    <h3>Liked Scenes</h3>
                    <div id="likesList">Loading...</div>
                </div>
                
                <div class="instructions" style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #2196f3;">
                    <h3 style="margin-top: 0; color: #333;">Console Commands</h3>
                    <p style="margin: 10px 0; color: #666;">For advanced users, open browser console (F12) and use these commands:</p>
                    <div style="background: #2d3748; color: #e2e8f0; padding: 15px; border-radius: 6px; font-family: 'Courier New', monospace; font-size: 14px; overflow-x: auto;">
                        <div style="margin-bottom: 8px;"><span style="color: #68d391;">// FAVOURITES COMMANDS</span></div>
                        <div style="margin-bottom: 8px;"><span style="color: #fbb6ce;">PrivateVODFavourites.list()</span> <span style="color: #68d391;">// View all favourited scenes</span></div>
                        <div style="margin-bottom: 8px;"><span style="color: #fbb6ce;">PrivateVODFavourites.clear()</span> <span style="color: #68d391;">// Clear all favourites</span></div>
                        <div style="margin-bottom: 8px;"><span style="color: #fbb6ce;">PrivateVODFavourites.delete("1702789")</span> <span style="color: #68d391;">// Delete specific scene</span></div>
                        <div style="margin-bottom: 8px;"><br></div>
                        <div style="margin-bottom: 8px;"><span style="color: #68d391;">// LIKES COMMANDS</span></div>
                        <div style="margin-bottom: 8px;"><span style="color: #fbb6ce;">PrivateVODLikes.list()</span> <span style="color: #68d391;">// View all liked scenes</span></div>
                        <div style="margin-bottom: 8px;"><span style="color: #fbb6ce;">PrivateVODLikes.clear()</span> <span style="color: #68d391;">// Clear all likes</span></div>
                        <div style="margin-bottom: 8px;"><span style="color: #fbb6ce;">PrivateVODLikes.delete("1749438")</span> <span style="color: #68d391;">// Delete specific like</span></div>
                        <div style="margin-bottom: 8px;"><br></div>
                        <div style="margin-bottom: 8px;"><span style="color: #68d391;">// STATUS & CONFIG</span></div>
                        <div style="margin-bottom: 8px;"><span style="color: #fbb6ce;">PrivateVODFavourites.status()</span> <span style="color: #68d391;">// Show current status (both)</span></div>
                        <div style="margin-bottom: 0;"><span style="color: #fbb6ce;">PrivateVODFavourites.config</span> <span style="color: #68d391;">// View configuration</span></div>
                    </div>
                    <p style="margin: 15px 0 0 0; color: #666; font-size: 14px;">
                        <strong>Note:</strong> Scenes are automatically added when you favourite videos. Use console commands for manual management.
                    </p>
                </div>
            </div>
            
            <script>
                const FAVOURITES_KEY = 'privatevod_favourites';
                const LIKES_KEY = 'privatevod_likes';
                
                function getFavourites() {
                    try {
                        const stored = localStorage.getItem(FAVOURITES_KEY);
                        return stored ? JSON.parse(stored) : [];
                    } catch (e) {
                        console.error('Error reading favourites storage:', e);
                        return [];
                    }
                }
                
                function getLikes() {
                    try {
                        const stored = localStorage.getItem(LIKES_KEY);
                        return stored ? JSON.parse(stored) : [];
                    } catch (e) {
                        console.error('Error reading likes storage:', e);
                        return [];
                    }
                }
                
                function saveFavourites(scenes) {
                    try {
                        localStorage.setItem(FAVOURITES_KEY, JSON.stringify(scenes));
                        refreshList();
                    } catch (e) {
                        console.error('Error saving favourites storage:', e);
                        alert('Error saving favourites to storage!');
                    }
                }
                
                function saveLikes(scenes) {
                    try {
                        localStorage.setItem(LIKES_KEY, JSON.stringify(scenes));
                        refreshList();
                    } catch (e) {
                        console.error('Error saving likes storage:', e);
                        alert('Error saving likes to storage!');
                    }
                }
                
                function refreshList() {
                    const favourites = getFavourites();
                    const likes = getLikes();
                    
                    // Update counts
                    document.getElementById('favouritesCount').textContent = favourites.length;
                    document.getElementById('likesCount').textContent = likes.length;
                    
                    // Calculate total storage size
                    const totalDataSize = JSON.stringify(favourites).length + JSON.stringify(likes).length;
                    document.getElementById('storageSize').textContent = (totalDataSize / 1024).toFixed(2) + ' KB';
                    
                    // Update favourites list
                    const favouritesDiv = document.getElementById('favouritesList');
                    if (favourites.length === 0) {
                        favouritesDiv.innerHTML = '<p style="color: #666; text-align: center;">No favourited scenes</p>';
                    } else {
                        favouritesDiv.innerHTML = favourites.map(sceneId => \`
                            <div class="scene-item">
                                <span class="scene-id">\${sceneId}</span>
                                <div class="scene-actions">
                                    <button class="btn btn-small btn-danger" onclick="removeFavourite('\${sceneId}')">Remove</button>
                                    <button class="btn btn-small" onclick="openScene('\${sceneId}')">Open</button>
                                </div>
                            </div>
                        \`).join('');
                    }
                    
                    // Update likes list
                    const likesDiv = document.getElementById('likesList');
                    if (likes.length === 0) {
                        likesDiv.innerHTML = '<p style="color: #666; text-align: center;">No liked scenes</p>';
                    } else {
                        likesDiv.innerHTML = likes.map(sceneId => \`
                            <div class="scene-item">
                                <span class="scene-id">\${sceneId}</span>
                                <div class="scene-actions">
                                    <button class="btn btn-small btn-danger" onclick="removeLike('\${sceneId}')">Remove</button>
                                    <button class="btn btn-small" onclick="openScene('\${sceneId}')">Open</button>
                                </div>
                            </div>
                        \`).join('');
                    }
                }
                
                
                function removeFavourite(sceneId) {
                    if (confirm(\`Remove scene \${sceneId} from favourites?\`)) {
                        const scenes = getFavourites();
                        const index = scenes.indexOf(sceneId);
                        if (index > -1) {
                            scenes.splice(index, 1);
                            saveFavourites(scenes);
                        }
                    }
                }
                
                function removeLike(sceneId) {
                    if (confirm(\`Remove scene \${sceneId} from likes?\`)) {
                        const scenes = getLikes();
                        const index = scenes.indexOf(sceneId);
                        if (index > -1) {
                            scenes.splice(index, 1);
                            saveLikes(scenes);
                        }
                    }
                }
                
                function clearAll() {
                    if (confirm('Clear all favourites and likes? This cannot be undone!')) {
                        localStorage.removeItem(FAVOURITES_KEY);
                        localStorage.removeItem(LIKES_KEY);
                        refreshList();
                    }
                }
                
                function openScene(sceneId) {
                    window.open(\`https://www.privatevod.com/\${sceneId}/private-vod-scene-video.html\`, '_blank');
                }
                
                function exportData() {
                    const favourites = getFavourites();
                    const likes = getLikes();
                    const data = {
                        favourites: favourites,
                        likes: likes,
                        exportDate: new Date().toISOString(),
                        favouritesCount: favourites.length,
                        likesCount: likes.length
                    };
                    
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = \`privatevod-data-\${new Date().toISOString().split('T')[0]}.json\`;
                    a.click();
                    URL.revokeObjectURL(url);
                }
                
                function importData() {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.json';
                    input.onchange = function(e) {
                        const file = e.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = function(e) {
                                try {
                                    const data = JSON.parse(e.target.result);
                                    if (data.favourites && Array.isArray(data.favourites) && data.likes && Array.isArray(data.likes)) {
                                        if (confirm(\`Import \${data.favourites.length} favourites and \${data.likes.length} likes? This will replace current data.\`)) {
                                            saveFavourites(data.favourites);
                                            saveLikes(data.likes);
                                        }
                                    } else if (data.scenes && Array.isArray(data.scenes)) {
                                        // Legacy format - only favourites
                                        if (confirm(\`Import \${data.scenes.length} favourites (legacy format)? This will replace current favourites.\`)) {
                                            saveFavourites(data.scenes);
                                        }
                                    } else {
                                        alert('Invalid file format');
                                    }
                                } catch (err) {
                                    alert('Error reading file: ' + err.message);
                                }
                            };
                            reader.readAsText(file);
                        }
                    };
                    input.click();
                }
                
                // Initialize
                refreshList();
            </script>
        </body>
        </html>
        `;
        
        return html;
    }
    
    // Function to open management interface
    function openManagementInterface() {
        const html = createManagementInterface();
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const popup = window.open(url, 'favouriteManager', 'width=900,height=700,scrollbars=yes,resizable=yes');
        
        if (!popup) {
            alert('Popup blocked! Please allow popups for this site.');
        }
    }
    
    // Expose management functions to global scope for console access
    window.PrivateVODFavourites = {
        list: getFavouritesList,
        clear: clearAllFavourites,
        delete: deleteSpecificScene,
        add: addSceneToFavourites,
        remove: removeSceneFromFavourites,
        status: showCurrentStatus,
        config: CONFIG,
        openManager: openManagementInterface
    };
    
    // Expose Like management functions to global scope for console access
    window.PrivateVODLikes = {
        list: getLikesList,
        clear: clearAllLikes,
        delete: deleteSpecificLike,
        add: addSceneToLikes,
        remove: removeSceneFromLikes,
        status: showCurrentStatus,
        config: CONFIG
    };
    
    // Show simple startup message only once per session
    if (!window.PrivateVODFavouritesInstructionsShown) {
        console.log('🔧 Favourite & Like Storage Tracker Active');
        console.log('💾 Favourites: Use PrivateVODFavourites.openManager() for management');
        console.log('👍 Likes: Use PrivateVODLikes.list() to view liked scenes');
        window.PrivateVODFavouritesInstructionsShown = true;
    }
    
    // Wait for favourite and like buttons and setup real-time tracking
    function waitForButtons() {
        const favoriteButton = document.querySelector('a[onclick*="ToggleProductFavorite"]');
        const likeButton = document.querySelector('a[onclick*="ToggleLike"]');
        
        if (favoriteButton || likeButton) {
            const sceneId = getSceneId();
            
            // Handle Favourite button
            if (favoriteButton) {
                const isFavorited = favoriteButton.classList.contains('active');
                
                // Only log if there's a change or first time
                if (sceneId) {
                    console.log(`🎬 Scene ${sceneId}: ${isFavorited ? 'FAVOURITED' : 'NOT FAVOURITED'}`);
                }
                
                // Update local storage based on current status
                if (sceneId) {
                    const scenes = getFavouritedScenes();
                    const isInStorage = scenes.has(sceneId);
                    
                    if (isFavorited && !isInStorage) {
                        // Favourited but not in storage - add it
                        console.log(`💾 Adding scene ${sceneId} to favourites storage`);
                        scenes.add(sceneId);
                        saveFavouritedScenes(scenes);
                    } else if (!isFavorited && isInStorage) {
                        // Not favourited but in storage - remove it
                        console.log(`💾 Removing scene ${sceneId} from favourites storage`);
                        scenes.delete(sceneId);
                        saveFavouritedScenes(scenes);
                    }
                }
                
                // Setup real-time observer for favourite changes
                setupFavouriteObserver();
            }
            
            // Handle Like button
            if (likeButton) {
                const isLiked = likeButton.classList.contains('active');
                
                // Only log if there's a change or first time
                if (sceneId) {
                    console.log(`👍 Scene ${sceneId}: ${isLiked ? 'LIKED' : 'NOT LIKED'}`);
                }
                
                // Update like storage based on current status
                if (sceneId) {
                    const likedScenes = getLikedScenes();
                    const isInLikesStorage = likedScenes.has(sceneId);
                    
                    if (isLiked && !isInLikesStorage) {
                        // Liked but not in storage - add it
                        console.log(`👍 Adding scene ${sceneId} to likes storage`);
                        likedScenes.add(sceneId);
                        saveLikedScenes(likedScenes);
                    } else if (!isLiked && isInLikesStorage) {
                        // Not liked but in storage - remove it
                        console.log(`👍 Removing scene ${sceneId} from likes storage`);
                        likedScenes.delete(sceneId);
                        saveLikedScenes(likedScenes);
                    }
                }
                
                // Setup real-time observer for like changes
                setupLikeObserver();
            }
        } else {
            // Buttons not found, try again in 100ms
            setTimeout(waitForButtons, 100);
        }
    }
    
    // Real-time observer for favourite button changes
    function setupFavouriteObserver() {
        const favoriteButton = document.querySelector('a[onclick*="ToggleProductFavorite"]');
        if (!favoriteButton) return;
        
        const sceneId = getSceneId();
        if (!sceneId) return;
        
        // Create observer to watch for class changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isFavorited = favoriteButton.classList.contains('active');
                    console.log('🔄 Favourite status changed:', isFavorited ? 'FAVOURITED' : 'NOT FAVOURITED');
                    
                    // Update storage in real-time with proper logic
                    const scenes = getFavouritedScenes();
                    const isInStorage = scenes.has(sceneId);
                    
                    if (isFavorited && !isInStorage) {
                        // Favourited but not in storage - add it
                        console.log(`💾 Adding scene ${sceneId} to storage`);
                        scenes.add(sceneId);
                        saveFavouritedScenes(scenes);
                    } else if (!isFavorited && isInStorage) {
                        // Not favourited but in storage - remove it
                        console.log(`💾 Removing scene ${sceneId} from storage`);
                        scenes.delete(sceneId);
                        saveFavouritedScenes(scenes);
                    }
                    // No logging for "already correct" cases to reduce spam
                }
            });
        });
        
        // Start observing
        observer.observe(favoriteButton, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        console.log(`👀 Favourite observer started for scene ${sceneId}`);
    }
    
    // Real-time observer for like button changes
    function setupLikeObserver() {
        const likeButton = document.querySelector('a[onclick*="ToggleLike"]');
        if (!likeButton) return;
        
        const sceneId = getSceneId();
        if (!sceneId) return;
        
        // Create observer to watch for class changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isLiked = likeButton.classList.contains('active');
                    console.log('🔄 Like status changed:', isLiked ? 'LIKED' : 'NOT LIKED');
                    
                    // Update like storage in real-time with proper logic
                    const likedScenes = getLikedScenes();
                    const isInLikesStorage = likedScenes.has(sceneId);
                    
                    if (isLiked && !isInLikesStorage) {
                        // Liked but not in storage - add it
                        console.log(`👍 Adding scene ${sceneId} to likes storage`);
                        likedScenes.add(sceneId);
                        saveLikedScenes(likedScenes);
                    } else if (!isLiked && isInLikesStorage) {
                        // Not liked but in storage - remove it
                        console.log(`👍 Removing scene ${sceneId} from likes storage`);
                        likedScenes.delete(sceneId);
                        saveLikedScenes(likedScenes);
                    }
                }
            });
        });
        
        // Start observing
        observer.observe(likeButton, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        console.log(`👀 Like observer started for scene ${sceneId}`);
    }
    
    // Start tracking when page loads
    waitForButtons();
})();

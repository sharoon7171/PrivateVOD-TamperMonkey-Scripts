// ==UserScript==
// @name         Auto Play Video Loader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Enable Auto Play Video Loading without need to click play button and prevent start playing automatically
// @author       SQ Tech
// @homepageURL  https://sqtech.dev
// @match        https://www.privatevod.com/*video.html*
// @match        https://www.privatevod.com/*videos.html*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    // Wait for all required conditions to be met in real-time
    function waitForConditions() {
        const conditions = {
            AEVideoPlayer: (() => {
                try {
                    return typeof AEVideoPlayer === 'function';
                } catch (e) {
                    return false;
                }
            })(),
            jQuery: typeof $ !== 'undefined',
            loadPlayer: typeof window.loadPlayer === 'function'
        };
        
        if (conditions.AEVideoPlayer && conditions.jQuery && conditions.loadPlayer) {
            // All conditions met - call loadPlayer immediately
            window.loadPlayer();
            
            // Disable autoplay by modifying iframe URL after player loads
            setTimeout(() => {
                const iframe = document.querySelector('#player iframe');
                if (iframe && iframe.src && iframe.src.includes('autoplay=true')) {
                    iframe.src = iframe.src.replace('&autoplay=true', '&autoplay=false');
                    console.log('✅ Autoplay disabled in iframe URL');
                }
            }, 500);
            
        } else {
            // Check again in 50ms
            setTimeout(waitForConditions, 50);
        }
    }
    
    // Start checking conditions immediately
    waitForConditions();
})();

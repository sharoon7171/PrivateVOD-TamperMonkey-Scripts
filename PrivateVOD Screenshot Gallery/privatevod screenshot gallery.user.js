// ==UserScript==
// @name         PrivateVOD Screenshot Gallery
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically creates a screenshot gallery above scenes section
// @author       You
// @match        https://www.privatevod.com/*video.html*
// @match        https://www.privatevod.com/*videos.html*
// @match        https://privatevod.com/*video.html*
// @match        https://privatevod.com/*videos.html*
// @updateURL    https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Screenshot%20Gallery/privatevod%20screenshot%20gallery.user.js
// @downloadURL  https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Screenshot%20Gallery/privatevod%20screenshot%20gallery.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to create screenshot gallery
    function createScreenshotGallery() {
        console.log('🎬 Creating PrivateVOD Screenshot Gallery...');
        
        // Check if we're on a video page (has scenes section)
        const scenesContainer = document.querySelector('#scenes');
        if (!scenesContainer) {
            console.log('❌ Not on a video page - scenes container not found');
            return;
        }
        
        // Find image URLs in scripts
        const scripts = document.querySelectorAll('script');
        let allUrls = [];
        
        scripts.forEach(script => {
            const content = script.textContent || script.innerHTML;
            if (content.includes('carouselActive')) {
                const urls = content.match(/https:\/\/[^"'\s]+\.jpg/g);
                if (urls) allUrls.push(...urls);
            }
        });
        
        if (allUrls.length === 0) {
            console.log('❌ No screenshot URLs found');
            return;
        }
        
        // Get unique URLs and sort by timestamp
        const uniqueUrls = [...new Set(allUrls)].sort((a, b) => {
            const timestampA = a.match(/_(\d+)_1280c\.jpg$/);
            const timestampB = b.match(/_(\d+)_1280c\.jpg$/);
            return timestampA && timestampB ? parseInt(timestampA[1]) - parseInt(timestampB[1]) : 0;
        });
        
        console.log(`Found ${uniqueUrls.length} unique screenshots`);
        
        // Remove existing gallery if any
        const existingGallery = document.querySelector('#screenshotGallery');
        if (existingGallery) existingGallery.remove();
        
        // Create gallery HTML
        const galleryHTML = `
            <div id="screenshotGallery" style="width: 100%; padding: 20px 0;">
                <h4 style="padding: 0 15px;">Screenshots (${uniqueUrls.length})</h4>
                <div class="row" style="margin: 0;">
                    ${uniqueUrls.map((url, index) => `
                        <div class="col-md-2 col-sm-4 col-6 mb-3" style="padding: 0 5px;">
                            <img src="${url}" 
                                 class="img-fluid rounded screenshot-thumbnail" 
                                 style="width: 100%; height: auto; cursor: pointer; border: 1px solid #ddd; transition: transform 0.2s;" 
                                 onclick="window.open('${url}', '_blank')" 
                                 onerror="this.style.display='none'" 
                                 loading="lazy" 
                                 title="Screenshot ${index + 1}" 
                                 onmouseover="this.style.transform='scale(1.05)'" 
                                 onmouseout="this.style.transform='scale(1)'">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Insert gallery above scenes
        scenesContainer.insertAdjacentHTML('beforebegin', galleryHTML);
        console.log(`✅ Screenshot gallery created with ${uniqueUrls.length} images!`);
    }

    // Run immediately when script loads
    createScreenshotGallery();

    // Also run when DOM is ready (backup)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createScreenshotGallery);
    }

    // Run on page navigation (for SPA behavior)
    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            createScreenshotGallery(); // No delay - instant execution
        }
    }).observe(document, { subtree: true, childList: true });

})();

// FREEMASONRY Chrome Extension - Background Service Worker

// Extension installation
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        console.log('FREEMASONRY Chrome Extension installed');
        
        // Initialize default settings
        chrome.storage.sync.set({
            freemasonrySettings: {
                notifications: true,
                autoSync: true,
                darkMode: false,
                privacyMode: false
            }
        });
    }
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
    // This will open the popup defined in manifest.json
    console.log('FREEMASONRY extension clicked');
});

// Handle messages from popup and content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Background received message:', request);

    switch (request.type) {
        case 'GET_SETTINGS':
            chrome.storage.sync.get(['freemasonrySettings'], (result) => {
                sendResponse({ settings: result.freemasonrySettings || {} });
            });
            return true; // Keep message channel open for async response

        case 'SAVE_SETTINGS':
            chrome.storage.sync.set({
                freemasonrySettings: request.settings
            }, () => {
                sendResponse({ success: true });
            });
            return true;

        case 'SHOW_NOTIFICATION':
            if (request.settings?.notifications) {
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: 'icons/icon48.png',
                    title: 'FREEMASONRY',
                    message: request.message
                });
            }
            sendResponse({ success: true });
            break;

        case 'LOG_ACTIVITY':
            if (!request.settings?.privacyMode) {
                console.log(`Activity logged: ${request.action} at ${new Date().toISOString()}`);
            }
            sendResponse({ success: true });
            break;

        default:
            sendResponse({ error: 'Unknown message type' });
    }
});

// Handle storage changes
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes.freemasonrySettings) {
        console.log('Settings updated:', changes.freemasonrySettings.newValue);
        
        // Notify all tabs about settings change
        chrome.tabs.query({}, (tabs) => {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, {
                    type: 'SETTINGS_UPDATED',
                    settings: changes.freemasonrySettings.newValue
                }).catch(() => {
                    // Ignore errors for tabs that don't have content scripts
                });
            });
        });
    }
});

// Handle tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        // Inject content script if needed
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
        }).catch(() => {
            // Ignore errors for restricted pages
        });
    }
});

// Periodic sync (if auto-sync is enabled)
setInterval(() => {
    chrome.storage.sync.get(['freemasonrySettings'], (result) => {
        if (result.freemasonrySettings?.autoSync) {
            // Perform sync operations here
            console.log('Auto-sync performed at', new Date().toISOString());
        }
    });
}, 300000); // Every 5 minutes

// Handle extension startup
chrome.runtime.onStartup.addListener(() => {
    console.log('FREEMASONRY extension started');
});

// Handle extension shutdown
chrome.runtime.onSuspend.addListener(() => {
    console.log('FREEMASONRY extension suspended');
});

// Utility functions
function logActivity(action, details = {}) {
    console.log(`Activity: ${action}`, details);
    
    chrome.storage.sync.get(['freemasonrySettings'], (result) => {
        if (!result.freemasonrySettings?.privacyMode) {
            // Store activity log
            chrome.storage.local.get(['activityLog'], (data) => {
                const log = data.activityLog || [];
                log.push({
                    action,
                    details,
                    timestamp: new Date().toISOString()
                });
                
                // Keep only last 100 entries
                if (log.length > 100) {
                    log.splice(0, log.length - 100);
                }
                
                chrome.storage.local.set({ activityLog: log });
            });
        }
    });
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { logActivity };
} 
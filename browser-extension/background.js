// Background script for Weavehacks2025 extension
console.log('Weavehacks2025 background script loaded');

chrome.action.onClicked.addListener((tab) => {
    console.log('Extension icon clicked for tab:', tab.id);
    // Open the side panel when the extension icon is clicked
    chrome.sidePanel.open({ tabId: tab.id });
});

// Set up the side panel
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

// Handle messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Background script received message:', message);
    
    if (message.action === 'updateTweets') {
        // Forward tweets to the side panel
        console.log('Forwarding tweets to side panel');
        chrome.runtime.sendMessage({
            action: 'updateTweets',
            tweets: message.tweets,
            url: message.url
        });
    }
});

// Listen for side panel opening to trigger initial tweet fetch
chrome.sidePanel.onOpened.addListener((details) => {
    console.log('Side panel opened for tab:', details.tabId);
    
    // When side panel opens, trigger a tweet refresh
    chrome.tabs.sendMessage(details.tabId, { action: 'getTweets' }, (response) => {
        if (chrome.runtime.lastError) {
            console.log('Content script not ready yet:', chrome.runtime.lastError);
            return;
        }
        
        if (response && response.tweets) {
            console.log('Tweets received from content script:', response.tweets);
            chrome.runtime.sendMessage({
                action: 'updateTweets',
                tweets: response.tweets
            });
        }
    });
});

// Listen for tab updates to inject content script if needed
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && 
        (tab.url && (tab.url.includes('twitter.com') || tab.url.includes('x.com')))) {
        console.log('Twitter/X page loaded, ensuring content script is ready');
        
        // Try to inject content script if it's not already there
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
        }).catch(error => {
            console.log('Content script already injected or error:', error);
        });
    }
}); 
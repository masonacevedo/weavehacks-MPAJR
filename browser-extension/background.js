// Background script for Weavehacks2025 extension
chrome.action.onClicked.addListener((tab) => {
    // Open the side panel when the extension icon is clicked
    chrome.sidePanel.open({ tabId: tab.id });
});

// Set up the side panel
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }); 
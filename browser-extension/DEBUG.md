# Debugging Guide for Weavehacks2025 Extension

## Common Issues and Solutions

### 1. "Error: Could not communicate with page"

This error occurs when the side panel can't communicate with the content script. Here's how to debug:

#### Step 1: Check if you're on the right page
- Make sure you're on `twitter.com` or `x.com`
- The extension only works on Twitter/X pages

#### Step 2: Check the browser console
1. Open the side panel
2. Right-click in the side panel and select "Inspect"
3. Look for console messages that start with "Weavehacks2025"
4. Check for any error messages

#### Step 3: Check the main page console
1. Go to the Twitter/X page
2. Open Developer Tools (F12)
3. Look for console messages from the content script
4. You should see: "Weavehacks2025 content script loaded"

#### Step 4: Reload the extension
1. Go to `chrome://extensions/`
2. Find "Weavehacks2025"
3. Click the refresh/reload button
4. Refresh the Twitter/X page

#### Step 5: Check extension permissions
1. Go to `chrome://extensions/`
2. Click "Details" on the Weavehacks2025 extension
3. Make sure all permissions are granted

### 2. Content Script Not Loading

If you don't see "Weavehacks2025 content script loaded" in the console:

1. Check the manifest.json file is correct
2. Reload the extension
3. Refresh the Twitter/X page
4. Check if the page URL matches the patterns in manifest.json

### 3. No Tweets Found

If the extension loads but no tweets appear:

1. Make sure you're on a page with tweets (not just the login page)
2. Try scrolling down to load more tweets
3. Click the "🔄 Refresh Tweets" button
4. Check the console for debugging messages about tweet extraction

### 4. Extension Icon Not Working

If clicking the extension icon doesn't open the side panel:

1. Make sure you're on a Twitter/X page
2. Check if the side panel is already open
3. Try right-clicking the extension icon and selecting "Open side panel"

## Console Messages to Look For

### Successful Loading:
- "Weavehacks2025 background script loaded"
- "Weavehacks2025 content script loaded"
- "Side panel loaded"
- "Found X tweets with selector: ..."

### Error Messages:
- "Content script not ready yet"
- "Chrome runtime error: ..."
- "No active tab found"
- "Not on Twitter/X"

## Manual Testing

1. Go to `twitter.com` or `x.com`
2. Open Developer Tools (F12)
3. In the console, type: `document.querySelectorAll('[data-testid="tweet"]')`
4. This should return tweet elements if the page has tweets

## Still Having Issues?

1. Check the browser console for any JavaScript errors
2. Make sure you're using a recent version of Chrome
3. Try disabling other extensions that might interfere
4. Check if the Twitter/X page structure has changed (the selectors might need updating) 
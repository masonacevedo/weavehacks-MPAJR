# Weavehacks2025 - Tweet Viewer Extension

A Chrome browser extension that extracts and displays tweets from Twitter/X in a convenient side panel.

## Features

- 🐦 Extracts tweets from Twitter/X pages
- 📱 Clean, modern side panel interface
- 🔄 Real-time tweet updates
- 📊 Shows engagement metrics (likes, retweets, replies)
- ⏰ Relative timestamps
- 🔍 Works on both twitter.com and x.com

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked" and select the `browser-extension` folder
4. The extension should now appear in your extensions list

## Usage

1. Navigate to any Twitter/X page (e.g., twitter.com, x.com)
2. Click the Weavehacks2025 extension icon in your browser toolbar
3. The side panel will open showing tweets from the current page
4. Click the "🔄 Refresh Tweets" button to manually refresh the tweet list

## How it Works

- **Content Script**: Runs on Twitter/X pages and extracts tweet data using DOM selectors
- **Side Panel**: Displays the extracted tweets in a clean, readable format
- **Background Script**: Handles communication between content script and side panel

## Files

- `manifest.json` - Extension configuration and permissions
- `content.js` - Extracts tweets from Twitter/X pages
- `sidepanel.html` - Side panel interface
- `sidepanel.js` - Side panel functionality
- `background.js` - Background communication handler

## Technical Details

The extension uses:
- Chrome Extension Manifest V3
- Content scripts for DOM manipulation
- Side panel API for the interface
- Message passing between components
- Modern CSS for styling

## Troubleshooting

- Make sure you're on a Twitter/X page (twitter.com or x.com)
- Check the browser console for any error messages
- Try refreshing the page if tweets don't appear
- Ensure the extension has the necessary permissions 
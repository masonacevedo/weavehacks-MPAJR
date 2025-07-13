# FREEMASONRY Chrome Extension - Installation Guide

## Quick Start

### Step 1: Download the Extension
1. Navigate to the `messages` folder in your project
2. All necessary files are already included

### Step 2: Load in Chrome
1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right corner)
4. Click "Load unpacked"
5. Select the `messages` folder
6. The extension should now appear in your extensions list

### Step 3: Verify Installation
1. Look for the FREEMASONRY icon in your Chrome toolbar
2. Click the icon to open the messaging interface
3. Test the messaging functionality

## Demo Mode

If you want to test the interface without installing as a Chrome extension:

1. Open `demo.html` in your web browser
2. This will show the extension interface in a demo environment
3. All functionality will work except Chrome-specific features

## Troubleshooting

### Extension Won't Load
- Check that all files are present in the `messages` folder
- Verify `manifest.json` is valid JSON
- Try refreshing the extensions page

### Icon Not Appearing
- Check if the extension is enabled in `chrome://extensions/`
- Try pinning the extension to the toolbar
- Restart Chrome if needed

### Functionality Issues
- Open Chrome DevTools (F12) to check for errors
- Verify all JavaScript files are loading correctly
- Check the console for any error messages

## File Structure Verification

Ensure your `messages` folder contains:

```
messages/
├── manifest.json          ✓
├── popup.html            ✓
├── popup.css             ✓
├── popup.js              ✓
├── background.js          ✓
├── content.js            ✓
├── demo.html             ✓
├── package.json          ✓
├── README.md             ✓
├── INSTALLATION.md       ✓
└── icons/                ✓
    └── (icon files)
```

## Development Mode

For development and testing:

1. **Live Reload**: Make changes to files and click the refresh button on the extension in `chrome://extensions/`
2. **Debug**: Right-click the extension icon and select "Inspect popup" to open DevTools
3. **Background Script**: Go to `chrome://extensions/` → find your extension → click "service worker" to debug background script

## Permissions

The extension requests minimal permissions:
- `activeTab`: To interact with the current tab
- `storage`: To save settings and messages

No personal data is collected or transmitted.

## Support

If you encounter issues:
1. Check the console for error messages
2. Verify all files are present and properly formatted
3. Try reinstalling the extension
4. Check Chrome's extension documentation

---

**Note**: This is a demo extension. For production use, additional security measures and proper icon files should be implemented. 
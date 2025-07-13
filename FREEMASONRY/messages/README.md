# FREEMASONRY Chrome Extension

A sophisticated Chrome extension designed for FREEMASONRY messaging and communication, featuring a modern, elegant interface with advanced functionality.

## Features

### 🎨 Modern Design
- **Elegant UI**: Sophisticated design with golden accents and dark theme
- **Responsive Layout**: Optimized for Chrome extension popup dimensions
- **Smooth Animations**: Fluid transitions and hover effects
- **Dark Mode**: Toggle between light and dark themes

### 💬 Messaging System
- **Real-time Messaging**: Send and receive messages with simulated responses
- **Message History**: Persistent message storage
- **Typing Indicators**: Visual feedback for message composition
- **Message Timestamps**: Track conversation timing

### 👥 Contact Management
- **Contact List**: View and manage brotherhood contacts
- **Search Functionality**: Quick contact search and filtering
- **Online Status**: Real-time contact status indicators
- **Contact Profiles**: Detailed contact information

### ⚙️ Settings & Customization
- **Notification Controls**: Toggle push notifications
- **Auto-sync**: Automatic data synchronization
- **Privacy Mode**: Enhanced privacy controls
- **Theme Selection**: Light/dark mode preferences

### 🌐 Web Integration
- **Floating Button**: Quick access button on web pages
- **Content Highlighting**: Automatic detection of relevant content
- **Page Analysis**: Extract and analyze page information
- **Cross-tab Communication**: Seamless integration across tabs

## Installation

### Manual Installation

1. **Download the Extension**
   ```bash
   git clone <repository-url>
   cd messages
   ```

2. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked"
   - Select the `messages` folder

3. **Verify Installation**
   - The FREEMASONRY extension icon should appear in your Chrome toolbar
   - Click the icon to open the messaging interface

### Development Setup

1. **Install Dependencies** (if any)
   ```bash
   npm install
   ```

2. **Build Process** (if needed)
   ```bash
   npm run build
   ```

3. **Testing**
   - Open the extension popup
   - Test messaging functionality
   - Verify settings persistence

## File Structure

```
messages/
├── manifest.json          # Extension configuration
├── popup.html            # Main popup interface
├── popup.css             # Styling for popup
├── popup.js              # Popup functionality
├── background.js          # Background service worker
├── content.js            # Content script for web pages
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md             # This file
```

## Usage

### Basic Messaging

1. **Open the Extension**
   - Click the FREEMASONRY icon in your Chrome toolbar
   - The messaging interface will open

2. **Send Messages**
   - Type your message in the input field
   - Press Enter or click the send button
   - Messages will appear in the conversation

3. **View Responses**
   - System responses will appear automatically
   - Messages are timestamped for reference

### Contact Management

1. **Switch to Contacts Tab**
   - Click the "Contacts" tab in the navigation
   - View your brotherhood contacts

2. **Search Contacts**
   - Use the search bar to filter contacts
   - Real-time search results

3. **Contact Status**
   - Green indicators show online status
   - Last seen timestamps for offline contacts

### Settings Configuration

1. **Access Settings**
   - Click the "Settings" tab
   - Configure your preferences

2. **Available Options**
   - **Notifications**: Enable/disable push notifications
   - **Auto-sync**: Automatic data synchronization
   - **Dark Mode**: Toggle theme preference
   - **Privacy Mode**: Enhanced privacy controls

### Web Page Integration

1. **Floating Button**
   - A golden button appears on web pages
   - Click to quickly access the extension

2. **Content Highlighting**
   - Relevant content is automatically highlighted
   - Keywords are detected and marked

3. **Privacy Controls**
   - Toggle floating button visibility
   - Control content scanning

## Technical Details

### Architecture

- **Manifest V3**: Modern Chrome extension architecture
- **Service Worker**: Background processing and storage
- **Content Scripts**: Web page integration
- **Popup Interface**: User interaction layer

### Storage

- **Chrome Storage API**: Persistent data storage
- **Settings Sync**: Cross-device synchronization
- **Message History**: Local message storage
- **Activity Logs**: Usage tracking (privacy-controlled)

### Security

- **Privacy Mode**: Optional activity logging
- **Secure Storage**: Chrome's built-in security
- **Content Isolation**: Safe web page integration
- **Permission Management**: Minimal required permissions

## Customization

### Styling

The extension uses CSS custom properties for easy theming:

```css
:root {
  --primary-color: #ffd700;
  --secondary-color: #ffed4e;
  --background-dark: #1a1a2e;
  --text-light: #ffffff;
}
```

### Adding Features

1. **New Tabs**: Add to navigation in `popup.html`
2. **Settings**: Extend settings object in `popup.js`
3. **Storage**: Use Chrome storage API for persistence
4. **Messaging**: Extend message handling in background script

## Troubleshooting

### Common Issues

1. **Extension Not Loading**
   - Check Chrome extension page for errors
   - Verify manifest.json syntax
   - Reload the extension

2. **Messages Not Sending**
   - Check browser console for errors
   - Verify storage permissions
   - Test with sample data

3. **Styling Issues**
   - Clear browser cache
   - Check CSS file loading
   - Verify font loading

### Debug Mode

Enable debug logging:

```javascript
// In popup.js or background.js
const DEBUG = true;

if (DEBUG) {
    console.log('Debug information');
}
```

## Contributing

1. **Fork the Repository**
2. **Create Feature Branch**
3. **Make Changes**
4. **Test Thoroughly**
5. **Submit Pull Request**

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**FREEMASONRY Chrome Extension** - Building bridges of communication in the digital age. 
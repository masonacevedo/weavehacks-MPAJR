# FREEMASONRY Home Menu

A modern, interactive home menu for the FREEMASONRY Chrome extension, featuring a comprehensive navigation hub with MCP server integration.

## 🌟 Features

### Core Navigation
- **Communication Tools**: Messages, Contacts, Twitter Engagement
- **Resources & Documents**: Document management, Library, Symbols Guide
- **Events & Activities**: Event management, Charity work, Education
- **Tools & Utilities**: Analytics, Settings, Help & Support

### Interactive Elements
- **Real-time Statistics**: Live updates of member count, messages, and events
- **Quick Actions**: New message, Join meeting, Upload document, Report issue
- **Recent Activity Feed**: Dynamic activity updates with timestamps
- **Modal Navigation**: Smooth transitions between sections

### MCP Server Integration
- **Figma API Connection**: Seamless integration with Figma design system
- **Real-time Updates**: Live data synchronization
- **Error Handling**: Robust connection management

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation

1. **Clone or Download**
   ```bash
   # Navigate to the home-menu directory
   cd home-menu
   ```

2. **Open in Browser**
   ```bash
   # Option 1: Direct file opening
   open index.html
   
   # Option 2: Using a local server (recommended)
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **MCP Server Setup**
   ```bash
   # Ensure MCP server is running
   # The application will automatically connect to the configured MCP server
   ```

## 📁 Project Structure

```
home-menu/
├── index.html          # Main HTML structure
├── styles.css          # Comprehensive styling
├── script.js           # Interactive functionality
└── README.md          # This file
```

## 🎨 Design Features

### Visual Design
- **Dark Theme**: Professional dark interface with gold accents
- **Glass Morphism**: Modern backdrop blur effects
- **Responsive Layout**: Optimized for all screen sizes
- **Smooth Animations**: CSS transitions and keyframe animations

### Color Scheme
- **Primary**: Gold (#ffd700) - Represents masonic tradition
- **Background**: Dark blue gradient (#1a1a2e to #0f3460)
- **Text**: White with various opacity levels
- **Accents**: Gold gradients and highlights

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Icons**: Font Awesome 6.0

## 🔧 Configuration

### MCP Server Settings
The application automatically connects to the MCP server configured in your environment:

```json
{
  "mcpServers": {
    "Framelink Figma MCP": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--figma-api-key=YOUR_API_KEY", "--stdio"]
    }
  }
}
```

### Customization Options
- **Colors**: Modify CSS custom properties in `styles.css`
- **Content**: Update section content in `script.js`
- **Animations**: Adjust timing and effects in CSS
- **Layout**: Modify grid and flexbox properties

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

### Mobile Optimizations
- **Touch-friendly**: Larger touch targets
- **Simplified layout**: Single column navigation
- **Optimized spacing**: Reduced padding and margins
- **Accessibility**: Enhanced focus states

## 🎯 Usage Guide

### Navigation
1. **Click any navigation card** to access that section
2. **Use quick action buttons** for common tasks
3. **Keyboard navigation** supported (Enter, Escape)
4. **Settings button** in top-right for configuration

### Sections Overview

#### Communication
- **Messages**: Internal messaging system
- **Contacts**: Brotherhood contact management
- **Twitter Engagement**: Social media tools

#### Resources & Documents
- **Documents**: File management system
- **Library**: Educational resources
- **Symbols Guide**: Interactive masonic symbols

#### Events & Activities
- **Events**: Calendar and meeting management
- **Charity Work**: Philanthropic activities
- **Education**: Learning materials and courses

#### Tools & Utilities
- **Analytics**: Data visualization and insights
- **Settings**: User preferences and configuration
- **Help & Support**: Documentation and assistance

## 🔌 MCP Integration

### Server Communication
```javascript
// Example MCP message
await mcpServer.sendMessage({
    type: 'figma_request',
    data: {
        fileId: 'i6Pwcx6XF3cv2dqWbis5tW',
        nodeId: '1-35'
    }
});
```

### Error Handling
- **Connection failures**: Graceful fallback to local mode
- **API errors**: User-friendly error messages
- **Timeout handling**: Automatic retry mechanisms

## 🛠️ Development

### Local Development
```bash
# Start development server
python -m http.server 8000

# Or use Node.js
npx serve .

# Or use PHP
php -S localhost:8000
```

### Browser Compatibility
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Performance Optimizations
- **Lazy loading**: Images and content
- **CSS optimization**: Minified styles
- **JavaScript efficiency**: Event delegation
- **Caching**: Browser cache utilization

## 🧪 Testing

### Manual Testing
1. **Navigation**: Test all section links
2. **Responsive**: Test on different screen sizes
3. **Accessibility**: Keyboard navigation
4. **Performance**: Load times and animations

### Browser Testing
- Chrome DevTools
- Firefox Developer Tools
- Safari Web Inspector
- Edge DevTools

## 🚀 Deployment

### Static Hosting
```bash
# Build for production
# No build step required - static files ready to deploy

# Deploy to any static hosting service:
# - GitHub Pages
# - Netlify
# - Vercel
# - AWS S3
# - Firebase Hosting
```

### Chrome Extension Integration
```javascript
// In your Chrome extension manifest.json
{
  "action": {
    "default_popup": "home-menu/index.html"
  }
}
```

## 📈 Future Enhancements

### Planned Features
- **Real-time Chat**: WebSocket integration
- **File Upload**: Drag-and-drop functionality
- **Advanced Analytics**: Interactive charts
- **Mobile App**: React Native version
- **Offline Support**: Service Worker implementation

### Technical Improvements
- **TypeScript**: Type safety
- **Web Components**: Modular architecture
- **PWA Features**: Installable app
- **API Integration**: Backend services

## 🤝 Contributing

### Development Guidelines
1. **Code Style**: Follow existing patterns
2. **Testing**: Test on multiple browsers
3. **Documentation**: Update README as needed
4. **Accessibility**: Maintain WCAG compliance

### Pull Request Process
1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

This project is part of the FREEMASONRY Chrome extension suite.

## 🆘 Support

### Getting Help
- **Documentation**: Check this README
- **Issues**: Report bugs via GitHub
- **Questions**: Contact development team

### Common Issues
- **MCP Connection**: Check API key configuration
- **Styling Issues**: Clear browser cache
- **Performance**: Check browser console for errors

## 🔗 Related Projects

- **FREEMASONRY Chrome Extension**: Main extension
- **Twitter AI Engagement**: Social media tools
- **Figma Design System**: Design resources

---

**Built with ❤️ for the Brotherhood** 
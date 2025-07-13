# FREEMASONRY Authentication System

A comprehensive user authentication and profile management system for the FREEMASONRY Chrome extension, featuring secure login/signup, user profiles, and MCP server integration.

## 🌟 Features

### Authentication
- **Secure Login**: Email and password authentication
- **User Registration**: Complete signup with masonic details
- **Profile Management**: Avatar upload and personal information
- **Session Management**: Remember me functionality
- **Form Validation**: Real-time validation with error messages

### User Management
- **Profile Storage**: Local storage with user data persistence
- **Avatar Upload**: Image upload and preview functionality
- **Masonic Details**: Lodge number and degree tracking
- **Contact Information**: Phone, location, and bio fields

### MCP Integration
- **Figma API Connection**: Seamless integration with design system
- **User Events**: Login, signup, and profile update tracking
- **Real-time Sync**: Live data synchronization with server
- **Error Handling**: Robust connection management

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation

1. **Navigate to Directory**
   ```bash
   cd auth-system
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
auth-system/
├── index.html          # Main authentication interface
├── styles.css          # Comprehensive styling
├── script.js           # Authentication logic and MCP integration
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

### User Data Storage
- **Local Storage**: User profiles and session data
- **Session Storage**: Temporary session information
- **Demo Data**: Pre-loaded test users for development

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

### Mobile Optimizations
- **Touch-friendly**: Larger touch targets
- **Simplified layout**: Single column forms
- **Optimized spacing**: Reduced padding and margins
- **Accessibility**: Enhanced focus states

## 🎯 Usage Guide

### Authentication Flow

#### 1. Login Process
1. **Enter credentials**: Email and password
2. **Optional**: Check "Remember me" for persistent session
3. **Submit**: Click "Sign In" button
4. **Validation**: Real-time form validation
5. **Success**: Redirect to dashboard or show success modal

#### 2. Registration Process
1. **Fill form**: Complete all required fields
2. **Masonic details**: Lodge number and degree selection
3. **Password**: Create and confirm password
4. **Terms**: Agree to terms and conditions
5. **Submit**: Create account and proceed to profile setup

#### 3. Profile Setup
1. **Avatar**: Upload profile photo (optional)
2. **Personal info**: Bio, location, phone, interests
3. **Complete**: Finish profile setup
4. **Success**: Access to full application

### Form Fields

#### Login Form
- **Email**: Valid email address
- **Password**: Minimum 8 characters
- **Remember Me**: Persistent session option

#### Signup Form
- **Name**: First and last name
- **Email**: Valid email address
- **Lodge Number**: Optional lodge identifier
- **Degree**: Masonic degree selection
- **Password**: Secure password creation
- **Terms**: Agreement to terms and conditions

#### Profile Form
- **Avatar**: Profile photo upload
- **Bio**: Personal description
- **Location**: City and state
- **Phone**: Contact number
- **Interests**: Personal interests and activities

## 🔌 MCP Integration

### Server Communication
```javascript
// Example MCP messages
await mcpServer.sendMessage({
    type: 'user_login',
    data: { userId: 'user_123', email: 'user@example.com' }
});

await mcpServer.sendMessage({
    type: 'user_signup',
    data: { userId: 'user_456', email: 'newuser@example.com' }
});

await mcpServer.sendMessage({
    type: 'profile_update',
    data: { userId: 'user_123', profile: { bio: 'Updated bio' } }
});
```

### Event Types
- **user_login**: User authentication events
- **user_signup**: New user registration
- **profile_update**: Profile modification events
- **session_management**: Session state changes

### Error Handling
- **Connection failures**: Graceful fallback to local mode
- **API errors**: User-friendly error messages
- **Validation errors**: Real-time form feedback
- **Network issues**: Offline capability with local storage

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
1. **Login**: Test with demo users
2. **Registration**: Create new accounts
3. **Profile**: Update user information
4. **Validation**: Test form validation
5. **Responsive**: Test on different screen sizes

### Demo Users
The system includes demo users for testing:

**User 1:**
- Email: `john.smith@freemasonry.com`
- Password: `password123`
- Degree: Master Mason

**User 2:**
- Email: `michael.johnson@freemasonry.com`
- Password: `password123`
- Degree: Fellow Craft

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
    "default_popup": "auth-system/index.html"
  }
}
```

## 📈 Future Enhancements

### Planned Features
- **Two-Factor Authentication**: Enhanced security
- **Password Reset**: Email-based password recovery
- **Social Login**: Google, Facebook integration
- **Advanced Profiles**: Extended user information
- **Admin Panel**: User management interface

### Technical Improvements
- **TypeScript**: Type safety
- **Web Components**: Modular architecture
- **PWA Features**: Installable app
- **API Integration**: Backend services
- **Encryption**: Enhanced data security

## 🔒 Security Features

### Data Protection
- **Local Storage**: Secure user data storage
- **Session Management**: Proper session handling
- **Form Validation**: Client-side security
- **Password Security**: Minimum requirements enforcement

### Privacy
- **User Consent**: Terms and conditions agreement
- **Data Minimization**: Only collect necessary information
- **Local Processing**: Client-side data handling
- **Transparent Storage**: Clear data usage policies

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
- **Form Validation**: Clear browser cache
- **User Data**: Check localStorage permissions
- **Performance**: Check browser console for errors

## 🔗 Related Projects

- **FREEMASONRY Chrome Extension**: Main extension
- **Home Menu**: Navigation hub
- **Twitter AI Engagement**: Social media tools
- **Figma Design System**: Design resources

## 📊 User Data Schema

### User Profile Structure
```javascript
{
  id: 'user_123456789',
  firstName: 'John',
  lastName: 'Smith',
  email: 'john.smith@freemasonry.com',
  lodgeNumber: '#123',
  degree: 'master-mason',
  password: 'hashed_password',
  createdAt: '2024-01-15T10:00:00Z',
  lastLogin: '2024-01-15T10:00:00Z',
  avatar: 'data:image/jpeg;base64,...',
  bio: 'Personal description',
  location: 'New York, NY',
  phone: '(555) 123-4567',
  interests: 'History, Philosophy, Charity'
}
```

### Session Data Structure
```javascript
{
  userId: 'user_123456789',
  email: 'john.smith@freemasonry.com',
  firstName: 'John',
  lastName: 'Smith',
  degree: 'master-mason',
  lastLogin: '2024-01-15T10:00:00Z'
}
```

---

**Built with ❤️ for the Brotherhood** 
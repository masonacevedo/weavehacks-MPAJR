// FREEMASONRY Home Menu JavaScript
// MCP Server Integration and Interactive Features

class FreemasonryHomeMenu {
    constructor() {
        this.currentSection = 'home';
        this.mcpServer = null;
        this.activities = [];
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.loadRecentActivities();
        this.initializeMCP();
        this.setupAnimations();
        this.updateStats();
    }

    setupEventListeners() {
        // Navigation card clicks
        document.querySelectorAll('.nav-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const section = card.dataset.section;
                this.navigateToSection(section);
            });
        });

        // Quick action buttons
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = btn.dataset.action;
                this.handleQuickAction(action);
            });
        });

        // Settings button
        document.querySelector('.settings-btn').addEventListener('click', () => {
            this.showSettings();
        });

        // Modal close
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        // Modal backdrop click
        document.getElementById('navigationModal').addEventListener('click', (e) => {
            if (e.target.id === 'navigationModal') {
                this.closeModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    async initializeMCP() {
        try {
            // Initialize MCP server connection
            console.log('Initializing MCP server connection...');
            
            // Simulate MCP server connection
            this.mcpServer = {
                connected: true,
                sendMessage: async (message) => {
                    console.log('MCP Message:', message);
                    return { success: true, data: 'MCP response' };
                }
            };

            this.showNotification('MCP Server connected successfully', 'success');
        } catch (error) {
            console.error('MCP Server connection failed:', error);
            this.showNotification('MCP Server connection failed', 'error');
        }
    }

    navigateToSection(section) {
        console.log(`Navigating to section: ${section}`);
        
        // Show loading state
        this.showLoading();

        // Simulate navigation delay
        setTimeout(() => {
            this.hideLoading();
            
            switch (section) {
                case 'messages':
                    this.showSectionModal('Messages', this.getMessagesContent());
                    break;
                case 'contacts':
                    this.showSectionModal('Contacts', this.getContactsContent());
                    break;
                case 'twitter-engagement':
                    this.showSectionModal('Twitter Engagement', this.getTwitterEngagementContent());
                    break;
                case 'documents':
                    this.showSectionModal('Documents', this.getDocumentsContent());
                    break;
                case 'library':
                    this.showSectionModal('Library', this.getLibraryContent());
                    break;
                case 'symbols':
                    this.showSectionModal('Symbols Guide', this.getSymbolsContent());
                    break;
                case 'events':
                    this.showSectionModal('Events', this.getEventsContent());
                    break;
                case 'charity':
                    this.showSectionModal('Charity Work', this.getCharityContent());
                    break;
                case 'education':
                    this.showSectionModal('Education', this.getEducationContent());
                    break;
                case 'analytics':
                    this.showSectionModal('Analytics', this.getAnalyticsContent());
                    break;
                case 'settings':
                    this.showSettings();
                    break;
                case 'help':
                    this.showSectionModal('Help & Support', this.getHelpContent());
                    break;
                default:
                    this.showNotification(`Section ${section} not implemented yet`, 'info');
            }
        }, 500);
    }

    handleQuickAction(action) {
        console.log(`Quick action: ${action}`);
        
        switch (action) {
            case 'new-message':
                this.showNewMessageDialog();
                break;
            case 'join-meeting':
                this.joinMeeting();
                break;
            case 'upload-document':
                this.uploadDocument();
                break;
            case 'report-issue':
                this.reportIssue();
                break;
            default:
                this.showNotification(`Action ${action} not implemented yet`, 'info');
        }
    }

    showSectionModal(title, content) {
        const modal = document.getElementById('navigationModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modal.classList.add('active');
    }

    closeModal() {
        const modal = document.getElementById('navigationModal');
        modal.classList.remove('active');
    }

    showLoading() {
        const loading = document.createElement('div');
        loading.className = 'loading';
        loading.textContent = 'Loading...';
        document.body.appendChild(loading);
    }

    hideLoading() {
        const loading = document.querySelector('.loading');
        if (loading) {
            loading.remove();
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    loadRecentActivities() {
        const activities = [
            {
                icon: 'fas fa-comments',
                text: 'New message from Brother Johnson',
                time: '2 minutes ago'
            },
            {
                icon: 'fas fa-calendar-alt',
                text: 'Lodge meeting scheduled for tomorrow',
                time: '15 minutes ago'
            },
            {
                icon: 'fas fa-file-alt',
                text: 'New document uploaded: Meeting Minutes',
                time: '1 hour ago'
            },
            {
                icon: 'fas fa-users',
                text: 'Brother Smith joined the lodge',
                time: '2 hours ago'
            },
            {
                icon: 'fas fa-heart',
                text: 'Charity donation received: $500',
                time: '3 hours ago'
            }
        ];

        const activityList = document.getElementById('activityList');
        activityList.innerHTML = '';

        activities.forEach(activity => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.innerHTML = `
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <p>${activity.text}</p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            `;
            activityList.appendChild(activityItem);
        });
    }

    updateStats() {
        // Simulate real-time stats updates
        setInterval(() => {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const currentValue = parseInt(stat.textContent);
                const newValue = currentValue + Math.floor(Math.random() * 3) - 1;
                if (newValue >= 0) {
                    stat.textContent = newValue;
                }
            });
        }, 10000); // Update every 10 seconds
    }

    setupAnimations() {
        // Add scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.nav-card, .action-btn').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
    }

    handleKeyboardNavigation(e) {
        switch (e.key) {
            case 'Escape':
                this.closeModal();
                break;
            case 'Enter':
                if (document.activeElement.classList.contains('nav-card')) {
                    const section = document.activeElement.dataset.section;
                    this.navigateToSection(section);
                }
                break;
        }
    }

    handleResize() {
        // Handle responsive behavior
        const isMobile = window.innerWidth <= 768;
        const cards = document.querySelectorAll('.nav-card');
        
        cards.forEach(card => {
            if (isMobile) {
                card.style.flexDirection = 'column';
                card.style.textAlign = 'center';
            } else {
                card.style.flexDirection = 'row';
                card.style.textAlign = 'left';
            }
        });
    }

    // Section content generators
    getMessagesContent() {
        return `
            <div class="section-content">
                <h4>Messages Overview</h4>
                <p>Connect with brothers and manage your conversations.</p>
                <div class="message-stats">
                    <div class="stat">
                        <span class="number">23</span>
                        <span class="label">New Messages</span>
                    </div>
                    <div class="stat">
                        <span class="number">127</span>
                        <span class="label">Total Contacts</span>
                    </div>
                </div>
                <button class="action-btn primary" onclick="homeMenu.composeMessage()">
                    <i class="fas fa-plus"></i>
                    Compose Message
                </button>
            </div>
        `;
    }

    getContactsContent() {
        return `
            <div class="section-content">
                <h4>Brotherhood Contacts</h4>
                <p>Browse and manage your lodge contacts.</p>
                <div class="contact-search">
                    <input type="text" placeholder="Search contacts..." class="search-input">
                </div>
                <div class="contact-list">
                    <div class="contact-item">
                        <img src="https://via.placeholder.com/40x40/ffd700/1a1a2e?text=J" alt="Contact">
                        <div class="contact-info">
                            <h5>Brother Johnson</h5>
                            <p>Master Mason</p>
                        </div>
                        <span class="status online"></span>
                    </div>
                    <div class="contact-item">
                        <img src="https://via.placeholder.com/40x40/ffd700/1a1a2e?text=S" alt="Contact">
                        <div class="contact-info">
                            <h5>Brother Smith</h5>
                            <p>Senior Warden</p>
                        </div>
                        <span class="status offline"></span>
                    </div>
                </div>
            </div>
        `;
    }

    getTwitterEngagementContent() {
        return `
            <div class="section-content">
                <h4>Twitter Engagement Tools</h4>
                <p>AI-powered social media engagement for the brotherhood.</p>
                <div class="twitter-stats">
                    <div class="stat">
                        <span class="number">1,247</span>
                        <span class="label">Tweets Analyzed</span>
                    </div>
                    <div class="stat">
                        <span class="number">89</span>
                        <span class="label">AI Responses</span>
                    </div>
                </div>
                <div class="twitter-actions">
                    <button class="action-btn primary">
                        <i class="fab fa-twitter"></i>
                        Start Scraping
                    </button>
                    <button class="action-btn secondary">
                        <i class="fas fa-robot"></i>
                        Generate Response
                    </button>
                </div>
            </div>
        `;
    }

    getDocumentsContent() {
        return `
            <div class="section-content">
                <h4>Lodge Documents</h4>
                <p>Access important lodge documents and files.</p>
                <div class="document-categories">
                    <div class="category">
                        <h5>Meeting Minutes</h5>
                        <span class="count">12 files</span>
                    </div>
                    <div class="category">
                        <h5>Rituals</h5>
                        <span class="count">8 files</span>
                    </div>
                    <div class="category">
                        <h5>Administrative</h5>
                        <span class="count">25 files</span>
                    </div>
                </div>
                <button class="action-btn primary">
                    <i class="fas fa-upload"></i>
                    Upload Document
                </button>
            </div>
        `;
    }

    getLibraryContent() {
        return `
            <div class="section-content">
                <h4>Masonic Library</h4>
                <p>Browse masonic literature and educational resources.</p>
                <div class="library-stats">
                    <div class="stat">
                        <span class="number">200+</span>
                        <span class="label">Books Available</span>
                    </div>
                    <div class="stat">
                        <span class="number">50</span>
                        <span class="label">Digital Resources</span>
                    </div>
                </div>
                <div class="featured-books">
                    <h5>Featured Books</h5>
                    <ul>
                        <li>Mackey's Encyclopedia of Freemasonry</li>
                        <li>The Craft and Its Symbols</li>
                        <li>Freemasonry: A Journey Through Ritual and Symbol</li>
                    </ul>
                </div>
            </div>
        `;
    }

    getSymbolsContent() {
        return `
            <div class="section-content">
                <h4>Masonic Symbols Guide</h4>
                <p>Interactive guide to masonic symbols and their meanings.</p>
                <div class="symbols-grid">
                    <div class="symbol-item">
                        <div class="symbol-icon">⚜️</div>
                        <h5>Fleur-de-lis</h5>
                        <p>Symbol of purity and light</p>
                    </div>
                    <div class="symbol-item">
                        <div class="symbol-icon">📐</div>
                        <h5>Square and Compass</h5>
                        <p>Tools of the operative mason</p>
                    </div>
                    <div class="symbol-item">
                        <div class="symbol-icon">🌙</div>
                        <h5>Moon</h5>
                        <p>Symbol of the Senior Warden</p>
                    </div>
                </div>
                <button class="action-btn primary">
                    <i class="fas fa-search"></i>
                    Search Symbols
                </button>
            </div>
        `;
    }

    getEventsContent() {
        return `
            <div class="section-content">
                <h4>Lodge Events</h4>
                <p>View and manage upcoming lodge events and meetings.</p>
                <div class="upcoming-events">
                    <div class="event-item">
                        <div class="event-date">
                            <span class="day">15</span>
                            <span class="month">Dec</span>
                        </div>
                        <div class="event-details">
                            <h5>Monthly Lodge Meeting</h5>
                            <p>Regular business meeting</p>
                            <span class="time">7:00 PM</span>
                        </div>
                    </div>
                    <div class="event-item">
                        <div class="event-date">
                            <span class="day">20</span>
                            <span class="month">Dec</span>
                        </div>
                        <div class="event-details">
                            <h5>Charity Fundraiser</h5>
                            <p>Annual holiday charity event</p>
                            <span class="time">6:30 PM</span>
                        </div>
                    </div>
                </div>
                <button class="action-btn primary">
                    <i class="fas fa-plus"></i>
                    Add Event
                </button>
            </div>
        `;
    }

    getCharityContent() {
        return `
            <div class="section-content">
                <h4>Charity Work</h4>
                <p>Participate in charitable activities and make donations.</p>
                <div class="charity-stats">
                    <div class="stat">
                        <span class="number">$15,420</span>
                        <span class="label">Total Raised</span>
                    </div>
                    <div class="stat">
                        <span class="number">23</span>
                        <span class="label">Active Projects</span>
                    </div>
                </div>
                <div class="charity-projects">
                    <h5>Current Projects</h5>
                    <ul>
                        <li>Local Food Bank Support</li>
                        <li>Educational Scholarships</li>
                        <li>Community Health Initiative</li>
                    </ul>
                </div>
                <button class="action-btn primary">
                    <i class="fas fa-heart"></i>
                    Make Donation
                </button>
            </div>
        `;
    }

    getEducationContent() {
        return `
            <div class="section-content">
                <h4>Masonic Education</h4>
                <p>Access educational materials and courses for all degrees.</p>
                <div class="education-stats">
                    <div class="stat">
                        <span class="number">12</span>
                        <span class="label">Available Courses</span>
                    </div>
                    <div class="stat">
                        <span class="number">89</span>
                        <span class="label">Active Students</span>
                    </div>
                </div>
                <div class="course-categories">
                    <div class="category">
                        <h5>Entered Apprentice</h5>
                        <span class="count">4 courses</span>
                    </div>
                    <div class="category">
                        <h5>Fellow Craft</h5>
                        <span class="count">3 courses</span>
                    </div>
                    <div class="category">
                        <h5>Master Mason</h5>
                        <span class="count">5 courses</span>
                    </div>
                </div>
                <button class="action-btn primary">
                    <i class="fas fa-graduation-cap"></i>
                    Start Learning
                </button>
            </div>
        `;
    }

    getAnalyticsContent() {
        return `
            <div class="section-content">
                <h4>Engagement Analytics</h4>
                <p>View detailed analytics and insights about lodge activity.</p>
                <div class="analytics-overview">
                    <div class="metric">
                        <span class="label">Active Members</span>
                        <span class="value">127</span>
                    </div>
                    <div class="metric">
                        <span class="label">Monthly Messages</span>
                        <span class="value">1,247</span>
                    </div>
                    <div class="metric">
                        <span class="label">Event Attendance</span>
                        <span class="value">89%</span>
                    </div>
                </div>
                <div class="chart-placeholder">
                    <p>📊 Interactive charts and graphs would be displayed here</p>
                </div>
                <button class="action-btn primary">
                    <i class="fas fa-download"></i>
                    Export Report
                </button>
            </div>
        `;
    }

    getHelpContent() {
        return `
            <div class="section-content">
                <h4>Help & Support</h4>
                <p>Get help and contact the support team.</p>
                <div class="help-options">
                    <div class="help-item">
                        <i class="fas fa-book"></i>
                        <h5>User Guide</h5>
                        <p>Comprehensive documentation</p>
                    </div>
                    <div class="help-item">
                        <i class="fas fa-video"></i>
                        <h5>Video Tutorials</h5>
                        <p>Step-by-step instructions</p>
                    </div>
                    <div class="help-item">
                        <i class="fas fa-headset"></i>
                        <h5>Live Support</h5>
                        <p>24/7 technical assistance</p>
                    </div>
                </div>
                <div class="contact-support">
                    <h5>Contact Support</h5>
                    <p>Email: support@freemasonry.com</p>
                    <p>Phone: (555) 123-4567</p>
                </div>
            </div>
        `;
    }

    // Quick action handlers
    showNewMessageDialog() {
        this.showSectionModal('New Message', `
            <div class="section-content">
                <h4>Compose New Message</h4>
                <form class="message-form">
                    <div class="form-group">
                        <label>To:</label>
                        <select class="form-input">
                            <option>Select recipient...</option>
                            <option>Brother Johnson</option>
                            <option>Brother Smith</option>
                            <option>All Members</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Subject:</label>
                        <input type="text" class="form-input" placeholder="Enter subject">
                    </div>
                    <div class="form-group">
                        <label>Message:</label>
                        <textarea class="form-input" rows="5" placeholder="Enter your message"></textarea>
                    </div>
                    <button type="submit" class="action-btn primary">
                        <i class="fas fa-paper-plane"></i>
                        Send Message
                    </button>
                </form>
            </div>
        `);
    }

    joinMeeting() {
        this.showNotification('Joining virtual meeting...', 'success');
        // Simulate joining meeting
        setTimeout(() => {
            this.showNotification('Successfully joined meeting', 'success');
        }, 2000);
    }

    uploadDocument() {
        this.showNotification('Document upload feature coming soon', 'info');
    }

    reportIssue() {
        this.showSectionModal('Report Issue', `
            <div class="section-content">
                <h4>Report an Issue</h4>
                <form class="issue-form">
                    <div class="form-group">
                        <label>Issue Type:</label>
                        <select class="form-input">
                            <option>Select issue type...</option>
                            <option>Technical Problem</option>
                            <option>Feature Request</option>
                            <option>Bug Report</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Description:</label>
                        <textarea class="form-input" rows="4" placeholder="Describe the issue..."></textarea>
                    </div>
                    <button type="submit" class="action-btn primary">
                        <i class="fas fa-paper-plane"></i>
                        Submit Report
                    </button>
                </form>
            </div>
        `);
    }

    showSettings() {
        this.showSectionModal('Settings', `
            <div class="section-content">
                <h4>Account Settings</h4>
                <div class="settings-sections">
                    <div class="setting-group">
                        <h5>Profile</h5>
                        <div class="setting-item">
                            <label>Display Name</label>
                            <input type="text" class="form-input" value="Brother User">
                        </div>
                        <div class="setting-item">
                            <label>Email</label>
                            <input type="email" class="form-input" value="user@freemasonry.com">
                        </div>
                    </div>
                    <div class="setting-group">
                        <h5>Notifications</h5>
                        <div class="setting-item">
                            <label>
                                <input type="checkbox" checked> Email Notifications
                            </label>
                        </div>
                        <div class="setting-item">
                            <label>
                                <input type="checkbox" checked> Push Notifications
                            </label>
                        </div>
                    </div>
                    <button class="action-btn primary">
                        <i class="fas fa-save"></i>
                        Save Settings
                    </button>
                </div>
            </div>
        `);
    }
}

// Initialize the application
const homeMenu = new FreemasonryHomeMenu();

// Export for global access
window.homeMenu = homeMenu; 
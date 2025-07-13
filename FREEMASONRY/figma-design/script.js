// FREEMASONRY Design Implementation - JavaScript

class FreemasonryApp {
    constructor() {
        this.currentSection = 'dashboard';
        this.messages = [];
        this.contacts = [];
        this.documents = [];
        this.events = [];
        this.settings = {
            emailNotifications: true,
            pushNotifications: true,
            profileVisibility: 'members',
            darkMode: false
        };
        
        this.init();
    }

    init() {
        this.loadSampleData();
        this.setupEventListeners();
        this.renderContent();
        this.applySettings();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('href').substring(1);
                this.navigateToSection(section);
            });
        });

        // Search functionality
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Contact search
        const contactSearch = document.getElementById('contactSearch');
        if (contactSearch) {
            contactSearch.addEventListener('input', (e) => {
                this.filterContacts(e.target.value);
            });
        }

        // New message button
        const newMessageBtn = document.querySelector('.new-message-btn');
        if (newMessageBtn) {
            newMessageBtn.addEventListener('click', () => {
                this.openMessageModal();
            });
        }

        // Modal functionality
        this.setupModalEvents();

        // Settings toggles
        this.setupSettingsEvents();

        // Notification button
        const notificationBtn = document.querySelector('.notification-btn');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', () => {
                this.showNotifications();
            });
        }

        // Profile button
        const profileBtn = document.querySelector('.profile-btn');
        if (profileBtn) {
            profileBtn.addEventListener('click', () => {
                this.showProfileMenu();
            });
        }
    }

    navigateToSection(section) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[href="#${section}"]`).parentElement.classList.add('active');

        // Update content
        document.querySelectorAll('.content-section').forEach(sectionEl => {
            sectionEl.classList.remove('active');
        });
        document.getElementById(section).classList.add('active');

        // Update page title
        this.updatePageTitle(section);

        this.currentSection = section;
        this.renderSectionContent(section);
    }

    updatePageTitle(section) {
        const titles = {
            dashboard: 'Dashboard',
            messages: 'Messages',
            contacts: 'Contacts',
            documents: 'Documents',
            events: 'Events',
            settings: 'Settings'
        };

        const subtitles = {
            dashboard: 'Welcome to the brotherhood',
            messages: 'Communicate with your brothers',
            contacts: 'Manage your connections',
            documents: 'Access lodge documents',
            events: 'View upcoming events',
            settings: 'Configure your preferences'
        };

        const pageTitle = document.getElementById('page-title');
        const pageSubtitle = document.getElementById('page-subtitle');

        if (pageTitle) pageTitle.textContent = titles[section] || 'Page';
        if (pageSubtitle) pageSubtitle.textContent = subtitles[section] || '';
    }

    renderSectionContent(section) {
        switch (section) {
            case 'messages':
                this.renderMessages();
                break;
            case 'contacts':
                this.renderContacts();
                break;
            case 'documents':
                this.renderDocuments();
                break;
            case 'events':
                this.renderEvents();
                break;
            case 'settings':
                this.renderSettings();
                break;
        }
    }

    loadSampleData() {
        // Sample messages
        this.messages = [
            {
                id: 1,
                sender: 'Brother John Smith',
                subject: 'Monthly Meeting Reminder',
                content: 'Don\'t forget about our monthly meeting this Saturday.',
                timestamp: '2 hours ago',
                unread: true
            },
            {
                id: 2,
                sender: 'Brother Michael Brown',
                subject: 'Charity Event Planning',
                content: 'We need to discuss the upcoming charity fundraiser.',
                timestamp: '1 day ago',
                unread: false
            },
            {
                id: 3,
                sender: 'Brother David Wilson',
                subject: 'New Member Welcome',
                content: 'Welcome to our newest brother to the lodge.',
                timestamp: '3 days ago',
                unread: false
            }
        ];

        // Sample contacts
        this.contacts = [
            { id: 1, name: 'Brother John Smith', status: 'Online', avatar: 'JS', role: 'Master' },
            { id: 2, name: 'Brother Michael Brown', status: 'Online', avatar: 'MB', role: 'Senior Warden' },
            { id: 3, name: 'Brother David Wilson', status: 'Last seen 2 hours ago', avatar: 'DW', role: 'Junior Warden' },
            { id: 4, name: 'Brother Robert Johnson', status: 'Last seen 1 day ago', avatar: 'RJ', role: 'Treasurer' },
            { id: 5, name: 'Brother William Davis', status: 'Online', avatar: 'WD', role: 'Secretary' }
        ];

        // Sample documents
        this.documents = [
            { id: 1, name: 'Lodge Bylaws', type: 'PDF', size: '2.3 MB', updated: '1 week ago' },
            { id: 2, name: 'Meeting Minutes - December', type: 'DOC', size: '1.1 MB', updated: '3 days ago' },
            { id: 3, name: 'Charity Event Guidelines', type: 'PDF', size: '3.7 MB', updated: '1 day ago' },
            { id: 4, name: 'Member Directory', type: 'XLS', size: '0.8 MB', updated: '2 weeks ago' }
        ];

        // Sample events
        this.events = [
            { id: 1, title: 'Monthly Lodge Meeting', date: '2024-01-15', time: '7:00 PM', location: 'Main Hall' },
            { id: 2, title: 'Charity Fundraiser', date: '2024-01-22', time: '6:30 PM', location: 'Community Center' },
            { id: 3, title: 'New Member Initiation', date: '2024-01-28', time: '8:00 PM', location: 'Lodge Room' }
        ];
    }

    renderMessages() {
        const messagesList = document.getElementById('messagesList');
        if (!messagesList) return;

        messagesList.innerHTML = '';

        this.messages.forEach(message => {
            const messageElement = this.createMessageElement(message);
            messagesList.appendChild(messageElement);
        });
    }

    createMessageElement(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-item ${message.unread ? 'unread' : ''}`;
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <div class="avatar-circle">${message.sender.split(' ').map(n => n[0]).join('')}</div>
            </div>
            <div class="message-content">
                <div class="message-header">
                    <h4>${message.sender}</h4>
                    <span class="message-time">${message.timestamp}</span>
                </div>
                <h5>${message.subject}</h5>
                <p>${message.content}</p>
            </div>
            ${message.unread ? '<div class="unread-indicator"></div>' : ''}
        `;

        messageDiv.addEventListener('click', () => {
            this.openMessage(message);
        });

        return messageDiv;
    }

    renderContacts() {
        const contactsList = document.getElementById('contactsList');
        if (!contactsList) return;

        contactsList.innerHTML = '';

        this.contacts.forEach(contact => {
            const contactElement = this.createContactElement(contact);
            contactsList.appendChild(contactElement);
        });
    }

    createContactElement(contact) {
        const contactDiv = document.createElement('div');
        contactDiv.className = 'contact-item';
        contactDiv.innerHTML = `
            <div class="contact-avatar">
                <div class="avatar-circle">${contact.avatar}</div>
                <div class="status-indicator ${contact.status === 'Online' ? 'online' : 'offline'}"></div>
            </div>
            <div class="contact-info">
                <h4>${contact.name}</h4>
                <p class="contact-role">${contact.role}</p>
                <p class="contact-status">${contact.status}</p>
            </div>
        `;

        contactDiv.addEventListener('click', () => {
            this.openContactProfile(contact);
        });

        return contactDiv;
    }

    filterContacts(searchTerm) {
        const contactsList = document.getElementById('contactsList');
        if (!contactsList) return;

        contactsList.innerHTML = '';

        const filteredContacts = this.contacts.filter(contact =>
            contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.role.toLowerCase().includes(searchTerm.toLowerCase())
        );

        filteredContacts.forEach(contact => {
            const contactElement = this.createContactElement(contact);
            contactsList.appendChild(contactElement);
        });
    }

    renderDocuments() {
        const documentsGrid = document.getElementById('documentsGrid');
        if (!documentsGrid) return;

        documentsGrid.innerHTML = '';

        this.documents.forEach(document => {
            const documentElement = this.createDocumentElement(document);
            documentsGrid.appendChild(documentElement);
        });
    }

    createDocumentElement(document) {
        const documentDiv = document.createElement('div');
        documentDiv.className = 'document-item';
        documentDiv.innerHTML = `
            <div class="document-icon">
                <i class="fas fa-file-${document.type.toLowerCase()}"></i>
            </div>
            <div class="document-info">
                <h4>${document.name}</h4>
                <p>${document.size} • ${document.updated}</p>
            </div>
            <div class="document-actions">
                <button class="btn-download"><i class="fas fa-download"></i></button>
                <button class="btn-share"><i class="fas fa-share"></i></button>
            </div>
        `;

        return documentDiv;
    }

    renderEvents() {
        const eventsCalendar = document.getElementById('eventsCalendar');
        if (!eventsCalendar) return;

        eventsCalendar.innerHTML = '';

        this.events.forEach(event => {
            const eventElement = this.createEventElement(event);
            eventsCalendar.appendChild(eventElement);
        });
    }

    createEventElement(event) {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event-item';
        eventDiv.innerHTML = `
            <div class="event-date">
                <span class="event-day">${new Date(event.date).getDate()}</span>
                <span class="event-month">${new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
            </div>
            <div class="event-details">
                <h4>${event.title}</h4>
                <p><i class="fas fa-clock"></i> ${event.time}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
            </div>
            <div class="event-actions">
                <button class="btn-rsvp">RSVP</button>
            </div>
        `;

        return eventDiv;
    }

    setupModalEvents() {
        const messageModal = document.getElementById('messageModal');
        const closeModal = document.getElementById('closeMessageModal');
        const cancelMessage = document.getElementById('cancelMessage');
        const sendMessage = document.getElementById('sendMessage');

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                this.closeMessageModal();
            });
        }

        if (cancelMessage) {
            cancelMessage.addEventListener('click', () => {
                this.closeMessageModal();
            });
        }

        if (sendMessage) {
            sendMessage.addEventListener('click', () => {
                this.sendNewMessage();
            });
        }

        // Close modal when clicking outside
        if (messageModal) {
            messageModal.addEventListener('click', (e) => {
                if (e.target === messageModal) {
                    this.closeMessageModal();
                }
            });
        }
    }

    openMessageModal() {
        const messageModal = document.getElementById('messageModal');
        if (messageModal) {
            messageModal.classList.add('active');
            this.populateRecipients();
        }
    }

    closeMessageModal() {
        const messageModal = document.getElementById('messageModal');
        if (messageModal) {
            messageModal.classList.remove('active');
            this.clearMessageForm();
        }
    }

    populateRecipients() {
        const recipientSelect = document.getElementById('messageRecipient');
        if (!recipientSelect) return;

        recipientSelect.innerHTML = '<option value="">Select recipient...</option>';
        this.contacts.forEach(contact => {
            const option = document.createElement('option');
            option.value = contact.id;
            option.textContent = contact.name;
            recipientSelect.appendChild(option);
        });
    }

    clearMessageForm() {
        const subject = document.getElementById('messageSubject');
        const content = document.getElementById('messageContent');
        const recipient = document.getElementById('messageRecipient');

        if (subject) subject.value = '';
        if (content) content.value = '';
        if (recipient) recipient.value = '';
    }

    sendNewMessage() {
        const recipient = document.getElementById('messageRecipient');
        const subject = document.getElementById('messageSubject');
        const content = document.getElementById('messageContent');

        if (!recipient.value || !subject.value || !content.value) {
            alert('Please fill in all fields');
            return;
        }

        const newMessage = {
            id: Date.now(),
            sender: 'You',
            subject: subject.value,
            content: content.value,
            timestamp: 'Just now',
            unread: false
        };

        this.messages.unshift(newMessage);
        this.renderMessages();
        this.closeMessageModal();
        this.showNotification('Message sent successfully');
    }

    setupSettingsEvents() {
        const emailNotifications = document.getElementById('emailNotifications');
        const pushNotifications = document.getElementById('pushNotifications');
        const profileVisibility = document.getElementById('profileVisibility');
        const darkMode = document.getElementById('darkMode');

        if (emailNotifications) {
            emailNotifications.addEventListener('change', (e) => {
                this.settings.emailNotifications = e.target.checked;
                this.saveSettings();
            });
        }

        if (pushNotifications) {
            pushNotifications.addEventListener('change', (e) => {
                this.settings.pushNotifications = e.target.checked;
                this.saveSettings();
            });
        }

        if (profileVisibility) {
            profileVisibility.addEventListener('change', (e) => {
                this.settings.profileVisibility = e.target.value;
                this.saveSettings();
            });
        }

        if (darkMode) {
            darkMode.addEventListener('change', (e) => {
                this.settings.darkMode = e.target.checked;
                this.toggleDarkMode();
                this.saveSettings();
            });
        }
    }

    applySettings() {
        const emailNotifications = document.getElementById('emailNotifications');
        const pushNotifications = document.getElementById('pushNotifications');
        const profileVisibility = document.getElementById('profileVisibility');
        const darkMode = document.getElementById('darkMode');

        if (emailNotifications) emailNotifications.checked = this.settings.emailNotifications;
        if (pushNotifications) pushNotifications.checked = this.settings.pushNotifications;
        if (profileVisibility) profileVisibility.value = this.settings.profileVisibility;
        if (darkMode) darkMode.checked = this.settings.darkMode;

        this.toggleDarkMode();
    }

    toggleDarkMode() {
        const body = document.body;
        if (this.settings.darkMode) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    }

    saveSettings() {
        // In a real app, this would save to localStorage or a server
        console.log('Settings saved:', this.settings);
    }

    handleSearch(searchTerm) {
        // Implement search functionality across all sections
        console.log('Searching for:', searchTerm);
    }

    showNotifications() {
        // Implement notifications panel
        alert('Notifications: 3 new messages, 1 upcoming event');
    }

    showProfileMenu() {
        // Implement profile menu
        alert('Profile menu would appear here');
    }

    openMessage(message) {
        // Implement message detail view
        alert(`Opening message: ${message.subject}`);
    }

    openContactProfile(contact) {
        // Implement contact profile view
        alert(`Opening profile: ${contact.name}`);
    }

    showNotification(message) {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #ffd700, #ffed4e);
            color: #1a1a2e;
            padding: 15px 20px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 3000;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    renderContent() {
        this.renderMessages();
        this.renderContacts();
        this.renderDocuments();
        this.renderEvents();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FreemasonryApp();
});

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FreemasonryApp;
} 
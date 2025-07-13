// FREEMASONRY Chrome Extension - Popup JavaScript

class FreemasonryApp {
    constructor() {
        this.currentTab = 'messages';
        this.messages = [];
        this.contacts = [];
        this.settings = {
            notifications: true,
            autoSync: true,
            darkMode: false,
            privacyMode: false
        };
        
        this.init();
    }

    init() {
        this.loadSettings();
        this.setupEventListeners();
        this.loadSampleData();
        this.renderMessages();
        this.renderContacts();
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.closest('.tab-btn').dataset.tab);
            });
        });

        // Message input
        const messageInput = document.getElementById('messageInput');
        const sendBtn = document.getElementById('sendBtn');

        sendBtn.addEventListener('click', () => {
            this.sendMessage();
        });

        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Settings toggles
        document.getElementById('notificationsToggle').addEventListener('change', (e) => {
            this.settings.notifications = e.target.checked;
            this.saveSettings();
        });

        document.getElementById('autoSyncToggle').addEventListener('change', (e) => {
            this.settings.autoSync = e.target.checked;
            this.saveSettings();
        });

        document.getElementById('darkModeToggle').addEventListener('change', (e) => {
            this.settings.darkMode = e.target.checked;
            this.toggleDarkMode();
            this.saveSettings();
        });

        document.getElementById('privacyModeToggle').addEventListener('change', (e) => {
            this.settings.privacyMode = e.target.checked;
            this.saveSettings();
        });

        // Contact search
        document.getElementById('contactSearch').addEventListener('input', (e) => {
            this.filterContacts(e.target.value);
        });
    }

    switchTab(tabName) {
        // Update active tab button
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update active tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');

        this.currentTab = tabName;
    }

    sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();

        if (message) {
            const newMessage = {
                id: Date.now(),
                text: message,
                sender: 'user',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                type: 'sent'
            };

            this.messages.push(newMessage);
            this.renderMessages();
            messageInput.value = '';

            // Simulate response after 1-3 seconds
            setTimeout(() => {
                this.simulateResponse();
            }, Math.random() * 2000 + 1000);
        }
    }

    simulateResponse() {
        const responses = [
            "Thank you for your message. The brotherhood appreciates your communication.",
            "Your message has been received and will be processed accordingly.",
            "The lodge acknowledges your contribution to our discussions.",
            "Your words carry weight within our fraternity.",
            "We stand together in unity and purpose."
        ];

        const response = {
            id: Date.now(),
            text: responses[Math.floor(Math.random() * responses.length)],
            sender: 'system',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'received'
        };

        this.messages.push(response);
        this.renderMessages();
    }

    renderMessages() {
        const messageList = document.getElementById('messageList');
        messageList.innerHTML = '';

        this.messages.forEach(message => {
            const messageElement = this.createMessageElement(message);
            messageList.appendChild(messageElement);
        });

        // Scroll to bottom
        messageList.scrollTop = messageList.scrollHeight;
    }

    createMessageElement(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.type}`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = message.sender === 'user' ? 'U' : 'S';

        const content = document.createElement('div');
        content.className = 'message-content';

        const text = document.createElement('div');
        text.className = 'message-text';
        text.textContent = message.text;

        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = message.timestamp;

        content.appendChild(text);
        content.appendChild(time);

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);

        return messageDiv;
    }

    loadSampleData() {
        // Sample messages
        this.messages = [
            {
                id: 1,
                text: "Welcome to the FREEMASONRY messaging system.",
                sender: 'system',
                timestamp: '10:30 AM',
                type: 'received'
            },
            {
                id: 2,
                text: "Thank you for the warm welcome.",
                sender: 'user',
                timestamp: '10:31 AM',
                type: 'sent'
            },
            {
                id: 3,
                text: "The brotherhood is pleased to have you here.",
                sender: 'system',
                timestamp: '10:32 AM',
                type: 'received'
            }
        ];

        // Sample contacts
        this.contacts = [
            { id: 1, name: 'Brother John Smith', status: 'Online', avatar: 'JS' },
            { id: 2, name: 'Brother Michael Brown', status: 'Last seen 2 hours ago', avatar: 'MB' },
            { id: 3, name: 'Brother David Wilson', status: 'Online', avatar: 'DW' },
            { id: 4, name: 'Brother Robert Johnson', status: 'Last seen 1 day ago', avatar: 'RJ' },
            { id: 5, name: 'Brother William Davis', status: 'Online', avatar: 'WD' }
        ];
    }

    renderContacts() {
        const contactList = document.getElementById('contactList');
        contactList.innerHTML = '';

        this.contacts.forEach(contact => {
            const contactElement = this.createContactElement(contact);
            contactList.appendChild(contactElement);
        });
    }

    createContactElement(contact) {
        const contactDiv = document.createElement('div');
        contactDiv.className = 'contact-item';

        const avatar = document.createElement('div');
        avatar.className = 'contact-avatar';
        avatar.textContent = contact.avatar;

        const info = document.createElement('div');
        info.className = 'contact-info';

        const name = document.createElement('div');
        name.className = 'contact-name';
        name.textContent = contact.name;

        const status = document.createElement('div');
        status.className = 'contact-status';
        status.textContent = contact.status;

        info.appendChild(name);
        info.appendChild(status);

        contactDiv.appendChild(avatar);
        contactDiv.appendChild(info);

        return contactDiv;
    }

    filterContacts(searchTerm) {
        const contactList = document.getElementById('contactList');
        contactList.innerHTML = '';

        const filteredContacts = this.contacts.filter(contact =>
            contact.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        filteredContacts.forEach(contact => {
            const contactElement = this.createContactElement(contact);
            contactList.appendChild(contactElement);
        });
    }

    toggleDarkMode() {
        const body = document.body;
        if (this.settings.darkMode) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    }

    loadSettings() {
        chrome.storage.sync.get(['freemasonrySettings'], (result) => {
            if (result.freemasonrySettings) {
                this.settings = { ...this.settings, ...result.freemasonrySettings };
                this.applySettings();
            }
        });
    }

    saveSettings() {
        chrome.storage.sync.set({
            freemasonrySettings: this.settings
        });
    }

    applySettings() {
        // Apply settings to UI
        document.getElementById('notificationsToggle').checked = this.settings.notifications;
        document.getElementById('autoSyncToggle').checked = this.settings.autoSync;
        document.getElementById('darkModeToggle').checked = this.settings.darkMode;
        document.getElementById('privacyModeToggle').checked = this.settings.privacyMode;

        this.toggleDarkMode();
    }

    // Utility functions
    showNotification(message) {
        if (this.settings.notifications) {
            // Chrome notification API would be used here
            console.log('Notification:', message);
        }
    }

    logActivity(action) {
        if (!this.settings.privacyMode) {
            console.log(`Activity: ${action} at ${new Date().toISOString()}`);
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FreemasonryApp();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FreemasonryApp;
} 
// FREEMASONRY Chrome Extension - Content Script

class FreemasonryContentScript {
    constructor() {
        this.settings = {};
        this.init();
    }

    init() {
        this.loadSettings();
        this.setupMessageListener();
        this.injectFloatingButton();
        this.observePageChanges();
    }

    loadSettings() {
        chrome.runtime.sendMessage({ type: 'GET_SETTINGS' }, (response) => {
            if (response && response.settings) {
                this.settings = response.settings;
                this.applySettings();
            }
        });
    }

    setupMessageListener() {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            switch (request.type) {
                case 'SETTINGS_UPDATED':
                    this.settings = request.settings;
                    this.applySettings();
                    sendResponse({ success: true });
                    break;
                default:
                    sendResponse({ error: 'Unknown message type' });
            }
        });
    }

    applySettings() {
        // Apply settings to the current page
        if (this.settings.darkMode) {
            document.body.classList.add('freemasonry-dark-mode');
        } else {
            document.body.classList.remove('freemasonry-dark-mode');
        }

        if (this.settings.privacyMode) {
            this.hideFloatingButton();
        } else {
            this.showFloatingButton();
        }
    }

    injectFloatingButton() {
        // Create floating button for quick access
        const button = document.createElement('div');
        button.id = 'freemasonry-floating-btn';
        button.innerHTML = '⚜️';
        button.title = 'FREEMASONRY';
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #ffd700, #ffed4e);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            cursor: pointer;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
            transition: all 0.3s ease;
            border: 2px solid rgba(255, 255, 255, 0.2);
        `;

        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
            button.style.boxShadow = '0 6px 16px rgba(255, 215, 0, 0.4)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '0 4px 12px rgba(255, 215, 0, 0.3)';
        });

        button.addEventListener('click', () => {
            this.openPopup();
        });

        document.body.appendChild(button);
    }

    hideFloatingButton() {
        const button = document.getElementById('freemasonry-floating-btn');
        if (button) {
            button.style.display = 'none';
        }
    }

    showFloatingButton() {
        const button = document.getElementById('freemasonry-floating-btn');
        if (button) {
            button.style.display = 'flex';
        }
    }

    openPopup() {
        // Send message to background script to open popup
        chrome.runtime.sendMessage({ type: 'OPEN_POPUP' });
        
        // Log activity
        this.logActivity('popup_opened', {
            url: window.location.href,
            title: document.title
        });
    }

    observePageChanges() {
        // Observe DOM changes to detect dynamic content
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    // Check for new content that might be relevant
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            this.scanForRelevantContent(node);
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    scanForRelevantContent(element) {
        // Scan for content that might be relevant to freemasonry
        const text = element.textContent || '';
        const keywords = ['freemasonry', 'mason', 'lodge', 'brotherhood', 'fraternity'];
        
        keywords.forEach(keyword => {
            if (text.toLowerCase().includes(keyword)) {
                this.highlightRelevantContent(element, keyword);
            }
        });
    }

    highlightRelevantContent(element, keyword) {
        // Add subtle highlighting to relevant content
        if (!element.classList.contains('freemasonry-highlighted')) {
            element.classList.add('freemasonry-highlighted');
            element.style.borderLeft = '3px solid #ffd700';
            element.style.paddingLeft = '10px';
            element.style.backgroundColor = 'rgba(255, 215, 0, 0.05)';
        }
    }

    logActivity(action, details = {}) {
        chrome.runtime.sendMessage({
            type: 'LOG_ACTIVITY',
            action,
            details,
            settings: this.settings
        });
    }

    // Utility function to extract page information
    getPageInfo() {
        return {
            url: window.location.href,
            title: document.title,
            description: this.getMetaDescription(),
            keywords: this.getMetaKeywords()
        };
    }

    getMetaDescription() {
        const meta = document.querySelector('meta[name="description"]');
        return meta ? meta.getAttribute('content') : '';
    }

    getMetaKeywords() {
        const meta = document.querySelector('meta[name="keywords"]');
        return meta ? meta.getAttribute('content') : '';
    }
}

// Initialize content script
const freemasonryContent = new FreemasonryContentScript();

// Add CSS for dark mode
const style = document.createElement('style');
style.textContent = `
    .freemasonry-dark-mode {
        filter: invert(90%) hue-rotate(180deg);
    }
    
    .freemasonry-highlighted {
        transition: all 0.3s ease;
    }
    
    .freemasonry-highlighted:hover {
        background-color: rgba(255, 215, 0, 0.1) !important;
    }
`;
document.head.appendChild(style);

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FreemasonryContentScript;
} 
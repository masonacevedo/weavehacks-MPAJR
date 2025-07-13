// FREEMASONRY Twitter AI Engagement Platform - JavaScript

class TwitterAIEngagement {
    constructor() {
        this.currentSection = 'dashboard';
        this.scrapedTweets = [];
        this.generatedResponses = [];
        this.engagementHistory = [];
        this.settings = {
            openaiKey: '',
            twitterKey: '',
            companyName: '',
            productDescription: '',
            websiteUrl: '',
            autoSave: true,
            emailNotifications: true,
            darkMode: false
        };
        
        this.stats = {
            tweetsScraped: 0,
            aiResponses: 0,
            engagementRate: 0,
            totalReplies: 0,
            totalLikes: 0,
            totalRetweets: 0
        };
        
        this.init();
    }

    init() {
        this.loadSettings();
        this.setupEventListeners();
        this.loadSampleData();
        this.updateStats();
        this.renderContent();
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

        // Twitter Scraper
        const startScrapingBtn = document.getElementById('startScraping');
        if (startScrapingBtn) {
            startScrapingBtn.addEventListener('click', () => {
                this.startTwitterScraping();
            });
        }

        const exportResultsBtn = document.getElementById('exportResults');
        if (exportResultsBtn) {
            exportResultsBtn.addEventListener('click', () => {
                this.exportResults();
            });
        }

        const clearResultsBtn = document.getElementById('clearResults');
        if (clearResultsBtn) {
            clearResultsBtn.addEventListener('click', () => {
                this.clearResults();
            });
        }

        // AI Generator
        const generateResponseBtn = document.getElementById('generateResponse');
        if (generateResponseBtn) {
            generateResponseBtn.addEventListener('click', () => {
                this.generateAIResponse();
            });
        }

        const copyResponseBtn = document.getElementById('copyResponse');
        if (copyResponseBtn) {
            copyResponseBtn.addEventListener('click', () => {
                this.copyResponse();
            });
        }

        const regenerateResponseBtn = document.getElementById('regenerateResponse');
        if (regenerateResponseBtn) {
            regenerateResponseBtn.addEventListener('click', () => {
                this.regenerateResponse();
            });
        }

        // Tone buttons
        document.querySelectorAll('.tone-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectTone(e.target);
            });
        });

        // Settings
        const saveSettingsBtn = document.getElementById('saveSettings');
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', () => {
                this.saveSettings();
            });
        }

        const resetSettingsBtn = document.getElementById('resetSettings');
        if (resetSettingsBtn) {
            resetSettingsBtn.addEventListener('click', () => {
                this.resetSettings();
            });
        }

        // Modal events
        this.setupModalEvents();
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
            'twitter-scraper': 'Twitter Scraper',
            'ai-generator': 'AI Generator',
            engagement: 'Engagement',
            analytics: 'Analytics',
            settings: 'Settings'
        };

        const subtitles = {
            dashboard: 'AI-Powered Twitter Engagement',
            'twitter-scraper': 'Search and scrape tweets based on topics',
            'ai-generator': 'Generate contextual AI responses',
            engagement: 'Track and manage your engagements',
            analytics: 'Monitor performance and metrics',
            settings: 'Configure your preferences'
        };

        const pageTitle = document.getElementById('page-title');
        const pageSubtitle = document.getElementById('page-subtitle');

        if (pageTitle) pageTitle.textContent = titles[section] || 'Page';
        if (pageSubtitle) pageSubtitle.textContent = subtitles[section] || '';
    }

    renderSectionContent(section) {
        switch (section) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'twitter-scraper':
                this.renderTwitterScraper();
                break;
            case 'ai-generator':
                this.renderAIGenerator();
                break;
            case 'engagement':
                this.renderEngagement();
                break;
            case 'analytics':
                this.renderAnalytics();
                break;
            case 'settings':
                this.renderSettings();
                break;
        }
    }

    loadSampleData() {
        // Sample activity feed
        this.activityFeed = [
            {
                action: 'Scraped 25 tweets about freemasonry',
                time: '2 hours ago',
                icon: 'fas fa-search'
            },
            {
                action: 'Generated AI response for @masonic_brother',
                time: '3 hours ago',
                icon: 'fas fa-robot'
            },
            {
                action: 'Engagement rate increased by 15%',
                time: '1 day ago',
                icon: 'fas fa-chart-line'
            }
        ];

        // Sample trending topics
        this.trendingTopics = [
            { name: '#Freemasonry', count: 1250 },
            { name: '#MasonicLodge', count: 890 },
            { name: '#Brotherhood', count: 650 },
            { name: '#MasonicSymbols', count: 420 },
            { name: '#LodgeMeeting', count: 310 }
        ];

        // Sample engagement history
        this.engagementHistory = [
            {
                tweet: 'Just attended my first lodge meeting. Amazing experience!',
                response: 'Welcome to the brotherhood! The journey begins...',
                engagement: 'likes: 12, replies: 3',
                date: '2 hours ago'
            },
            {
                tweet: 'Looking for information about masonic symbols',
                response: 'The symbols carry deep meaning. Check out our guide...',
                engagement: 'likes: 8, replies: 2',
                date: '1 day ago'
            }
        ];
    }

    renderDashboard() {
        this.updateStats();
        this.renderActivityFeed();
        this.renderTrendingTopics();
    }

    updateStats() {
        document.getElementById('tweetsScraped').textContent = this.stats.tweetsScraped;
        document.getElementById('aiResponses').textContent = this.stats.aiResponses;
        document.getElementById('engagementRate').textContent = this.stats.engagementRate + '%';
        document.getElementById('totalReplies').textContent = this.stats.totalReplies;
        document.getElementById('totalLikes').textContent = this.stats.totalLikes;
        document.getElementById('totalRetweets').textContent = this.stats.totalRetweets;
    }

    renderActivityFeed() {
        const activityFeed = document.getElementById('activityFeed');
        if (!activityFeed) return;

        activityFeed.innerHTML = '';

        this.activityFeed.forEach(activity => {
            const activityElement = this.createActivityElement(activity);
            activityFeed.appendChild(activityElement);
        });
    }

    createActivityElement(activity) {
        const activityDiv = document.createElement('div');
        activityDiv.className = 'activity-item';
        activityDiv.innerHTML = `
            <div class="activity-icon">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <p>${activity.action}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        `;
        return activityDiv;
    }

    renderTrendingTopics() {
        const trendingTopics = document.getElementById('trendingTopics');
        if (!trendingTopics) return;

        trendingTopics.innerHTML = '';

        this.trendingTopics.forEach(topic => {
            const topicElement = this.createTopicElement(topic);
            trendingTopics.appendChild(topicElement);
        });
    }

    createTopicElement(topic) {
        const topicDiv = document.createElement('div');
        topicDiv.className = 'topic-item';
        topicDiv.innerHTML = `
            <span class="topic-name">${topic.name}</span>
            <span class="topic-count">${topic.count}</span>
        `;
        return topicDiv;
    }

    startTwitterScraping() {
        const searchTopic = document.getElementById('searchTopic').value;
        const tweetCount = document.getElementById('tweetCount').value;
        const timeRange = document.getElementById('timeRange').value;
        const language = document.getElementById('language').value;

        if (!searchTopic.trim()) {
            this.showError('Please enter a search topic');
            return;
        }

        this.showLoading('Scraping tweets...', 'Searching for tweets about ' + searchTopic);

        // Simulate Twitter scraping
        setTimeout(() => {
            this.hideLoading();
            this.simulateTwitterScraping(searchTopic, parseInt(tweetCount));
        }, 2000);
    }

    simulateTwitterScraping(topic, count) {
        const sampleTweets = [
            {
                id: 1,
                author: 'MasonicBrother',
                handle: '@masonic_brother',
                content: 'Just finished reading about the history of freemasonry. The symbolism is fascinating! #Freemasonry #History',
                likes: 45,
                retweets: 12,
                replies: 8,
                time: '2 hours ago'
            },
            {
                id: 2,
                author: 'LodgeMember',
                handle: '@lodge_member',
                content: 'Attending my first lodge meeting tonight. Nervous but excited! Any advice for new members? #MasonicLodge #NewMember',
                likes: 23,
                retweets: 5,
                replies: 15,
                time: '4 hours ago'
            },
            {
                id: 3,
                author: 'MasonicScholar',
                handle: '@masonic_scholar',
                content: 'The architectural symbolism in masonic lodges is incredible. Every detail has meaning. #MasonicSymbols #Architecture',
                likes: 67,
                retweets: 18,
                replies: 12,
                time: '6 hours ago'
            },
            {
                id: 4,
                author: 'BrotherhoodSeeker',
                handle: '@brotherhood_seeker',
                content: 'Looking for information about joining a masonic lodge. What should I know? #Freemasonry #JoinLodge',
                likes: 34,
                retweets: 7,
                replies: 22,
                time: '8 hours ago'
            },
            {
                id: 5,
                author: 'MasonicHistory',
                handle: '@masonic_history',
                content: 'Did you know that many founding fathers were freemasons? The influence on American history is profound. #History #Freemasonry',
                likes: 89,
                retweets: 25,
                replies: 18,
                time: '1 day ago'
            }
        ];

        // Filter tweets based on topic
        const filteredTweets = sampleTweets.filter(tweet => 
            tweet.content.toLowerCase().includes(topic.toLowerCase()) ||
            tweet.content.includes('#Freemasonry') ||
            tweet.content.includes('#MasonicLodge')
        );

        this.scrapedTweets = filteredTweets.slice(0, count);
        this.stats.tweetsScraped += this.scrapedTweets.length;
        this.renderScrapedTweets();
        this.updateStats();
        this.showNotification(`Successfully scraped ${this.scrapedTweets.length} tweets about ${topic}`);
    }

    renderScrapedTweets() {
        const tweetsList = document.getElementById('tweetsList');
        if (!tweetsList) return;

        tweetsList.innerHTML = '';

        this.scrapedTweets.forEach(tweet => {
            const tweetElement = this.createTweetElement(tweet);
            tweetsList.appendChild(tweetElement);
        });
    }

    createTweetElement(tweet) {
        const tweetDiv = document.createElement('div');
        tweetDiv.className = 'tweet-item';
        tweetDiv.innerHTML = `
            <div class="tweet-header">
                <div class="tweet-author">
                    <div class="tweet-avatar">${tweet.author.charAt(0)}</div>
                    <div class="tweet-info">
                        <h5>${tweet.author}</h5>
                        <span>${tweet.handle} • ${tweet.time}</span>
                    </div>
                </div>
            </div>
            <div class="tweet-content">${tweet.content}</div>
            <div class="tweet-actions">
                <span class="tweet-action"><i class="fas fa-heart"></i> ${tweet.likes}</span>
                <span class="tweet-action"><i class="fas fa-retweet"></i> ${tweet.retweets}</span>
                <span class="tweet-action"><i class="fas fa-reply"></i> ${tweet.replies}</span>
            </div>
        `;

        tweetDiv.addEventListener('click', () => {
            this.selectTweetForResponse(tweet);
        });

        return tweetDiv;
    }

    selectTweetForResponse(tweet) {
        const tweetContent = document.getElementById('tweetContent');
        if (tweetContent) {
            tweetContent.innerHTML = `
                <strong>@${tweet.handle}</strong><br>
                ${tweet.content}
            `;
        }

        // Store selected tweet for AI generation
        this.selectedTweet = tweet;
        this.showNotification('Tweet selected for AI response generation');
    }

    generateAIResponse() {
        if (!this.selectedTweet) {
            this.showError('Please select a tweet first');
            return;
        }

        const tone = document.querySelector('.tone-btn.active').dataset.tone;
        const includeProduct = document.getElementById('includeProduct').checked;
        const includeCTA = document.getElementById('includeCTA').checked;
        const includeHashtags = document.getElementById('includeHashtags').checked;
        const responseLength = document.getElementById('responseLength').value;

        this.showLoading('Generating AI response...', 'Creating contextual response with ' + tone + ' tone');

        // Simulate AI response generation
        setTimeout(() => {
            this.hideLoading();
            const response = this.generateResponseText(this.selectedTweet, tone, includeProduct, includeCTA, includeHashtags, responseLength);
            this.displayGeneratedResponse(response);
        }, 1500);
    }

    generateResponseText(tweet, tone, includeProduct, includeCTA, includeHashtags, length) {
        const responses = {
            professional: [
                "Thank you for sharing your experience with freemasonry. The brotherhood values knowledge and growth.",
                "Your interest in masonic history is commendable. The traditions we uphold have deep significance.",
                "Welcome to the journey of discovery. Freemasonry offers profound insights into life's mysteries."
            ],
            friendly: [
                "That's awesome! Freemasonry really does have fascinating symbolism. Welcome to the brotherhood!",
                "So glad you're exploring freemasonry! The lodge meetings are always enlightening.",
                "You're going to love learning about the masonic symbols. Each one tells a story!"
            ],
            casual: [
                "Cool! Freemasonry is pretty interesting stuff. The symbols are everywhere once you start looking.",
                "Yeah, lodge meetings are great! You'll learn so much about the brotherhood.",
                "Nice! The masonic traditions are really fascinating when you dive into them."
            ],
            formal: [
                "We appreciate your engagement with freemasonic principles. The brotherhood welcomes all seekers of truth.",
                "Your participation in masonic studies reflects the values we hold dear. May your journey be enlightening.",
                "The lodge welcomes your interest in our ancient traditions. Knowledge and wisdom await."
            ],
            enthusiastic: [
                "AMAZING! Freemasonry is absolutely incredible! You're going to love every moment of this journey!",
                "WELCOME to the brotherhood! The symbolism is mind-blowing and the fellowship is unmatched!",
                "This is SO exciting! You're about to discover the most fascinating traditions and symbols!"
            ]
        };

        let response = responses[tone][Math.floor(Math.random() * responses[tone].length)];

        if (includeProduct && this.settings.productDescription) {
            response += ` Check out our ${this.settings.productDescription} for more insights.`;
        }

        if (includeCTA && this.settings.websiteUrl) {
            response += ` Visit ${this.settings.websiteUrl} to learn more.`;
        }

        if (includeHashtags) {
            response += ` #Freemasonry #Brotherhood #MasonicLodge`;
        }

        // Adjust length
        if (length === 'short' && response.length > 100) {
            response = response.substring(0, 97) + '...';
        } else if (length === 'medium' && response.length > 200) {
            response = response.substring(0, 197) + '...';
        }

        return response;
    }

    displayGeneratedResponse(response) {
        const responseContent = document.getElementById('responseContent');
        if (responseContent) {
            responseContent.textContent = response;
        }

        // Store generated response
        this.generatedResponses.push({
            tweet: this.selectedTweet,
            response: response,
            timestamp: new Date().toISOString()
        });

        this.stats.aiResponses++;
        this.updateStats();
        this.showNotification('AI response generated successfully');
    }

    selectTone(button) {
        document.querySelectorAll('.tone-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
    }

    copyResponse() {
        const responseContent = document.getElementById('responseContent');
        if (responseContent && responseContent.textContent) {
            navigator.clipboard.writeText(responseContent.textContent).then(() => {
                this.showNotification('Response copied to clipboard');
            }).catch(() => {
                this.showError('Failed to copy response');
            });
        }
    }

    regenerateResponse() {
        if (this.selectedTweet) {
            this.generateAIResponse();
        }
    }

    exportResults() {
        if (this.scrapedTweets.length === 0) {
            this.showError('No tweets to export');
            return;
        }

        const data = {
            tweets: this.scrapedTweets,
            generatedResponses: this.generatedResponses,
            timestamp: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'twitter-scraping-results.json';
        a.click();
        URL.revokeObjectURL(url);

        this.showNotification('Results exported successfully');
    }

    clearResults() {
        this.scrapedTweets = [];
        this.generatedResponses = [];
        this.selectedTweet = null;
        
        const tweetsList = document.getElementById('tweetsList');
        const responseContent = document.getElementById('responseContent');
        const tweetContent = document.getElementById('tweetContent');
        
        if (tweetsList) tweetsList.innerHTML = '';
        if (responseContent) responseContent.textContent = '';
        if (tweetContent) tweetContent.innerHTML = '';

        this.showNotification('Results cleared');
    }

    renderEngagement() {
        this.renderEngagementHistory();
    }

    renderEngagementHistory() {
        const engagementList = document.getElementById('engagementList');
        if (!engagementList) return;

        engagementList.innerHTML = '';

        this.engagementHistory.forEach(engagement => {
            const engagementElement = this.createEngagementElement(engagement);
            engagementList.appendChild(engagementElement);
        });
    }

    createEngagementElement(engagement) {
        const engagementDiv = document.createElement('div');
        engagementDiv.className = 'engagement-item';
        engagementDiv.innerHTML = `
            <div class="engagement-tweet">
                <p><strong>Original Tweet:</strong> ${engagement.tweet}</p>
                <p><strong>Our Response:</strong> ${engagement.response}</p>
            </div>
            <div class="engagement-stats">
                <span class="engagement-metrics">${engagement.engagement}</span>
                <span class="engagement-date">${engagement.date}</span>
            </div>
        `;
        return engagementDiv;
    }

    renderAnalytics() {
        // Placeholder for analytics charts
        const charts = ['engagementChart', 'topicsChart', 'responseChart'];
        charts.forEach(chartId => {
            const chartContainer = document.getElementById(chartId);
            if (chartContainer) {
                chartContainer.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.5);">Chart will be rendered here</p>';
            }
        });
    }

    renderSettings() {
        // Settings are already rendered in HTML, just apply current values
        this.applySettings();
    }

    applySettings() {
        const openaiKey = document.getElementById('openaiKey');
        const twitterKey = document.getElementById('twitterKey');
        const companyName = document.getElementById('companyName');
        const productDescription = document.getElementById('productDescription');
        const websiteUrl = document.getElementById('websiteUrl');
        const autoSave = document.getElementById('autoSave');
        const emailNotifications = document.getElementById('emailNotifications');
        const darkMode = document.getElementById('darkMode');

        if (openaiKey) openaiKey.value = this.settings.openaiKey;
        if (twitterKey) twitterKey.value = this.settings.twitterKey;
        if (companyName) companyName.value = this.settings.companyName;
        if (productDescription) productDescription.value = this.settings.productDescription;
        if (websiteUrl) websiteUrl.value = this.settings.websiteUrl;
        if (autoSave) autoSave.checked = this.settings.autoSave;
        if (emailNotifications) emailNotifications.checked = this.settings.emailNotifications;
        if (darkMode) darkMode.checked = this.settings.darkMode;

        this.toggleDarkMode();
    }

    saveSettings() {
        this.settings.openaiKey = document.getElementById('openaiKey').value;
        this.settings.twitterKey = document.getElementById('twitterKey').value;
        this.settings.companyName = document.getElementById('companyName').value;
        this.settings.productDescription = document.getElementById('productDescription').value;
        this.settings.websiteUrl = document.getElementById('websiteUrl').value;
        this.settings.autoSave = document.getElementById('autoSave').checked;
        this.settings.emailNotifications = document.getElementById('emailNotifications').checked;
        this.settings.darkMode = document.getElementById('darkMode').checked;

        localStorage.setItem('freemasonrySettings', JSON.stringify(this.settings));
        this.toggleDarkMode();
        this.showNotification('Settings saved successfully');
    }

    resetSettings() {
        this.settings = {
            openaiKey: '',
            twitterKey: '',
            companyName: '',
            productDescription: '',
            websiteUrl: '',
            autoSave: true,
            emailNotifications: true,
            darkMode: false
        };

        this.applySettings();
        this.showNotification('Settings reset to default');
    }

    loadSettings() {
        const savedSettings = localStorage.getItem('freemasonrySettings');
        if (savedSettings) {
            this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
        }
    }

    toggleDarkMode() {
        const body = document.body;
        if (this.settings.darkMode) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    }

    setupModalEvents() {
        const closeErrorModal = document.getElementById('closeErrorModal');
        if (closeErrorModal) {
            closeErrorModal.addEventListener('click', () => {
                this.hideError();
            });
        }
    }

    showLoading(text, subtext) {
        const loadingModal = document.getElementById('loadingModal');
        const loadingText = document.getElementById('loadingText');
        const loadingSubtext = document.getElementById('loadingSubtext');

        if (loadingModal && loadingText && loadingSubtext) {
            loadingText.textContent = text;
            loadingSubtext.textContent = subtext;
            loadingModal.classList.add('active');
        }
    }

    hideLoading() {
        const loadingModal = document.getElementById('loadingModal');
        if (loadingModal) {
            loadingModal.classList.remove('active');
        }
    }

    showError(message) {
        const errorModal = document.getElementById('errorModal');
        const errorMessage = document.getElementById('errorMessage');

        if (errorModal && errorMessage) {
            errorMessage.textContent = message;
            errorModal.classList.add('active');
        }
    }

    hideError() {
        const errorModal = document.getElementById('errorModal');
        if (errorModal) {
            errorModal.classList.remove('active');
        }
    }

    showNotification(message) {
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

    handleSearch(searchTerm) {
        console.log('Searching for:', searchTerm);
        // Implement search functionality
    }

    renderContent() {
        this.renderDashboard();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TwitterAIEngagement();
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
    module.exports = TwitterAIEngagement;
} 
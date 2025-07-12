// Side panel script for displaying tweets
let currentTweets = [];
let selectedTweetIndex = -1;

// DOM elements
const statusElement = document.getElementById('status');
const tweetsContainer = document.getElementById('tweetsContainer');
const refreshBtn = document.getElementById('refreshBtn');
const selectionStatusElement = document.getElementById('selectionStatus');
const selectedTweetInfoElement = document.getElementById('selectedTweetInfo');

// Function to update the status message
function updateStatus(message) {
    console.log('Status update:', message);
    statusElement.textContent = message;
}

// Function to format timestamp
function formatTimestamp(timestamp) {
    if (!timestamp) return '';
    
    try {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        
        if (diffInMinutes < 1) return 'now';
        if (diffInMinutes < 60) return `${diffInMinutes}m`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
        return `${Math.floor(diffInMinutes / 1440)}d`;
    } catch (error) {
        return timestamp;
    }
}

// Function to create tweet HTML
function createTweetHTML(tweet, index) {
    return `
        <div class="tweet-container" data-tweet-index="${index}">
            <div class="tweet-header">
                <span class="username">@${tweet.username}</span>
                <span class="timestamp">${formatTimestamp(tweet.timestamp)}</span>
            </div>
            <div class="tweet-text">${escapeHtml(tweet.text)}</div>
            <div class="tweet-metrics">
                <div class="metric">
                    <span>💬 ${tweet.replies}</span>
                </div>
                <div class="metric">
                    <span>🔄 ${tweet.retweets}</span>
                </div>
                <div class="metric">
                    <span>❤️ ${tweet.likes}</span>
                </div>
            </div>
        </div>
    `;
}

// Function to escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Function to handle tweet click
function handleTweetClick(event) {
    const tweetContainer = event.currentTarget;
    const tweetIndex = parseInt(tweetContainer.getAttribute('data-tweet-index'));
    
    // Remove selection from all tweets
    const allTweets = tweetsContainer.querySelectorAll('.tweet-container');
    allTweets.forEach(tweet => tweet.classList.remove('selected'));
    
    // Add selection to clicked tweet
    tweetContainer.classList.add('selected');
    selectedTweetIndex = tweetIndex;
    
    console.log('Selected tweet:', currentTweets[tweetIndex]);
    updateSelectionStatus();
}

// Function to update selection status display
function updateSelectionStatus() {
    if (selectedTweetIndex >= 0 && currentTweets[selectedTweetIndex]) {
        const selectedTweet = currentTweets[selectedTweetIndex];
        selectedTweetInfoElement.textContent = `@${selectedTweet.username} - ${selectedTweet.text.substring(0, 50)}${selectedTweet.text.length > 50 ? '...' : ''}`;
        selectionStatusElement.style.display = 'block';
    } else {
        selectionStatusElement.style.display = 'none';
    }
}

// Function to display tweets
function displayTweets(tweets) {
    currentTweets = tweets;
    selectedTweetIndex = -1; // Reset selection when tweets change
    
    if (!tweets || tweets.length === 0) {
        tweetsContainer.innerHTML = '<div class="no-tweets">No tweets found on this page</div>';
        updateStatus('No tweets found');
        updateSelectionStatus();
        return;
    }
    
    const tweetsHTML = tweets.map((tweet, index) => createTweetHTML(tweet, index)).join('');
    tweetsContainer.innerHTML = tweetsHTML;
    updateStatus(`Found ${tweets.length} tweet${tweets.length > 1 ? 's' : ''}`);
    
    // Add click event listeners to all tweet containers
    const tweetContainers = tweetsContainer.querySelectorAll('.tweet-container');
    tweetContainers.forEach(container => {
        container.addEventListener('click', handleTweetClick);
    });
    
    updateSelectionStatus();
}

// Function to request tweets from the active tab
function requestTweets() {
    updateStatus('Requesting tweets...');
    console.log('Requesting tweets from active tab...');
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
            updateStatus('No active tab found');
            console.error('No active tab found');
            return;
        }
        
        const activeTab = tabs[0];
        console.log('Active tab:', activeTab.url);
        
        // Check if we're on Twitter/X
        if (!activeTab.url.includes('twitter.com') && !activeTab.url.includes('x.com')) {
            updateStatus('Not on Twitter/X');
            tweetsContainer.innerHTML = '<div class="no-tweets">Please navigate to Twitter/X to view tweets</div>';
            console.log('Not on Twitter/X, current URL:', activeTab.url);
            return;
        }
        
        // Send message to content script
        console.log('Sending message to content script...');
        chrome.tabs.sendMessage(activeTab.id, { action: 'getTweets' }, (response) => {
            console.log('Response received:', response);
            
            if (chrome.runtime.lastError) {
                console.error('Chrome runtime error:', chrome.runtime.lastError);
                updateStatus('Error: Could not communicate with page');
                tweetsContainer.innerHTML = '<div class="error">Error: Could not communicate with page. Make sure you\'re on Twitter/X and refresh the page.</div>';
                return;
            }
            
            if (response && response.tweets) {
                console.log('Tweets received:', response.tweets);
                displayTweets(response.tweets);
            } else if (response && response.error) {
                console.error('Content script error:', response.error);
                updateStatus('Error: ' + response.error);
                tweetsContainer.innerHTML = '<div class="error">Error: ' + response.error + '</div>';
            } else {
                updateStatus('No tweets received');
                console.log('No tweets in response');
            }
        });
    });
}

// Function to handle incoming messages from background script
function handleMessage(message) {
    console.log('Side panel received message:', message);
    if (message.action === 'updateTweets') {
        displayTweets(message.tweets);
    }
}

// Event listeners
refreshBtn.addEventListener('click', requestTweets);

// Listen for messages from background script
chrome.runtime.onMessage.addListener(handleMessage);

// Add keyboard event listener for deselecting (Escape key)
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && selectedTweetIndex >= 0) {
        // Remove selection from all tweets
        const allTweets = tweetsContainer.querySelectorAll('.tweet-container');
        allTweets.forEach(tweet => tweet.classList.remove('selected'));
        selectedTweetIndex = -1;
        updateSelectionStatus();
    }
});

// Initialize when the side panel loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Side panel loaded');
    updateStatus('Ready to view tweets');
    // Wait a bit before requesting tweets to ensure everything is loaded
    setTimeout(requestTweets, 500);
});

// Request tweets when the side panel becomes visible
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        console.log('Side panel became visible');
        requestTweets();
    }
}); 
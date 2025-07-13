// Side panel script for displaying tweets
let currentTweets = [];
let selectedTweetIndex = -1;

// DOM elements
const statusElement = document.getElementById('status');
const tweetsContainer = document.getElementById('tweetsContainer');
const refreshBtn = document.getElementById('refreshBtn');
const selectionStatusElement = document.getElementById('selectionStatus');
const selectedTweetInfoElement = document.getElementById('selectedTweetInfo');
const processBtn = document.getElementById('processBtn');
const processingScreen = document.getElementById('processingScreen');
const backBtn = document.getElementById('backBtn');
const selectedTweetDisplay = document.getElementById('selectedTweetDisplay');
const processingResult = document.getElementById('processingResult');
const resultContent = document.getElementById('resultContent');
const generateResponseBtn = document.getElementById('generateResponseBtn');

// Slider elements
const toneSlider = document.getElementById('toneSlider');
const toneValue = document.getElementById('toneValue');
const styleSlider = document.getElementById('styleSlider');
const styleValue = document.getElementById('styleValue');

// Slider value mappings
const toneOptions = ['Casual', 'Neutral', 'Professional'];
const styleOptions = ['Problem-solving', 'Engaging', 'Opposing'];

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

// Function to show processing screen
function showProcessingScreen() {
    if (selectedTweetIndex < 0) return;
    
    const selectedTweet = currentTweets[selectedTweetIndex];
    
    // Display the selected tweet in the processing screen
    selectedTweetDisplay.innerHTML = `
        <div class="tweet-header">
            <span class="username">@${selectedTweet.username}</span>
            <span class="timestamp">${formatTimestamp(selectedTweet.timestamp)}</span>
        </div>
        <div class="tweet-text">${escapeHtml(selectedTweet.text)}</div>
        <div class="tweet-metrics">
            <div class="metric">
                <span>💬 ${selectedTweet.replies}</span>
            </div>
            <div class="metric">
                <span>🔄 ${selectedTweet.retweets}</span>
            </div>
            <div class="metric">
                <span>❤️ ${selectedTweet.likes}</span>
            </div>
        </div>
    `;
    
    // Hide the main content and show processing screen
    document.querySelector('.header').style.display = 'none';
    refreshBtn.style.display = 'none';
    statusElement.style.display = 'none';
    selectionStatusElement.style.display = 'none';
    tweetsContainer.style.display = 'none';
    processingScreen.style.display = 'block';
    
    // Hide any previous results
    processingResult.style.display = 'none';
    
    // Add event listener to generate response button
    generateResponseBtn.addEventListener('click', generateChatGPTResponse);
}

// Function to hide processing screen
function hideProcessingScreen() {
    // Show the main content and hide processing screen
    document.querySelector('.header').style.display = 'block';
    refreshBtn.style.display = 'block';
    statusElement.style.display = 'block';
    tweetsContainer.style.display = 'block';
    processingScreen.style.display = 'none';
    
    // Update selection status if there's still a selected tweet
    updateSelectionStatus();
}

// Function to generate AI response using Flask server
async function generateChatGPTResponse() {
    const selectedTweet = currentTweets[selectedTweetIndex];
    
    // Show loading state
    resultContent.innerHTML = '<div class="loading">Generating AI response...</div>';
    processingResult.style.display = 'block';
    
    try {
        // Call the Flask server
        const response = await callFlaskServer(selectedTweet);
        
        // Display the result
        resultContent.innerHTML = `
            <div class="response-container">
                <h4>🤖 AI Generated Response:</h4>
                <div class="response-text">${escapeHtml(response)}</div>
                <div class="response-actions">
                    <button class="copy-btn" onclick="copyToClipboard('${escapeHtml(response).replace(/'/g, "\\'")}')">
                        📋 Copy Response
                    </button>
                </div>
            </div>
        `;
        
    } catch (error) {
        console.error('Error generating response:', error);
        resultContent.innerHTML = `
            <div class="error">
                <strong>Error:</strong> Failed to generate response. Please try again.
                <br><br>
                <small>Error details: ${error.message}</small>
                <br><br>
                <small>Make sure the Flask server is running on port 5001</small>
            </div>
        `;
    }
}

// Function to get current slider values
function getSliderValues() {
    const toneIndex = parseInt(toneSlider.value);
    const styleIndex = parseInt(styleSlider.value);
    
    return {
        tone: toneOptions[toneIndex],
        style: styleOptions[styleIndex]
    };
}

// Function to update slider display values
function updateSliderDisplay() {
    const toneIndex = parseInt(toneSlider.value);
    const styleIndex = parseInt(styleSlider.value);
    
    toneValue.textContent = toneOptions[toneIndex];
    styleValue.textContent = styleOptions[styleIndex];
}

// Call Flask server to get AI response
async function callFlaskServer(tweet) {
    const serverUrl = 'http://localhost:5001/analyze_tweet';
    
    const sliderValues = getSliderValues();
    
    const requestData = {
        tweet_text: tweet.text,
        username: tweet.username,
        tone: sliderValues.tone,
        style: sliderValues.style
    };
    
    console.log('Calling Flask server with data:', requestData);
    
    const response = await fetch(serverUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
        throw new Error(data.error);
    }
    
    if (!data.response) {
        throw new Error('No response received from server');
    }
    
    console.log('Received response from Flask server:', data.response);
    return data.response;
}

// Function to copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show success feedback
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✅ Copied!';
        copyBtn.style.background = '#17bf63';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy to clipboard');
    });
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
processBtn.addEventListener('click', showProcessingScreen);
backBtn.addEventListener('click', hideProcessingScreen);

// Slider event listeners
toneSlider.addEventListener('input', updateSliderDisplay);
styleSlider.addEventListener('input', updateSliderDisplay);

// Initialize slider displays
updateSliderDisplay();

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
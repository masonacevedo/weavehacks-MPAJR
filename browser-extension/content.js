// Content script for extracting tweets from Twitter/X
console.log('Weavehacks2025 content script loaded');

// Function to extract tweets from the current page
function extractTweets() {
    const tweets = [];
    
    // Look for tweet containers on Twitter/X
    // Twitter uses various selectors for tweets, we'll try multiple approaches
    const tweetSelectors = [
        '[data-testid="tweet"]',
        'article[data-testid="tweet"]',
        '.tweet',
        '[role="article"]'
    ];
    
    for (const selector of tweetSelectors) {
        const tweetElements = document.querySelectorAll(selector);
        if (tweetElements.length > 0) {
            console.log(`Found ${tweetElements.length} tweets with selector: ${selector}`);
            tweetElements.forEach((tweetElement, index) => {
                if (index < 5) { // Limit to first 5 tweets
                    const tweet = extractTweetData(tweetElement);
                    if (tweet) {
                        tweets.push(tweet);
                    }
                }
            });
            break; // Use the first selector that finds tweets
        }
    }
    
    console.log(`Total tweets extracted: ${tweets.length}`);
    return tweets;
}

// Function to extract data from a single tweet element
function extractTweetData(tweetElement) {
    try {
        // Extract tweet text
        const textElement = tweetElement.querySelector('[data-testid="tweetText"]') || 
                           tweetElement.querySelector('.tweet-text') ||
                           tweetElement.querySelector('[lang]');
        
        const text = textElement ? textElement.textContent.trim() : '';
        
        // Extract username
        const usernameElement = tweetElement.querySelector('[data-testid="User-Name"]') ||
                               tweetElement.querySelector('.username') ||
                               tweetElement.querySelector('a[href*="/status/"]');
        
        const username = usernameElement ? usernameElement.textContent.trim() : 'Unknown User';
        
        // Extract timestamp if available
        const timeElement = tweetElement.querySelector('time') ||
                           tweetElement.querySelector('[data-testid="tweetText"] time');
        
        const timestamp = timeElement ? timeElement.getAttribute('datetime') || timeElement.textContent.trim() : '';
        
        // Extract engagement metrics
        const likeCount = extractMetric(tweetElement, 'like');
        const retweetCount = extractMetric(tweetElement, 'retweet');
        const replyCount = extractMetric(tweetElement, 'reply');
        
        return {
            text: text,
            username: username,
            timestamp: timestamp,
            likes: likeCount,
            retweets: retweetCount,
            replies: replyCount,
            element: tweetElement.outerHTML.substring(0, 200) + '...' // First 200 chars for debugging
        };
    } catch (error) {
        console.error('Error extracting tweet data:', error);
        return null;
    }
}

// Function to extract engagement metrics
function extractMetric(tweetElement, metricType) {
    const selectors = {
        like: ['[data-testid="like"]', '[data-testid="likeCount"]'],
        retweet: ['[data-testid="retweet"]', '[data-testid="retweetCount"]'],
        reply: ['[data-testid="reply"]', '[data-testid="replyCount"]']
    };
    
    for (const selector of selectors[metricType]) {
        const element = tweetElement.querySelector(selector);
        if (element) {
            const text = element.textContent.trim();
            // Extract numbers from text like "1.2K", "5", etc.
            const match = text.match(/(\d+(?:\.\d+)?[KMB]?)/);
            return match ? match[1] : '0';
        }
    }
    return '0';
}

// Function to send tweets to the side panel
function sendTweetsToSidePanel(tweets) {
    console.log('Sending tweets to side panel:', tweets);
    chrome.runtime.sendMessage({
        action: 'updateTweets',
        tweets: tweets,
        url: window.location.href
    });
}

// Main function to process tweets
function processTweets() {
    const tweets = extractTweets();
    console.log('Extracted tweets:', tweets);
    sendTweetsToSidePanel(tweets);
}

// Listen for messages from the side panel
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Content script received message:', request);
    
    if (request.action === 'getTweets') {
        try {
            const tweets = extractTweets();
            console.log('Sending response with tweets:', tweets);
            sendResponse({ tweets: tweets });
        } catch (error) {
            console.error('Error in getTweets handler:', error);
            sendResponse({ error: error.message });
        }
        return true; // Keep the message channel open for async response
    }
    
    return false;
});

// Process tweets when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', processTweets);
} else {
    processTweets();
}

// Also process tweets when the page content changes (for SPA navigation)
let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        setTimeout(processTweets, 1000); // Wait a bit for content to load
    }
}).observe(document, { subtree: true, childList: true });

// Process tweets periodically to catch dynamically loaded content
setInterval(processTweets, 5000);

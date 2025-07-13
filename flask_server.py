import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from huggingface_hub import InferenceClient
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for browser extension

# Get API token from environment variable
api_token = os.getenv("HF_API_TOKEN")

if not api_token:
    logger.error("Error: HF_API_TOKEN environment variable not set.")
    logger.error("Please set it with: export HF_API_TOKEN='your_token_here'")
    logger.error("Or get your token from: https://huggingface.co/settings/tokens")
    exit(1)

client = InferenceClient(token=api_token)

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "Flask server is running"})

@app.route('/analyze_tweet', methods=['POST'])
def analyze_tweet():
    """Analyze a tweet and generate a response using Hugging Face API"""
    try:
        data = request.get_json()
        
        if not data or 'tweet_text' not in data or 'username' not in data:
            return jsonify({"error": "Missing required fields: tweet_text and username"}), 400
        
        tweet_text = data['tweet_text']
        username = data['username']
        
        logger.info(f"Analyzing tweet from @{username}: {tweet_text[:100]}...")
        
        # Prepare the prompt for the AI model
        prompt = f"""Generate a thoughtful, engaging response to this tweet. The response should be:
- Relevant and contextual to the original tweet
- Engaging and conversational in tone
- Appropriate for social media (under 280 characters if possible)
- Professional yet friendly

Original tweet by @{username}: "{tweet_text}"

Please provide just the response text without any additional formatting or explanations."""

        # Call Hugging Face API
        completion = client.chat.completions.create(
            model="deepseek-ai/DeepSeek-V3-0324",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
        )
        
        response_text = completion.choices[0].message.content
        
        logger.info(f"Generated response: {response_text[:100]}...")
        
        return jsonify({
            "success": True,
            "response": response_text,
            "original_tweet": tweet_text,
            "username": username
        })
        
    except Exception as e:
        logger.error(f"Error analyzing tweet: {str(e)}")
        return jsonify({
            "error": f"Failed to analyze tweet: {str(e)}"
        }), 500

if __name__ == '__main__':
    # Use port 5001 since 5000 is already in use
    app.run(host='0.0.0.0', port=5001, debug=True) 
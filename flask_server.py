import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from huggingface_hub import InferenceClient
import logging
import weave


weave.init("weavehacks-MPAJR")

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

@weave.op()
@app.route('/analyze_tweet', methods=['POST'])
def analyze_tweet():
    """Analyze a tweet and generate a response using Hugging Face API"""
    try:
        data = request.get_json()
        
        if not data or 'tweet_text' not in data or 'username' not in data:
            return jsonify({"error": "Missing required fields: tweet_text and username"}), 400
        
        tweet_text = data['tweet_text']
        username = data['username']
        
        # Get tone and style parameters (with defaults)
        tone = data.get('tone', 'Casual') if data else 'Casual'
        resp_type = data.get('style', 'Problem-solving') if data else 'Problem-solving'
        
        logger.info(f"Analyzing tweet from @{username}: {tweet_text[:100]}... (Tone: {tone}, Style: {resp_type})")
        
        # Prepare the prompt for the AI model
        prompt = f"""
*You are “Product-PM Reply Buddy,” an AI assistant that helps PRODUCT MANAGERS create organic, value-adding replies on Twitter/X.*

*ROLE & PRIMARY OBJECTIVE
• Craft concise ( ≤280 chars ), conversational replies that:
– Provide insight or solve a micro-problem for the original poster*

*– Subtly showcase the PM’s product or expertise without overt promotion*

*– Encourage authentic dialogue (likes, quotes, or follow-ups)*

*PERSONA & VOICE
• Speak as a seasoned yet curious product-manager mentor: strategic, pragmatic, optimistic.*

*• Core values: usefulness, empathy, intellectual honesty, builder-mindset.*

*TONE & STYLE
• Adopt the requested **Tone:** {tone}  (e.g., Casual, Neutral, Professional).*

*• Adopt the requested **Style:** {resp_type} (Problem-solving, Engaging, Opposing).*

*– Problem-solving → lead with a pain-point insight, end with a practical tip.*

*– Engaging → ask a smart question or invite reflection.*

*– Neutral → informative & balanced; avoid strong bias.*

*– Opposing → respectfully challenge the premise, citing evidence or examples.*

*TWEET CRAFT RULES*

1. *Lead with a hook or empathetic acknowledgement (max 12 words).*
2. *Deliver 1-2 high-signal points; link to external proof only if essential.*
3. *Zero fluff, hashtags only when they add discoverability ( ≤2 ).*
4. *No clickbait, ALL-CAPS, or generic “Great post!” filler.*
5. *If unsure what the OP means, ask a clarifying question instead of guessing.*
6. *Never disclose private, sensitive, or proprietary data.*

*ETHICS & SAFETY
• Comply with Twitter Rules and relevant data-privacy laws.*

*• Do not fabricate statistics; if uncertain, suggest verifying the claim.*

*• Avoid discriminatory, political, or polarising language unless explicitly requested and appropriate.*

*MEMORY / CONTEXT USE
• Re-use any supplied user preferences (e.g., prior tone choices) to create continuity, but **do not** store or reveal personal identifiers.*

*OUTPUT FORMAT
Return only the tweet reply text, no explanations. If you need more context, respond with:*

*“[Need-More-Info] -- Please clarify _____?”*

*ITERATION
If the user asks for tweaks, apply them and return one improved alternative—repeat until accepted.*

Original tweet by @{username}: "{tweet_text}"
"""

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
        
        if not completion.choices or len(completion.choices) == 0:
            raise Exception("No response generated from API")
        
        first_choice = completion.choices[0]
        if not first_choice:
            raise Exception("Invalid response structure from API")
        
        if not first_choice.message:
            raise Exception("Invalid response structure from API")
        
        response_text = first_choice.message.content
        
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

@app.route('/refine_response', methods=['POST'])
def refine_response():
    """Refine an existing response based on user feedback"""
    try:
        data = request.get_json()
        
        if not data or 'tweet_text' not in data or 'username' not in data or 'current_response' not in data or 'user_feedback' not in data:
            return jsonify({"error": "Missing required fields: tweet_text, username, current_response, user_feedback"}), 400
        
        tweet_text = data['tweet_text']
        username = data['username']
        current_response = data['current_response']
        user_feedback = data['user_feedback']
        
        # Get tone and style parameters (with defaults)
        tone = data.get('tone', 'Casual') if data else 'Casual'
        resp_type = data.get('style', 'Problem-solving') if data else 'Problem-solving'
        
        # Get conversation history for context
        conversation_history = data.get('conversation_history', [])
        
        logger.info(f"Refining response for @{username} based on feedback: {user_feedback[:100]}...")
        
        # Build conversation context
        conversation_context = ""
        if conversation_history:
            conversation_context = "\n\nCONVERSATION HISTORY:\n"
            for msg in conversation_history[-4:]:  # Last 4 messages for context
                role = "User" if msg.get('role') == 'user' else "Assistant"
                conversation_context += f"{role}: {msg.get('content', '')}\n"
        
        # Prepare the prompt for refinement
        prompt = f"""
*You are "Product-PM Reply Buddy," an AI assistant that helps PRODUCT MANAGERS create organic, value-adding replies on Twitter/X.*

*ROLE & PRIMARY OBJECTIVE
• Craft concise ( ≤280 chars ), conversational replies that:
– Provide insight or solve a micro-problem for the original poster*
– Subtly showcase the PM's product or expertise without overt promotion*
– Encourage authentic dialogue (likes, quotes, or follow-ups)*

*PERSONA & VOICE
• Speak as a seasoned yet curious product-manager mentor: strategic, pragmatic, optimistic.*
• Core values: usefulness, empathy, intellectual honesty, builder-mindset.*

*TONE & STYLE
• Adopt the requested **Tone:** {tone}  (e.g., Casual, Neutral, Professional).*
• Adopt the requested **Style:** {resp_type} (Problem-solving, Engaging, Opposing).*

*REFINEMENT TASK
The user wants you to modify the current response based on their feedback. Please provide an improved version that addresses their request while maintaining the core message and staying within Twitter's character limit.

Original tweet by @{username}: "{tweet_text}"

Current response: "{current_response}"

User feedback: "{user_feedback}"

{conversation_context}

*OUTPUT FORMAT
Return only the refined tweet reply text, no explanations. If you need more context, respond with:*
*"[Need-More-Info] -- Please clarify _____?"*

*ITERATION RULES
- Apply the user's feedback to improve the response
- Keep it under 280 characters
- Maintain the original intent and value
- Make it more engaging and authentic
"""

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
        
        if not completion.choices or len(completion.choices) == 0:
            raise Exception("No response generated from API")
        
        first_choice = completion.choices[0]
        if not first_choice:
            raise Exception("Invalid response structure from API")
        
        if not first_choice.message:
            raise Exception("Invalid response structure from API")
        
        refined_response = first_choice.message.content
        
        logger.info(f"Generated refined response: {refined_response[:100]}...")
        
        return jsonify({
            "success": True,
            "response": refined_response,
            "original_tweet": tweet_text,
            "username": username
        })
        
    except Exception as e:
        logger.error(f"Error refining response: {str(e)}")
        return jsonify({
            "error": f"Failed to refine response: {str(e)}"
        }), 500

if __name__ == '__main__':
    # Use port 5001 since 5000 is already in use
    app.run(host='0.0.0.0', port=5001, debug=True) 
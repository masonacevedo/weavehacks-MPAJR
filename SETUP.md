# Weavehacks2025 Browser Extension Setup

This browser extension now uses a local Flask server to generate AI responses for tweets using the Hugging Face API.

## Prerequisites

1. **Python 3.7+** installed on your system
2. **Hugging Face API Token** - Get one from [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)

## Setup Instructions

### 1. Set up the Flask Server

First, set your Hugging Face API token as an environment variable:

```bash
export HF_API_TOKEN='your_huggingface_token_here'
```

### 2. Install Dependencies and Start Server

Run the helper script to install dependencies and start the server:

```bash
python run_server.py
```

This script will:
- Check if your API token is set
- Install required Python packages (Flask, Flask-CORS, huggingface-hub)
- Start the Flask server on port 5001

### 3. Load the Browser Extension

1. Open Chrome/Edge and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked" and select the `browser-extension` folder
4. The extension should now appear in your extensions list

### 4. Use the Extension

1. Navigate to Twitter/X in your browser
2. Click the extension icon to open the side panel
3. Select a tweet from the list
4. Click "Process Tweet" to analyze it
5. Click "Generate Response" to get an AI-generated response

## Manual Server Setup (Alternative)

If you prefer to set up manually:

```bash
# Install dependencies
pip install -r requirements.txt

# Set API token
export HF_API_TOKEN='your_token_here'

# Start server
python flask_server.py
```

## Troubleshooting

### Server Connection Issues
- Make sure the Flask server is running on port 5001
- Check that port 5001 is not blocked by firewall
- Verify the server is accessible at `http://localhost:5001/health`

### API Token Issues
- Ensure your Hugging Face API token is valid
- Check that the token has the necessary permissions
- Verify the environment variable is set correctly

### Extension Issues
- Reload the extension in `chrome://extensions/` if changes were made
- Check the browser console for any JavaScript errors
- Ensure you're on Twitter/X when using the extension

## File Structure

```
weavehacks_2025/
├── browser-extension/          # Browser extension files
│   ├── manifest.json           # Extension configuration
│   ├── content.js              # Content script for tweet extraction
│   ├── sidepanel.js            # Side panel logic (modified for Flask)
│   └── sidepanel.html          # Side panel UI
├── flask_server.py             # Flask server with Hugging Face API
├── run_server.py               # Helper script for setup
├── requirements.txt            # Python dependencies
└── SETUP.md                    # This file
```

## API Endpoints

- `GET /health` - Health check endpoint
- `POST /analyze_tweet` - Analyze a tweet and generate response
  - Request body: `{"tweet_text": "...", "username": "..."}`
  - Response: `{"success": true, "response": "...", ...}`

## Security Notes

- The Flask server runs on localhost only
- CORS is enabled for browser extension communication
- API tokens are stored as environment variables (not in code)
- The server uses the DeepSeek-V3-0324 model for response generation 
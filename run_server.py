#!/usr/bin/env python3
"""
Helper script to run the Flask server for the Weavehacks2025 browser extension.
This script checks for the required environment variable and starts the server.
"""

import os
import sys
import subprocess

def check_environment():
    """Check if the required environment variable is set"""
    api_token = os.getenv("HF_API_TOKEN")
    
    if not api_token:
        print("❌ Error: HF_API_TOKEN environment variable is not set.")
        print("\nTo set it up:")
        print("1. Get your Hugging Face API token from: https://huggingface.co/settings/tokens")
        print("2. Set the environment variable:")
        print("   export HF_API_TOKEN='your_token_here'")
        print("\nOr run this script with the token:")
        print("   HF_API_TOKEN='your_token_here' python run_server.py")
        return False
    
    print("✅ HF_API_TOKEN environment variable is set")
    return True

def install_dependencies():
    """Install required Python packages"""
    print("📦 Installing dependencies...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Dependencies installed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install dependencies: {e}")
        return False

def main():
    print("🚀 Starting Weavehacks2025 Flask Server")
    print("=" * 50)
    
    # Check environment
    if not check_environment():
        sys.exit(1)
    
    # Install dependencies
    if not install_dependencies():
        sys.exit(1)
    
    print("\n🌐 Starting Flask server on http://localhost:5001")
    print("📱 Make sure your browser extension is loaded and ready to use")
    print("🛑 Press Ctrl+C to stop the server")
    print("=" * 50)
    
    # Start the Flask server
    try:
        subprocess.run([sys.executable, "flask_server.py"])
    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
    except Exception as e:
        print(f"❌ Error running server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 
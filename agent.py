# This runs as a service that monitors the topics on twitter/reddit 
import time
import os
import io
import tweepy
from dotenv import load_dotenv, dotenv_values
from datetime import datetime, timedelta

# read the environment
load_dotenv()

def get_twitter_client():
    # if no token, get a new one
    client_id = os.getenv("XAPI_CLIENT")
    client_secret = os.getenv("XAPI_CLIENT_SECRET")
    if os.path.exists("xtoken"):
        # read the token from file
        with open("xtoken", "r") as tokenFile:
            access_token = tokenFile.read().strip()
            client = tweepy.Client(access_token, consumer_key=client_id, consumer_secret=client_secret)
            return client
    if not client_id or not client_secret:
        raise Exception(
            "Twitter client and secret environment variables must be set."
        )
    oauth2_handler = tweepy.OAuth2UserHandler(
        client_id=client_id,
        redirect_uri="https://localhost/callback",
        scope=["tweet.read", "users.read"],
        client_secret=client_secret,
    )
    authorization_url = oauth2_handler.get_authorization_url()
    print(f"Please go here and authorize:\n{authorization_url}")
    redirect_response = input("Paste the full redirect URL here: ")
    oauth2_handler.fetch_token(redirect_response)
    access_token = oauth2_handler.access_token

    print(f"Access token: {access_token}")
    # save access token
    tokenFile = open("xtoken","w")
    tokenFile.write(access_token)
    tokenFile.close
    client = tweepy.Client(access_token, consumer_key=client_id, consumer_secret=client_secret)
    return client

def search_topic(topic):
    # This function would typically search for the topic on Twitter or Reddit
    print(f"Searching for topic: {topic}")
    client = get_twitter_client()
    print("Authorization successful")
    response = client.search_recent_tweets(topic)
    print(f"Found {response.meta['result_count']} tweets for topic: {topic}")
    return response.data


def main():
    # This is the main function that runs the service
    print("Service started")
    while True:
        # Here you would check for new topics from the database 
        topics = ["brain computer interface"]  
        for topic in topics:
            print(f"Checking topic: {topic}")
            # Call the search function
            tweets = search_topic(topic)
            for tweet in tweets:
                print(f"Tweet ID: {tweet.id}, Text: {tweet.text}, Created at: {tweet.created_at}")
                # save the tweets to database
                # insert into tweets ("tweet_id", "topic_id", "body") values (tweet.id, {topic}, tweet.text)

            # Sleep for a while before checking again, twitter API has rate limits
            time.sleep(16 * 60)  # Check every 16 minutes


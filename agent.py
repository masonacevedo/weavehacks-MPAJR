# This runs as a service that monitors the topics on twitter/reddit 
import time

def search_topic(topic):
    # This function would typically search for the topic on Twitter or Reddit
    print(f"Searching for topic: {topic}")

def main():
    # This is the main function that runs the service
    print("Service started")
    while True:
        # Here you would check for new topics from the database 
        topics = ["brain computer interface"]  
        for topic in topics:
            print(f"Checking topic: {topic}")
            # Call the search function
            search_topic(topic)
            # Sleep for a while before checking again, twitter API has rate limits
            time.sleep(16 * 60)  # Check every 16 minutes


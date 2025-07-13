from flask import Flask, request, jsonify
import psycopg2 
import os

# hardcoded things that should come from database
topics = [
    { "id": 1, "topic": "brain computer interface"}, 
    { "id": 2, "topic": "machine learning"}, 
    { "id": 3, "topic": "AI ethics"}
]

conn = psycopg2.connect(dbname="weavehacks", user='postgres', password='password', host='localhost', port='5432')

app = Flask(__name__)

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok"}), 200

@app.route("/topics", methods=["POST"])
def set_topic():
    data = request.json
    if not data or 'topic' not in data:
        return jsonify({"error": "Topic is required"}), 400
    
    topic = data['topic']
    # Here you would typically save the topic to a database or file
    topics.append({"id": len(topics) + 1, "topic": topic})
    print(f"Topic added: {topic}")
    return jsonify({"id": "1", "topic": topic}), 201

@app.route("/topics", methods=["GET"])
def get_topic():
    topics = []
    cursor = conn.cursor()
    cursor.execute("SELECT topic_id, subject FROM topics")
    rows = cursor.fetchall()
    for row in rows:
        topics.append({"id": row[0], "topic": row[1]})
    cursor.close()
    response = {
        "data": topics,
        "count": len(topics)
    }
    return jsonify(response), 200

@app.route("/topics/<int:topic_id>", methods=["GET"])
def get_topic_by_id(topic_id): 
    # Here you would typically retrieve the topic by ID from a database or file
    topics = {
        1: "brain computer interface",
        2: "machine learning",
        3: "AI ethics"
    }
    cursor = conn.cursor()
    cursor.execute("SELECT topic_id, subject FROM topics where topic_id = %s", (topic_id,))
    row = cursor.fetchone()
    if row:
        topic = {"id": row[0], "topic": row[1]}
    cursor.close()
    if not topic:
        return jsonify({"error": "Topic not found"}), 404
    
    return jsonify({"id": topic_id, "topic": topic}), 200
 
@app.route("/topics/<int:topic_id>/suggestion", methods=["GET"])
def get_suggestions(topic_id):
    # Here you would typically retrieve suggestions for the topic from a database or file
    suggestion = "The world is exploring BCI as fast as Elon Musk is."
    return jsonify({"data": suggestion }), 200


app.run(port=8181)
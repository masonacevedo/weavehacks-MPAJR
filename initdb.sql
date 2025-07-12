CREATE TABLE topics (
    topic_id SERIAL PRIMARY KEY,
    subject TEXT NOT NULL,
    status TEXT NOT NULL
);

CREATE TABLE tweets (
    tweet_id SERIAL PRIMARY KEY,
    topic_id INTEGER NOT NULL REFERENCES topics(topic_id) ON DELETE CASCADE,
    body TEXT NOT NULL,
    suggestion TEXT
);
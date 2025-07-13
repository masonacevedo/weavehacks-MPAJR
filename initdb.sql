CREATE TABLE IF NOT EXISTS topics (
    topic_id SERIAL PRIMARY KEY,
    subject TEXT NOT NULL,
    status TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tweets (
    tweet_id TEXT PRIMARY KEY,
    topic_id INTEGER NOT NULL REFERENCES topics(topic_id) ON DELETE CASCADE,
    body TEXT NOT NULL,
    suggestion TEXT
);

-- Seed initial data
INSERT INTO topics (topic_id, subject, status) VALUES
(1, 'Brain computer interface', 'active'),
(2, 'Artificial Intelligence', 'active'),
(3, 'Healthcare Innovation', 'active');

INSERT INTO tweets (tweet_id, topic_id, body) VALUES
('1891811507236692464',1, 'I am looking for a way to get brain implant surgery. Any information would be appreciated. Please contact me.')

INSERT INTO tweets (tweet_id, topic_id, body) VALUES
('1937894035479265630',1, 'Brain computer interface keyboard. Translate thoughts into binary, which can be translated into any language')

INSERT INTO tweets (tweet_id, topic_id, body) VALUES
('2133485845795975340',2, 'AI is the biggest shortcut of this decade. Most people still aren’t using it. This all-in-one AI platform provides the latest advanced AI models and tools, including GPT-4.5, Claude 3.7, Midjourney V7, and 100+ more, giving you an insane advantage');


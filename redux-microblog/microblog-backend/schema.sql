
DROP DATABASE IF EXISTS "microblog-db";

CREATE DATABASE "microblog-db";

\c "microblog-db"
CREATE TABLE posts (id SERIAL PRIMARY KEY, title TEXT, body TEXT, upvote INTEGER, downvote INTEGER);
CREATE TABLE comments (id SERIAL PRIMARY KEY, comment TEXT,  post_id INTEGER REFERENCES "posts" (id) ON DELETE CASCADE);

INSERT INTO posts (title, body, upvote, downvote) VALUES ('first post', 'best post ever!', 0, 0);
INSERT INTO posts (title, body, upvote, downvote) VALUES ('second post', 'second best post ever!', 0, 0);
INSERT INTO posts (title, body, upvote, downvote) VALUES ('third post', 'third best post ever!', 0, 0);


INSERT INTO comments (comment,  post_id) VALUES ('lol',  1);
INSERT INTO comments (comment,  post_id) VALUES ('blah',  1);
INSERT INTO comments (comment,  post_id) VALUES ('hahah', 2);
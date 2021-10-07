CREATE DATABASE gamenight;
\c gamenight
CREATE TABLE categories (
  cat_id SERIAL PRIMARY KEY,
  category VARCHAR(50)
);

CREATE TABLE games (
  game_id SERIAL PRIMARY KEY,
  game_name TEXT,
  rounds INT, 
  players INT ARRAY, -- this will insert players into lobby
  categories INT ARRAY -- this will bring up categories in game and marking-page
);

CREATE TABLE players (
  player_id SERIAL PRIMARY KEY,
  display_name VARCHAR(20),
  game_id INT,
  last_request TIMESTAMP,
  host BOOLEAN DEFAULT false,
  score INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT false
);
 -- Every time a user makes a request, check their ID, if they haven't responded within X amount
 -- If their previous timestamp minus their current timestamp 
 -- But if their last timestamp is > 5 seconds they are considered disconnected
INSERT INTO categories (category) VALUES ('animal');
INSERT INTO categories (category) VALUES ('country');
INSERT INTO categories (category) VALUES ('movie');
INSERT INTO categories (category) VALUES ('types of dog');
INSERT INTO categories (category) VALUES ('food');

INSERT INTO games (categories) VALUES (ARRAY[1, 2, 3, 4, 5]);


-- CREATE TABLE results (
--   result_id SERIAL PRIMARY KEY,
--   player_id INT,
--   category_id INT,
--   result TEXT
-- );

-- Things outside of DBs - tracking answers (use name="" in input) and player scores


-- IGNORE THIS SHIT
-- Add players into lobby
INSERT INTO players (display_name, game_id) VALUES ('Ben', 7);
INSERT INTO players (display_name, game_id) VALUES ('Susan Swan', 4);
INSERT INTO players (display_name, game_id) VALUES ('Player 3', 7);
INSERT INTO players (display_name, game_id) VALUES ('Player 4', 7);



CREATE TABLE results (
  result_id SERIAL PRIMARY KEY,
  game_id INT,
  player_id INT,
  player_ans TEXT
);
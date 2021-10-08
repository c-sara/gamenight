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
  ready BOOLEAN DEFAULT false
);

CREATE TABLE answers (
  result_id SERIAL PRIMARY KEY,
  game_id INT,
  player_id INT,
  player_ans JSON
);

--where player_ans is a an array of object key being the cat id and the value being the player's answer

-- use genCats file/npm run seedCats
INSERT INTO categories (category) VALUES ('animal');
INSERT INTO categories (category) VALUES ('country');
INSERT INTO categories (category) VALUES ('movie');
INSERT INTO categories (category) VALUES ('types of dog');
INSERT INTO categories (category) VALUES ('food');

INSERT INTO games (categories) VALUES (ARRAY[1, 2, 3, 4, 5]);
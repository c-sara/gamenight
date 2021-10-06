CREATE DATABASE gamenight;
\c gamenight
CREATE TABLE categories (
  cat_id SERIAL PRIMARY KEY,
  category VARCHAR(50)
);

CREATE TABLE games (
  game_id SERIAL PRIMARY KEY,
  rounds INT,
  players INT ARRAY,
  categories INT ARRAY
);

CREATE TABLE players (
  player_id SERIAL PRIMARY KEY,
  display_name VARCHAR(20),
  game_id INT,
  last_request TIMESTAMP,
  -- active BOOLEAN, probably won't need (cache polution)
  host BOOLEAN
);
 -- Every time a user makes a request, check their ID, if they haven't responded within X amount
 -- If their previous timestamp minus their current timestamp 
 -- But if their last timestamp is > 5 seconds they are considered disconnected
INSERT INTO categories (category) VALUES ('animal');
INSERT INTO categories (category) VALUES ('country');
INSERT INTO categories (category) VALUES ('movie');
INSERT INTO categories (category) VALUES ('types of dogs');
INSERT INTO categories (category) VALUES ('food');


CREATE TABLE results (
  result_id SERIAL PRIMARY KEY,
  player_id INT,
  category_id INT,
  result TEXT
);

-- Things outside of DBs - tracking answers (use name="" in input) and player scores









-- IGNORE THIS SHIT
INSERT INTO players (display_name, game_id) VALUES ('Ben', 7);
INSERT INTO players (display_name, game_id) VALUES ('Susan Swan', 4);
INSERT INTO players (display_name, game_id) VALUES ('Player 3', 7);
INSERT INTO players (display_name, game_id) VALUES ('Player 4', 7);

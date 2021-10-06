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
  game_id INT
  -- host BOOLEAN   ?
);

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
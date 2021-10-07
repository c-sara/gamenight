# gamenight

## Scattegories
### How to play
Go to the URL to see our deployed project [https://limitless-tundra-59541.herokuapp.com/].

To play you will need someone to be the host - they will create a game and be given a unique code. With that code, it will be shared amongst the players who will enter the code before they are able to join the game.

The players (including the host) will be given a random letter and categories each round. Each person is required to fill out each category list with an answer that begins with the correct letter within the time limit.

For example, if the letter is "C" and the category is vegetable, words such as "cauliflower" and "carrot" are allowed. "Pumpkin" is not allowed, as it is not the right letter. "Cat" would also not be allowed as it is the wrong catergory.

Once each round is over, the host will receive a marking page with everyone's answers. 

The scores are calculated based on the following:
* 0 points if your answer:
  * Duplicates another player's answer. For example, you both answer "carrot" for a vegetable beginning with "C"
  * Does not begin with the chosen letter
  * Is not in the correct category
* 1 point if your answer:
  * Is unique
  * Begins with the correct letter
  * Is in the correct category

## Technologies Used
Our project was created using the following:
* Javascript
  * Express
  * EJS
* HTML
* CSS
* Postgresql
* Heroku

## User stories 

## Wireframes
We created [our wireframe](https://lucid.app/lucidspark/81a7db82-4de7-447f-96cc-6dca7e7bf380/edit?invitationId=inv_a8eed7ea-23c3-4437-94e7-72f09981bd6c) on Lucid before we began to code. It was important to provide clear steps in our game so we had an understanding of what pieces were required to complete it.

## Diagrams (database schema)

CREATE DATABASE gamenight;

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
CREATE TABLE results (
  result_id SERIAL PRIMARY KEY,
  game_id INT,
  player_id INT,
  player_ans TEXT
);

## Things we loved (optional)

## Challenges we faced along the way (optional)

## Future Improvements


<!-- Make a game into a database

Create Game
game id



Join button
insert into players 
player id stored in a session
player name
game id


ready state??
host? (if host true display settings) -->


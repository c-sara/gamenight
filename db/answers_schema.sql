
CREATE TABLE answers (
  result_id SERIAL PRIMARY KEY,
  game_id INT,
  player_id INT,
  player_ans JSON
);

--where player_ans is a an array of object key being the cat id and the value being the player's answer



-- REFERENCE ONLY, DO NOT ADD
-- CREATE TABLE players (
--   player_id SERIAL PRIMARY KEY,
--   display_name VARCHAR(20),
--   game_id INT,
--   last_request TIMESTAMP,
--   -- active BOOLEAN, probably won't need (cache polution)
--   host BOOLEAN,
--   score INTEGER
-- );

-- Different scores
INSERT INTO players (display_name, game_id, score) values ('apple', 1, 3);
INSERT INTO players (display_name, game_id, score) values ('orange', 1, 5);
INSERT INTO players (display_name, game_id, score) values ('pear', 1, 4);
INSERT INTO players (display_name, game_id, score) values ('kiwi', 1, 6);
INSERT INTO players (display_name, game_id, score) values ('lemon', 1, 6);

-- Draw
-- Who has highest score
-- Get everyone with that score

select * from players where score = (select max(score) from players);
select * from players where score != (select max(score) from players);

select * from players where score != (select max(score) from players) order by score desc;

INSERT INTO players (display_name, game_id, score) values ('apple', 3, 3);
INSERT INTO players (display_name, game_id, score) values ('orange', 3, 5);
INSERT INTO players (display_name, game_id, score) values ('pear', 3, 4);
INSERT INTO players (display_name, game_id, score) values ('kiwi', 3, 6);
INSERT INTO players (display_name, game_id, score) values ('lemon', 3, 6);
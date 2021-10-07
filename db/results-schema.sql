-- REFERENCE ONLY, DO NOT ADD INTO DB
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


select * from players where score = (select max(score) from players);
select * from players where score != (select max(score) from players);

select * from players where score != (select max(score) from players) order by score desc;

INSERT INTO players (display_name, game_id, score) values ('grapes', 5, 6);
INSERT INTO players (display_name, game_id, score) values ('orange', 5, 5);
INSERT INTO players (display_name, game_id, score) values ('pear', 5, 4);
INSERT INTO players (display_name, game_id, score) values ('kiwi', 5, 3);
INSERT INTO players (display_name, game_id, score) values ('lemon', 5, 2);

INSERT INTO players (display_name, game_id, score) values ('pear', 7, 4);
INSERT INTO players (display_name, game_id, score) values ('kiwi', 7, 3);
INSERT INTO players (display_name, game_id, score) values ('apple', 7, 3);
INSERT INTO players (display_name, game_id, score) values ('orange', 7, 10);

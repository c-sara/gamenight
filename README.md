# gamenight - scattegories

## How to play

Are you bored? Well Game Night: Scattergories has got you covered!
We wanted to create a game so that you can have fun~ all the while practicing our programming knowledge.

Find our deployed project on Heroku: https://limitless-tundra-59541.herokuapp.com/.

![game](/images/gamenight.png "Game Night")

### **Instructions**
To play you will need someone to be the host - they will create a game by typing in a game name, host name and selecting the number of rounds. The game name will be shared amongst the players who will enter it before they are able to join the same game as the host.

The players (including the host) will be given the a random letter and categories each round. Each person is required to fill out each category list with an answer that begins with the correct letter within the time limit.

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

The aim of the game is to get the highest amount of points!

## Technologies Used
Our project was created using the following:

Languages:
* Javascript, HTML, CSS

Database:
* PostgreSQL

Modules:
* EJS, EJS-mate, Express, Express-session, Method-override, Nodemon, PG

Cloud Application Platform:
* Heroku


## Approach taken
### **Wireframes**
We created [our wireframe](https://lucid.app/lucidspark/81a7db82-4de7-447f-96cc-6dca7e7bf380/edit?invitationId=inv_a8eed7ea-23c3-4437-94e7-72f09981bd6c) on Lucid before we began to code. It was important to provide clear steps in our game so we had an understanding of what pieces were required to complete it.

### **Diagrams (database schema)**
The [diagram of our database schema](https://dbdiagram.io/d/615ecb43940c4c4eec89dea2) provided a clear structure to assist us with linking our tables when we were coding.

## Future Improvements

## Team photo
![team_photo](/images/teamphoto.png "Gang gang")




var gameForm = document.querySelector(".newgameform")
var gameNameInput = document.querySelector(".newgamenameinput")
var gameBtn = document.querySelector(".newgamebtn")


function handleAddGame(event) {
    event.preventDefault()

    let gameName = gameNameInput.value;

    //use axios to make a request to make a new game
    //now go to server.js to respond to the request
    axios
        .post("/api/games", { name: gameName })
        .then(res => {
            console.log(res)
            itemsList.appendChild(createItem(res.data.item.id, gameName, 'supermarket'))
        })
}





//in the join game section (when the user inputs a display name) assign session.user_id

//OR

//as soon as client loads index assign session.user_id
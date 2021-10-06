// Do set interval

//make it so the players table is tracking timestmps each time a response is made. 

//then do the comparioson


function renderPlayerList() {

    axios.get('/api/lobby')
        .then(res => {
            var lobbyPlayerList = document.querySelector(".lobby-players-list")
            var players = res.data.players

            
            lobbyPlayerList.innerHTML = ""

            players.forEach(player => {
                console.log(player)
                //append these to an adult later
                var p = document.createElement("p")
                lobbyPlayerList.appendChild(p)
                p.textContent = player.display_name
            });
        })
}

setInterval(renderPlayerList, 3000)


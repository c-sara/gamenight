let lobbyName = document.querySelector('.lobby-name')
let startBtn = document.querySelector('.lobby-play-btn')

// renders "you're in lobby x"
axios.get('/api/lobby')
    .then(res => {
      lobbyName.textContent = `You're in lobby ${res.data.gameId}`
    })
    .catch(err => {
        lobbyName.innerHTML = `<a href="/">Something went wrong! Click here to return home</a>`
        console.log(err.message)
    })


function renderPlayerList() {

    axios.get('/api/lobby')
        .then(res => {
            let lobbyPlayerList = document.querySelector(".lobby-players-list")

            let players = res.data.players
            
            lobbyPlayerList.innerHTML = ""

            players.forEach(player => {
                let p = document.createElement("p")
                
                if (player.host) {
                    p.dataset.id = player.player_id
                    startBtn.textContent = "Ready"
                    startBtn.disabled = false
                }

                lobbyPlayerList.appendChild(p)
                p.textContent = player.display_name
            });
        })
}

function handleGameStart(e) {
    let playerId = document.querySelector('[data-id]')
    axios.patch('/api/players/:id')
}

startBtn.addEventListener('click', handleGameStart)

setInterval(renderPlayerList, 3000)


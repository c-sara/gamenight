let lobbyName = document.querySelector('.lobby-name')
let readyBtn = document.querySelector('.lobby-play-btn')
let actionsDiv = document.querySelector('.lobby-actions-div')

// renders "you're in lobby x"
axios.get('/api/lobby')
    .then(res => {
      lobbyName.textContent = `You're in lobby ${res.data.gameId}`
    })
    .catch(err => {
        lobbyName.innerHTML = `<a href="/">Something went wrong! Click here to return home</a>`
        console.log(err.message)
    })

let ready = []

function createStartAnc(gameId) {
    let startAnc = document.createElement("a")
    startAnc.href = `/game/${gameId}`
    startAnc.textContent = "Play"
    startAnc.classList.add("light-btn")
    startAnc.classList.add("start-anc")
    actionsDiv.appendChild(startAnc)
}

function renderPlayerList() {

    axios.get('/api/lobby')
        .then(res => {
            let lobbyPlayerList = document.querySelector(".lobby-players-list")

            let players = res.data.players
            
            lobbyPlayerList.innerHTML = ""

            let checkForStartAnc = document.querySelector('.start-anc')
            if (ready.every(ready => ready === false) !== true && !checkForStartAnc) {
                readyBtn.remove()
                createStartAnc(players[0].game_id)
            }

            ready = []

            players.forEach(player => {
                let p = document.createElement("p")
                
                if (player.host) {
                    p.dataset.id = player.player_id
                    readyBtn.textContent = "Ready"
                    readyBtn.disabled = false
                }

                lobbyPlayerList.appendChild(p)
                p.textContent = player.display_name
                ready.push(player.ready)
            });

        })
}

function handleGameStart(e) {
    let playerId = document.querySelector('[data-id]')
        .dataset.id
    axios.patch(`/api/players/${playerId}`)
        .then(res => {
            readyBtn.remove()
            createStartAnc(res.data.player.game_id)
        })
}

readyBtn.addEventListener('click', handleGameStart)

setInterval(renderPlayerList, 3000)


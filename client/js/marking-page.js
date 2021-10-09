let gameId = document.querySelector('[data-gameid]').dataset.gameid

let answersTable = document.querySelector('.marking-page-answers-table')

answersTable.addEventListener('click', handleIncrementPoint)

function handleIncrementPoint(e) {
    let clicked = e.target
    let btnOwner = clicked.dataset.userid

    if (clicked.classList.contains('marking-page-answer-btn')) {
        clicked.classList.toggle('clicked')
        if (clicked.classList.contains('clicked')) {
            axios.put('/api/marking-page', { scoreChange: "increase", btnOwner })
        } else {
            axios.put('/api/marking-page', { scoreChange: "decrease", btnOwner })
        }
    }
}

function renderPlayersScores() {
       axios.get(`/api/marking-page/${gameId}`)
        .then(scores => {
            var scoreArray = scores.data
            scoreArray.forEach(playerScore => {
                var playerScoreSpan = document.querySelector(`.score${playerScore.player_id}`)
                playerScoreSpan.textContent = playerScore.score
            })
        })
}

setInterval(renderPlayersScores, 1000)

function createRow(displayName, answers, playerId) {
    let tr = document.createElement('tr')
    let name = document.createElement('td')

    name.textContent = displayName

    tr.appendChild(name)

    Object.keys(answers).forEach(answer => {
        let td = document.createElement('td')
        td.innerHTML = `<button data-userId="${playerId}" class="marking-page-answer-btn">${answers[answer] || "😰"}</button>`
        tr.appendChild(td)
    })

    let score = document.createElement('td')
    score.innerHTML = `Score: <span class="score${playerId}">0</span>`

    tr.appendChild(score)

    answersTable.appendChild(tr)
}

axios.get('/api/answers/playerNames')
    .then(answers => {
        console.log(answers.data)
        answers.data.forEach(player => {
            createRow(player.display_name, player.player_ans, player.player_id)
        })
    })
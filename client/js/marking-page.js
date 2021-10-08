let answerDivs = document.querySelectorAll('.marking-page-individual-answer-div')
let dataSetGameId = document.querySelector('.marking-page-gameId-data')
// console.log(dataSetGameId);
// console.log(dataSetGameId.textContent)
let dSetGameId = dataSetGameId.dataset.gameid
console.log(dSetGameId)


function handleAddPoint(e) {
    let clicked = e.target
    let btnOwner = clicked.dataset.userid
    
    if (clicked.classList.contains('marking-page-answer-btn')) {
        clicked.classList.toggle('clicked')
        if (clicked.classList.contains('clicked')){
            axios.put('/api/marking-page', { scoreChange: "increase", btnOwner })
        } else {
            axios.put('/api/marking-page', { scoreChange: "decrease", btnOwner })
        }
    }
}


function renderPlayersScores() {
       axios.get(`/api/marking-page/${dSetGameId}`)
        .then(scores => {
            var scoreArray = scores.data

            scoreArray.forEach(playerScore => {
                var playerScoreSpan = document.querySelector(`.score${playerScore.player_id}`)
                playerScoreSpan.textContent = playerScore.score
            })
        })
}

setInterval(renderPlayersScores, 1000)

answerDivs.forEach(answerDiv => {
    answerDiv.addEventListener('click', handleAddPoint)
    answerDiv.style.display = 'flex'
    answerDiv.style.flexDirection = 'column'
    answerDiv.style.textAlign = 'center'
})

let wrapper = document.querySelector('.marking-page-main')

wrapper.style.display = 'grid'
wrapper.style.gridTemplateColumns = `repeat(${answerDivs.length}, 1fr)`




let answerDivs = document.querySelectorAll('.marking-page-individual-answer-div')


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
    //this populates each players score span according to their player_id. By asking the servers for player score table
    //call to the api asking what the latest scores are
    //change the textContent of the appropriate btns

    axios.get('api/marking-page')
        .then(scores => {
            var scoreArray = scores.data

            scoreArray.forEach(playerScore => {
                var playerScoreSpan = document.querySelector(`.${playerScore.player_id}_score`)
                playerScoreSpan.textContent = playerScore.score
            })



            //scores.data is an array of objects

            //for each object in array use DOM to grab the right span

            //update the buttons
        })

        // 0: {player_id: 1, score: 0}
        // 1: {player_id: 3, score: 0}
        // 2: {player_id: 4, score: 0}
        // 3: {player_id: 2, score: 4}
        // 4: {player_id: 5, score: 5}
        // 5: {player_id: 6, score: 0}
        

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




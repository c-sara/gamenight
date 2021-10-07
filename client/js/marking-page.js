let answerDivs = document.querySelectorAll('.marking-page-individual-answer-div')

//add the polling function to grab up to date scores 




function handleAddPoint(e) {
    //increase or decrease players score in the players table
    //by default btn states are false
    //when clicked btn state goes to true
    //if btn state is false and the btn is pressed +1 in player table
    //if btn state is true and the btn is pressed -1 in player table

    
    
    let clicked = e.target
    if (clicked.classList.contains('marking-page-answer-btn')) {
        clicked.classList.toggle('clicked')
        if (clicked.classList.contains('clicked')){
            //session id appears to be fucked atm ask sarah leah where its being set (if it is)
            addPointInPlayerTable(1, req.session.user_id)
        } else {
            addPointInPlayerTable(-1, req.session.user_id)
        }
    }
}


function renderPlayersScores() {
    //this populates each players score span according to their player_id. By asking the servers for player score table

    


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




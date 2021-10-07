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
            addPointInPlayerTable(1, req.session.user_id)
        }
    }



    
    addPointInPlayerTable(value, player_id)








    // let parentDiv = clicked.closest('div')
    
    // // this is the spread operator
    // // it makes this nodeList into an array
    // let score = [...parentDiv.children]
    //     .filter(elem => elem.classList.contains('total-score'))[0]


    // let clickedBtns = parentDiv.querySelectorAll('.clicked')
    
    // score.textContent = clickedBtns.length

    //toggles a clicked
    //sends an update to player table in their scores (+1 if its toggled - 1 if its not)
    //everyone is polling the server 2 seconds to render up to date scores

}

answerDivs.forEach(answerDiv => {
    answerDiv.addEventListener('click', handleAddPoint)
    answerDiv.style.display = 'flex'
    answerDiv.style.flexDirection = 'column'
    answerDiv.style.textAlign = 'center'
})

let wrapper = document.querySelector('.marking-page-main')

wrapper.style.display = 'grid'
wrapper.style.gridTemplateColumns = `repeat(${answerDivs.length}, 1fr)`




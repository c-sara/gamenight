let answerDivs = document.querySelectorAll('.player-answer-div')

function handleAddPoint(e) {

    let clicked = e.target
    let parentDiv = clicked.closest('div')
    let score = parentDiv.children[6]

    if (clicked.classList.contains('point-btn')) {
        clicked.classList.toggle('clicked')
    }

    let clickedBtns = parentDiv.querySelectorAll('.clicked')
    
    score.textContent = clickedBtns.length

}

answerDivs.forEach(answerDiv => {
    answerDiv.addEventListener('click', handleAddPoint)

})

let answerDivs = document.querySelectorAll('.player-answer-div')

function handleAddPoint(e) {

    let clicked = e.target
    let parentDiv = clicked.closest('div')
    
    // this is the spread operator
    // it makes this nodeList into an array
    let score = [...parentDiv.children]
        .filter(elem => elem.classList.contains('total-score'))[0]

    if (clicked.classList.contains('point-btn')) {
        clicked.classList.toggle('clicked')
    }

    let clickedBtns = parentDiv.querySelectorAll('.clicked')
    
    score.textContent = clickedBtns.length

}

answerDivs.forEach(answerDiv => {
    answerDiv.addEventListener('click', handleAddPoint)

})

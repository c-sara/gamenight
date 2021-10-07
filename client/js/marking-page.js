let answerDivs = document.querySelectorAll('.marking-page-player-answer-div')

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




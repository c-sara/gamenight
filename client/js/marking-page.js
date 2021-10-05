let answerDiv = document.querySelector('.player-answer-div')

function handleAddPoint(e) {

    let clicked = e.target
    let score = document.querySelector('.total-score')

    if (clicked.classList.contains('point-btn')) {
        clicked.classList.toggle('clicked')
    }

    let clickedBtns = document.querySelectorAll('.clicked')
    
    score.textContent = clickedBtns.length

}

answerDiv.addEventListener('click', handleAddPoint)
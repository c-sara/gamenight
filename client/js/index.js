let createGameNameInp = document.querySelector('.create-game-input-name')
let createGameBtn = document.querySelector('.index-dark-btn')
let createGameDiv = document.querySelector('.create-game-name-div')

let joinGameNameInp = document.querySelector('.join-game-input-name')
let joinGameBtn = document.querySelector('.index-light-btn')
let joinGameDiv = document.querySelector('.join-game-div')

function removeErrorP(parent) {
    let errorP = parent.querySelector('.error-p')
    if (errorP) {
        errorP.remove()
    }
}

function createErrorP(message, parent) {
    let errorPAlreadyExists = document.querySelector('.error-p')
    if (!errorPAlreadyExists) {
        let errorP = document.createElement('p')
        errorP.textContent = message
        errorP.style.color = 'red'
        errorP.classList.add('error-p')
        parent.appendChild(errorP)
    }
    
}

function markInputValid(elem) {
    elem.style.border = '2px solid green'
}

function markInputInvalid(elem) {
    elem.style.border = '2px solid red'
}

// CREATE GAME
// check if game name is in db already
function handleCheckGameNameValidity(e) {
    let possGameName = e.target.value
    axios.get(`/api/games/${possGameName}`)
        .then(res => {
            console.log(res.data)
            let gameAlreadyExists = res.data.exists
            if (gameAlreadyExists) {
                markInputInvalid(createGameNameInp)
                createErrorP("A game with this name already exists", createGameDiv)
                createGameBtn.disabled = true
            } else {
                createGameBtn.disabled = false
                removeErrorP(createGameDiv)
                markInputValid(createGameNameInp)
            }
        })
}

// JOIN GAME
// check if game exists in db

function handleGameCanBeJoined(e) {
    let gameToJoin = e.target.value
    axios.get(`/api/games/${gameToJoin}`)
        .then(res => {
            let gameAlreadyExists = res.data.exists
            if (gameAlreadyExists) {
                markInputValid(joinGameNameInp)
                removeErrorP(joinGameDiv)
                joinGameBtn.disabled = false
            } else {
                markInputInvalid(joinGameNameInp)
                createErrorP("There is no game with this name", joinGameDiv)
                createGameBtn.disabled = true
            }
        })
}

createGameNameInp.addEventListener('focusout', handleCheckGameNameValidity)

joinGameNameInp.addEventListener('focusout', handleGameCanBeJoined)




let winningMsg = document.querySelectorAll('.results-winner')
let losingMsg = document.querySelectorAll('.results-loser')

const endGameBtn = document.querySelector('.results-end-game-btn')
const button = document.querySelector('button')

function randomWinningMsg() {
  const winningMsg = [
    'yay',
    'you win!',
    '🎉',
    'fun and fresh',
    'literally the best'
  ]

  let index = Math.floor(Math.random() * winningMsg.length)

  return winningMsg[index]
  
}

function randomLosingMsg() {
  const losingMsg = [
    'nay',
    'you lose!',
    '💩',
    'not a vibe',
    'boo',
    'go have a cry'
  ]

  let index = Math.floor(Math.random() * losingMsg.length)

  return losingMsg[index]
  
}

// endGameBtn.addEventListener('click', clearGameData)

// function clearGameData() {
//   let gameId = Number(button.dataset.gameId)

//   axios
//     .delete(`/api/games/${gameId}`)
//     .delete(`/api/players/${gameId}`)
//     .delete(`/api/answers/${gameId}`)

// }

winningMsg.forEach(win => win.textContent = randomWinningMsg())
losingMsg.forEach(lose => lose.textContent = randomLosingMsg())



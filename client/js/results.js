let winningMsg = document.querySelectorAll('.results-winner')
let losingMsg = document.querySelectorAll('.results-loser')

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

winningMsg.forEach(win => win.textContent = randomWinningMsg())
losingMsg.forEach(lose => lose.textContent = randomLosingMsg())

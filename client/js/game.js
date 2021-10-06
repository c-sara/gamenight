const timerBtn = document.querySelector('.game-timer-btn')
const timerSpan = document.querySelector('.game-timer-span')

function handleTimerStarts() {
  timerBtn.disabled = true
  var timer = setInterval(countDown, 1000)
  
  function countDown() {
    let count = Number(timerSpan.textContent)
    
    if (count === 0) {
      clearInterval(timer)
    } else {
      timerSpan.textContent = count - 1
    }
  }
}

timerBtn.addEventListener('click', handleTimerStarts)

const letterSpan = document.querySelector('.game-letter-span')

function generateRandomLetter() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')

  let index = Math.floor(Math.random() * alphabet.length)

  return alphabet[index]
}

letterSpan.textContent = generateRandomLetter()

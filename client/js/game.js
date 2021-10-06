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
const funBtn = document.querySelector('.game-fun-btn')

function generateRandomLetter() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')

  let index = Math.floor(Math.random() * alphabet.length)

  return alphabet[index]
}

function generateRandomPhrase() {
  let phrases = [
    "fun and fresh",
    "so funky",
    "send it",
    "babes, you've got this",
    "push it",
    "vroom vroom",
    "frick yeah",
    "let's win this"
  ]

  let index = Math.floor(Math.random() * phrases.length)

  return phrases[index]
}

letterSpan.textContent = generateRandomLetter()
funBtn.textContent = generateRandomPhrase()


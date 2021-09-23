const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#FFFF66', '#FFCC33', '#FF6600', '#FF3300', '#FF6666', '#CC3333', '#FF0066', '#FF0099', '#FF33CC', '#FF66FF', '#9933FF']

let time = 0
let score = 0

startBtn.addEventListener('click', (e) => {
  e.preventDefault()

  screens[0].classList.add('up')
})

timeList.addEventListener('click', (e) => {
  if (e.target.classList.contains('time-btn')) {
    time = parseInt(e.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', e => {
  if (e.target.classList.contains('circle')) {
    score++
    e.target.classList.add('splash')
    e.target.style.backgroundColor = 'transparent'
    setInterval(function () {
      e.target.remove()
    }, 1000)

    createRandomCircle()
  }
})

function startGame() {
  setInterval(decreaseTime, 1000)

  setTime(time)
  createRandomCircle()
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }
}

function setTime(v) {
  timeEl.innerHTML = `00:${v}`
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<div style="flex-direction: column">
<div><h1>Cчет: <span class="primary">${score}</span></h1></div>
<div><button class="restart-btn" id="restart">Начать заново</button></div>
</div>`
  board.addEventListener('click', e => {
    if (e.target.classList.contains('restart-btn')) {
      window.location.reload(false)
    }
  })
}

function createRandomCircle() {
  const circle = document.createElement('div')
  circle.classList.add('circle')
  const size = getRandomNumber(10, 60)
  const {width, height} = board.getBoundingClientRect()

  setColor(circle)

  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)

  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.left = `${x}px`
  circle.style.top = `${y}px`

  board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function setColor(element) {
  const color = getRandomColor()
  element.style.backgroundColor = color
  element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}

//бесполезные взлом игры
function winTheGame() {
  function kill() {
    const circle = document.querySelector('.circle')
    if (circle) {
      circle.click();
    }
  }
  setInterval(kill, 10)
}

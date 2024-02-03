let scores, roundScore, activePlayer, dice

init()

document.querySelector(".btn-new").addEventListener("click", init)

document.querySelector(".btn-roll").addEventListener("click", function () {
    if (gameOn) {
        /* 1. Get a random number */
        dice = Math.floor(Math.random() * 6) + 1
        /* 2. Display the result */
        document.querySelector(".dice").src = "dice-" + dice + ".png"
        /* 3. If the number is NOT a 1, update the roudScore */
        if (dice !== 1) {
            roundScore += dice
            document.querySelector("#current-" + activePlayer).textContent = roundScore
        } else {
            moveToNextPlayer()
        }
    }
})

document.querySelector(".btn-keep").addEventListener("click", function () {
    if (gameOn) {
        scores[activePlayer] += roundScore
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer]
        if (scores[activePlayer] >= 20) {
            gameOver()
        } else {
            moveToNextPlayer()
        }
    }
})

function gameOver() {
    document.getElementById("name-" + activePlayer).textContent = "Winner!"
    document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner")
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active")

    document.querySelector(".dice").src = "winner.png"

    gameOn = false
}

function init() {
    gameOn = true
    scores = [0, 0]
    roundScore = 0
    activePlayer = 0

    let diceElement = document.querySelector(".dice")
    diceElement.style.display = "block"
    diceElement.src = "dice-1.png"

    document.getElementById("score-0").textContent = 0
    document.getElementById("score-1").textContent = 0
    document.getElementById("current-0").textContent = 0
    document.getElementById("current-1").textContent = 0
    document.getElementById("name-0").textContent = "Player 1"
    document.getElementById("name-1").textContent = "Player 2"

    let panel0 = document.querySelector(".player-0-panel")
    let panel1 = document.querySelector(".player-1-panel")

    panel0.classList.remove("winner")
    panel0.classList.remove("active")
    panel1.classList.remove("winner")
    panel1.classList.remove("active")

    panel0.classList.add("active")
}

function moveToNextPlayer() {
    roundScore = 0
    document.querySelector("#current-" + activePlayer).textContent = roundScore
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active")

    activePlayer = Math.abs(activePlayer - 1)

    document.querySelector(".player-" + activePlayer + "-panel").classList.add("active")
}



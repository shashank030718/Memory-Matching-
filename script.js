const emojis = [
    "⚽", "⚽",
    "🏀", "🏀",
    "🎾", "🎾",
    "🏈", "🏈",
    "🎮", "🎮",
    "🚗", "🚗",
    "🍕", "🍕",
    "🎵", "🎵"
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;

const gameBoard = document.getElementById("gameBoard");
const movesDisplay = document.getElementById("moves");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    gameBoard.innerHTML = "";
    shuffle(emojis);

    emojis.forEach((emoji) => {
        const card = document.createElement("div");
        card.classList.add("card", "hide");
        card.dataset.emoji = emoji;
        card.textContent = emoji;

        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (
        lockBoard ||
        this === firstCard ||
        this.classList.contains("matched")
    ) {
        return;
    }

    this.classList.remove("hide");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    movesDisplay.textContent = moves;

    checkMatch();
}

function checkMatch() {
    const isMatch =
        firstCard.dataset.emoji === secondCard.dataset.emoji;

    if (isMatch) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matchedPairs++;

        resetTurn();

        if (matchedPairs === 8) {
            setTimeout(() => {
                alert(`🎉 You Won in ${moves} moves!`);
            }, 300);
        }
    } else {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.add("hide");
            secondCard.classList.add("hide");
            resetTurn();
        }, 1000);
    }
}

function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function restartGame() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    moves = 0;
    matchedPairs = 0;

    movesDisplay.textContent = moves;
    createBoard();
}

createBoard();
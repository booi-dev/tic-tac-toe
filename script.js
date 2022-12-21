const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let combinationWinner;
let xTurn;

const elements = {
    cursorX: document.querySelector(".custom-cursor.x"),
    cursorO: document.querySelector(".custom-cursor.o"),
    board: document.querySelector("#board"),
    gameboard: document.querySelectorAll(".cell"),
    msgDiv: document.querySelector(".msg-div"),
    restartBtn: document.querySelector(".restart-btn")
}

const removeCursor = function (condition) {
    if (condition === 'x') elements.cursorX.classList.remove('show')
    if (condition === 'o') elements.cursorO.classList.remove('show')
    if (condition === 'both') {
        elements.cursorX.classList.remove('show')
        elements.cursorO.classList.remove('show')
    }
}

const createCursor = function () {
    if (xTurn) {
        elements.cursorX.classList.add('show')
        removeCursor('o')
    } else {
        elements.cursorO.classList.add('show')
        removeCursor('x')
    }
}

const getCursor = function (e) {
    createCursor()
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    if (xTurn) elements.cursorX.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 10px)`; else elements.cursorO.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 10px)`;
}

const cursorEventHandler = function (state) {
    if (state === true) {
        board.addEventListener('mousemove', getCursor)
        board.addEventListener('mouseleave', () => {
            removeCursor('both')
        })
    }
    if (state === false) {
        board.removeEventListener('mousemove', getCursor)
        removeCursor('both')
    }
}

const placeMark = function (cell, currentPlayer) {
    cell.classList.add(currentPlayer)
}

const swapTurn = function () {
    xTurn = !xTurn;
}

const checkWin = function (currentPlayer) {
    return WINNING_COMBINATIONS.some((combinatin) => {
        return combinatin.every(index => {
            combinationWinner = combinatin;
            return elements.gameboard[index].classList.contains(currentPlayer)
        })
    })
}

const checkDraw = function () {
    return [...elements.gameboard].every((cell) => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}

const winTransition = function (combinationCells) {
    combinationCells.forEach((index) => {
        elements.gameboard[index].classList.add('win')
    })
}

const gameEndMsg = function () {
    elements.msgDiv.classList.toggle('show')
    elements.restartBtn.classList.toggle('show')
}

const updateMsg = function (currentPlayer, state) {
    let winnerPlayereDiv = elements.msgDiv.firstChild.nextSibling
    if (currentPlayer === 'x') winnerPlayereDiv.childNodes[1].classList.add('x')
    else if (currentPlayer === 'o') winnerPlayereDiv.childNodes[1].classList.add('o')

    if (state === 'restart') winnerPlayereDiv.childNodes[1].className = ''

    if (state === 'draw') winnerPlayereDiv.childNodes[2].nextSibling.textContent = 'draw'
    else winnerPlayereDiv.childNodes[2].nextSibling.textContent = 'win'
}

const gameEnd = function (currentPlayer, state) {
    if ((state === 'win') || (state === 'draw')) {
        cursorEventHandler(false)
        bindEvent(false)
    }
    gameEndMsg()
    updateMsg(currentPlayer, state)
}

const clickEvenHandler = function (e) {
    let cell = e.target;
    const currentPlayer = xTurn ? X_CLASS : O_CLASS;
    placeMark(cell, currentPlayer)

    if (checkWin(currentPlayer)) {
        winTransition(combinationWinner)
        gameEnd(currentPlayer, 'win')
    } else if (checkDraw()) gameEnd('', 'draw')
    else swapTurn()
}

function bindEvent(state) {
    if (state === true) {
        elements.gameboard.forEach((each) => {
            each.addEventListener('click', clickEvenHandler, { once: true })
        })
    }
    if (state === false) {
        elements.gameboard.forEach((each) => {
            each.removeEventListener('click', clickEvenHandler)
        })
    }
}

const startGame = function () {
    xTurn = true;
    cursorEventHandler(true)
    bindEvent(true)
}

startGame()

const restart = function resetEverything() {
    elements.gameboard.forEach((cell) => {
        cell.className = 'cell'
    })
    gameEnd('', 'restart')
    startGame()
}

elements.restartBtn.addEventListener('click', restart)
// cache DOM
// bind events
// mark func

const X_CLASS = 'x';
const CIRCLE_CLASS = 'o';
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
    gameboard: document.querySelectorAll(".cell")
}

// function cursor rendering

const removeCursor = function (condition) {
    if (condition === 'x') {
        elements.cursorX.classList.remove('show')

    } if (condition === 'o') {
        elements.cursorO.classList.remove('show')
    } if (condition === 'both') {
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
    if (xTurn) {
        elements.cursorX.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 10px)`;
    } else {
        elements.cursorO.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 10px)`;
    }
}

// const loseCursor = function (e) {

// }

// mouse events

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

//
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

const gameEnd = function (currentPlayer) {
    cursorEventHandler(false)
    clickEventHandler(false)
    console.log(`${currentPlayer} win the dame`)
}

const clickEvenHandler = function (e) {
    let cell = e.target;
    const currentPlayer = xTurn ? X_CLASS : CIRCLE_CLASS;
    placeMark(cell, currentPlayer)

    if (checkWin(currentPlayer)) {
        gameEnd(currentPlayer)
    } else {
        swapTurn()
    }
}

function clickEventHandler(state) {
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

// game init

const startGame = function () {
    xTurn = true;
    cursorEventHandler(true)
    clickEventHandler(true)
}

startGame()
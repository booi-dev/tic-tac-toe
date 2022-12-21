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
let xTurn;

const elements = {
    cursorX: document.querySelector(".custom-cursor.x"),
    cursorO: document.querySelector(".custom-cursor.o"),
    board: document.querySelector("#board")
}

const gameboard = {
    cell: document.querySelectorAll(".cell"),
    cellArr() {
        return Array.from(this.cell);
    }
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

const positionElement = function (e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    if (xTurn) {
        elements.cursorX.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 10px)`;
    } else {
        elements.cursorO.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 10px)`;
    }
}

// mouse events
board.addEventListener('mousemove', (e) => {
    createCursor()
    positionElement(e)
})

board.addEventListener('mouseleave', () => {
    removeCursor('both')
})


//

const placeMark = function (cell, currentPlayer) {
    cell.classList.add(currentPlayer)
}

const swapTurn = function () {
    xTurn = !xTurn;
}

const clickEvenHandler = function (e) {
    let cell = e.target;
    const currentPlayer = xTurn ? X_CLASS : CIRCLE_CLASS;
    placeMark(cell, currentPlayer)
    swapTurn()
}

function bindEventHandler() {
    gameboard.cellArr().map((each) => {
        each.addEventListener('click', clickEvenHandler, { once: true })
    })
}

// function swapTurn() {
//     xTurn = !xTurn;
// }

const checkWin = function (currentPlayer) {
    confirm.log(gameboard.cellArr())
}

// game init

const startGame = function () {
    xTurn = false;
    bindEventHandler()
    // checkWin(currentPlayer)
    // swapTurn()
}

startGame()
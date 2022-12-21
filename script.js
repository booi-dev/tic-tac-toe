// cache DOM
// bind events
// mark func

const X_CLASS = 'x';
const CIRCLE_CLASS = 'o';
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

//

startGame()

function startGame() {
    xTurn = false;
    bindEventHandler()
    // swapTurn()
}

function bindEventHandler() {
    gameboard.cellArr().map((each) => {
        each.addEventListener('click', clickEvenHandler, { once: true })
    })
}

function clickEvenHandler(e) {
    let cell = e.target;
    const currentClass = xTurn ? X_CLASS : CIRCLE_CLASS;
    placeMark(cell, currentClass)
    swapTurn()
}

function placeMark(cell, cclass) {
    cell.classList.add(cclass)
}

function swapTurn() {
    xTurn = !xTurn;
}

// function cursorRender() {
board.addEventListener('mousemove', (e) => {
    createCursor()
    positionElement(e)
})

board.addEventListener('mouseleave', () => {
    removeCursor('both')
})

function createCursor() {
    if (xTurn) {
        elements.cursorX.classList.add('show')
        removeCursor('o')
    } else {
        elements.cursorO.classList.add('show')
        removeCursor('x')
    }
}

function removeCursor(condition) {
    if (condition === 'x') {
        elements.cursorX.classList.remove('show')

    } if (condition === 'o') {
        elements.cursorO.classList.remove('show')
    } if (condition === 'both') {
        elements.cursorX.classList.remove('show')
        elements.cursorO.classList.remove('show')
    }
}

function positionElement(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    if (xTurn) {
        elements.cursorX.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 10px)`;
    } else {
        elements.cursorO.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 10px)`;
    }
}


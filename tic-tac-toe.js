

//global variables

const cellElements = document.querySelectorAll('[data-cell]')
const xClass = 'x'
const circleClass = 'circle'
const board = document.getElementById('board')
let circleTurn
const winnigCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const winnigMessageTextElement = document.querySelector('[data-winner-text')
const winnigMessage = document.getElementById('winner')
const restartButton = document.getElementById('restart')



//functions

const placeMark=(cell, currentClass)=>{
    cell.classList.add(currentClass)
}


const checkWin=currentClass=>{
    return winnigCombinations.some(combination=>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}


const endGame=draw=>{
    if(draw){
        winnigMessageTextElement.innerHTML = 'Draw!'
    } else {
        winnigMessageTextElement.innerHTML=`${circleTurn ? "O" : "X"} Wins!`
    }
    winnigMessage.classList.add('show')
}


const isDraw=()=>{
    return [...cellElements].every(cell=>{
        return cell.classList.contains(xClass) || cell.classList.contains(circleClass)
    })
}


const swapTurns=()=>{
    circleTurn = !circleTurn
}


const setBoardHoverClass=()=>{
    board.classList.remove(xClass)
    board.classList.remove(circleClass)
    if (circleTurn){
        board.classList.add(circleClass)
    } else {
        board.classList.add(xClass)
    }
}


const handleClick=(event)=>{
    const cell = event.target
    const currentClass = circleTurn ? circleClass : xClass
    placeMark(cell, currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    } else if (isDraw()){
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}


const startGame=()=>{
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(xClass)
        cell.classList.remove(circleClass)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winnigMessage.classList.remove('show')
}


startGame()

restartButton.addEventListener('click', startGame)
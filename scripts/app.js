const gameTableContainer = document.querySelector('.game-board__container')

const boardRows = 4
const boardColuns = 4

const cellStyles = [
    [2, 3, 2, 1],
    [4, 1, 2, 3],
    [1, 2, 3, 2],
    [3, 4, 1, 2],
]

const gameButtons = []

const getAdjacentAddresses = () => {
    const adresses = []
    for (let rowIndex = 0; rowIndex < boardRows; rowIndex++) {
        const currentRow = []
        for (let columnIndex = 0; columnIndex < boardColuns; columnIndex++) {
            const currentColumn = []
            if (rowIndex > 0) {
                currentColumn.push([rowIndex - 1, columnIndex])
            }
            if (rowIndex < boardRows - 1) {
                currentColumn.push([rowIndex + 1, columnIndex])
            }
            if (columnIndex > 0) {
                currentColumn.push([rowIndex , columnIndex - 1])
            }
            if (columnIndex < boardColuns - 1) {
                currentColumn.push([rowIndex , columnIndex + 1])
            }
            currentRow.push(currentColumn)
        } 
        adresses.push(currentRow)
    }
    return adresses
}

const updateClickedButtonStatus = clickedButton => {
    const currentStatus = clickedButton.dataset.status
    currentStatus = 'olá'
}

const handleButtonClick = event => {
    const clickedButton = event.target.parentElement
    
}

const createGameButtons = () => {
    for (let rowIndex = 0; rowIndex < boardRows; rowIndex++) {
        const currentRow = []
        for (let columnIndex = 0; columnIndex < boardColuns; columnIndex++) {
            const currentButton = document.createElement('button')
            currentButton.classList.add('game-board__button')
            currentButton.dataset.row = rowIndex
            currentButton.dataset.colum = columnIndex
            currentButton.dataset.status = 'inactive'
            currentButton.dataset.stage = '0'
            const currentButtonStyle = cellStyles[rowIndex][columnIndex]
            currentButton.innerHTML = `
            <img src="img/stone buttons/active-effect.png" class="game-board__img game-board__img--active">
            <img src="img/stone buttons/stage-3-mod-${currentButtonStyle}.png" class="game-board__img game-board__img--stage3">    
            <img src="img/stone buttons/stage-2-mod-${currentButtonStyle}.png" class="game-board__img game-board__img--stage2">
            <img src="img/stone buttons/stage-1-mod-${currentButtonStyle}.png" class="game-board__img game-board__img--stage1">
            <img src="img/stone buttons/stage-0-mod-${currentButtonStyle}.png" class="game-board__img game-board__img--stage0">
            `
            currentButton.addEventListener('click', handleButtonClick)
            currentRow.push(currentButton)
        }       
        gameButtons.push(currentRow)
    }
}

const insertButtonsIntoDOM = () => {
    gameButtons.forEach(row => {
        row.forEach(cell => {
            gameTableContainer.appendChild(cell)
        })
    })
}

const initializeGame = () => {
    createGameButtons()
    insertButtonsIntoDOM()
}

initializeGame()
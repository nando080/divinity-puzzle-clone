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
                currentColumn.push([rowIndex, columnIndex - 1])
            }
            if (columnIndex < boardColuns - 1) {
                currentColumn.push([rowIndex, columnIndex + 1])
            }
            currentRow.push(currentColumn)
        }
        adresses.push(currentRow)
    }
    return adresses
}

const updateButtonStage = (button, operation) => {
    const currentStage = Number(button.dataset.stage)

    switch (operation) {
        case 'increase':
            button.dataset.stage = `${currentStage + 1}`
            break
        case 'decrease':
            if (currentStage > 0) {
                button.dataset.stage = `${currentStage - 1}`
            }
            break
    }
}

//TODO - fix

const updateAdjacentButtonsStage = (clickedButtonRow, clickedButtonColumn, clickedButtonStatus) => {
    const adjacentButtonsAdresses = getAdjacentAddresses()[clickedButtonRow][clickedButtonColumn]
    adjacentButtonsAdresses.forEach(adress => {
        const row = adress[0]
        const column = adress[1]
        const currentAdjacentButton = gameButtons[row][column]
        const currentButtonStatus = currentAdjacentButton.status
        console.log(currentButtonStatus)
        switch (clickedButtonStatus) {
            case 'active':
                updateButtonStage(currentAdjacentButton, 'increase')
                break
            case 'inactive':
                updateButtonStage(currentAdjacentButton, 'decrease')
                break
        }
    })
}

const updateClickedButtonStatus = clickedButton => {
    const currentStatus = clickedButton.dataset.status
    switch (currentStatus) {
        case 'active':
            clickedButton.dataset.status = 'inactive'
            break
        case 'inactive':
            clickedButton.dataset.status = 'active'
            break
    }
}

const handleButtonActivation = button => {
    const buttonImages = Array.from(button.children)
    const buttonStatus = button.dataset.status
    const activationImage = buttonImages.find(img => img.classList.contains('game-board__img--active'))
    switch (buttonStatus) {
        case 'active':
            activationImage.classList.add('is-active')
            break
        case 'inactive':
            activationImage.classList.remove('is-active')
            break
    }
}

const clearButtonStageInBoard = button => {
    const buttonImages = Array.from(button.children)
    buttonImages.forEach(img => {
        img.classList.remove('is-active')
    })
}

const changeButtonStageInBoard = button => {
    const buttonImages = Array.from(button.children)
    const buttonStage = Number(button.dataset.stage)
    const currentButtonStage = buttonStage >= 3 ? 3 : buttonStage
    let currentImage = null
    switch (currentButtonStage) {
        case 1:
            currentImage = buttonImages.find(img => img.classList.contains('game-board__img--stage1'))
            break
        case 2:
            currentImage = buttonImages.find(img => img.classList.contains('game-board__img--stage2'))
            break
        case 3:
            currentImage = buttonImages.find(img => img.classList.contains('game-board__img--stage3'))
            break
        default:
            clearButtonStageInBoard(button)
    }
    if (buttonStage > 0) {
        currentImage.classList.add('is-active')
    }
}

const updateBoard = () => {
    gameButtons.forEach(boardRow => {
        boardRow.forEach(button => {
            handleButtonActivation(button)
            changeButtonStageInBoard(button)
        })
    })
}

const handleButtonClick = event => {
    const clickedButton = event.target.parentElement
    const clickedButtonRow = Number(clickedButton.dataset.row)
    const clickedButtonColumn = Number(clickedButton.dataset.column)
    updateClickedButtonStatus(clickedButton)
    const currentButtonStatus = clickedButton.dataset.status
    switch (currentButtonStatus) {
        case 'active':
            updateButtonStage(clickedButton, 'increase')
            break
        case 'inactive':
            updateButtonStage(clickedButton, 'decrease')
            break
    }
    updateAdjacentButtonsStage(clickedButtonRow, clickedButtonColumn, currentButtonStatus)
    updateBoard()
}

const createGameButtons = () => {
    for (let rowIndex = 0; rowIndex < boardRows; rowIndex++) {
        const currentRow = []
        for (let columnIndex = 0; columnIndex < boardColuns; columnIndex++) {
            const currentButton = document.createElement('button')
            currentButton.classList.add('game-board__button')
            currentButton.dataset.row = rowIndex
            currentButton.dataset.column = columnIndex
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
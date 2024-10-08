const gameTableContainer = document.querySelector('.game-table__container')

const tableRows = 4
const tableColumns = 4

const cellStyles = [
    [2, 3, 2, 1],
    [4, 1, 2, 3],
    [1, 2, 3, 2],
    [3, 4, 1, 2],
]

const gameTableCells = []

const getAdjacentAddresses = () => {
    const adresses = []
    for (let rowIndex = 0; rowIndex < tableRows; rowIndex++) {
        const currentRow = []
        for (let columnIndex = 0; columnIndex < tableColumns; columnIndex++) {
            const currentColumn = []
            if (rowIndex > 0) {
                currentColumn.push([rowIndex - 1, columnIndex])
            }
            if (rowIndex < tableRows - 1) {
                currentColumn.push([rowIndex + 1, columnIndex])
            }
            if (columnIndex > 0) {
                currentColumn.push([rowIndex , columnIndex - 1])
            }
            if (columnIndex < tableColumns - 1) {
                currentColumn.push([rowIndex , columnIndex + 1])
            }
            currentRow.push(currentColumn)
        } 
        adresses.push(currentRow)
    }
    return adresses
}

//TODO - COMPLETAR

const updateAdjacentCells = currentCell => {
    const currentCellRow = currentCell.dataset.rowindex
    const currentCellColumn = currentCell.dataset.columnindex
    const currentCellStatus = currentCell.dataset.status
    const currentCellAdjacents = getAdjacentAddresses()[currentCellRow][currentCellColumn]
    currentCellAdjacents.forEach(adjacentCellAdress => {
        const targetCellStage = gameTableCells[adjacentCellAdress[0]][adjacentCellAdress[1]].dataset.currentState
        const targetCellNumericState = Number(targetCellStage)
        switch (currentCellStatus) {
            case 'inactive':
                if (targetCellNumericState > 0) {
                    gameTableCells[adjacentCellAdress[0]][adjacentCellAdress[1]].dataset.currentState = targetCellNumericState + 1
                }
                break
            case 'active':
                gameTableCells[adjacentCellAdress[0]][adjacentCellAdress[1]].dataset.currentState = targetCellNumericState + 1
                break
        }
    })
}

const updateClickedCellDataset = clickedCell => {
    const clickedCellDataset = clickedCell.dataset
    const currentStatus = clickedCellDataset.status
    const numberCurrentState = Number(clickedCellDataset.currentState)
    switch (currentStatus) {
        case 'inactive':
            clickedCellDataset.status = 'active'
            clickedCellDataset.currentState = numberCurrentState + 1
            break
        case 'active':
            clickedCellDataset.status = 'inactive'
            if (numberCurrentState > 0) {
                clickedCellDataset.currentState = numberCurrentState - 1
            }
            break
    }
    updateAdjacentCells(clickedCell)
}

const handleCellClick = event => {
    const clickedButton = event.target.parentElement
    const clickedButtonRow = Number(clickedButton.dataset.rowindex)
    const clickedButtonColumn = Number(clickedButton.dataset.columnindex)
    updateClickedCellDataset(clickedButton)
}

const createGameTableCells = () => {
    for (let rowIndex = 0; rowIndex < tableRows; rowIndex++) {
        const currentRow = []
        for (let columnIndex = 0; columnIndex < tableColumns; columnIndex++) {
            const currentCell = document.createElement('button')
            currentCell.classList.add('game-table__button')
            currentCell.dataset.rowindex = rowIndex
            currentCell.dataset.columnindex = columnIndex
            currentCell.dataset.status = 'inactive'
            currentCell.dataset.currentState = '0'
            const currentButtonStyle = cellStyles[rowIndex][columnIndex]
            currentCell.innerHTML = `
            <img src="img/stone buttons/active-effect.png" class="game-table__img game-table__img--active">
            <img src="img/stone buttons/stage-0-mod-${currentButtonStyle}.png" class="game-table__img game-table__img--stage0">
            <img src="img/stone buttons/stage-1-mod-${currentButtonStyle}.png" class="game-table__img game-table__img--stage1">
            <img src="img/stone buttons/stage-2-mod-${currentButtonStyle}.png" class="game-table__img game-table__img--stage2">
            <img src="img/stone buttons/stage-3-mod-${currentButtonStyle}.png" class="game-table__img game-table__img--stage3">    
            `
            currentCell.addEventListener('click', handleCellClick)
            currentRow.push(currentCell)
        }       
        gameTableCells.push(currentRow)
    }
}

const insertGameTableCellsIntoDOM = () => {
    gameTableCells.forEach(row => {
        row.forEach(cell => {
            gameTableContainer.appendChild(cell)
        })
    })
}

const initializeGame = () => {
    createGameTableCells()
    insertGameTableCellsIntoDOM()
}

initializeGame()
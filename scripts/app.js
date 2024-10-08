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

const gameTableData = []

const handleButtonActivation = clickedButton => {
    const cellImages = Array.from(clickedButton.children)
    const currentButtonStatus = clickedButton.dataset.status
    cellImages.forEach(image => {
        const isActivationImage = image.classList.contains('game-table__img--active')
        if (isActivationImage) {
            switch(currentButtonStatus) {
                case 'inactive':
                    image.classList.add('is-active')
                    clickedButton.dataset.status = 'active'
                    break
                case 'active':
                    image.classList.remove('is-active')
                    clickedButton.dataset.status = 'inactive'
                    break
            }
        }
    })
}

const createTableData = () => {
    for (let rowIndex = 0; rowIndex < tableRows; rowIndex++) {
        const currentData = []
        for (let columnIndex = 0; columnIndex < tableColumns; columnIndex++) {
            const currentDataItem = {
                rowIndex: rowIndex,
                columnIndex: columnIndex,
                currentStage: 0,
                isActive: false,
                adjacentItems: []
            }
            currentData.push(currentDataItem)
        }
        gameTableData.push(currentData)
    }
}

const setAdjacentItems = () => {
    gameTableData.forEach(dataRow => {
        dataRow.forEach(( {rowIndex, columnIndex, adjacentItems} ) => {
            if (rowIndex > 0) {
                adjacentItems.push({rowIndex: rowIndex - 1, columnIndex: columnIndex})
            }
            if (rowIndex < tableRows - 1) {
                adjacentItems.push({rowIndex: rowIndex + 1, columnIndex: columnIndex})
            }
            if (columnIndex > 0) {
                adjacentItems.push({rowIndex: rowIndex, columnIndex: columnIndex - 1})
            }
            if (columnIndex < tableColumns - 1) {
                adjacentItems.push({rowIndex: rowIndex, columnIndex: columnIndex + 1})
            }
        })
    })
}

const initializeTableData = () => {
    createTableData()
    setAdjacentItems()
}

const updateTableDataByAdjacent = (clickedButton, operation) => {
    clickedButton.adjacentItems.forEach(adjacentItem => {
        const {rowIndex, columnIndex} = adjacentItem
        switch(operation) {
            case 'increase':
                gameTableData[rowIndex][columnIndex].currentStage++
                break
                case 'decrease':
                    if (gameTableData[rowIndex][columnIndex].currentStage > 0) {
                        gameTableData[rowIndex][columnIndex].currentStage--
                    }
                break
        }
    })
}

const updateTableDataByClick = (rowIndex, columnIndex) => {
    const clickedData = gameTableData[rowIndex][columnIndex]
    let adjacentItemsOperation = 'increase'
    if (clickedData.isActive) {
        clickedData.isActive = false
        clickedData.currentStage--
        adjacentItemsOperation = 'decrease'
    } else {
        clickedData.isActive = true
        clickedData.currentStage++
    }
    updateTableDataByAdjacent(clickedData, adjacentItemsOperation)
}

//TODO - COMPLETAR

const updateGameTableCells = () => {
    gameTableData.forEach(row => {
        row.forEach(cell => {
            const { currentStage, rowIndex, columnIndex } = cell
            const cellImages = Array.from(gameTableCells[rowIndex][columnIndex].children)
            if (currentStage === 1) {
                cellImages.forEach(image => {
                    if (image.classList.contains('game-table__img--stage1')) {
                        image.classList.add('is-active')
                    }
                })
            }
        })
    })
}

const handleCellClick = event => {
    const clickedButton = event.target.parentElement
    const clickedButtonRow = Number(clickedButton.dataset.rowindex)
    const clickedButtonColumn = Number(clickedButton.dataset.columnindex)
    handleButtonActivation(clickedButton)
    updateTableDataByClick(clickedButtonRow, clickedButtonColumn)
    updateGameTableCells()
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
    initializeTableData()
    createGameTableCells()
    insertGameTableCellsIntoDOM()
}

initializeGame()
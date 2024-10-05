const tableRows = 4
const tableColumns = 4

const cellStyles = [
    [2,3,2,1],
    [4,1,2,3],
    [1,2,3,2],
    [3,4,1,2],
]

const tableCells = []

const tableCellsHTML = []

const getCellName = (rowIndex, columnIndex) => {
    switch (rowIndex) {
        case 0:
            return `A${columnIndex + 1}`
        case 1:
            return `B${columnIndex + 1}`
        case 2:
            return `C${columnIndex + 1}`
        case 3:
            return `D${columnIndex + 1}`
    }
}

const fillTableCells = () => {
    for (let rowIndex = 0; rowIndex < tableRows; rowIndex++) {
        const currentRow = []
        for (let columnIndex = 0; columnIndex < tableColumns; columnIndex++) {
            currentRow.push({
                name: getCellName(rowIndex, columnIndex),
                currentValue: 0,
                row: rowIndex,
                column: columnIndex,
                adjacentCellNames: [],
                getAdjacentCells () {
                    const row = this.row
                    const column = this.column
                    if (row > 0) {
                        this.adjacentCellNames.push(tableCells[row - 1][column].name)
                    }
                    if (row < tableRows - 1) {
                        this.adjacentCellNames.push(tableCells[row + 1][column].name)
                    }
                    if (column > 0) {
                        this.adjacentCellNames.push(tableCells[row][column - 1].name)
                    }
                    if (column < tableColumns - 1) {
                        this.adjacentCellNames.push(tableCells[row][column + 1].name)
                    }
                }
            })
        }
        tableCells.push(currentRow)
    }
}

const initializeTable = () => {
    fillTableCells()
    tableCells.forEach(row => {
        row.forEach(cell => {
            cell.getAdjacentCells()
        })
    })
}

//TODO - Completar função
const createCellsHTML = () => {
    const currentButton = document.createElement('div')
    /* 
    nome
    estágio
     */
    `
    <img src="img/stone buttons/stage-0-mod-01.png" class="game-table__img game-table__img--stage0">
    <img src="img/stone buttons/stage-1-mod-01.png" class="game-table__img game-table__img--stage1">
    <img src="img/stone buttons/stage-2-mod-01.png" class="game-table__img game-table__img--stage2">
    <img src="img/stone buttons/stage-3-mod-01.png" class="game-table__img game-table__img--stage3">
    `
}

initializeTable()

console.log(tableCells)
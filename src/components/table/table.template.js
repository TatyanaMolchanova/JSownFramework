const CODES = {
    A: 65,
    Z: 90
}

// function toCell(row, col) {
//     return `
//          <div class="cell" contenteditable data-col="${col}"
//          data-row="${row}"></div>
//     `
// }

function toCell(row) {
    return function(_, col) {
        return `
             <div 
                 class="cell" 
                 contenteditable 
                 data-col="${col}" 
                 data-type="cell"
                 data-id="${row}:${col}"
             ></div>
        `
    }
}

function toColumn(col, index) {
    // console.log(index)
    return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(index, content) {
    // eslint-disable-next-line max-len
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${index ? index : ''}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

// _ symbol is used for unused parameter
function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 25) {
    const colsCount = CODES.Z - CODES.A + 1 // Compute cols count
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')

    // const cols = new Array(colsCount)
    //     .fill('')
    //     .map((el, index) => {
    //         return String.fromCharCode(CODES.A + index)
    //     })
    //     .map(el => {
    //         return createCol(el)
    //     })
    //     .join('')

    // console.log(cols)

    rows.push(createRow(null, cols))

    // for (let i = 0; i < rowsCount; i++) {
    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            // .map(toCell)
            // .map((_, col) => toCell(row, col))
            .map(toCell(row))
            .join('')
        rows.push(createRow(row + 1, cells))
    }

    return rows.join('')
}

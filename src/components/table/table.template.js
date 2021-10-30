// import {defaultStyles} from '../../constants';
// import {toInlineStyles} from '../../core/utils';
// import {camelToDashCase, toInlineStyles} from '../../core/utils';

import {toInlineStyles} from '../../core/utils';
import {defaultStyles} from '../../constants';
import {parse} from '../../core/parse';

const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px'
}

// function toCell(row, col) {
//     return `
//          <div class="cell" contenteditable data-col="${col}"
//          data-row="${row}"></div>
//     `
// }

function toCell(state, row) {
    return function(_, col) {
        const id = `${row}:${col}`
        // console.log(state.colState[col])
        const width = getWidth(state.colState, col)
        const data = state.dataState[id]
        const styles = toInlineStyles({
            ...defaultStyles,
            ...state.stylesState[id]
        })
        // const styles = toInlineStyles(defaultStyles)
        // const styles = Object.keys(defaultStyles)
        //     .map(key => `${camelToDashCase(key)}: ${defaultStyles[key]}`)
        //     .join(';')
            // .map(key => `fontWeight`)
        // 'font-weight: bold; text-decoration: underline'
        return `
             <div 
                 class="cell" 
                 contenteditable 
                 data-col="${col}" 
                 data-type="cell"
                 data-id="${id}"
                 data-value="${data || ''}"
                 style="${styles}; width: ${width}"
             >${parse(data || '')}</div>
        `
    }
}

function toColumn({col, index, width}) {
    // console.log(index)
    return `
        <div 
            class="column" 
            data-type="resizable" 
            data-col="${index}" 
            style="width: ${width}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(index, content, state) {
    // eslint-disable-next-line max-len
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';
    const height = getHeight(state, index)
    return `
        <div class="row"
            data-type="resizable"
            data-row="${index}">
            <div class="row-info"
            style="height: ${height}"
        >
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

function withWidthFrom(state) {
    return function(col, index) {
        return {
            col, index, width: getWidth(state.colState, index)
        }
    }
}

export function createTable(rowsCount = 25, state = {}) {
    console.log('state', state)
    const colsCount = CODES.Z - CODES.A + 1 // Compute cols count
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        // .map(toColumn)
        .map(withWidthFrom(state))
        .map(toColumn)
        // .map((col, index) => {
        //     const width = getWidth(state.colState, index)
        //     return toColumn(col, index, width)
        // })
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

    rows.push(createRow(null, cols, {}))

    // for (let i = 0; i < rowsCount; i++) {
    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            // .map(toCell)
            // .map((_, col) => toCell(row, col))
            // .map(toCell(row))
            .map(toCell(state, row))
            .join('')
        rows.push(createRow(row + 1, cells, state.rowState))
    }

    return rows.join('')
}

import {range} from '../../core/utils';

export function shouldResize(event) {
    return event.target.dataset.resize
}

export function isCell(event) {
    return event.target.dataset.type === 'cell'
}

// export function matrix(target, current) {
export function matrix($target, $current) {
    const target = $target.id(true)
    const current = $current.id(true)
    const cols = range(current.col, target.col)
    const rows = range(current.row, target.row)
    // console.log('Cols', cols)
    // console.log('Rows', rows)

   return cols.reduce((acc, col) => {
        rows.forEach(row => acc.push(`${row}:${col}`))
        return acc
    }, [])
}

export function nextSelector(key, {col, row}) {
    const MIN_VAL = 0
    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row++
            break
        case 'Tab':
        case 'ArrowRight':
            col++
            break
        case 'ArrowLeft':
            // col--
            col = col - 1 < MIN_VAL ? MIN_VAL : col - 1
            break
        case 'ArrowUp':
            // row--
            row = row - 1 < MIN_VAL ? MIN_VAL : row - 1
            break
    }

    return `[data-id="${row}:${col}"]`
}

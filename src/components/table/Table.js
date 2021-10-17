import {ExcelComponent} from '../../core/ExcelComponent';
import {$} from '../../core/dom';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {isCell, matrix, nextSelector, shouldResize} from './table.functions';
import {TableSelection} from './TableSelection';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            // listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
        // this.unsubs = []
    }

    toHTML() {
      return createTable(20)
    }

    prepare() {
        // console.log('prepare')
        this.selection = new TableSelection()
    }

    init() {
        super.init()

        // this.selection = new TableSelection()
        // const $cell = this.$root.find('[data-id="0:0"')
        // this.selection.select($cell)
        // this.$emit('table:select', $cell)
        // this.selectCell($cell)
        this.selectCell(this.$root.find('[data-id="0:0"'))
        // console.log('init')
        // const unsub = this.emitter.subscribe('it is working', text => {
        // this.emitter.subscribe('it is working', text => {
        // this.$on('it is working', text => {
        this.$on('formula:input', text => {
            this.selection.current.text(text)
            console.log('Table from Formula', text)
        })
        // this.unsubs.push(unsub)
        this.$on('formula:done', () => {
            this.selection.current.focus()
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
    }

    // onClick() {
    //     console.log('click')
    // }

    onMousedown(event) {
        // console.log('mousedown', event.target.getAttribute('data-resize'))
        // console.log('mousedown', event.target.dataset)
        // if (event.target.dataset.resize) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        // } else if (event.target.dataset.type === 'cell') {
        } else if (isCell(event)) {
            // console.log(event)
            const $target = $(event.target)
            // console.log(event.target)
            if (event.shiftKey) {
                // group
                // console.log('target cell', $target.data.id)
                // console.log('target cell', $target.id().split(':'))
                // console.log('target cell', $target.id())
                // console.log('target cell', $target.id(true))
                // console.log('current cell', this.selection.current.data.id)
                // console.log('current cell', this.selection.current.id())
                // console.log('current cell', this.selection.current.id(true))
                // const target = $target.id(true)
                // const current = this.selection.current.id(true)

                // const $cells = matrix(target, current)
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
                // const cols = range(current.col, target.col)
                // const rows = range(current.row, target.row)
                // // console.log('Cols', cols)
                // // console.log('Rows', rows)
                //
                // const ids = cols.reduce((acc, col) => {
                //     rows.forEach(row => acc.push(`${row}:${col}`))
                //     return acc
                // }, [])
                // console.log('ids', ids)
                // eslint-disable-next-line max-len
                // const $cells = ids.map(id => this.$root.find(`[data-id="${id}"]`))
                // this.selection.selectGroup($cells)
            } else {
                // single selection of cell
                this.selection.select($target)
            }
        }
    }

    // onMousemove() {
    //     console.log('mousemove')
    // }
    //
    // onMouseup() {
    //     console.log('mouseup')
    // }

    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'ArrowDown',
            'ArrowUp']

        const {key} = event
        // if (keys.includes(event.key)) {
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            console.log(key)
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id))
            // this.selection.select($next)
            // this.$emit('table:select', $next)
            this.selectCell($next)
        }
        // console.log(event.key)
    }
    //
    // destroy() {
    //     super.destroy();
    //     this.unsubs.forEach(unsub => unsub())
    // }

    onInput(event) {
        this.$emit('table:input', $(event.target))
    }
}



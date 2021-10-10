import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {shouldResize} from './table.functions';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            // listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
            listeners: ['mousedown']
        });
    }

    toHTML() {
      return createTable(20)
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
        }
    }

    // onMousemove() {
    //     console.log('mousemove')
    // }
    //
    // onMouseup() {
    //     console.log('mouseup')
    // }
}

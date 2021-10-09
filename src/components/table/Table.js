import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {$} from '../../core/dom';

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
        if (event.target.dataset.resize) {
            console.log('start resizing ', event.target.dataset.resize)
            const $resizer = $(event.target)
            // eslint-disable-next-line max-len
            // const $parent = $resize.$el.parentNode // bad practice - js is bind to view, to parent, to existing structure
            // eslint-disable-next-line max-len
            // const $parent = $resizer.$el.closest('column') // better but bad - it's bind to class in html
            // const $parent = $resizer.$el.closest('[data-type="resizable"]')
            const $parent = $resizer.closest('[data-type="resizable"]')
            // debugger
            const coords = $parent.getCoords()
            const type = $resizer.data.resize
            console.log(type)

            console.log('$parent', $parent.data)
            console.log('$parent', $parent.data.col)
            console.log('$parent.getCoords()', $parent.getCoords())

            // eslint-disable-next-line max-len
            const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`) // for optimization, this is closure, this variable is freezed in onmousemove

            document.onmousemove = e => {
                if (type === 'col') {
                    console.log('onmousemove')
                    const delta = e.pageX - coords.right
                    // const delta = e.pageX - (coords.left + coords.right)
                    // console.log(delta)
                    // console.log(e.pageX, e.pageY)
                    const value = coords.width + delta
                    // $parent.$el.style.width = value + 'px'
                    // eslint-disable-next-line max-len
                    // document.querySelectorAll(`[data-col="${$parent.data.col}"]`) // document is very unoptimized perfomance
                    //     .forEach(el => el.style.width = value + 'px')
                    $parent.css({
                        width: value + 'px'
                    })
                    cells.forEach(el => el.style.width = value + 'px')
                } else {
                    const delta = e.pageY - coords.bottom
                    console.log(delta)
                    const value = coords.height + delta
                    // $parent.$el.style.height = value + 'px'
                    $parent.css({
                        height: value + 'px'
                    })
                }
            }

            document.onmouseup = () => {
                document.onmousemove = null
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
}

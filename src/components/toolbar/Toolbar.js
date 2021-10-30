// import {ExcelComponent} from '../../core/ExcelComponent';
import {createToolbar} from './toolbar.template';
import {$} from '../../core/dom';
import {ExcelStateComponent} from '../../core/ExcelStateComponent';
import {defaultStyles} from '../../constants';

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar'

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options
        });
    }

    prepare() {
        // const initialState = {
        //     textAlign: 'left',
        //     fontWeight: 'normal',
        //     textDecoration: 'none',
        //     fontStyle: 'normal'
        // }
        // this.initState(initialState)
        this.initState(defaultStyles)
    }

    get template() {
        return createToolbar(this.state)
    }

    toHTML() {
        return this.template
        // return createToolbar()
        // return `
        //     <div class="button">
        //         <span class="material-icons">format_align_left</span>
        //     </div>
        //
        //     <div class="button">
        //         <span class="material-icons">format_align_center</span>
        //     </div>
        //
        //     <div class="button">
        //         <span class="material-icons">format_align_right</span>
        //     </div>
        //
        //     <div class="button">
        //         <span class="material-icons">format_bold</span>
        //     </div>
        //
        //     <div class="button">
        //         <span class="material-icons">format_italic</span>
        //     </div>
        //
        //     <div class="button">
        //         <span class="material-icons">format_underlined</span>
        //     </div>
        // `
    }

    storeChanged(changes) {
        this.setState(changes.currentStyles)
        console.log('changes', changes)
    }

    onClick(event) {
        // console.log(event.target)
        const $target = $(event.target)
        // $target.addClass('active')
        if ($target.data.type === 'button') {
            // console.log('$target.text', $target.text())
            // console.log('$target.data.value', $target.data.value)
            const value = JSON.parse($target.data.value)
            this.$emit('toolbar:applyStyle', value)
            // const key = Object.keys(value)[0]
            // // console.log('key', key)
            // this.setState({[key]: value[key]})
            // // console.log('this.state', this.state)
        }
    }
}

import {ExcelComponent} from '../../core/ExcelComponent';
import {$} from '../../core/dom';

export class Formula extends ExcelComponent {
    // statis === we have access to this property without creating
    // the instance of this class
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            // listeners: ['input', 'click'],
            listeners: ['input', 'keydown'],
            ...options
        });
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div id="formula" class="input" 
            contenteditable spellcheck="false"></div>
        `
    }

    init() {
        // this.$root.on('input', function() {})
        super.init()

        this.$formula = this.$root.find('#formula')

        this.$on('table:select', $cell => {
            // this.$root.find('input')
            this.$formula.text($cell.text())
        })

        this.$on('table:input', $cell => {
            this.$formula.text($cell.text())
        })
    }

    onInput(event) {
        // console.log('Formula: onInput', event)
        // console.log('Formula: onInput', event.target.textContent.trim())
        // console.log(this.$root)
        // const text = $(event.target.textContent.trim())
        // this.$emit('it is working', text)
        // this.$emit('formula:input', text)
        this.$emit('formula:input', $(event.target).text())
        // this.emitter.emit('it is working', text)
    }

    // onClick(event) {
    //     console.log('onclick')
    // }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']
        // if (event.key === 'Enter') {
        if (keys.includes(event.key)) {
            event.preventDefault()

            this.$emit('formula:done')
        }
    }
}

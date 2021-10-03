import {ExcelComponent} from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
    // statis === we have access to this property without creating
    // the instance of this class
    static className = 'excel__formula'

    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'click']
        });
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false"></div>
        `
    }

    // init() {
    //     // this.$root.on('input', function() {})
    // }

    onInput(event) {
        // console.log('Formula: onInput', event)
        console.log('Formula: onInput', event.target.textContent.trim())
        console.log(this.$root)
    }

    onClick(event) {
        console.log('onclick')
    }
}

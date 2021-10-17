import {ExcelComponent} from '../../core/ExcelComponent';

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            ...options
        });
    }

    toHTML() {
        return `
         <input type="text" class="input" value="Новая таблица" />

            <div>

                <div class="button">
                    <span class="material-icons">logout</span>
                </div>

                <div class="button">
                    <span class="material-icons">delete</span>
                </div>

            </div>
        `
    }
}

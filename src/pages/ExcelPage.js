import {Page} from '../core/Page';
import {createStore} from '../core/store/createStore';
import {rootReducer} from '../redux/rootReducer';
import {normalizeInitialState} from '../redux/initialState';
import {debounce, storage} from '../core/utils';
import {Excel} from '../components/excel/Excel';
import {Header} from '../components/header/Header';
import {Toolbar} from '../components/toolbar/Toolbar';
import {Formula} from '../components/formula/Formula';
import {Table} from '../components/table/Table';

function storageName(param) {
    return 'excel:' + param
}

export class ExcelPage extends Page {
    getRoot() {
        const params = this.params ? this.params : Date.now().toString()
        // const params = this.params
        // console.log('this.params', this.params)
        const state = storage(storageName(params))
        const initialState = normalizeInitialState(state)
        const store = createStore(rootReducer, initialState)
        // const store = createStore(rootReducer, normalizeInitialState(state))
        // const store = createStore(rootReducer, initialState)

        const stateListener = debounce(state => {
            console.log('App State', state)
            storage(storageName(params), state)
            // storage('excel-state', state)
        }, 300)

        store.subscribe(stateListener)

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        })

        return this.excel.getRoot()
    }

    afterRender() {
        // console.log('afterRender')
        this.excel.init()
    }

    destroy() {
        this.excel.destroy()
    }
}

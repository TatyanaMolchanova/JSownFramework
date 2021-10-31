import {Page} from '../core/page/Page';
import {createStore} from '../core/store/createStore';
import {rootReducer} from '../redux/rootReducer';
import {normalizeInitialState} from '../redux/initialState';
// import {storage} from '../core/utils';
import {Excel} from '../components/excel/Excel';
import {Header} from '../components/header/Header';
import {Toolbar} from '../components/toolbar/Toolbar';
import {Formula} from '../components/formula/Formula';
import {Table} from '../components/table/Table';
import {StateProcessor} from '../core/page/StateProcessor';
import {LocalStorageClient} from './LocalStorageClient';

// function storageName(param) {
//     return 'excel:' + param
// }

// class StateProcessor {
//     constructor(client, delay = 300) {
//         this.client = client
//         this.listen = debounce(this.listen.bind(this), delay)
//     }
//     listen(state) {
//         this.client.save(state)
//     }
//     get() {
//         return this.client.get()
//     }
// }

// class LocalStorageClient {
//     constructor(name) {
//         this.name = storage(name)
//     }
//
//     save(state) {
//         storage(this.name, state)
//         return Promise.resolve()
//     }
//
//     get() {
//         // return Promise.resolve(storage(this.name))
//         return new Promise(resolve => {
//             const state = storage(this.name)
//
//             setTimeout(() => {
//                 resolve(state)
//             }, 2500)
//         })
//     }
// }

export class ExcelPage extends Page {
    constructor(param) {
        super(param);

        this.storeSub = null
        this.processor = new StateProcessor(
            new LocalStorageClient(this.params)
        )
    }
    async getRoot() {
        // const params = this.params ? this.params : Date.now().toString()
        // const params = this.params
        // console.log('this.params', this.params)
        // const state = storage(storageName(params))
        const state = await this.processor.get()
        // const state = {}
        const initialState = normalizeInitialState(state)
        const store = createStore(rootReducer, initialState)
        // const store = createStore(rootReducer, normalizeInitialState(state))
        // const store = createStore(rootReducer, initialState)

        // const stateListener = debounce(state => {
        //     console.log('App State', state)
        //     storage(storageName(params), state)
        //     // storage('excel-state', state)
        // }, 300)

        this.storeSub = store.subscribe(this.processor.listen)
        // this.storeSub = store.subscribe(stateListener)

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
        this.storeSub.unsubscribe()
    }
}

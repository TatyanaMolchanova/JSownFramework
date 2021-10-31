// import './module'
// import {Excel} from './components/excel/Excel';
import './scss/index.scss'
import {Router} from './core/routes/router';
import {DashboardPage} from './pages/DashboardPage';
import {ExcelPage} from './pages/ExcelPage';
// import {Header} from './components/header/Header';
// import {Toolbar} from './components/toolbar/Toolbar';
// import {Formula} from './components/formula/Formula';
// import {Table} from './components/table/Table';
// import {createStore} from './core/createStore';
// import {rootReducer} from './redux/rootReducer';
// import {storage, debounce} from './core/utils';
// import {initialState} from './redux/initialState';

new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage
})

// // const store = createStore(rootReducer, {
// //     colState: {} // {'3': 374, '4': 200}
// // })
// const store = createStore(rootReducer, initialState)
//
// const stateListener = debounce(state => {
//     console.log('App State', state)
//     storage('excel-state', state)
// }, 300)
//
// // const stateListener = debounce(state => {
// //     console.log('App State', state)
// //     // localStorage.setItem('excel-state', JSON.stringify(state))
// //     storage('excel-state', state)
// // }, 300)
//
// store.subscribe(stateListener)
//
// // store.subscribe(state => {
// //     console.log('App State', state)
// //     // localStorage.setItem('excel-state', JSON.stringify(state))
// //     storage('excel-state', state)
// // })
//
// // console.log('Working')
// const excel = new Excel('#app', {
//     components: [Header, Toolbar, Formula, Table],
//     store
// })
//
// // console.log('Excel', excel)
// excel.render()
//

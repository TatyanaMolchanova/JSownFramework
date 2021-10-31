// Pure function - it should not have any side effects
// Reducer just have to change state - and nothing anything do
import {
    APPLY_STYLE,
    CHANGE_STYLES,
    CHANGE_TEXT,
    CHANGE_TITLE,
    TABLE_RESIZE, UPDATE_DATE
} from './types';
// import {toInlineStyles} from '../core/utils';

export function rootReducer(state, action) {
    // let prevState
    let field
    let val
    // console.log('action', action)
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' : 'rowState'
            // prevState = state[field] || {}
            // prevState[action.data.id] = action.data.value
            // return {...state, colState: {}} // id, value
            // return {...state, colState: action.data} // id, value
            // return {...state, [field]: prevState} // id, value
            return {...state, [field]: value(state, field, action)} // id, value
        case CHANGE_TEXT:
            field = 'dataState'
            // prevState = state['dataState'] || {}
            // prevState = state[field] || {}
            // prevState[action.data.id] = action.data.value
            // return {...state,
            //     currentText: action.data.value,
            //     dataState: prevState}
            // return {...state,
            //     currentText: action.data.value,
            //     [field]: prevState}
            return {
                ...state,
                currentText: action.data.value,
                [field]: value(state, field, action)}
        case CHANGE_STYLES:
            return {...state, currentStyles: action.data}
        case APPLY_STYLE:
            field = 'stylesState'
            val = state[field] || {}
            // debugger
            action.data.ids.forEach(id => {
                val[id] = {...val[id], ...action.data.value}
                // val[id] = toInlineStyles(action.data.value)
            })
            return {
                ...state,
                [field]: val,
                currentStyles: {...state.currentStyles, ...action.data.value}
            }
        case CHANGE_TITLE:
            return {...state, title: action.data}
        case UPDATE_DATE:
            return {...state, openedDate: new Date().toJSON()}
        default: return state
    }
}

function value(state, field, action) {
    const val = state[field] || {}
    val[action.data.id] = action.data.value
    return val
}

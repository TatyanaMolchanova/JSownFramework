export function createStore(rootReducer, initialState = {}) {
    // Здесь только приватные свойства и методы
    // let state = {}
    // let state = initialState
    let state = rootReducer({...initialState}, {type: '__INIT__'})
    // listeners === subscribers can be named
    let listeners = []

    // Здесь публичные методы:
    return {
        subscribe(fn) {
            listeners.push(fn)
            // return () => {
            //     listeners = listeners.filter(l => l !== fn)
            // }
            return {
                unsubscribe() {
                    listeners = listeners.filter(l => l !== fn)
                }
            }
        },
        dispatch(action) {
            state = rootReducer(state, action)
            listeners.forEach(listener => listener(state))
        },
        getState() {
            return JSON.parse(JSON.stringify(state))
        }
    }
}

export class Emitter {
// class Emitter {
    constructor() {
        this.listeners = {}
    }

    // dispatch, fire, trigger
    // Уведомляем слушателей, если они есть, о произошедшем событии
    // 'focus', 'make-it-work', 'formula:done'
    // table.emit('table:select', {a: 1})
    // event - произвольное название события, имя мы задаем сами
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach(listener => {
            listener(...args)
        })
        return true
    }

    // 0n, listen // Подписываемся на уведомление или добавляем нового слушателя
    // formula.subscribe('table:select', () => {})
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => {
            this.listeners[event] =
                this.listeners[event].filter(listener => listener !== fn)
        }
    }
}

const emitter = new Emitter()

// const unsub = emitter.subscribe('tatyana', data => console.log('Sub', data))
emitter.subscribe('tatyana', data => console.log('Sub', data))

// emitter.emit('tatyana', 42)
// emitter.emit('tatyana', 42)
// emitter.emit('tatyana', 42)
// emitter.emit('123123', 42)

// setTimeout(() => {
//     emitter.emit('tatyana', 'After 2 seconds')
// }, 2000)
//
// setTimeout(() => {
//     unsub()
// }, 4000)
//
//
// setTimeout(() => {
//     emitter.emit('tatyana', 'After 4 seconds')
// }, 4000)

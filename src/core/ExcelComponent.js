import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.subscribe = options.subscribe || []
        this.store = options.store
        this.unsubscribers = []
        // this.storeSub = null

        // console.log('options', options)

        this.prepare()
    }

    // Настраиваем наш компонент до инит
    prepare() {

    }

    // returns a template of component
    toHTML() {
        return ''
    }

    // Уведомляем слушателей про событие event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    // Подписываемся на событие event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }

    // Сюда приходят изменения по тем полям, на которые мы подписались
    storeChanged() {}

    isWatching(key) {
        return this.subscribe.includes(key)
    }

    // Подписку на стор мы сделаем на уровне приложения
    // а не отдельных компонентов
    // $subscribe(fn) {
    //     this.storeSub = this.store.subscribe(fn)
    //     // sub.unsubscribe()
    // }

    // Инициализируем компонент, добавляем DOM слушателей
    init() {
        this.initDOMListeners()
    }

    // Удаляем компонент, Чистим слушателей
    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
        // this.storeSub.unsubscribe()
    }
}

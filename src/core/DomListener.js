import {capitalize} from './utils';

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error(`No $root provided for DomListener`)
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners() {
        // console.log(this.listeners, this.$root)
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            // const method = capitalize(listener)
            // console.log(method)
            // console.log(this[]) - allow get instance of Formula class
            // console.log(listener, this.$root)

            // this is the same as addEventListener
            const name = this.name || ''
            if (!this[method]) {
                throw new Error(`Method ${method} is not implemented in ${name} 
                Component`)
            }
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
            // this.$root.on(listener, this[method].bind(this)) // this error
            // .bind() creates a new function but we deleted an old one
            // this.$root.on(listener, this['onInput'])
        })
    }

    removeDOMListeners() {
        console.log('removeDOMListeners')
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.off(listener, this[method])
        })
    }

    // DOM solution
    // removeDOMListeners() {
    //     this.listeners.forEach(listener => {
    //         this.$root.off(listener)
    //     })
    // }
}

function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}


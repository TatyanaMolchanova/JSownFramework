import {$} from '../../core/dom';
import {Emitter} from '../../core/Emitter';
import {StoreSubscriber} from '../../core/StoreSubscriber';
import {updateDate} from '../../redux/actions';
import {preventDefault} from '../../core/utils';

export class Excel {
    // constructor(selector, options) {
    constructor(options) {
        // this.$el = $(selector)
        // this.$el = document.querySelector(selector)
        this.components = options.components || []
        this.store = options.store
        this.emitter = new Emitter()
        this.subscriber = new StoreSubscriber(this.store)
    }

    getRoot() {
        const $root = $.create('div', 'excel')
        const componentOptions = {
            emitter: this.emitter,
            store: this.store
        }
        // const $root = document.createElement('div')
        // $root.classList.add('excel')
        // $root.textContent = 'test'
        // $root.style.fontSize = '5rem'
        // console.log(this.components)
        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            // const $el = document.createElement('div')
            // $el.classList.add(Component.className)
            const component = new Component($el, componentOptions)
            // debugger
            // !!!DEBUG1 start
            // if (component.name) {
            //     window['c' + component.name] = component
            // }
            // !!! DEBUG end
            $el.html(component.toHTML())
            // debugger
            // $el.innerHTML = component.toHTML()
            // $root.insertAdjacentHTML('beforeend', component.toHTML())
            $root.append($el)
            return component
        })
        // this.components.forEach(Component => {
        //     const $el = $.create('div', Component.className)
        //     // const $el = document.createElement('div')
        //     // $el.classList.add(Component.className)
        //     const component = new Component($el)
        //     // debugger
        //     $el.html(component.toHTML())
        //     // debugger
        //     // $el.innerHTML = component.toHTML()
        //     // $root.insertAdjacentHTML('beforeend', component.toHTML())
        //     $root.append($el)
        // })
        return $root
    }

    // render() {
    //     // console.log('this.$el', this.$el)
    //     // // this.$el.insertAdjacentHTML('afterbegin', `<h1>text</h1>`)
    //     // const node = document.createElement('h1')
    //     // node.textContent = 'TEST'
    //     // this.$el.append(node)
    //     // this.$el.append(this.getRoot())
    //     this.subscriber.subscribeComponents(this.components)
    //     // this.$el.append(this.getRoot().$el)
    //     // console.log(this.components)
    //     this.components.forEach(component => component.init())
    // }

    init() {
        console.log('process.env.NODE_ENV', process.env.NODE_ENV)
        if (process.env.NODE_ENV === 'production') {
            document.addEventListener('contextmenu', preventDefault)
        }
        this.store.dispatch(updateDate())
        this.subscriber.subscribeComponents(this.components)
        this.components.forEach(component => component.init())
    }

    destroy() {
        this.subscriber.unsubscribeFromStore()
        this.components.forEach(component => component.destroy())
        document.removeEventListener('contextmenu', preventDefault)
    }
}


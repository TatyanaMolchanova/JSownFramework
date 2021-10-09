import {$} from '../../core/dom';

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        // this.$el = document.querySelector(selector)
        this.components = options.components || []
    }

    getRoot() {
        const $root = $.create('div', 'excel')
        // const $root = document.createElement('div')
        // $root.classList.add('excel')
        // $root.textContent = 'test'
        // $root.style.fontSize = '5rem'
        // console.log(this.components)
        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            // const $el = document.createElement('div')
            // $el.classList.add(Component.className)
            const component = new Component($el)
            // debugger
            // !!!DEBUG start
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

    render() {
        // console.log('this.$el', this.$el)
        // // this.$el.insertAdjacentHTML('afterbegin', `<h1>text</h1>`)
        // const node = document.createElement('h1')
        // node.textContent = 'TEST'
        // this.$el.append(node)
        this.$el.append(this.getRoot())
        // this.$el.append(this.getRoot().$el)
        // console.log(this.components)
        this.components.forEach(component => component.init())
    }
}

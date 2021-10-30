class Dom {
    constructor(selector) {
        // #app
        // this.$$listeners = {}
        this.$el = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    text(text) {
        // if (typeof text === 'string') {
        if (typeof text !== 'undefined') {
            this.$el.textContent = text
            return this
        }
        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
    }

    clear() {
        this.html('')
        return this
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }

    // this DOM solution allows just 1 listener
    // off(eventType) {
    //     this.$el.removeEventListener(eventType, this.$$listeners[eventType])
    // }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    // Element
    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }
        // console.log(node)
        if (Element.prototype.append) {
            this.$el.append(node)
            // this.$el.append(node.$el)
        } else {
            this.$el.appendChild(node)
            // this.$el.appendChild(node.$el)
        }
        // console.log(node)
        // console.log(node.$el)
        // this.$el.append(node.$el)
        return this
    }

    // dataset() {
    //     return this.$el.dataset
    // }

    get data() {
        return this.$el.dataset
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    css(styles = {}) {
        // for (const key in styles) {
        //     if (styles.hasOwnProperty(key)) {
        //         console.log(key)
        //         console.log(styles[key])
        //     }
        // }
        Object
            .keys(styles)
            .forEach(key => {
                this.$el.style[key] = styles[key]
            })
       // this.$el.style.
    }

    getStyles(styles = []) {
        return styles.reduce((res, s) => {
            res[s] = this.$el.style[s]
            return res
        }, {})
    }

    id(parse) {
        if (parse) {
            const parsed = this.id().split(':')
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id
    }

    focus() {
        this.$el.focus()
        return this
    }

    attr(name, value) {
        // debugger
        if (value) {
            this.$el.setAttribute(name, value)
            return this
        }
        return this.$el.getAttribute(name)
    }

    addClass(className) {
        this.$el.classList.add(className)
        return this
    }

    removeClass(className) {
        this.$el.classList.remove(className)
        return this
    }
}

$('div').html('<h1>Test</h1>').clear()

// event.target
export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}

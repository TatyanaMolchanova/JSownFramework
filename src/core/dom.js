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

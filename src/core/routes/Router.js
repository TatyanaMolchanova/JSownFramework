import {$} from '../dom';
import {ActiveRoute} from './ActiveRoute';
import {Loader} from '../../components/Loader';
// import {ActiveRoute} from './ActiveRoute';

export class Router {
   constructor(selector, routes) {
       if (!selector) {
           throw new Error('Selector is not provided in Router')
       }

       this.$placeholder = $(selector)
       this.routes = routes
       this.loader = new Loader()

       this.page = null

       this.changePageHandler = this.changePageHandler.bind(this)
       this.init()
   }

   init() {
       window.addEventListener('hashchange', this.changePageHandler)
       this.changePageHandler()
   }

    // changePageHandler(event) {
    async changePageHandler() {
       if (this.page) {
           this.page.destroy()
       }

        this.$placeholder.clear().append(this.loader)
        const Page = ActiveRoute.path.includes('excel')
            ? this.routes.excel
            : this.routes.dashboard
        // console.log('event', event)
        // console.log(ActiveRoute.path)
        // console.log('param', ActiveRoute.param)
        // this.$placeholder.html('<h1>' + ActiveRoute.path + '</h1>')
        // const Page = this.routes.excel
        // // const Page = this.routes.dashboard
        this.page = new Page(ActiveRoute.param)
        // this.$placeholder.html('')
        // this.$placeholder.append(this.page.getRoot())
        const root = await this.page.getRoot()
        this.$placeholder.clear().append(root)

        this.page.afterRender()
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler)
    }
}

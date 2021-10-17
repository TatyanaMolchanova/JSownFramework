export class TableSelection {
    static className = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    // $el instanceof DOM === true
    select($el) {
        // this.group.forEach($c => $c.removeClass('selected'))
        // this.group = []
        this.clear()
        this.current = $el
        // $el.addClass(TableSelection.className)
        $el.focus().addClass(TableSelection.className)
        this.group.push($el)
    }

    clear() {
        this.group.forEach($el => $el.removeClass(TableSelection.className))
        this.group = []
    }

    selectGroup($group = []) {
        this.clear()

        this.group = $group
        this.group.forEach($el => $el.addClass(TableSelection.className))
    }
}

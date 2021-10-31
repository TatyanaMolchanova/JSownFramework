import {storage} from '../core/utils';

function toHTML(key) {
    const model = storage(key)
    const id = key.split(':')[1]
    return `
        <li class="db__record">
            <a href="#excel/${id}">${model.title}</a>
            <strong>
                ${new Date(model.openedDate).toLocaleDateString()}
                ${new Date(model.openedDate).toLocaleTimeString()}
            </strong>
        </li>
    `
}

// excel:12345
// excel:123454332
function getAllKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        console.log('key', key)
        if (!key.includes('excel')) {
            continue
        }
        keys.push(key)
    }
    return keys
}

export function createRecordsTable() {
    const keys = getAllKeys()
    console.log('keys 2', keys)

    if (!keys.length) {
        return `<p>You didn't create any record in Table</p>`
    }

    return `
        <div class="db__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
        </div>

        <ul class="db__list">
            ${keys.map(toHTML).join('')}
        </ul>
    `
}

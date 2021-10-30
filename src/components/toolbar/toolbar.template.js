function toButton(button) {
    // const json = JSON.stringify(button.value)
    // console.log('json', json)
    const meta = `
        data-type="button"
        data-value='${JSON.stringify(button.value)}'
        `
    return `
        <div 
            class="button ${button.active ? 'active' : ''}"
            ${meta}
        >
            <i 
                class="material-icons"
                ${meta}
            >${button.icon}</i>
        </div>
    `
}

// export function createToolbar(state) {
export function createToolbar(s) {
    console.log('render')
    const buttons = [
        {
            icon: 'format_align_left',
            // active: false,
            active: s['textAlign'] === 'left',
            value: {textAlign: 'left'}
        },
        {
            icon: 'format_align_center',
            // active: false,
            active: s['textAlign'] === 'center',
            value: {textAlign: 'center'}
        },
        {
            icon: 'format_align_right',
            // active: false,
            active: s['textAlign'] === 'right',
            value: {textAlign: 'right'}
        },
        {
            icon: 'format_bold',
            // active: false,
            // active: state['fontWeight'] === 'bold',
            active: s['fontWeight'] === 'bold',
            // value: {fontWeight: 'bold'}
            value: {fontWeight: s['fontWeight'] === 'bold'
                    ? 'normal'
                    : 'bold'}
        },
        {
            icon: 'format_italic',
            // active: false,
            active: s['fontStyle'] === 'italic',
            // value: {fontStyle: 'italic'}
            value: {fontStyle: s['fontStyle'] === 'italic'
                    ? 'normal'
                    : 'italic'}
        },
        {
            icon: 'format_underlined',
            // active: false,
            active: s['textDecoration'] === 'underline',
            // value: {textDecoration: 'underline'}
            value: {textDecoration: s['textDecoration'] === 'underline'
                    ? 'none'
                    : 'underline'}
        },
    ]
    return buttons.map(toButton).join('')
    // return `
    //         <div class="button">
    //             <span class="material-icons">format_align_left</span>
    //         </div>
    //
    //         <div class="button">
    //             <span class="material-icons">format_align_center</span>
    //         </div>
    //
    //         <div class="button">
    //             <span class="material-icons">format_align_right</span>
    //         </div>
    //
    //         <div class="button">
    //             <span class="material-icons">format_bold</span>
    //         </div>
    //
    //         <div class="button">
    //             <span class="material-icons">format_italic</span>
    //         </div>
    //
    //         <div class="button">
    //             <span class="material-icons">format_underlined</span>
    //         </div>
    //     `
}

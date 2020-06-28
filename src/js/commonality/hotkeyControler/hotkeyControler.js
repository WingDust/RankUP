    import hotkeys from 'hotkeys-js'
    import {
        remote
    } from 'electron'
    // console.log(remote);
    const menu = new remote.Menu()
    // console.log(menu);
    menu.append(new remote.MenuItem({
        label: 'Print',
        acclerator: 'Ctrl+Shift+p',
        click: () => {
            console.log('sdsd');
        }
    }))

    hotkeys('ctrl+shift+h', function(event, handler) {
        console.log('1');
        console.log(this);
    })
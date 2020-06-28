let createWindow = () => {

    const path = require('path');
    const electron = require('electron');
    let BrowserWindow = electron.remote.BrowserWindow;

    let windows = new BrowserWindow({
        width: 600,
        height: 400
    })
    windows.loadURL('...\\..\\public\\WindowManger.html')
    windows.on('close', function() {
        windows = null
    })
}
export default {
    createWindow
}
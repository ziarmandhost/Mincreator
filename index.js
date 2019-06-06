const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { Minifier } = require('./minifier');
const fs = require('fs');

let win = null;

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

function createWindow () {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: './app/public/icon.png',
        resizable: false
    });

    win.setMenu(null);

    // win.webContents.openDevTools();
    win.loadFile('./app/build/index.html');

    ipcMain.on('minify-file', (event, arg) => {
        new Minifier(arg).minifyByType(data => {
            if (data.error)  event.sender.send('minified', {error : true, message : data.message});
            else {
                event.sender.send('minified', data);
            }
        });
    });

    ipcMain.on('save-file', (event, arg) => {
        dialog.showSaveDialog({defaultPath : `${arg.title}.min.${arg.ext}`, filters : [{name: arg.mimeType, extensions: [arg.ext]}]}, fileName => {
            if (fileName === undefined) return;

            fs.writeFile(fileName, arg.src, err => {
                event.sender.send('saved', {error : !err});
            });
        });
    });

    win.on('closed', () => win = null);
}
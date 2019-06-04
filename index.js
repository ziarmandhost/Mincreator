const { app, BrowserWindow, ipcMain } = require('electron');
const { Minifier } = require('./minifiers/main');

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

    win.webContents.openDevTools();
    win.loadFile('./app/build/index.html');

    ipcMain.on('minify-file', (event, arg) => {
        let minifier = new Minifier(arg);

        console.log(minifier.minify());

        // event.reply('minified', 'pong')
    });

    win.on('closed', () => win = null);
}
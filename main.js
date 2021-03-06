const { app, BrowserWindow, nativeTheme } = require('electron');

if (require('electron-squirrel-startup')) return app.quit();

const url = require('url');
const path = require('path');

// const shell = require("electron").shell;
var child = require('child_process').execFile;
var executablePath = 'C:\\Program Files\\classifai\\classifai.exe';

let mainWindow;

const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })

  // Create mainWindow, load the rest of the app, etc...
  app.on('ready', createWindow);
}

function createWindow() {
    // Dark theme
    nativeTheme.themeSource = 'dark'; //not work on title bar and alert

    // run backend automatically
    // child(executablePath, function (err, data) {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }

    //     console.log(data.toString());
    // });

    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        minWidth: 1280,
        minHeight: 720,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
        icon: 'classifai/assets/classifai_light.ico'
    });

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `/classifai/index.html`),
            protocol: 'file:',
            slashes: true,
        }),
    );

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

// app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});

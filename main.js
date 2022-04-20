const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const exec = require('child_process').exec

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.webContents.openDevTools();
    win.loadFile('index.html')
}

function executeFile(filePath) {
    // let ffmpegPath = path.join(process.resourcesPath, 'ffmpeg');
    var ffmpeg = require('ffmpeg-static-electron');
    ffmpegPath = ffmpeg.path;

    let outputDir = path.join(__dirname,'dist');
    //ffmpegPath = ffmpeg.path;

    // let ffmpegPath = path.join(
    //     __dirname,
    //     'assets',
    //     'ffmpeg'
    // )


    return new Promise((resolve, reject) => {
        const basename = path.basename(filePath);
        const cmdStr = `${ffmpegPath} -i ${filePath} ${outputDir}/${basename}`
        exec(cmdStr, (err, stdout, stderr) => {
            if (err) {
                console.log('error:' + stderr)
                reject('error:' + stderr)
            } else {
                resolve(`${outputDir}/${basename}`)
                console.log(`transform to mp3 success! ${filePath}->${outputDir}/${basename}`)
            }
        })
    })
}

async function returnStr() {
    const { canceled, filePaths } = await dialog.showOpenDialog();

    if (canceled) {
        return null;
    } else {
        let filePath = filePaths[0]
        let suc = await executeFile(filePath);
        return suc
    }
}

async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog()
    if (canceled) {
        return
    } else {
        return filePaths[0]
    }
}

app.whenReady().then(() => {
    ipcMain.handle('dialog:openFile', handleFileOpen)
    ipcMain.handle('test_str', returnStr);

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

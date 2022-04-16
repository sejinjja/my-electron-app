const {app, BrowserWindow, clipboard, ipcMain} = require('electron')
const path = require('path')
let lastReadClipboard = ''
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if(process.env.NODE_ENV === 'dev') {
    win.loadURL('http://localhost:8080')
  } else {
    win.loadFile('dist_web/index.html')
  }
  win.webContents.openDevTools()
  ipcMain.on('init', () => {
    lastReadClipboard = clipboard.readText()
    win.webContents.send('onChangeClipboard', {type: 'text', value: lastReadClipboard})
  })
  clipboardTextWatcher(win)
}

function clipboardTextWatcher(win) {
  setInterval(() => {
    const currentReadClipboard = clipboard.readText()
    if (currentReadClipboard !== lastReadClipboard) {
      win.webContents.send('onChangeClipboard', {type: 'text', value: currentReadClipboard})
      lastReadClipboard = currentReadClipboard
    }
  }, 700)
}

app.whenReady().then(() => {
  createWindow()
})


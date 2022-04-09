
const {app, BrowserWindow} = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadURL('http://localhost:8080')
  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()
})


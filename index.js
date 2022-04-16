
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

  if(process.env.NODE_ENV === 'dev') {
    win.loadURL('http://localhost:8080')
  } else {
    win.loadFile('dist_web/index.html')
  }
  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()
})


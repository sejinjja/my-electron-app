const {app, BrowserWindow} = require('electron')
const path = require('path')
const {autoUpdater} = require('electron-updater')
const log = require('electron-log')

const createWindow = (devMode) => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (devMode) {
    win.loadURL('http://localhost:8080')
  } else {
    win.loadFile('dist_web/index.html')
  }
  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  if (process.env.NODE_ENV === 'dev') {
    createWindow(true)
  } else {
    autoUpdater.checkForUpdates()
  }
})

app.on('window-all-closed', () => {
  app.quit()
})

autoUpdater.autoDownload = false

autoUpdater.on('checking-for-update', () => {
  log.info('업데이트 확인 중...')
})
autoUpdater.on('update-available', (info) => {
  log.info('업데이트가 가능합니다.')
  autoUpdater.downloadUpdate()
})
autoUpdater.on('update-not-available', (info) => {
  log.info('현재 최신버전입니다.')
  createWindow()
})
autoUpdater.on('error', (err) => {
  log.info('에러가 발생하였습니다. 에러내용 : ' + err)
  // createWindow()
  app.quit()
})
autoUpdater.on('download-progress', (progressObj) => {
  log.info('progressObj', progressObj)
})
autoUpdater.on('update-downloaded', (info) => {
  log.info(info)
  log.info('업데이트가 완료되었습니다.')
  setImmediate(() => {
    autoUpdater.quitAndInstall()
  })
})

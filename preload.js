const { contextBridge, clipboard, ipcRenderer }  = require('electron')
const fs = require('fs').promises
const path = require('path')

const validChannels = ['onChangeClipboard', 'init']

contextBridge.exposeInMainWorld(
  'api', {
    writeFile(fileName, ...args) {
      return fs.writeFile(path.join(__dirname, fileName), ...args)
    },
    readFile(fileName, ...args) {
      return fs.readFile(path.join(__dirname, fileName), ...args)
    },
  },
)

contextBridge.exposeInMainWorld(
  'ipc', {
    send: (channel, data) => {
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data)
      }
    },
    on: (channel, func) => {
      if (validChannels.includes(channel)) {
        ipcRenderer.on(channel, (event, ...args) => func(...args))
      }
    },
  }
)

contextBridge.exposeInMainWorld(
  'clipboardHandler', {
    // availableFormats: clipboard.availableFormats,
    // clear: clipboard.clear,
    // has: clipboard.has,
    // read: clipboard.read,
    // readBookmark: clipboard.readBookmark,
    // readBuffer: clipboard.readBuffer,
    // readFindText: clipboard.readFindText,
    // readHTML: clipboard.readHTML,
    // readImage: clipboard.readImage,
    // readRTF: clipboard.readRTF,
    readText: clipboard.readText,
    // write: clipboard.write,
    // writeBookmark: clipboard.writeBookmark,
    // writeBuffer: clipboard.writeBuffer,
    // writeFindText: clipboard.writeFindText,
    // writeHTML: clipboard.writeHTML,
    // writeImage: clipboard.writeImage,
    // writeRTF: clipboard.writeRTF,
    writeText: clipboard.writeText,
  }
)


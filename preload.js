
const { contextBridge }  = require('electron')
const fs = require('fs').promises
const path = require('path')

contextBridge.exposeInMainWorld(
  'api', {
    writeFile(fileName, ...args) {
      return fs.writeFile(path.join(__dirname, fileName), ...args)
    },
    readFile(fileName, ...args) {
      return fs.readFile(path.join(__dirname, fileName), ...args)
    }
  }
)

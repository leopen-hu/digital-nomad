import { BrowserWindow } from 'electron'
import registerRestListeners from './listeners'

const initRest = (window: BrowserWindow | BrowserWindow[]) => {

  registerRestListeners(window)
}

export default initRest

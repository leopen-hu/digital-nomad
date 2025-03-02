import { ipcRenderer } from 'electron'
import { MENU_CHANNELS } from './channels'
import registerApi from '@/backend/common/register-api'

export interface IMenuApi {
  closeApp: () => Promise<number>
  toggleDevTools: () => Promise<number>
  reload: () => Promise<number>
  forceReload: () => Promise<number>
}

const registerMenuApi = () => {
  registerApi<IMenuApi>('menuApi', {
    closeApp: () => ipcRenderer.invoke(MENU_CHANNELS.CLOSE_APP),
    toggleDevTools: () =>
      ipcRenderer.invoke(MENU_CHANNELS.TOGGLE_DEVTOOLS),
    reload: () => ipcRenderer.invoke(MENU_CHANNELS.RELOAD),
    forceReload: () => ipcRenderer.invoke(MENU_CHANNELS.FORCE_RELOAD),
  })
}

export default registerMenuApi

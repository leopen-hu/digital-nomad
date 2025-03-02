import { ipcRenderer } from 'electron'
import Rest_Channels from './channels'
import registerApi from '@/backend/common/register-api'

export interface IRest {
  close: () => Promise<number>
}

const registerRestApi = () => {
  registerApi<IRest>('restApi', {
    close: () => ipcRenderer.invoke(Rest_Channels.Close),
  })
}

export default registerRestApi

import { contextBridge } from 'electron'

const registerApi = <T>(name: string, api: T): void => {
  return contextBridge.exposeInMainWorld(name, api)
}

export default registerApi

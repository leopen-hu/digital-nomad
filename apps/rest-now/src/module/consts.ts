import path from 'node:path'

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string | undefined
declare const MAIN_WINDOW_VITE_NAME: string

export const devServerUrl = MAIN_WINDOW_VITE_DEV_SERVER_URL
export const productionRendererRootPath = path.join(
  __dirname,
  `../renderer/${MAIN_WINDOW_VITE_NAME}`,
)
export const proloadPath = path.join(__dirname, 'preload.js')
export const iconPath = path.join(
  devServerUrl ? __dirname : productionRendererRootPath,
  'assets/icons/icon.ico',
)

// See the Electron documentation for details on how to use preload scripts:

import { registerContext } from './module/context-register'

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
registerContext()

// See the Electron documentation for details on how to use preload scripts:

import registerToPreload from './backend/register-to-preload'

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
registerToPreload()

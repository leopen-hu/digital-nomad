import { BrowserWindow } from "electron";
import Work_Timer_Channels from "./channels";

export interface IWorkTimerTriggers {
  sendWorkTimerUpdated: (workedDuration: number) => void
}

const registerWorkTimerTriggers = (window: BrowserWindow) => {
  const sendWorkTimerUpdated = (workedDuration: number) => {
    window.webContents.send(Work_Timer_Channels.Timer_Updated, workedDuration);
  };

  return {
    sendWorkTimerUpdated
  }
}

export default registerWorkTimerTriggers


const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getTutorials: () => ipcRenderer.invoke('get-tutorials'),
  getTutorialContent: (tutorialName) => ipcRenderer.invoke('get-tutorial-content', tutorialName),
  openTutorialFolder: (tutorialName) => ipcRenderer.invoke('open-tutorial-folder', tutorialName),
  checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
  onUpdateMessage: (callback) => ipcRenderer.on('update-message', callback)
});

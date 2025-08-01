
const { app, BrowserWindow, ipcMain, shell, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
const { checkForUpdates } = require('./update');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false
    }
  });

  mainWindow.loadFile('renderer/index.html');

  ipcMain.handle('check-for-updates', () => {
    checkForUpdates(mainWindow);
  });
}

app.whenReady().then(() => {
  createWindow();
  Menu.setApplicationMenu(null);

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('get-tutorials', async () => {
  const resourcesPath = path.join(__dirname, 'resources');
  const tutorialFolders = fs.readdirSync(resourcesPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  return tutorialFolders;
});

ipcMain.handle('get-tutorial-content', async (event, tutorialName) => {
  const readmePath = path.join(__dirname, 'resources', tutorialName, 'readme.md');
  if (fs.existsSync(readmePath)) {
    return fs.readFileSync(readmePath, 'utf-8');
  }
  return null;
});

ipcMain.handle('open-tutorial-folder', async (event, tutorialName) => {
  const tutorialPath = path.join(__dirname, 'resources', tutorialName, 'code');
  shell.openPath(tutorialPath);
});

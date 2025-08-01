const { ipcMain, dialog } = require('electron');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

const GITHUB_REPO_URL = 'https://api.github.com/repos/Iceberg-Yang/my-tutorial-app/releases/latest';
const RESOURCES_DIR = path.join(__dirname, 'resources');

async function checkForUpdates(window) {
    try {
        window.webContents.send('update-message', 'Checking for updates...');
        const response = await axios.get(GITHUB_REPO_URL);
        const latestRelease = response.data;
        const remoteVersion = latestRelease.tag_name;

        const packageJsonPath = path.join(__dirname, 'package.json');
        const localVersion = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')).version;

        if (remoteVersion !== localVersion) {
            const userChoice = await dialog.showMessageBox({
                type: 'info',
                title: 'Update Available',
                message: `A new version (${remoteVersion}) is available. Do you want to download and install it?`,
                buttons: ['Yes', 'No']
            });

            if (userChoice.response === 0) {
                window.webContents.send('update-message', 'Downloading update...');
                const asset = latestRelease.assets.find(asset => asset.name === 'resources.zip');
                if (asset) {
                    const downloadUrl = asset.browser_download_url;
                    const zipPath = path.join(__dirname, 'resources.zip');
                    const writer = fs.createWriteStream(zipPath);

                    const downloadResponse = await axios({
                        url: downloadUrl,
                        method: 'GET',
                        responseType: 'stream'
                    });

                    downloadResponse.data.pipe(writer);

                    writer.on('finish', () => {
                        window.webContents.send('update-message', 'Update downloaded. Extracting...');
                        fs.rmdirSync(RESOURCES_DIR, { recursive: true });
                        const zip = new AdmZip(zipPath);
                        zip.extractAllTo(__dirname, true);
                        fs.unlinkSync(zipPath);
                        window.webContents.send('update-message', 'Update complete! Please restart the application.');
                    });

                    writer.on('error', () => {
                        window.webContents.send('update-message', 'Error downloading update.');
                    });
                } else {
                    window.webContents.send('update-message', 'Could not find resources.zip in the latest release.');
                }
            }
        } else {
            window.webContents.send('update-message', 'You are on the latest version.');
        }
    } catch (error) {
        console.error('Error checking for updates:', error);
        window.webContents.send('update-message', 'Error checking for updates.');
    }
}

module.exports = { checkForUpdates };
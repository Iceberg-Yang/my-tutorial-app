
document.addEventListener('DOMContentLoaded', () => {
    const tutorialList = document.getElementById('tutorial-list');
    const tutorialView = document.getElementById('tutorial-view');
    const checkForUpdatesBtn = document.getElementById('check-for-updates');
    const updateMessage = document.getElementById('update-message');

    let currentTutorial = '';

    async function loadTutorials() {
        const tutorials = await window.electronAPI.getTutorials();
        tutorialList.innerHTML = '';
        tutorials.forEach(tutorial => {
            const li = document.createElement('li');
            li.textContent = tutorial;
            li.addEventListener('click', () => {
                loadTutorialContent(tutorial);
                currentTutorial = tutorial;
            });
            tutorialList.appendChild(li);
        });
    }

    async function loadTutorialContent(tutorialName) {
        const content = await window.electronAPI.getTutorialContent(tutorialName);
        if (content) {
            tutorialView.innerHTML = marked.parse(content);
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightBlock(block);
            });

            const openFolderBtn = document.createElement('button');
            openFolderBtn.textContent = 'Open Code Folder';
            openFolderBtn.addEventListener('click', () => {
                window.electronAPI.openTutorialFolder(currentTutorial);
            });
            tutorialView.prepend(openFolderBtn);
        }
    }

    checkForUpdatesBtn.addEventListener('click', () => {
        window.electronAPI.checkForUpdates();
    });

    window.electronAPI.onUpdateMessage((event, message) => {
        updateMessage.textContent = message;
    });

    loadTutorials();
});

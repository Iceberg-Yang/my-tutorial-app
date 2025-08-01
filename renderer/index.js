
document.addEventListener('DOMContentLoaded', () => {
    const tutorialList = document.getElementById('tutorial-list');
    const homeView = document.getElementById('home-view');
    const tutorialView = document.getElementById('tutorial-view');
    const checkForUpdatesBtn = document.getElementById('check-for-updates');
    const homeButton = document.getElementById('home-button');
    const updateMessage = document.getElementById('update-message');

    let currentTutorial = '';

    function showHomeView() {
        homeView.style.display = 'block';
        tutorialView.style.display = 'none';
    }

    function showTutorialView() {
        homeView.style.display = 'none';
        tutorialView.style.display = 'block';
    }

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
            showTutorialView();
            tutorialView.innerHTML = marked.parse(content);
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightBlock(block);
            });

            const openFolderBtn = document.createElement('button');
            openFolderBtn.textContent = '打开代码文件夹'; // Changed to Chinese
            openFolderBtn.addEventListener('click', () => {
                window.electronAPI.openTutorialFolder(currentTutorial);
            });
            tutorialView.prepend(openFolderBtn);
        }
    }

    homeButton.addEventListener('click', showHomeView);

    checkForUpdatesBtn.addEventListener('click', () => {
        window.electronAPI.checkForUpdates();
    });

    window.electronAPI.onUpdateMessage((event, message) => {
        updateMessage.textContent = message;
    });

    // Initial setup
    loadTutorials();
    showHomeView();
});

// --- Setup ---
const canvas = document.getElementById('tetris-canvas');
const context = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('start-button');
const nextCanvas = document.getElementById('next-canvas');
const nextContext = nextCanvas.getContext('2d');

// --- Constants ---
const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;
const BLOCK_SIZE = canvas.width / GRID_WIDTH;
const NEXT_BLOCK_SIZE = nextCanvas.width / 4;

const COLORS = {
    '1': '#800080', '2': '#FFFF00', '3': '#FFA500',
    '4': '#0000FF', '5': '#00FFFF', '6': '#008000', '7': '#FF0000'
};

const TETROMINOES = {
    'T': {
        color: 1,
        shapes: [
            [[0, 1, 0], [1, 1, 1]],
            [[1, 0, 0], [1, 1, 0], [1, 0, 0]],
            [[1, 1, 1], [0, 1, 0]],
            [[0, 1, 0], [1, 1, 0], [0, 1, 0]]
        ]
    },
    'O': {
        color: 2,
        shapes: [
            [[2, 2], [2, 2]]
        ]
    },
    'L': {
        color: 3,
        shapes: [
            [[0, 0, 3], [3, 3, 3]],
            [[3, 0, 0], [3, 0, 0], [3, 3, 0]],
            [[3, 3, 3], [3, 0, 0]],
            [[3, 3, 0], [0, 3, 0], [0, 3, 0]]
        ]
    },
    'J': {
        color: 4,
        shapes: [
            [[4, 0, 0], [4, 4, 4]],
            [[4, 4, 0], [4, 0, 0], [4, 0, 0]],
            [[4, 4, 4], [0, 0, 4]],
            [[0, 4, 0], [0, 4, 0], [4, 4, 0]]
        ]
    },
    'I': {
        color: 5,
        shapes: [
            [[5, 5, 5, 5]],
            [[5], [5], [5], [5]]
        ]
    },
    'S': {
        color: 6,
        shapes: [
            [[0, 6, 6], [6, 6, 0]],
            [[6, 0, 0], [6, 6, 0], [0, 6, 0]]
        ]
    },
    'Z': {
        color: 7,
        shapes: [
            [[7, 7, 0], [0, 7, 7]],
            [[0, 7, 0], [7, 7, 0], [7, 0, 0]]
        ]
    }
};

// --- Game State ---
let score = 0;
let playfield = createEmptyPlayfield();
let player = { pos: { x: 0, y: 0 }, shape: null, rotation: 0, color: 0 };
let nextTetromino = null;
let gameIsRunning = false;

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

// --- Main Functions ---
function createEmptyPlayfield() {
    return Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(0));
}

function getRandomTetromino() {
    const types = 'TOLJISZ';
    const type = types[Math.floor(Math.random() * types.length)];
    return JSON.parse(JSON.stringify(TETROMINOES[type]));
}

function checkCollision(piece, playfield) {
    const tetromino = piece.shape[piece.rotation];
    for (let y = 0; y < tetromino.length; y++) {
        for (let x = 0; x < tetromino[y].length; x++) {
            if (tetromino[y][x] !== 0) {
                const newY = y + piece.pos.y;
                const newX = x + piece.pos.x;
                if (newY >= GRID_HEIGHT || newX < 0 || newX >= GRID_WIDTH || (playfield[newY] && playfield[newY][newX] !== 0)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function collisionDetect() {
    return checkCollision(player, playfield);
}

function mergeIntoPlayfield() {
    const tetromino = player.shape[player.rotation];
    tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                playfield[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function playfieldSweep() {
    let clearedLines = 0;
    outer: for (let y = playfield.length - 1; y > 0; --y) {
        for (let x = 0; x < playfield[y].length; ++x) {
            if (playfield[y][x] === 0) {
                continue outer;
            }
        }
        const row = playfield.splice(y, 1)[0].fill(0);
        playfield.unshift(row);
        ++y;
        clearedLines++;
    }
    if (clearedLines > 0) {
        score += clearedLines * 10;
        scoreElement.innerText = score;
    }
}

function playerReset() {
    const newPiece = nextTetromino || getRandomTetromino();
    nextTetromino = getRandomTetromino();

    player.shape = newPiece.shapes;
    player.color = newPiece.color;
    player.rotation = 0;
    const tetromino = player.shape[player.rotation];
    player.pos.x = Math.floor(GRID_WIDTH / 2) - Math.floor(tetromino[0].length / 2);
    player.pos.y = 0;

    if (collisionDetect()) {
        gameIsRunning = false;
        alert('Game Over! Score: ' + score);
    }
    drawNextTetromino();
}

function playerDrop() {
    player.pos.y++;
    if (collisionDetect()) {
        player.pos.y--;
        mergeIntoPlayfield();
        playfieldSweep();
        playerReset();
    }
    dropCounter = 0;
}

function playerMove(direction) {
    player.pos.x += direction;
    if (collisionDetect()) {
        player.pos.x -= direction;
    }
}

function playerRotate() {
    const ghost = JSON.parse(JSON.stringify(player));
    ghost.rotation = (ghost.rotation + 1) % ghost.shape.length;

    const originalX = ghost.pos.x;
    let offset = 1;

    if (!checkCollision(ghost, playfield)) {
        player.rotation = ghost.rotation;
        return;
    }

    while (true) {
        ghost.pos.x = originalX + offset;
        if (!checkCollision(ghost, playfield)) {
            player.rotation = ghost.rotation;
            player.pos.x = ghost.pos.x;
            return;
        }

        if (Math.abs(offset) > ghost.shape[ghost.rotation][0].length) {
            return;
        }

        offset = -(offset + (offset > 0 ? 1 : -1));
    }
}

function draw() {
    context.fillStyle = '#f9f9f9';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the playfield
    for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
            if (playfield[y][x] !== 0) {
                context.fillStyle = COLORS[playfield[y][x]];
                context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        }
    }

    // Draw the player's tetromino
    if (player.shape) {
        const tetromino = player.shape[player.rotation];
        context.fillStyle = COLORS[player.color];
        tetromino.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    context.fillRect((player.pos.x + x) * BLOCK_SIZE, (player.pos.y + y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                }
            });
        });
    }
}

function drawNextTetromino() {
    nextContext.fillStyle = '#f9f9f9';
    nextContext.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
    if (nextTetromino) {
        const tetromino = nextTetromino.shapes[0];
        const color = COLORS[nextTetromino.color];
        const offsetX = (nextCanvas.width - tetromino[0].length * NEXT_BLOCK_SIZE) / 2;
        const offsetY = (nextCanvas.height - tetromino.length * NEXT_BLOCK_SIZE) / 2;

        nextContext.fillStyle = color;
        tetromino.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    nextContext.fillRect(offsetX + x * NEXT_BLOCK_SIZE, offsetY + y * NEXT_BLOCK_SIZE, NEXT_BLOCK_SIZE, NEXT_BLOCK_SIZE);
                }
            });
        });
    }
}

function update(time = 0) {
    if (!gameIsRunning) return;

    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }

    draw();
    requestAnimationFrame(update);
}

// --- Event Listeners ---
document.addEventListener('keydown', event => {
    if (!gameIsRunning) return;

    if (event.key === 'ArrowLeft') {
        event.preventDefault();
        playerMove(-1);
    } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        playerMove(1);
    } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        playerDrop();
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        playerRotate();
    }
});

startButton.addEventListener('click', () => {
    gameIsRunning = true;
    playfield = createEmptyPlayfield();
    score = 0;
    level = 0;
    lines = 0;
    dropInterval = 1000;
    scoreElement.innerText = score;
    nextTetromino = getRandomTetromino();
    playerReset();
    lastTime = 0;
    dropCounter = 0;
    update();
});

// Initial draw
draw();
drawNextTetromino();

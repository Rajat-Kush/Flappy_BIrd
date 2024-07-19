const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const canvasWidth = 1150;
const canvasHeight = 720;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

const bird = {
    x: 50,
    y: 150,
    width: 20,
    height: 20,
    gravity: 0.6,
    lift: -10,
    velocity: 0
};

const pipes = [];
const pipeWidth = 20;
const pipeGap = 200;
let pipeFrequency = 120;
let frameCount = 0;
let score = 0;

document.addEventListener('keydown', () => {
    bird.velocity = bird.lift;
});

function drawBird() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function updateBird() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;
    if (bird.y + bird.height > canvasHeight || bird.y < 0) {
        resetGame();
    }
}

function drawPipes() {
    pipes.forEach(pipe => {
        ctx.fillStyle = 'green';
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, pipe.top + pipeGap, pipeWidth, canvasHeight - pipe.top - pipeGap);
    });
}

function updatePipes() {
    if (frameCount % pipeFrequency === 0) {
        const pipeTopHeight = Math.floor(Math.random() * (canvasHeight - pipeGap));
        pipes.push({ x: canvasWidth, top: pipeTopHeight });
    }
    pipes.forEach(pipe => {
        pipe.x -= 2;
        if (pipe.x + pipeWidth < 0) {
            pipes.shift();
            score++;
        }
        if (
            bird.x < pipe.x + pipeWidth &&
            bird.x + bird.width > pipe.x &&
            (bird.y < pipe.top || bird.y + bird.height > pipe.top + pipeGap)
        ) {
            resetGame();
        }
    });
}

function resetGame() {
    bird.y = 50;
    bird.velocity = 0;
    pipes.length = 0;
    score = 0;
    frameCount = 0;
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 25);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawBird();
    updateBird();
    drawPipes();
    updatePipes();
    drawScore();
    frameCount++;
    requestAnimationFrame(gameLoop);
}

gameLoop();

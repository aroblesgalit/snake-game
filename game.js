import { update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection, snakeSpeed, updateLevel as updateSnakeSpeed } from './snake.js';
import { update as updateFood, draw as drawFood, updateLevel as updateExpRate } from './food.js';
import { outsideGrid } from './grid.js';
import { update as updateScore, draw as drawScore, addToHighscore, score, highscores, renderHighscores } from './score.js';

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');
const scoreBoard = document.querySelector('.score');
export const levels = document.getElementById('level').querySelectorAll('button[data-level]');

renderHighscores(highscores);

function main(currentTime) {
    if (gameOver) {
        addToHighscore(score);
        if (confirm('You lost. Press ok to restart.')) {
            location.reload();
        }
        return;
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / snakeSpeed) return;

    lastRenderTime = currentTime;

    update();
    draw();
}

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkDeath();
    updateScore();
}

function draw() {
    gameBoard.innerHTML = ''; // Clear game board
    drawSnake(gameBoard);
    drawFood(gameBoard);
    drawScore(scoreBoard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

levels.forEach(level => {
    level.addEventListener('click', updateSnakeSpeed);
    level.addEventListener('click', updateExpRate);
});
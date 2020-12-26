import { update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection, snakeSpeed } from './snake.js';
import { update as updateFood, draw as drawFood, expansionRate } from './food.js';
import { outsideGrid } from './grid.js';
import { update as updateScore, draw as drawScore, addToHighscore, score, highscores, renderHighscores } from './score.js';

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');
const scoreBoard = document.querySelector('.score');
const levels = document.getElementById('level').querySelectorAll('button[data-level]');

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

levels.forEach(level => level.addEventListener('click', updateLevel));

function updateLevel() {
    let dataLevel = this.dataset.level;
    switch (dataLevel) {
        case 'easy':
            snakeSpeed = 5;
            expansionRate = 1;
            break;
        case 'medium':
            snakeSpeed = 10;
            expansionRate = 2;
            break;
        case 'hard':
            snakeSpeed = 15;
            expansionRate = 4;
            break;
        default:
            snakeSpeed = 5;
            expansionRate = 1;
            break;
    }
}
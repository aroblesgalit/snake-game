import { snakeBody } from './snake.js';

export let score = 0;

export function update() {
    if (snakeBody.length > 1) {
        score = (snakeBody.length - 1) * 5; 
    }
}

export function draw(scoreBoard) {
    scoreBoard.innerText = `${score}`;
}
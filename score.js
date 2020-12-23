import { snakeBody } from './snake.js';

export let score = 0;

export function update() {
    if (snakeBody.length > 1) {
        score = (snakeBody.length - 1) * 5; 
    }
    console.log(`Score: ${score}`);
}

export function draw() {

}
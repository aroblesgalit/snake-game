import { onSnake, expandSnake } from './snake.js';
import { randomGridPosition } from './grid.js';

let food = getRandomFoodPosition();
export let expansionRate = 1;

export function update() {
    if (onSnake(food)) {
        expandSnake(expansionRate);
        food = getRandomFoodPosition();
    }
}

export function draw(gameBoard) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
    let newFoodPosition;
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}

export function updateLevel() {
    let dataLevel = this.dataset.level;
    switch (dataLevel) {
        case 'easy':
            expansionRate = 1;
            break;
        case 'medium':
            expansionRate = 2;
            break;
        case 'hard':
            expansionRate = 4;
            break;
        default:
            expansionRate = 1;
            break;
    }
}
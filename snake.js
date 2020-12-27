import { getInputDirection } from "./input.js";
// import { expansionRate } from './food.js';
import { levels } from './game.js';

export let snakeSpeed = 5;
export const snakeBody = [
    { x: 11, y: 11 }
];
let newSegments = 0;
let inputDirection;

export function update() {
    addSegments();

    inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
    snakeBody.forEach((segment, i) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        if (i === 0) {
            if ((inputDirection.x === 0 && inputDirection.y === 0) || (inputDirection.x === 1 && inputDirection.y === 0)) {
                snakeElement.style.borderTopRightRadius = "50%";
                snakeElement.style.borderBottomRightRadius = "50%";
            } else if (inputDirection.x === -1 && inputDirection.y === 0) {
                snakeElement.style.borderTopLeftRadius = "50%";
                snakeElement.style.borderBottomLeftRadius = "50%";
            } else if (inputDirection.x === 0 && inputDirection.y === -1) {
                snakeElement.style.borderTopLeftRadius = "50%";
                snakeElement.style.borderTopRightRadius = "50%";
            } else {
                snakeElement.style.borderBottomLeftRadius = "50%";
                snakeElement.style.borderBottomRightRadius = "50%";
            }

        }
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement);
    })

}

export function expandSnake(amount) {
    newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false;
        return equalPositions(segment, position);
    })
}

export function getSnakeHead() {
    return snakeBody[0];
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true })
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
    }

    newSegments = 0;
}

export function updateLevel() {
    // setActive(level);
    levels.forEach(level => level.classList.remove('active'));
    let dataLevel = this.dataset.level;
    this.classList.add('active');
    switch (dataLevel) {
        case 'easy':
            snakeSpeed = 5;
            // expansionRate = 1;
            break;
        case 'medium':
            snakeSpeed = 10;
            // expansionRate = 2;
            break;
        case 'hard':
            snakeSpeed = 15;
            // expansionRate = 4;
            break;
        default:
            snakeSpeed = 5;
            // expansionRate = 1;
            break;
    }
}
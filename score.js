import { snakeBody } from './snake.js';

export let score = 0;
export let highscores = [];
highscores = getHighscores();

const highscoreList = document.querySelector('.names');

export function update() {
    if (snakeBody.length > 1) {
        score = (snakeBody.length - 1) * 5;
    }
}

export function draw(scoreBoard) {
    scoreBoard.innerText = `${score}`;
}

// Get highscores from localStorage
function getHighscores() {
    let storedHighscores = localStorage.getItem('highscores');
    storedHighscores = storedHighscores ? JSON.parse(storedHighscores) : [];
    return storedHighscores;
}

export function addToHighscore(score) {
    if (highscores.length === 3) {
        const isNewHighscore = highscores.some(record => record.highscore < score); // Checks if any of the highscore is less than the current score
        if (isNewHighscore) {
            const newHighscoreName = prompt('Enter your name: ');
            highscores.push({ name: newHighscoreName, highscore: score });
            highscores.sort((a, b) => b.highscore - a.highscore);
            highscores.pop();
            localStorage.setItem('highscores', JSON.stringify(highscores));
            return;
        } else {
            return;
        }
    } else if (highscores.length < 3) {
        const newHighscoreName = prompt('Enter your name: ');
        highscores.push({ name: newHighscoreName, highscore: score });
        highscores.sort((a, b) => a.highscore > b.highscore);
        localStorage.setItem('highscores', JSON.stringify(highscores));
        return;
    }
}

export function renderHighscores(highscores) {
    const template = highscores
        .map(highscore => `<li>${highscore.highscore} - ${highscore.name}</li>`)
        .join('')
    return highscoreList.innerHTML = template;
}
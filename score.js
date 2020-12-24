import { snakeBody } from './snake.js';

export let score = 0;
let highscores = [];
// localStorage.setItem('highscores', JSON.stringify(highscores));
highscores = getHighscores();

export function update() {
    if (snakeBody.length > 1) {
        score = (snakeBody.length - 1) * 5;
    }
}

export function draw(scoreBoard) {
    scoreBoard.innerText = `${score}`;
}

// Get highscores list from localStorage or []
function getHighscores() {
    let storedHighscores = localStorage.getItem('highscores');
    console.log('Running getHighscores...', storedHighscores);
    storedHighscores = storedHighscores ? JSON.parse(storedHighscores) : [];
    console.log('Grabbing highscores from localStorage: ', storedHighscores);
    return storedHighscores;
}

export function addToHighscore(score) {
    console.log('Checking highscore...')
    if (highscores.length === 3) {
        console.log('Checking if highscore board has 3 items...')
        const isNewHighscore = highscores.some(record => record.highscore < score); // Checks if any of the highscore is less than the current score
        if (isNewHighscore) {
            console.log('Score is a new highscore!')
            const newHighscoreName = prompt('Enter your name: ');
            highscores.push({ name: newHighscoreName, highscore: score });
            highscores.sort((a, b) => b.highscore - a.highscore);
            highscores.pop();
            localStorage.setItem('highscores', JSON.stringify(highscores));
            console.log('Highscores stored in localStorage: ', highscores)
            return;
        } else {
            console.log('Score did not make the highscore board');
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
    // Check if highscore list is full
        // If not, prompt for name
            // Add highscore to list
            // Sort list
            // Save to localStorage
            // Render list
        // If so, check if score is greater than the last
            // If greater, prompt for name and add to list
                // Sort list
                // Save to localStorage
                // Render list
            // If not, do nothing

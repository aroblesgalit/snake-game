import { snakeBody } from './snake.js';

export let score = 0;
let highscores = getHighscores() || [];

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
    return localStorage.getItem('highscores');
}

export function addToHighscore(score) {
    if (highscores.length === 3) {
        const isNewHighscore = highscores.some(highscore => highscore < score); // Checks if any of the highscore is less than the current score
        if (isNewHighscore) {
            const newHighscoreName = prompt('Enter your name: ');
            highscores.push({ name: newHighscoreName, highscore: score });
            highscores.sort((a, b) => a.highscore > b.highscore);
            highscore.pop();
            localStorage.setItem('highscores', highscores);
            return;
        } else {
            return;
        }
    } else if (highscores.length < 3) {
        const newHighscoreName = prompt('Enter your name: ');
        highscores.push({ name: newHighscoreName, highscore: score });
        highscores.sort((a, b) => a.highscore > b.highscore);
        localStorage.setItem('highscores', highscores);
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

// my game variables
let secretNumber = 0;
let attempts = 0;
let maxAttempts = 10;
let score = 0;
let highScore = 0;
let gameActive = false;
let guessHistory = [];

// get all the elements i need
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const submitBtn = document.getElementById('submit-btn');
const guessInput = document.getElementById('guess-input');
const gameMessage = document.getElementById('game-message');
const scoreDisplay = document.getElementById('score-display');
const guessHistoryDiv = document.getElementById('guess-history');

// start the game
function startGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    gameActive = true;
    guessHistory = [];
    
    guessInput.disabled = false;
    submitBtn.disabled = false;
    guessInput.value = '';
    guessInput.focus();
    
    gameMessage.textContent = 'Game Started! Guess a number between 1 and 100';
    gameMessage.style.color = '#22ff88';
    updateGuessHistory();
}

// check the guess
function checkGuess() {
    if (!gameActive) return;
    
    const guess = parseInt(guessInput.value);
    
    // validate input
    if (isNaN(guess) || guess < 1 || guess > 100) {
        gameMessage.textContent = 'Please enter a valid number between 1 and 100!';
        gameMessage.style.color = '#ff4444';
        return;
    }
    
    attempts++;
    guessHistory.push(guess);
    updateGuessHistory();
    
    // check if correct
    if (guess === secretNumber) {
        gameMessage.textContent = `🎉 YES! You got it in ${attempts} tries!`;
        gameMessage.style.color = '#22ff88';
        score += (maxAttempts - attempts + 1) * 10; // more points for fewer guesses
        if (score > highScore) {
            highScore = score;
        }
        updateScore();
        endGame();
    } else if (attempts >= maxAttempts) {
        gameMessage.textContent = `Game Over! The number was ${secretNumber}`;
        gameMessage.style.color = '#ff4444';
        endGame();
    } else {
        // give hints
        const remaining = maxAttempts - attempts;
        if (guess < secretNumber) {
            gameMessage.textContent = `Too low! ${remaining} attempts left`;
            gameMessage.style.color = '#5ecbff';
        } else {
            gameMessage.textContent = `Too high! ${remaining} attempts left`;
            gameMessage.style.color = '#ff6b6b';
        }
    }
    
    guessInput.value = '';
    guessInput.focus();
}

// end game
function endGame() {
    gameActive = false;
    guessInput.disabled = true;
    submitBtn.disabled = true;
}

// reset everything
function resetGame() {
    secretNumber = 0;
    attempts = 0;
    score = 0;
    gameActive = false;
    guessHistory = [];
    
    guessInput.disabled = true;
    submitBtn.disabled = true;
    guessInput.value = '';
    
    gameMessage.textContent = 'Press Start to Play!';
    gameMessage.style.color = '#22ff88';
    updateScore();
    updateGuessHistory();
}

// update score display
function updateScore() {
    scoreDisplay.textContent = `Score: ${score} | High Score: ${highScore}`;
}

// show guess history
function updateGuessHistory() {
    guessHistoryDiv.innerHTML = '';
    guessHistory.forEach(guess => {
        const bubble = document.createElement('div');
        bubble.className = 'guess-bubble';
        bubble.textContent = guess;
        
        // color code the bubbles
        if (guess === secretNumber) {
            bubble.style.background = 'rgba(34, 255, 136, 0.3)';
            bubble.style.borderColor = '#22ff88';
        } else if (Math.abs(guess - secretNumber) <= 10) {
            bubble.style.background = 'rgba(255, 165, 0, 0.3)';
            bubble.style.borderColor = '#ffa500';
        }
        
        guessHistoryDiv.appendChild(bubble);
    });
}

// button event listeners
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
submitBtn.addEventListener('click', checkGuess);

// also allow enter key to submit
guessInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && gameActive) {
        checkGuess();
    }
});

// form handling
const contactForm = document.getElementById('contact-form');
const formResponse = document.getElementById('form-response');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const hobby = document.getElementById('hobby').value;
    const message = document.getElementById('message').value;
    
    // show success message
    formResponse.style.display = 'block';
    formResponse.style.background = 'rgba(34, 255, 136, 0.2)';
    formResponse.style.border = '2px solid #22ff88';
    formResponse.style.color = '#22ff88';
    formResponse.innerHTML = `<strong>Thanks ${name}!</strong><br>Your message has been received. I'll reply to ${email} soon!`;
    
    // reset form
    contactForm.reset();
    
    // hide message after 5 seconds
    setTimeout(() => {
        formResponse.style.display = 'none';
    }, 5000);
});



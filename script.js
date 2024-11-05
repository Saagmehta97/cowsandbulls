// Generate a random 4-digit number with unique digits from 1-9
let secretNumber = '';
while (secretNumber.length < 4) {
    let digit = Math.floor(Math.random() * 9) + 1;
    digit = digit.toString(); // Ensure digit is a string
    if (!secretNumber.includes(digit)) {
        secretNumber += digit;
    }
}

let attempts = 0;
const maxAttempts = 7;

const guessButton = document.getElementById('guess-button');
const guessInput = document.getElementById('guess-input');
const resultDiv = document.getElementById('result');

// Function to handle the guess submission
function submitGuess() {
    let guess = guessInput.value;

    // Validate input
    if (!/^[1-9]{4}$/.test(guess) || new Set(guess).size !== 4) {
        alert('Please enter a 4-digit number with unique digits from 1-9.');
        return;
    }

    attempts++;
    let result = getCowsAndBulls(guess, secretNumber);
    displayGuess(guess, result);

    if (result.bulls === 4) {
        resultDiv.innerText = '🎉 Congratulations! You guessed the number!';
        endGame();
    } else if (attempts >= maxAttempts) {
        resultDiv.innerText = `😞 Game Over! The number was ${secretNumber}`;
        endGame();
    }

    guessInput.value = '';
}

// Event listener for the "Guess" button
guessButton.addEventListener('click', submitGuess);

// Event listener for the Enter key
guessInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        submitGuess();
    }
});

function getCowsAndBulls(guess, secret) {
    let cows = 0;
    let bulls = 0;
    for (let i = 0; i < 4; i++) {
        if (guess[i] === secret[i]) {
            bulls++;
        } else if (secret.includes(guess[i])) {
            cows++;
        }
    }
    return { cows, bulls };
}

function displayGuess(guess, result) {
    const guessesDiv = document.getElementById('guesses');
    const guessRow = document.createElement('div');
    guessRow.className = 'guess-row';

    // Display the guess circles
    for (let i = 0; i < 4; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.innerText = guess[i];
        guessRow.appendChild(circle);
    }

    // Display the result next to the guess
    const resultElement = document.createElement('div');
    resultElement.className = 'result';
    resultElement.innerText = `${result.cows}C ${result.bulls}B`;
    guessRow.appendChild(resultElement);

    guessesDiv.appendChild(guessRow);
}

function endGame() {
    guessInput.disabled = true;
    guessButton.disabled = true;
}

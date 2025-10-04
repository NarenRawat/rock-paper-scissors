let playerScore = 0;
let computerScore = 0;

let choiceResetTimer = null;
let gameOver = false;


const divPlayerScore = document.querySelector("#player-score");
const divComputerScore = document.querySelector("#computer-score");

const divPlayerChoice = document.querySelector("#player-choice");
const divComputerChoice = document.querySelector("#computer-choice");

const buttons = document.querySelector(".buttons");
buttons.addEventListener("click", event => {
    if (["rock", "paper", "scissors"].includes(event.target.id)) {
        playRound(event.target.id, getComputerChoice());
    }
});

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", resetGame);


function resetGame() {
    playerScore = 0;
    computerScore = 0;
    gameOver = false;

    divPlayerChoice.textContent = "?";
    divComputerChoice.textContent = "?";

    divPlayerScore.textContent = `You: ${playerScore}`;
    divComputerScore.textContent = `Computer: ${computerScore}`;


    if (choiceResetTimer) {
        clearTimeout(choiceResetTimer);
        choiceResetTimer = null;
    }
}

function getComputerChoice() {
    const choice = Math.floor(Math.random() * 3);
    return ["rock", "paper", "scissors"][choice];
}

function getRoundWinner(playerChoice, computerChoice) {
    switch (playerChoice) {
        case "rock":
            switch (computerChoice) {
                case "paper":
                    return "computer";
                    break;
                case "scissors":
                    return "player";
                    break;
            }
            break;
        case "paper":
            switch (computerChoice) {
                case "scissors":
                    return "computer";
                    break;
                case "rock":
                    return "player";
                    break;
            }
            break;
        case "scissors":
            switch (computerChoice) {
                case "rock":
                    return "computer";
                    break;
                case "paper":
                    return "player";
                    break;
            }
            break;
    }

    return "draw";
}

function playRound(playerChoice, computerChoice) {
    if (playerScore >= 5 || computerScore >= 5) {
        return;
    }
    if (choiceResetTimer) {
        return;
    }

    divPlayerChoice.textContent = getChoiceIcon(playerChoice);
    divComputerChoice.textContent = getChoiceIcon(computerChoice);


    switch (getRoundWinner(playerChoice, computerChoice)) {
        case "computer":
            computerScore++;
            break;
        case "player":
            playerScore++;
            break;
    }

    divPlayerScore.textContent = `You: ${playerScore}`;
    divComputerScore.textContent = `Computer: ${computerScore}`;

    if (playerScore >= 5 || computerScore >= 5) {
        gameOver = true;
    }

    choiceResetTimer = setTimeout(() => {
        divPlayerChoice.textContent = gameOver ? (playerScore === 5 ? "Win" : "Lose"): "?";
        divComputerChoice.textContent = gameOver ? (computerScore === 5 ? "Win" : "Lose"): "?";
        choiceResetTimer = null;
    }, 1500);
}

function getChoiceIcon(choice) {
    switch (choice) {
        case "rock":
            return "✊";
        case "paper":
            return "🖐️";
        case "scissors":
            return "✌️";
    }
}
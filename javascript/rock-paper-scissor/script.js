console.clear();

const getComputerChoice = () => {
    const val = ['rock', 'paper', 'scissor'];
    let num = Math.floor(Math.random() * 3);
    return val[num];
};

const getHumanChoice = () => {
    return new Promise((resolve) => {
        const btns = document.querySelectorAll('button');
        btns.forEach((btn) => {
            btn.addEventListener('click', () => {
                resolve(btn.id); // Resolve the promise with the button's ID
            }, { once: true }); // Ensure the event listener is triggered only once
        });
    });
};

const updateHumanScore = (score) => {
    let playerScore = document.querySelector('h4');
    playerScore.innerText = score;
};

const updateComputerScore = (score) => {
    let computerScore = Array.from(document.querySelectorAll('h4'))[1];
    computerScore.innerText = score;
};

const printResult = (humanScore, computerScore) => {
    if (humanScore > computerScore)
        return "Congrats! You beat the CPU."
    else if (humanScore < computerScore)
        return "Sorry! You lost."
    else
        return "It's a Tie!"
}

const playGame = async () => {
    let humanScore = 0;
    let computerScore = 0;

    const playRound = (humanChoice, computerChoice) => {
        if (humanChoice === computerChoice) {
            return `It's a Draw!`;
        } else if (humanChoice === 'rock' && computerChoice === 'scissor') {
            humanScore += 1;
            updateHumanScore(humanScore);
            return `You win! Rock beats Scissor`;
        } else if (humanChoice === 'scissor' && computerChoice === 'rock') {
            computerScore += 1;
            updateComputerScore(computerScore);
            return `You lost! Rock beats Scissor`;
        } else if (humanChoice === 'paper' && computerChoice === 'scissor') {
            computerScore += 1;
            updateComputerScore(computerScore);
            return `You lost! Scissor beats Paper`;
        } else if (humanChoice === 'scissor' && computerChoice === 'paper') {
            humanScore += 1;
            updateHumanScore(humanScore);
            return `You won! Scissor beats Paper`;
        } else if (humanChoice === 'rock' && computerChoice === 'paper') {
            computerScore += 1;
            updateComputerScore(computerScore);
            return `You lost! Paper beats Rock`;
        } else {
            humanScore += 1;
            updateHumanScore(humanScore);
            return `You won! Paper beats Rock`;
        }
    };

    for (let index = 0; index < 5; index++) {
        const humanSelection = await getHumanChoice(); // Wait for user input
        const computerSelection = getComputerChoice();
        const roundResult = playRound(humanSelection, computerSelection);

        const result = document.querySelector('.result');
        result.innerText = roundResult;
    }

    return [humanScore, computerScore]
}


async function asyncCaller(params) {
    let [humanScore, computerScore] = await playGame()
    result = document.querySelector('.result')
    result.innerText = printResult(humanScore, computerScore)
}

asyncCaller()
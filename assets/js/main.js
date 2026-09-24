const rollBtn = document.getElementById('roll-btn');
const playerDiceEl = document.getElementById('player-dice');
const computerDiceEl = document.getElementById('computer-dice');
const playerSumEl = document.getElementById('player-sum');
const computerSumEl = document.getElementById('computer-sum');
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const roundResultEl = document.getElementById('round-result');
const gameMessageEl = document.getElementById('game-message');

let playerScore = 0;
let computerScore = 0;
const WINNING_SCORE = 5;

// Simulerer et kast med 5 sekssidede terninger og returnerer både de
// enkelte kast og deres samlede sum. Bruges til både spilleren og
// computeren, så al tilfældighed i spillet går igennem denne ene funktion.
function rollFiveDice() {
  const rolls = [];
  for (let i = 0; i < 5; i++) {
    rolls.push(Math.floor(Math.random() * 6) + 1);
  }
  const sum = rolls.reduce((total, roll) => total + roll, 0);
  return { rolls, sum };
}

// Afvikler én runde: slår terninger for spiller og computer, opdaterer
// visningen af terninger/summer, sammenligner de to summer for at afgøre
// rundens udfald (sejr, tab eller uafgjort) og opdaterer scoren derefter.
// Dette er spillets hovedfunktion, den kaldes hver gang der klikkes på knappen.
function playRound() {
  const player = rollFiveDice();
  const computer = rollFiveDice();

  playerDiceEl.textContent = player.rolls.join(', ');
  computerDiceEl.textContent = computer.rolls.join(', ');
  playerSumEl.textContent = player.sum;
  computerSumEl.textContent = computer.sum;

  if (player.sum > computer.sum) {
    playerScore += 1;
    roundResultEl.textContent = 'Spilleren vinder runden!';
  } else if (computer.sum > player.sum) {
    computerScore += 1;
    roundResultEl.textContent = 'Computeren vinder runden!';
  } else {
    playerScore += 0.5;
    computerScore += 0.5;
    roundResultEl.textContent = 'Uafgjort i denne runde.';
  }

  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;

  checkGameOver();
}

// Tjekker om en af siderne har nået vinderscoren (5 point).
// Hvis det er tilfældet, annonceres den samlede vinder, og
// knappen deaktiveres, så der ikke kan spilles flere runder.
function checkGameOver() {
  if (playerScore >= WINNING_SCORE || computerScore >= WINNING_SCORE) {
    const winner = playerScore > computerScore ? 'Spilleren' : 'Computeren';
    gameMessageEl.textContent = `${winner} har vundet spillet!`;
    rollBtn.disabled = true;
  }
}

// Starter en ny runde, hver gang spilleren klikker på knappen.
rollBtn.addEventListener('click', playRound);
/*----- constants -----*/
// 1.1 Define suits
const SUITS = ["s", "c", "d", "h"];

// 1.2 Define ranks
const RANKS = [
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

// 1.3 Define unshuffled original deck of cards
const ORIGINAL_DECK = buildOriginalDeck(SUITS, RANKS);

// 1.4 Define payout array of combination objects
const PAYOUT_ARR = [
  { combination: `ROYAL FLUSH`, p1: 250, p2: 500, p3: 750, p4: 1000, p5: 4000 },
  { combination: `STRAIGHT FLUSH`, p1: 50, p2: 100, p3: 150, p4: 200, p5: 250 },
  { combination: `FOUR OF A KIND`, p1: 25, p2: 50, p3: 75, p4: 100, p5: 125 },
  { combination: `FULL HOUSE`, p1: 9, p2: 18, p3: 27, p4: 36, p5: 45 },
  { combination: `FLUSH`, p1: 6, p2: 12, p3: 18, p4: 24, p5: 30 },
  { combination: `STRAIGHT`, p1: 4, p2: 8, p3: 12, p4: 16, p5: 20 },
  { combination: `THREE OF A KIND`, p1: 3, p2: 6, p3: 9, p4: 12, p5: 15 },
  { combination: `TWO PAIR`, p1: 2, p2: 4, p3: 6, p4: 8, p5: 10 },
  { combination: `JACKS OR BETTER`, p1: 1, p2: 2, p3: 3, p4: 4, p5: 5 },
];

// 1.5 Define available options for coin value
const COIN_VALUES = [0.25, 0.5, 1, 5];

/*----- app's state (variables) -----*/
// 2.1. Use a player's credit balance variable to keep track of the player's available credits.
let creditBalance;

// 2.2. Use a coin value variable to store chosen coin value.
let coinValue;

// 2.3 Use a bet amount variable to store the current bet amount.
let betAmount;

// 2.4. Use a hand array to represent the player's current hand and whether the player's card is locked (card on hold) or not. The hand will contain card objects from the deck.
let hand = [];

// 2.5. inHand variable determines if a player is playing the hand at the moment (true) or deciding on bet (false)
let inHand;

// 2.6. shuffledDeck variable stores a shuffled deck, excluding cards that have already been dealt or drawn
let shuffledDeck = [];

// 2.7 The dealDrawButtonValue variable stores a caption for an alternating button labeled either 'DEAL' or 'DRAW,' depending on whether a player is in possession of cards (in Hand) or not
let dealDrawButtonValue;

// 2.8 The cardEls variable stores card elements. It cannot be declared in 'cached element references' since the card elements are being dynamically changed
let cardEls;

// 2.9 The variable stores the final winning combination after the hand has been assessed.
let winningCombination;

// 2.10 The variable stores the count of the rounds (hands) within the same game. It is required to determine if it is a first round or not.
let roundCount;

// 2.11 The variable stores the credit score of an individual win round.
let winResult;

// 2.12 The virable stores the end of game text (GAME OVER or TRY ANOTHER BET)
let endOfGameText;

/*----- cached element references -----*/
// 3.1. Store one element that represents the cards-container section.
const cardsContainerEl = document.querySelector(".cards-container");

// 3.2. Store element that represents the Bet Amount display
const betDisplayEl = document.getElementById("bet-display");

// 3.3. Store three elements that represent Bet Input controls.
const betPlusEl = document.getElementById("bet-plus");
const betMinusEl = document.getElementById("bet-minus");
const betInputEl = document.getElementById("bet-input");

// 3.4. Store one element that represents the Max Bet Button.
const maxBetEl = document.getElementById("max-bet");

// 3.5. Store one element that represents the Paytable Display.
const payTableEl = document.getElementById("pay-table");

// 3.6. Store one element that represents the Balance Display.
const balanceDisplayEl = document.getElementById("balance-display");

// 3.7. Store one element that represents the Result Display of each round.
const resultDisplayEl = document.getElementById("result-display");

// 3.8. Store one element that represents the Replay button.
const replayButtonEl = document.getElementById("replay");

// 3.9. Store one element that represents the Coin Value button.
const coinValueEl = document.getElementById("coin-value");

// 3.10. Store one element that represents the Deal/Draw button.
const dealDrawEl = document.getElementById("deal-draw");

// 3.11. Store one element that represent the holds-container section.
const holdsContainerEl = document.querySelector(".holds-container");

// 3.12. Store one element that represents the winning Card combination played.
const winningCombPlayedEl = document.getElementById(
  "winning-card-combination-played"
);

// 3.13. Store one element that represents the "Play X credits" message appearing over the screen elements at the beginning of each round and at the end of the Game.
const gameStatusTextEl = document.getElementById("game-status");

/*----- event listeners -----*/

// 5.1. Handle a player clickings a Card. The function is inside renderHoldsContainer() since the card elements are dynamically changed within container

// 5.2. Handle a player clickings "+"/"-" buttons for the bet amount.
function handleClickBetPlus() {
  if (betAmount < 5) betAmount++;
  endOfGameText = checkEndOfGame();
  render();
}

function handleClickBetMinus() {
  if (betAmount > 1) betAmount--;
  endOfGameText = checkEndOfGame();
  render();
}

// 5.3. Handle a player clickings the Max Bet Button.
function handleClickMaxBet() {
  betAmount = 5;
  endOfGameText = checkEndOfGame();
  render();
}

// 5.4. Handle a player clickings the Coin Value button.
function handleClickCoinValue() {
  for (let i = 0; i < COIN_VALUES.length; i++) {
    if (COIN_VALUES[i] === coinValue) {
      if (i !== COIN_VALUES.length - 1) {
        coinValue = COIN_VALUES[i + 1];
      } else {
        coinValue = COIN_VALUES[0];
      }
      break;
    }
  }
  endOfGameText = checkEndOfGame();
  render();
}

// 5.5. Handle a player clickings the Deal/Draw button.
function handleClickDealDraw() {
  if (dealDrawButtonValue === `DRAW`) {
    drawFromShuffledDeck();
    winningCombination = getWinningCombination(hand);
    winResult = getwinResult(winningCombination);
    creditBalance += winResult * coinValue;
    endOfGameText = checkEndOfGame();
    roundCount++;
    inHand = false;
    dealDrawButtonValue = `DEAL`;
  } else if (dealDrawButtonValue === `DEAL`) {
    creditBalance -= betAmount * coinValue;
    winResult = null;
    // Create a copy of the originalDeck (leave originalDeck untouched!)
    shuffledDeck = getNewShuffledDeck();
    // Getting Hand
    DealFromShuffledDeck();
    dealDrawButtonValue = `DRAW`;
    inHand = true;
  }
  render();
}

// 6. Handle a player clickings the Replay button:
function handleClickReplay() {
  //6.1. Do steps 4.1 (initialize the state variables) and 4.2 (render).
  init();
  render();
}

/*----- functions -----*/

//4.1. Initialize the state variables:
function init() {
  // 4.1.1. Initialize the player's credit balance to a starting amount of $100.
  creditBalance = 100;

  // 4.1.2. Set the coin value to a default value of $1.
  if (!coinValue) coinValue = COIN_VALUES[2];

  // 4.1.3. Set the bet amount to a default value of one.
  if (!betAmount) betAmount = 1;

  // 4.1.4. Create a shuffled copy of the originalDeck (leave originalDeck untouched!)
  shuffledDeck = getNewShuffledDeck();

  // 4.1.5. Getting Hand from shuffledDeck
  DealFromShuffledDeck();

  // 4.1.6. Setting initial caption of "DEAL" for the Deal/Draw button
  dealDrawButtonValue = `DEAL`;

  //4.1.7 Setting the winning Card combination played to empty string.
  winningCombination = ``;

  //4.1.8 Setting the count of the rounds (hands) to 0.
  roundCount = 0;

  //4.1.9 Setting the endOfGameText to empty string.
  endOfGameText = ``;

  //4.1.10 Setting the inHand variable to false (a player is not playing a hand).
  inHand = false;

  //4.1.11 Setting up six listeners for REPLAY button, +/- Bet buttons, Coin  Value button, BET MAX button and DEAL/DRAW button.
  replayButtonEl.addEventListener("click", handleClickReplay);
  betMinusEl.addEventListener("click", handleClickBetMinus);
  betPlusEl.addEventListener("click", handleClickBetPlus);
  coinValueEl.addEventListener("click", handleClickCoinValue);
  maxBetEl.addEventListener("click", handleClickMaxBet);
  dealDrawEl.addEventListener("click", handleClickDealDraw);

  //4.2 Render those state variables to the page
  render();
}

function render() {
  renderPayTable();
  renderWinningCombPlayed();
  rendergameStatusText();
  renderCardsContainer();
  renderHoldsContainer();
  renderDisplayLineContainer();
  renderButtonsContainer();
}

function renderPayTable() {
  payTableEl.innerHTML = "";
  // Let's build the Payout Table as a string of HTML
  let payTableHtml = "";
  let payoutColumnChosenEls;
  PAYOUT_ARR.forEach(function (arrItem) {
    payTableHtml += `<tr>`;
    for (let key in arrItem) {
      if (Number(arrItem[key])) {
        payTableHtml += `<td class="payout-column">${arrItem[key]}</td>`;
      } else {
        payTableHtml += `<td class="poker-hands-column">${arrItem[key]}</td>`;
      }
    }
    payTableHtml += `</tr>`;
  });
  payTableEl.innerHTML = payTableHtml;
  payoutColumnChosenEls = document.querySelectorAll(
    `td:nth-child(${betAmount + 1})`
  );
  payoutColumnChosenEls.forEach((payoutColumnChosenEl) => {
    payoutColumnChosenEl.style.backgroundColor = `red`;
  });
}

function renderWinningCombPlayed() {
  //Output played winning combination if applicable
  if (!inHand) {
    winningCombPlayedEl.innerText = winningCombination;
  } else {
    winningCombPlayedEl.innerText = ``;
  }
}

function rendergameStatusText() {
  if (!inHand) {
    if (betAmount === 1) {
      gameStatusTextEl.innerText = `PLAY ${betAmount} CREDIT`;
    } else if (endOfGameText) {
      gameStatusTextEl.innerText = endOfGameText;
    } else {
      gameStatusTextEl.innerText = `PLAY ${betAmount} CREDITS`;
    }
  } else {
    gameStatusTextEl.innerText = ``;
  }
}

function renderCardsContainer() {
  getDeckInContainer(hand, cardsContainerEl);
}

function renderHoldsContainer() {
  //addingEventListeners for the card elements
  const cardEls = document.querySelectorAll(".cards-container > div");
  if (inHand) {
    cardEls.forEach((card, index) => {
      // 5.1. Handle a player clickings a Card. The function is inside renderHoldsContainer() since the card elements are dynamically changed within container
      card.addEventListener(`click`, () => {
        if (hand[index].hold) {
          hand[index].hold = false;
        } else {
          hand[index].hold = true;
        }
        render();
      });
    });
  }
  holdsContainerEl.innerHTML = "";
  // Let's build the holds as a string of HTML
  let holdsHtml = "";
  hand.forEach(function (card) {
    if (card.hold) {
      holdsHtml += `<div>HOLD</div>`;
    } else {
      holdsHtml += `<div></div>`;
    }
  });
  holdsContainerEl.innerHTML = holdsHtml;
}

function renderDisplayLineContainer() {
  balanceDisplayEl.innerText = `CREDIT: $${creditBalance}`;
  betDisplayEl.innerText = `BET ${betAmount}`;
  if (winResult) {
    resultDisplayEl.innerText = `WIN ${winResult}`;
  } else resultDisplayEl.innerText = ``;
}

function renderButtonsContainer() {
  //set bet input value
  betInputEl.innerText = `BET ${betAmount}`;
  coinValueEl.innerText = `$${coinValue}`;
  dealDrawEl.innerText = dealDrawButtonValue;
  if (inHand) {
    betMinusEl.setAttribute(`disabled`, `true`);
    betPlusEl.setAttribute(`disabled`, `true`);
    coinValueEl.setAttribute(`disabled`, `true`);
    maxBetEl.setAttribute(`disabled`, `true`);
  } else {
    if (endOfGameText === "GAME OVER") {
      betMinusEl.setAttribute(`disabled`, `true`);
      betPlusEl.setAttribute(`disabled`, `true`);
      coinValueEl.setAttribute(`disabled`, `true`);
      maxBetEl.setAttribute(`disabled`, `true`);
      dealDrawEl.setAttribute(`disabled`, `true`);
    } else if (endOfGameText === "TRY ANOTHER BET") {
      betMinusEl.removeAttribute(`disabled`);
      betPlusEl.removeAttribute(`disabled`);
      coinValueEl.removeAttribute(`disabled`);
      maxBetEl.removeAttribute(`disabled`);
      dealDrawEl.setAttribute(`disabled`, `true`);
    } else {
      betMinusEl.removeAttribute(`disabled`);
      betPlusEl.removeAttribute(`disabled`);
      coinValueEl.removeAttribute(`disabled`);
      maxBetEl.removeAttribute(`disabled`);
      dealDrawEl.removeAttribute(`disabled`);
    }
  }
}

function getDeckInContainer(deck, container) {
  container.innerHTML = "";
  // Let's build the cards as a string of HTML
  let cardsHtml = "";
  deck.forEach(function (card) {
    if (roundCount === 0 && !inHand) {
      cardsHtml += `<div class="card back-red"></div>`;
    } else {
      cardsHtml += `<div class="card ${card.face}"></div>`;
    }
  });
  container.innerHTML = cardsHtml;
}

function buildOriginalDeck(suitsArr, ranksArr) {
  const deck = [];
  // Use nested forEach to generate card objects
  suitsArr.forEach(function (suit) {
    ranksArr.forEach(function (rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        suit,
        rank,
        // Setting the 'hold' property for game of jacks or better
        hold: false,
      });
    });
  });
  return deck;
}

function getNewShuffledDeck() {
  // Create a copy of the originalDeck (leave originalDeck untouched!)
  const tempDeck = [...ORIGINAL_DECK];
  const newShuffledDeck = [];

  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
}

function DealFromShuffledDeck() {
  hand.forEach((card) => {
    card.hold = false;
  });
  hand = [];
  for (let i = 0; i < 5; i++) {
    hand.push(shuffledDeck.splice(0, 1)[0]);
  }
}

function drawFromShuffledDeck() {
  hand.forEach((card, index) => {
    if (!card.hold) {
      hand.splice(index, 1, shuffledDeck.splice(0, 1)[0]);
    }
  });
}

function getWinningCombination(cards) {
  // Count the occurrences of each rank and suit
  const rankCounts = {};
  const suitCounts = {};
  cards.forEach((card) => {
    rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
    suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
  });

  // Check for all nine winning combinations, in order of highest to lowest score
  if (
    rankCounts["10"] === 1 &&
    rankCounts["J"] === 1 &&
    rankCounts["Q"] === 1 &&
    rankCounts["K"] === 1 &&
    rankCounts["A"] === 1 &&
    isSameSuit(cards)
  ) {
    // Royal Flush
    return PAYOUT_ARR[0].combination;
  } else if (
    rankCounts["10"] === 1 &&
    rankCounts["J"] === 1 &&
    rankCounts["Q"] === 1 &&
    rankCounts["K"] === 1 &&
    rankCounts["A"] === 1
  ) {
    // Straight Flush
    return PAYOUT_ARR[1].combination;
  } else if (Object.values(rankCounts).some((count) => count === 4)) {
    // Four of a Kind
    return PAYOUT_ARR[2].combination;
  } else if (
    rankCounts["J"] === 2 &&
    rankCounts["Q"] === 2 &&
    rankCounts["K"] === 2
  ) {
    // Full House
    return PAYOUT_ARR[3].combination;
  } else if (Object.values(suitCounts).some((count) => count === 5)) {
    // Flush
    return PAYOUT_ARR[4].combination;
  } else if (
    (rankCounts["10"] === 1 &&
      rankCounts["J"] === 1 &&
      rankCounts["Q"] === 1 &&
      rankCounts["K"] === 1 &&
      rankCounts["A"] === 1) ||
    (rankCounts["2"] === 1 &&
      rankCounts["3"] === 1 &&
      rankCounts["4"] === 1 &&
      rankCounts["5"] === 1 &&
      rankCounts["A"] === 1)
  ) {
    // Straight
    return PAYOUT_ARR[5].combination;
  } else if (
    rankCounts["J"] === 3 ||
    rankCounts["Q"] === 3 ||
    rankCounts["K"] === 3 ||
    rankCounts["A"] === 3
  ) {
    // Three of a Kind
    return PAYOUT_ARR[6].combination;
  } else if (rankCounts["J"] === 2 && rankCounts["Q"] === 2) {
    // Two Pair
    return PAYOUT_ARR[7].combination;
  } else if (
    rankCounts["J"] === 2 ||
    rankCounts["Q"] === 2 ||
    rankCounts["K"] === 2 ||
    rankCounts["A"] === 2
  ) {
    // One Pair of Jacks or Better
    return PAYOUT_ARR[8].combination;
  } else {
    // No winning combination
    return ``;
  }
}
function getwinResult(winComb) {
  if (winComb) {
    let result;
    PAYOUT_ARR.forEach((item) => {
      if (item.combination === winComb) {
        result = item[`p${betAmount}`];
      }
    });
    return result;
  } else {
    result = 0;
    return result;
  }
}

// Helper function to check if all cards have the same suit
function isSameSuit(cards) {
  const firstSuit = cards[0].suit;
  return cards.every((card) => card.suit === firstSuit);
}

function checkEndOfGame() {
  let minCoinValue = COIN_VALUES[0];
  for (let i = 0; i < COIN_VALUES.length; i++) {
    if (COIN_VALUES[i] < minCoinValue) {
      minCoinValue = COIN_VALUES[i];
    }
  }
  if (creditBalance - minCoinValue < 0) {
    return `GAME OVER`;
  } else if (creditBalance - betAmount * coinValue < 0) {
    return `TRY ANOTHER BET`;
  } else {
    return ``;
  }
}

/*----- Start game -----*/

init();

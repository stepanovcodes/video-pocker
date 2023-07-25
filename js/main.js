console.log(`JS loaded`);

/*----- constants -----*/
// Define suits
const SUITS = ["s", "c", "d", "h"];

// Define ranks
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

// Define unshuffled original deck of cards
const ORIGINAL_DECK = buildOriginalDeck(SUITS, RANKS);
// console.log(ORIGINAL_DECK);

//Define payout array of combination objects
const PAYOUT_ARR = [
  { combination: `ROYAL FLUSH`, 1: 250, 2: 500, 3: 750, 4: 1000, 5: 4000 },
  { combination: `STRAIGHT FLUSH`, 1: 50, 2: 100, 3: 150, 4: 200, 5: 250 },
  { combination: `FOUR OF A KIND`, 1: 25, 2: 50, 3: 75, 4: 100, 5: 125 },
  { combination: `FULL HOUSE`, 1: 9, 2: 18, 3: 27, 4: 36, 5: 45 },
  { combination: `FLUSH`, 1: 6, 2: 12, 3: 18, 4: 24, 5: 30 },
  { combination: `STRAIGHT`, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20 },
  { combination: `THREE OF A KIND`, 1: 3, 2: 6, 3: 9, 4: 12, 5: 15 },
  { combination: `TWO PAIR`, 1: 2, 2: 4, 3: 6, 4: 8, 5: 10 },
  { combination: `JACKS OR BETTER`, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 },
];

// Define available options for coin value
const COIN_VALUES = [0.25, 0.5, 1, 5];

/*----- app's state (variables) -----*/
// 2.1. Use a player's credit balance variable to keep track of the player's available credits.
let creditBalance;

// 2.2. Use a coin value variable to store chosen coin value.
let coinValue;

// 2.3 Use a bet amount variable to store the current bet amount.
let betAmount;

// 2.4. Use a hand array to represent the player's current hand. The hand will contain card objects from the deck.
// 2.5. Use a boolean variable to track whether the player's hand is locked (cards on hold) or not.
let handArr = [];

/*----- cached element references -----*/
// 3.1. Store one element that represents the cards-container section.
const cardsContainerEl = document.querySelector(".cards-container");

// 3.2. Store one element that represents the Game Over text.
const gameOverEl = document.getElementById("game-over");

// 3.3. Store two elements that represent the Bet Amount display, and the Bet Input control.
const betDisplayEl = document.getElementById("bet-display");
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

// 3.9. Store one element that represents the Sound Toggle.
const soundToggleEl = document.getElementById("sound");

// 3.10. Store one element that represents the Coin Value image.
const coinValueEl = document.getElementById("coin-value");

// 3.11. Store one element that represents the Deal/Draw button.
const dealDrawEl = document.getElementById("deal-draw");

// 3.12. Store one element that represent the holds-container section.
const holdContainerEl = document.querySelector(".holds-container");

// 3.13. Store one element that represents the winning Card combination played.
const winningCombPlayedEl = document.getElementById(
  "winning-card-combination-played"
);

// 3.14. Store one element that represents the "Play X credits" message appearing over the screen elements at the beginning of each round.
// const playXCreditsEl = document.getElementById("play-x-credits");
// console.log(playXCreditsEl);

/*----- event listeners -----*/

/*----- functions -----*/

function buildOriginalDeck(suitsArr, ranksArr) {
  const deck = [];
  // Use nested forEach to generate card objects
  suitsArr.forEach(function (suit) {
    ranksArr.forEach(function (rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
        // value: Number(rank) || (rank === "A" ? 11 : 10),
      });
    });
  });
  //   console.log(deck);
  return deck;
}

function renderNewShuffledDeck() {
  // Create a copy of the originalDeck (leave originalDeck untouched!)
  shuffledDeck = getNewShuffledDeck();
  //   console.log(shuffledDeck);
  renderDeckInContainer(shuffledDeck, cardsContainerEl);
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

function renderDeckInContainer(deck, container) {
  container.innerHTML = "";
  // Let's build the cards as a string of HTML
  let cardsHtml = "";
  deck.forEach(function (card) {
    cardsHtml += `<div class="card ${card.face}"></div>`;
    // cardsHtml += `<div class="card back-red"></div>`;
  });
  // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup
  // const cardsHtml = deck.reduce(function(html, card) {
  //   return html + `<div class="card ${card.face}"></div>`;
  // }, '');
  container.innerHTML = cardsHtml;
}

/*----- Start game -----*/

// renderNewShuffledDeck();

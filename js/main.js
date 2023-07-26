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
let hand = [];
let inHand;

let shuffledDeck = [];

let dealDrawButtonValue;

let cardEls;

/*----- cached element references -----*/
// 3.1. Store one element that represents the cards-container section.
const cardsContainerEl = document.querySelector(".cards-container");

// console.log(cardEls);

// 3.2. Store one element that represents the Game Over text.
const gameOverEl = document.getElementById("game-over");

// 3.3. Store two elements that represent the Bet Amount display, and the Bet Input control.
const betDisplayEl = document.getElementById("bet-display");
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
const playXCreditsEl = document.getElementById("play-x-credits");
// console.log(playXCreditsEl);

/*----- event listeners -----*/

// 5.1. Handle a player clickings a Card.

// 5.2. Handle a player clickings "+"/"-" buttons for the bet amount.
function handleClickBetPlus() {
  if (betAmount < 5) betAmount++;
  render();
}
function handleClickBetMinus() {
  if (betAmount > 1) betAmount--;
  render();
}

// 5.3. Handle a player clickings the Max Bet Button.
function handleClickMaxBet() {
  betAmount = 5;
  render();
}

// 5.4. Handle a player clickings the Sound Toggle.

// 5.5. Handle a player clickings the Coin Value image.
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
  render();
}

// 5.6. Handle a player clickings the the Deal/Draw button.
function handleClickDealDraw() {
  inHand = true;

  if (dealDrawButtonValue === `DRAW`) {
    DrawFromShuffledDeck() ;
    dealDrawButtonValue = `DEAL`;
  } else if (dealDrawButtonValue === `DEAL`) {
    dealDrawButtonValue = `DRAW`;
  }
  render();
}

// 6. Handle a player clickings the Replay button:
function handleClickReplay() {
  init();
  render();
}

/*----- functions -----*/
function init() {
  // 4.1.1. Initialize the player's credit balance to a starting amount of $100.
  creditBalance = 100;

  // 4.1.2. Set the coin value to a default value of 0.25 cents.
  if (!coinValue) coinValue = COIN_VALUES[2];
  //   console.log(coinValue);
  // 4.1.3. Set the bet amount to a default value of one.
  if (!betAmount) betAmount = 1;

  // Create a copy of the originalDeck (leave originalDeck untouched!)
  shuffledDeck = getNewShuffledDeck();
  // Getting Hand
  DealFromShuffledDeck();

  dealDrawButtonValue = `DEAL`;

  betMinusEl.addEventListener("click", handleClickBetMinus);
  betPlusEl.addEventListener("click", handleClickBetPlus);
  replayButtonEl.addEventListener("click", handleClickReplay);
  maxBetEl.addEventListener("click", handleClickMaxBet);
  coinValueEl.addEventListener("click", handleClickCoinValue);
  dealDrawEl.addEventListener("click", handleClickDealDraw);

  inHand = false;

  render();
}

function render() {
  renderPayTable();
  renderWinningCombPlayed();
  renderCardsContainer();
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
        // console.log(arrItem[key], true);
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
    winningCombPlayedEl.innerText = PAYOUT_ARR[6].combination;

    if (betAmount === 1) {
      playXCreditsEl.innerText = `PLAY ${betAmount} CREDIT`;
    } else {
      playXCreditsEl.innerText = `PLAY ${betAmount} CREDITS`;
    }
  } else {
    winningCombPlayedEl.innerText = ``;
    playXCreditsEl.innerText = ``;
  }
}

function renderHoldsContainer() {
  const cardEls = document.querySelectorAll(".cards-container > div");
  if (inHand) {
    cardEls.forEach((card, index) => {
      card.addEventListener(`click`, () => {
        if (hand[index].hold) {
          hand[index].hold = false;
        } else {
          hand[index].hold = true;
        }
        // console.log(index, hand[index]);
        render();
      });
    });
  }
  //   } else {
  //     cardEls.forEach((card, index) => {
  //       card.removeEventListener(`click`, () => {
  //         if (hand[index].hold) {
  //           hand[index].hold = false;
  //         } else {
  //           hand[index].hold = true;
  //         }
  //         console.log(index, hand[index]);
  //       });
  //     });
  //   }

  holdContainerEl.innerHTML = "";
  // Let's build the cards as a string of HTML
  let holdsHtml = "";
  hand.forEach(function (card) {
    // console.log(card);
    if (inHand) {
      if (card.hold) {
        holdsHtml += `<div>HOLD</div>`;
      } else {
        holdsHtml += `<div></div>`;
      }
    }
  });
  holdContainerEl.innerHTML = holdsHtml;
}

function renderCardsContainer() {
  renderDeckInContainer(hand, cardsContainerEl);
  renderHoldsContainer();
}

function renderDisplayLineContainer() {
  balanceDisplayEl.innerText = `CREDIT: $${creditBalance}`;
  betDisplayEl.innerText = `BET ${betAmount}`;
  resultDisplayEl.innerText = `WIN 15`;
}

function renderButtonsContainer() {
  //set bet input value
  betInputEl.innerText = `BET ${betAmount}`;
  coinValueEl.innerText = `COIN $${coinValue}`;
  dealDrawEl.innerText = dealDrawButtonValue;
  if (inHand) {
    betMinusEl.setAttribute(`disabled`, `true`);
    betPlusEl.setAttribute(`disabled`, `true`);
    coinValueEl.setAttribute(`disabled`, `true`);
    maxBetEl.setAttribute(`disabled`, `true`);
  } else {
    betMinusEl.removeAttribute(`disabled`);
    betPlusEl.removeAttribute(`disabled`);
    coinValueEl.removeAttribute(`disabled`);
    maxBetEl.removeAttribute(`disabled`);
  }
}

function renderDeckInContainer(deck, container) {
  container.innerHTML = "";
  // Let's build the cards as a string of HTML
  let cardsHtml = "";
  deck.forEach(function (card) {
    if (inHand) {
      cardsHtml += `<div class="card ${card.face}"></div>`;
    } else {
      cardsHtml += `<div class="card back-red"></div>`;
    }
  });
  // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup
  // const cardsHtml = deck.reduce(function(html, card) {
  //   return html + `<div class="card ${card.face}"></div>`;
  // }, '');
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
  //   console.log(deck);
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
  // console.log();
  hand = [];
  for (let i = 0; i < 5; i++) {
    hand.push(shuffledDeck.splice(0, 1)[0]);
    // console.log(hand[i]);
  }
}

function DrawFromShuffledDeck() {
    // console.log();
    hand.forEach( (card,index) => {
      if (!card.hold)   {
      hand.splice(index, 1, shuffledDeck.splice(0, 1)[0]);
      }
    console.log (hand[index]);
    });
  }

/*----- Start game -----*/

init();

// renderNewShuffledDeck();

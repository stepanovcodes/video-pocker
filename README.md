# Video-Poker (Jacks or Better)
Individual Project 1 at General Assembly bootcamp

Student name: Aleksandr (Alex) Stepanov

## Video Poker (Jacks or Better) - Description of the Game

Jacks or Better is a popular video poker game that is based on the traditional five-card draw poker. The game is played on a digital screen, usually found in casinos or online gaming platforms. The objective of the game is to form the best possible poker hand by holding and discarding cards from the initial five-card hand dealt.

The history of Video Poker can be traced back to the early 1970s, making it one of the relatively newer casino games compared to traditional card games like poker. The game's origins are intertwined with the development of computer technology and the rise of the video slot machine.

## Screenshots

### Dektop version
![Video Poker Desktop](/assets/Jacks%20or%20Better%20desktop.png)

## Technology used
- HTML
- JavaScript
- CSS
- CSS framework [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- CSS [Card Deck library](css/card-library/css/cardstarter.css)
- Google font [Roboto](https://fonts.google.com/specimen/Roboto)

## Getting Started

Press the [Video Poker link](https://stepanovcodes.github.io/video-poker/) to start

__Choosing a Bet:__ the players selects a coin value and bet amount to wager per hand, which directly affect the payout for winning hands.

__Initial Hand:__ After pressing Deal button, the player is dealt a starting hand of five cards from a standard 52-card deck. The player can view their cards and decide which ones to keep and which ones to discard.

__Hold/Discard:__ After viewing the initial hand, the player has the option to hold any number of cards they wish to keep for the next Draw by clicking on the cards.

__Draw:__ Once the player has made their hold/discard decisions and pressed the Draw button, the discarded cards are replaced with new cards from the same deck to complete the final hand.

__Hand Ranking:__ The final hand is evaluated and ranked according to Jacks or Better hand rankings, such as pair of Jacks or better, two pair, three of a kind, straight, flush, full house, four of a kind, straight flush, and royal flush.

__Winning Hands:__ In Jacks or Better, the minimum winning hand required to receive a payout is a pair of Jacks or higher. Hands below a pair of Jacks do not qualify for a win.

__Payouts:__ The payout amounts for each winning hand are determined by the paytable. Higher-ranking hands offer higher payouts, with the royal flush being the highest-paying hand.

__Game Over:__ when the player's credit balance reaches zero and there is no available bet or coin value to make a bet, the game is considered "Game Over," and the player loses the ability to continue playing.

__Replay:__ the player can choose to restart playing at any time by pressing Replay button.

## Icebox Items

1. Building responsive design: Implementing a responsive layout to ensure the game works well on various screen sizes and devices.

2. Bug fixing of the logic that shows the message "TRY ANOTHER BET": Addressing any issues in the logic that displays the message to improve its functionality.

3. Payout table columns of the same width: Adjusting the layout of the payout table to ensure that all columns have the same width for a consistent appearance.

4. Disable hover for mobile devices: Preventing hover effects on mobile devices to enhance the user experience and avoid unintended actions.

5. Include audio for WIN outcomes: Adding sound effects to enhance player feedback and excitement when they win.

6. Include animation of cards being dealt, WIN result, and Balance Credit calculated: Introducing animations to create a more engaging and interactive gameplay experience.

7. Adding flashing to Deal button: Adding a flashing effect or visual feedback to the Deal button to attract attention and indicate its availability for the next round.


## Feedback on Game Made by the Instructor and the Peers

1. Might be cool to see a ‘video poker’ cabinet with a CRT bubble screen and maybe a filter to overlay to add a pixelated view.

2. Keep exploring your card evaluation system for win conditions - but overall very thoroughly impressive.

3. Consider migrating your core features of your game into discrete JS modules and import your modules on load. Allowing you to keep your JS script files smaller and more management for development.

4. Would love to see a more dynamic background.

5. Despite me really like the feel/UI, a modern version of it would be really cool. maybe a choice between the two.

6. Would love some in-game instructions for people like me who don’t know how to play poker.

7. Could add fun sound effects to go along with the beautiful graphics you already have.





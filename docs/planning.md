# Video Poker - Project 1 Planning

Student name: Aleksandr (Alex) Stepanov

## Game Choice - Video Poker (Jacks or Better)

The history of Video Poker can be traced back to the early 1970s, making it one of the relatively newer casino games compared to traditional card games like poker. The game's origins are intertwined with the development of computer technology and the rise of the video slot machine.

Video Poker gained popularity quickly, as it provided a combination of elements from slot machines and traditional poker. Players found it appealing due to the convenience of playing alone, with no need for interaction with other players or dealers.

### The game content includes the following elements:

1. __Cards:__ The game uses a standard deck of 52 playing cards, excluding jokers. The cards are ranked from 2 to Ace, and each card has a suit (hearts, diamonds, clubs, spades).

2. __Hand Rankings:__ The hand rankings in Jacks or Better follow standard poker hand values, with a pair of Jacks or higher being the minimum qualifying hand to win.

3. __User Interface:__ The game is presented with a graphical user interface (GUI) that displays the player's hand, the paytable, betting options, and game controls.

4. __Paytable:__ The paytable lists the payouts for different winning hands. It includes combinations such as Jacks or Better, Two Pair, Three of a Kind, Straight, Flush, Full House, Four of a Kind, Straight Flush, and Royal Flush.

5. __Bet Options:__ Players can choose the coin value and the number of coins they want to bet per hand.

6. __Deal:__ The game begins with the player being dealt five cards. The player can choose which cards to hold and which to discard.

7. __Draw:__ After selecting the cards to keep, the player clicks the "Draw" button to replace the discarded cards with new ones.

8. __Win Determination:__ The final hand is then evaluated, and the player is paid out according to the paytable if they have a qualifying hand.

9. __Winning Hands:__ The game's main objective is to achieve a winning hand based on the paytable. The lowest qualifying hand is a pair of Jacks or better, which yields a payout.

10. __Replay:__ Players have the option to play again after the current round is completed.

## A wireframe of your "main" game screen.
![Video Poker Wireframe](../assets/Video%20Poker%20Wireframe1.png)

## Pseudocode for the overall game play.

1. Define required constants:

    1.1. Define a deck of cards, represented as an array of card objects. Each card object will have properties like rank (2 to 10, J, Q, K, A) and suit (hearts, diamonds, clubs, spades).

    1.2. Define the payout array, which maps the winning hand combinations (e.g., Jacks or Better, Two Pair, Three of a Kind, etc.) to their respective payouts in credits:

    [[ROYAL FLUSH,        250,     500,     750,     1000,    4000],
    [STRAIGHT FLUSH,      50,      100,     150,     200,     250],
    [FOUR OF A KIND,      25,      50,      75,      100,     125],
    [FULL HOUSE,          9,       18,      27,      36,      45],
    [FLUSH,               5,       12,      18,      24,      30],
    [STRAIGHT,            4,       8,       12,      16,      20],
    [THREE OF A KIND,     3,       6,       9,       12,      15],
    [TWO PAIR,            2,       4,       6,       8,       10],
    [JACKS OR BETTER,     1,       2,       3,       4,       5]]

2. Define required variables used to track the state of the game:

    2.1. Use a player's credit balance variable to keep track of the player's available credits.

    2.2. Use a coin value variable to store chosen coin value.
    
    2.3 Use a bet amount variable to store the current bet amount.
    
    2.4. Use a hand array to represent the player's current hand. The hand will contain card objects from the deck.
    
    2.5. Use a boolean variable to track whether the player's hand is locked (cards on hold) or not.

3. Store elements on the page:

    3.1. Store five elements that represent the Cards.

    3.2. Store one element that represents the Game Over text.

    3.3. Store four elements that represent the two Bet amount displays, and "+"/"-" buttons.

    3.4. Store one element that represents the Max Bet Button.

    3.5. Store one element that represents the Paytable Display.

    3.6. Store one element that represents the Balance Display.

    3.7. Store one element that represents the Result Display of each round.

    3.8. Store one element that represents the Replay button.

    3.9. Store one element that represents the Sound Toggle.

    3.10. Store one element that represents the Coin Value image.

    3.11. Store one element that represents the Deal/Draw button.

    3.12. Store five elements that represent the Hold texts.

    3.13. Store one element that represents the winning Card combination played.

    3.14. Store one element that represents the "Play X credits" message appearing over the screen elements at the beginning of each round.



4. Upon loading the app should:

    4.1. Initialize the state variables:

        4.1.1. Initialize the player's credit balance to a starting amount of $100.

        4.1.2. Set the coin value to a default value of 0.25 cents.

        4.1.3. Set the bet amount to a default value of one.


    4.2. Render those state variables to the page:


5. Handle a player clickings:

    5.1. Handle a player clickings a Card.

    5.2. Handle a player clickings "+"/"-" buttons for the bet amount.

    5.3. Handle a player clickings the Max Bet Button.

    5.4. Handle a player clickings the Sound Toggle.

    5.5. Handle a player clickings the Coin Value image.

    5.6. Handle a player clickings the the Deal/Draw button.

6. Handle a player clickings the Replay button:

    6.1. Do steps 4.1 (initialize the state variables) and 4.2 (render).

    
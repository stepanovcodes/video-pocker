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

## A wireframe of the "main" game screen.
![Video Poker Wireframe](../assets/Video%20Poker%20Wireframe.png)

## Pseudocode for the overall game play.

1. Define required constants:

    1.1 Define suits (hearts, diamonds, clubs, spades), represented as array of suits.

    1.2. Define ranks (2 to 10, J, Q, K, A), represented as arrays of ranks.

    1.3. Define unshuffled original deck of cards, represented as an array of card objects.

    1.4. Define the payout array of combination objects, which maps the winning hand combinations (e.g., Jacks or Better, Two Pair, Three of a Kind, etc.) to their respective payouts in credits.

    1.5. Define available options for coin value, represented as an array.

2. Define required variables used to track the state of the game:

    2.1. Use a player's credit balance variable to keep track of the player's available credits.

    2.2. Use a coin value variable to store chosen coin value.
    
    2.3 Use a bet amount variable to store the current bet amount.
    
    2.4. Use a hand array to represent the player's current hand and whether the player's card is locked (card on hold) or not. The hand will contain card objects from the deck.

    2.5. Use inHand variable to determine if a player is playing the hand at the moment (true) or deciding on bet (false).
    
    2.6. Use shuffledDeck variable to store a shuffled deck, excluding cards that have already been dealt or drawn.
    
    2.7. Use dealDrawButtonValue variable to store a caption for an alternating button labeled either 'DEAL' or 'DRAW,' depending on whether a player is in possession of cards (in Hand) or not.
    
    2.8. Use cardEls variable to store card elements. It cannot be declared in 'cached element references' since the card elements are being dynamically changed.
    
    2.9. Use winningCombination variable to store the final winning combination after the hand has been assessed.
    
    2.10. Use roundCount variable to store the count of the rounds (hands) within the same game. It is required to determine if it is a first round or not.
    
    2.11. Use winResult variable to store the credit score of an individual win round.

    2.12. Use endOfGameText virable to store the end of game text (GAME OVER or TRY ANOTHER BET).

3. Store elements on the page:

    3.1. Store one element that represents the cards-container section.

    3.2. Store element that represents the Bet Amount display

    3.3. Store three elements that represent Bet Input controls.

    3.4. Store one element that represents the Max Bet Button.

    3.5. Store one element that represents the Paytable Display.

    3.6. Store one element that represents the Balance Display.

    3.7. Store one element that represents the Result Display of each round.

    3.8. Store one element that represents the Replay button.

    3.9. Store one element that represents the Coin Value button.

    3.10. Store one element that represents the Deal/Draw button.

    3.11. Store one element that represent the holds-container section.

    3.12. Store one element that represents the winning Card combination played.

    3.13. Store one element that represents the "Play X credits" message appearing over the screen elements at the beginning of each round.



4. Upon loading the app should:

    4.1. Initialize the state variables:

        4.1.1. Initialize the player's credit balance to a starting amount of $100.

        4.1.2. Set the coin value to a default value of $1.

        4.1.3. Set the bet amount to a default value of one.

        4.1.4. Create a shuffled copy of the originalDeck (leave originalDeck untouched!)

        4.1.5. Getting Hand from shuffledDeck.

        4.1.6. Setting initial caption of "DEAL" for the Deal/Draw button.

        4.1.7 Setting the winning Card combination played to empty string.

        4.1.8 Setting the count of the rounds (hands) to 0.

        4.1.9 Setting the endOfGameText to empty string.

        4.1.10 Setting the inHand variable to false (a player is not playing a hand).

        4.1.11 Setting up six listeners for REPLAY button, +/- Bet buttons, Coin  Value button, BET MAX button and DEAL/DRAW button.


    4.2. Render those state variables to the page:


5. Handle a player clickings:

    5.1. Handle a player clickings a Card. The function is inside renderHoldsContainer() since the card elements are dynamically changed within container

    5.2. Handle a player clickings "+"/"-" buttons for the bet amount.

    5.3. Handle a player clickings the Max Bet Button.

    5.4. Handle a player clickings the Coin Value button.

    5.5. Handle a player clickings the Deal/Draw button.

6. Handle a player clickings the Replay button:

    6.1. Do steps 4.1 (initialize the state variables) and 4.2 (render).

    
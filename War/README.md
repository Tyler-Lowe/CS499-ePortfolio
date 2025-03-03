# React + Vite

Rules of War
Objective
The goal of War is to defeat your opponent by capturing all the cards in the deck through rounds of gameplay.

Rules
Setup
The deck is shuffled and split evenly between the two players (26 cards each).
Each player places their stack face down.
Gameplay
Both players draw the top card from their deck and place it face up in the center.
The player with the higher-ranked card wins the round and takes both cards, placing them at the bottom of their deck.
If the cards are of equal rank, a "War" occurs:
Each player places three face-down cards, then one face-up card.
The winner of the "War" takes all the cards from the center.
If the new face-up cards are also tied, repeat the "War" until one player wins.
Card Values
Cards are ranked from 2 (lowest) to Ace (highest).
Suits (hearts, diamonds, clubs, spades) have no effect on card rank.
Ending the Game
The game ends when one player has captured all 52 cards.
If a player runs out of cards during a "War," they lose the game.
Optional Rules
Three-War Limit: Limit the number of consecutive "Wars" to prevent excessively long games.
Timed Matches: Play for a set time, and the player with the most cards at the end wins.
Special Ranks: Assign bonus effects to certain cards (e.g., Jokers if included).
Strategy
The game is based on luck, but managing your deck's order can make a difference in prolonged matches.


- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

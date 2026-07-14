# Tic Tac Toe

A browser-based Tic Tac Toe game built as part of **[The Odin Project](https://www.theodinproject.com/)** JavaScript curriculum (Node Path).

## About

This project is the Tic Tac Toe assignment from The Odin Project's JavaScript course. The main goal of the assignment was not just to build a working game, but to practice organizing JavaScript code with **minimal global code**, using **factory functions**, **closures**, and the **module pattern (IIFE)** to properly encapsulate logic and state.

## How to Play

1. Open `index.html` in your browser.
2. You'll be prompted to enter a name for Player 1 (symbol `X`) and Player 2 (symbol `O`). Names are required and cannot be left empty.
3. Click on any empty cell to place your mark.
4. The game automatically detects a win (row, column, or diagonal) or a tie, and displays the result in a popup.
5. Use **Play Again** to reset the board and keep the current score, or **Reset Game** to reset both the board and both players' scores.

## Features Implemented

- **Player factory** (`createPlayer`): stores each player's name, symbol, and score privately via closures, exposing only controlled getter/setter functions (`getName`, `setName`, `getSymbol`, `getScore`, `incrementScore`, `resetScore`).
- **Gameboard module** (IIFE): manages the board state as a private 2D array, exposing `fillSlot`, `checkSlot`, `resetBoard`, and `getBoard` (the latter returns a safe copy of the board to prevent outside mutation).
- **Game controller module** (IIFE): handles turn order, win/tie detection (checking all rows, columns, and both diagonals), score updates, and game-over state.
- **Screen controller module** (IIFE): handles all DOM rendering and user interaction — dynamically generating the board buttons, updating the player header, and displaying a popup when the game ends.
- **Game-over handling**: once a player wins or the board is full, the board is disabled until the game is reset.
- **CSS Grid** layout for the 3x3 board, consistent with the layout approach used in other Odin Project projects in this series.

## What I Practiced

- Factory functions and closures for data privacy (no global variables leaking player or board state).
- The module pattern (IIFE) to ensure single-instance objects (`Gameboard`, `Game`, `screenController`) can't be accidentally reinstantiated.
- Separating responsibilities cleanly between data (`Player`, `Gameboard`), logic (`Game`), and presentation (`screenController`).
- DOM manipulation: dynamically creating elements, attaching event listeners with closures to capture each cell's row/column, and updating the UI in response to game state changes.

## Tech Stack

- HTML
- CSS (Grid layout)
- Vanilla JavaScript (no frameworks or libraries)

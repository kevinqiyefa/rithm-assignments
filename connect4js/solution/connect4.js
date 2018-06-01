/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let i = 0; i < HEIGHT; i++) {
    board.push(Array(WIDTH).fill(null));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "board" variable from the item in HTML w/ID of "board"
  let board = $('#board');

  // TODO: add comment for this code
  //create the column-top of the board table and add the id to the table
  const top = $("<tr class='column-top'></tr>").on('click', handleClick);
  for (let x = 0; x < WIDTH; x++) {
    top.append($(`<td id='${x}'>`));
  }
  board.append(top);

  // TODO: add comment for this code
  //create the board table and add the id to the table
  for (let y = 0; y < HEIGHT; y++) {
    const row = $('<tr />');
    for (let x = 0; x < WIDTH; x++) {
      row.append($(`<td id='${y}-${x}'>`));
    }
    board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let i = HEIGHT - 1; i >= 0; i--) {
    if (!board[i][x]) return i;
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let id = `#${y}-${x}`;
  let playerClass = `piece p${currPlayer}`;
  const piece = $('<div>').addClass(playerClass);
  const startOffset = -48 * (y + 2);
  piece.css('top', `${startOffset}px`);

  $(id).append(piece);
  piece.animate({ top: 0 }, 1000);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  currPlayer === 1 ? (board[y][x] = 1) : (board[y][x] = 2);

  placeInTable(y, x);

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  let isFilled = board.every(r => r.every(c => c));
  if (isFilled) {
    $('.column-top').off();
    return endGame('All cells in board are filled!!!');
  }

  // check for win
  if (checkForWin()) {
    $('.column-top').off();
    return endGame(`Player ${currPlayer} won!`);
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? (currPlayer = 2) : (currPlayer = 1);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  //use two loop to loop through the 2d array and check if there's any horiz, vert, diagDR, diagDL
  // has a 4 adjacent cells that are the same player or not.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

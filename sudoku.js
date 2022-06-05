var valuesInput = document.getElementsByClassName("textInput");

function nextEmptySpot(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] === 0) return [i, j];
    }
  }
  return [-1, -1];
}

function checkRow(board, row, value) {
  for (var i = 0; i < board[row].length; i++) {
    if (board[row][i] === value) {
      return false;
    }
  }

  return true;
}

function checkColumn(board, column, value) {
  for (var i = 0; i < board.length; i++) {
    if (board[i][column] === value) {
      return false;
    }
  }

  return true;
}

function checkSquare(board, row, column, value) {
  boxRow = Math.floor(row / 3) * 3;
  boxCol = Math.floor(column / 3) * 3;

  for (var r = 0; r < 3; r++) {
    for (var c = 0; c < 3; c++) {
      if (board[boxRow + r][boxCol + c] === value) return false;
    }
  }

  return true;
}

function checkValue(board, row, column, value) {
  if (
    checkRow(board, row, value) &&
    checkColumn(board, column, value) &&
    checkSquare(board, row, column, value)
  ) {
    return true;
  }

  return false;
}

function solve(board) {
  if (!isValidSudoku(board)) return false;

  let emptySpot = nextEmptySpot(board);
  let row = emptySpot[0];
  let col = emptySpot[1];

  if (row === -1) {
    return board;
  }

  for (let num = 1; num <= 9; num++) {
    if (checkValue(board, row, col, num)) {
      board[row][col] = num;
      solve(board);
    }
  }

  if (nextEmptySpot(board)[0] !== -1) board[row][col] = 0;

  return board;
}

function isValidSudoku(board) {
  var rows = [];
  var cols = [[], [], [], [], [], [], [], [], []];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const cell = board[i][j];
      if (cell !== 0) cols[j].push(cell);
    }
  }

  for (let i = 0; i < board.length; i++) {
    var row = [];
    for (let j = 0; j < board[i].length; j++) {
      const cell = board[i][j];

      if (cell !== 0) row.push(cell);
    }
    rows.push(row);
  }

  for (let i = 0; i < rows.length; i++) {
    if (containsDuplicates(rows[i])) return false;
  }

  for (let i = 0; i < cols.length; i++) {
    if (containsDuplicates(cols[i])) return false;
  }

  return true;
}

function containsDuplicates(array) {
  if (array.length !== new Set(array).size) {
    return true;
  }

  return false;
}

function checkAndSolve() {
  var _b = [[], [], [], [], [], [], [], [], []];

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const v = valuesInput[i * 9 + j];
      if (v.value !== "") {
        _b[i].push(parseInt(v.value));
      } else _b[i].push(0);
    }
  }

  if (!isValidSudoku(_b)) {
    alert("You entered an invalid sudoku board.");
    return;
  }

  displayBoard(_b);
}

function displayBoard() {
  var _b = [[], [], [], [], [], [], [], [], []];

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const v = valuesInput[i * 9 + j];
      if (v.value !== "") {
        _b[i].push(parseInt(v.value));
      } else _b[i].push(0);
    }
  }

  var boardElements = solve(_b).join().split(",");

  for (let i = 0; i < boardElements.length; i++) {
    const cell = boardElements[i];

    valuesInput[i].value = cell;
  }
}

function clearInputs() {
  for (let i = 0; i < valuesInput.length; i++) {
    valuesInput[i].value = "";
  }
}

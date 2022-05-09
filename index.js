window.addEventListener("DOMContentLoaded", () => {
  const boxes = Array.from(document.getElementsByClassName("box"));

  const playerX = "X";
  const playerO = "O";
  let nowPlaying = playerX;
  let board = ["", "", "", "", "", "", "", "", ""];
  let showText = document.getElementById("showText");
  let resetButton = document.getElementById("reset");
  let playerTurn = document.getElementById("turn");
  let boardActive = true;

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", boxClicked);
  }

  /*
    [0] [1] [2] 
    [3] [4] [5] 
    [6] [7] [8] 

    n=4
    i=0
  */

  // GENERAL CASE:
  const playerWon = (board) => {
    const n = 3;
    for (let column = 0; column < n; column++) {
      if (checkColumn(n, column)) {
        return true;
      }
    }
    function checkColumn(n, i) {
      for (let row = 0; row < n; row++) {
        const val = row * n + i;
        console.log(`row: ${row} column: ${i} n: ${n} value: ${val}`);
        if (board[val] !== nowPlaying) {
          return false;
        }
      }
      return true;
    }

    // 2ND SOLUTION:
    /*
    winning conditions:
      [0][1][2]
      [3][4][5]
      [6][7][8]
      [0][3][6]
      [1][4][7]
      [2][5][8]
      [0][4][8]
      [2][4][6]
    */

    /*
    if (board[0] == nowPlaying) {
      if (board[1] == nowPlaying && board[2] == nowPlaying) {
        console.log(`${nowPlaying} wins!`);
        return true;
      } else if (board[3] == nowPlaying && board[6] == nowPlaying) {
        console.log(`${nowPlaying} wins!`);
        return true;
      } else if (board[4] == nowPlaying && board[8] == nowPlaying) {
        console.log(`${nowPlaying} wins!`);
        return true;
      }
    } else if (board[2] == nowPlaying) {
      if (board[5] == nowPlaying && board[8] == nowPlaying) {
        console.log(`${nowPlaying} wins!`);
        return true;
      }
      if (board[4] == nowPlaying && board[6] == nowPlaying) {
        console.log(`${nowPlaying} wins!`);
        return true;
      }
    } else if (board[3] == nowPlaying) {
      if (board[4] == nowPlaying && board[5] == nowPlaying) {
        console.log(`${nowPlaying} wins!`);
        return true;
      }
    } else if (board[1] == nowPlaying) {
      if (board[4] == nowPlaying && board[7] == nowPlaying) {
        console.log(`${nowPlaying} wins!`);
        return true;
      }
    } else if (board[6] == nowPlaying) {
      if (board[7] == nowPlaying && board[8] == nowPlaying) {
        console.log(`${nowPlaying} wins!`);
        return true;
      }
    }*/
  };

  function boxClicked(e) {
    if (!boardActive) {
      return;
    }
    console.log("Box was clicked");
    const id = e.target.id;
    console.log(id);
    if (!board[id]) {
      board[id] = nowPlaying;
      e.target.innerText = nowPlaying;

      if (playerWon(board)) {
        //if returns true then show text
        showText.innerText = `${nowPlaying} wins!`;
        boardActive = false;
        return;
      }
      nowPlaying = nowPlaying === playerX ? playerO : playerX;
      playerTurn.innerText = `${nowPlaying}'s turn`;
    }
  }

  const resetGame = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i] != "") {
        boxes[i].innerText = "";
      }
    }
    boardActive = true;
    nowPlaying = playerX;
    showText.innerText = "Let's play!!";
    playerTurn.innerText = `Player X starts`;
    return;
  };

  resetButton.addEventListener("click", resetGame);
});

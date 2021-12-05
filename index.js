const container = document.getElementById("gameContainer");
var squareArray = [];
var nextMove = "X";

// creating a functon for game over;
function gameOver(message) {
  document.getElementById("winner").innerHTML = message;
  container.style.display = "none";
  document.getElementById("winnerContainer").style.display = "block";
}

// creating a function for game draw;
function gameDraw() {
  let draw = true;
  squareArray.forEach(({ state }) => {
    if (state == "") return (draw = false);
  });

  return draw;
}

// creating a function for game winner;
function gameWon() {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (
      squareArray[a].state !== "" &&
      squareArray[a].state === squareArray[b].state &&
      squareArray[a].state === squareArray[c].state
    ) {
      return true;
    }
  }
  return false;
}

// js class;
class classSquare {
  constructor(element, index) {
    this.element = element;
    this.index = index;
    this.state = "";
  }
  clicked() {
    this.state = nextMove;
    this.element.classList.remove("notClicked");
    this.element.onclick = function () {
      return false;
    };
    this.element.querySelector("p").innerHTML = nextMove;
    if (gameWon()) return gameOver(" THE WINNER IS " + this.state);
    if (gameDraw()) return gameOver(" DRAW!");
    nextMove == "X" ? (nextMove = "O") : (nextMove = "X");
  }
}

// for loop
for (let index = 0; index < 9; index++) {
  const div = document.createElement("div");
  div.classList.add("square", "notClicked");
  const square = new classSquare(div, index);
  div.appendChild(document.createElement("p"));
  div.onclick = function () {
    square.clicked();
  };
  container.appendChild(div);
  squareArray.push(square);
  // console.log(square);
}

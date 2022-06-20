import { onSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

// tablica min ktora sie renderuje i dodaje do x czasu element - tak jak waz
let minesArray = [];

export function addMine() {
  let newArr = [...minesArray];
  let newMine = getRandomMinePosition();
  newArr.push(newMine);
  minesArray = newArr;
  console.log(minesArray);
}
// ------------------

export function onMine() {
  for (let i = 0; i < minesArray.length; i++) {
    if (onSnake(minesArray[i])) {
      return true;
    }
  }
}

export function draw(gameBoard) {
  minesArray.forEach((newMine) => {
    const mineElement = document.createElement("div");
    mineElement.style.gridRowStart = newMine.y;
    mineElement.style.gridColumnStart = newMine.x;
    mineElement.classList.add("mine");
    gameBoard.appendChild(mineElement);
  });
}

function getRandomMinePosition() {
  let newMinePosition;
  while (newMinePosition == null || onSnake(newMinePosition)) {
    newMinePosition = randomGridPosition();
  }
  return newMinePosition;
}

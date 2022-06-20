import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  getSnakeHead,
  snakeIntersection,
  snakeSpeedUpdate,
} from "./snake.js";
import {
  update as updateFood,
  changeFoodPosition,
  draw as drawFood,
} from "./food.js";
import { draw as drawMine } from "./mine.js";
import { outsideGrid } from "./grid.js";
import { onMine, addMine } from "./mine.js";

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById("game-board");

let highScore = localStorage.getItem("highScoreLS") || 0;
let actualScore = 0;

export function updateScore() {
  actualScore += 1;
}

function updateRecord() {
  highScore = parseInt(actualScore);
  localStorage.setItem("highScoreLS", highScore);
}

function main(currentTime) {
  if (gameOver) {
    if (actualScore > highScore) {
      updateRecord();
    }
    if (
      confirm(
        `Ups! Koniec Gry. Liczba punktów: ${actualScore}. Aktualny rekord: ${highScore}. Naciśnij OK aby zrestartować.`
      )
    ) {
      window.location = "/";
    }
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

window.setTimeout(window.setInterval(addMine, 30000));

window.setTimeout(window.setInterval(changeFoodPosition, 10000));

function update() {
  updateSnake();
  updateFood();
  snakeSpeedUpdate();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
  drawMine(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection() || onMine();
}

import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  getSnakeHead,
  snakeIntersection,
  snakeSpeedUpdate,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { draw as drawMine } from "./mine.js";
import { outsideGrid } from "./grid.js";
import { onMine, addMine } from "./mine.js";

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById("game-board");

function main(currentTime) {
  if (gameOver) {
    if (confirm("Ups! Koniec Gry. Naciśnij OK aby zrestartować.")) {
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

window.setInterval(addMine(), 2000);

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

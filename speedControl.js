import { SNAKE_SPEED } from "./snake.js";

let foodCount = 0;

export let SNAKE_SPEED_UPDATED = 0;

export function update() {
  foodCount += 1;
  if (foodCount == 5) {
    foodCount = 0;
    SNAKE_SPEED_UPDATED = 1.25 * SNAKE_SPEED;
    return SNAKE_SPEED_UPDATED;
  }
}

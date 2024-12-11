import RED_BRICK_IMAGE from "./images/brick-red.png";
import BLUE_BRICK_IMAGE from "./images/brick-blue.png";
import GREEN_BRICK_IMAGE from "./images/brick-green.png";
import YELLOW_BRICK_IMAGE from "./images/brick-yellow.png";
import PURPLE_BRICK_IMAGE from "./images/brick-purple.png";

// Grab the canvas element for calculating the brick width
// depending on canvas width
const canvas: HTMLCanvasElement | null = document.querySelector('#playField');

// Constants
export const STAGE_PADDING = 10;
export const STAGE_ROWS = 20;
export const STAGE_COLS = 10;
export const BRICK_PADDING = 5;
export const BRICK_WIDTH = canvas
    ? Math.floor((canvas.width - STAGE_PADDING * 2) / STAGE_COLS) - BRICK_PADDING
    : 100;
export const BRICK_HEIGHT = canvas
    ? Math.floor((canvas.height - STAGE_PADDING * 2) / STAGE_ROWS) - BRICK_PADDING
    : 30;
export const PADDLE_WIDTH = 150;
export const PADDLE_HEIGHT = 25;
export const PADDLE_STARTX = 450;
export const PADDLE_SPEED = 10;
export const BALL_SPEED = 2;
export const BALL_SIZE = 20;
export const BALL_STARTX = 500;
export const BALL_STARTY = 400;

export const NUMBER_OF_BRICKS =60

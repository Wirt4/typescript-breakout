import {CanvasView} from "./view/CanvasView";
import {Game} from "./Game/Game";
import {BricksWrapperClient} from "./sprites/Bricks/BricksWrapperClient";
import {
    BALL_SIZE, BALL_SPEED,
    BALL_STARTX, BALL_STARTY,
    BRICK_HEIGHT,
    BRICK_PADDING,
    BRICK_WIDTH, NUMBER_OF_BRICKS,
    PADDLE_SPEED,
    PADDLE_STARTX,
    STAGE_COLS,
    STAGE_PADDING
} from "./setup";
import {Paddle} from "./sprites/Paddle";
import {Ball} from "./sprites/Ball";

const view = new CanvasView("#playField")
const client = new BricksWrapperClient(STAGE_COLS, {width:BRICK_WIDTH, height:BRICK_HEIGHT}, {stage:STAGE_PADDING, brick:BRICK_PADDING})
const wrapper = client.getBricksWrapper(NUMBER_OF_BRICKS)
const bricks = wrapper.arr
const paddle = new Paddle(PADDLE_STARTX, view.canvas, PADDLE_SPEED)
const ball = new Ball({x: BALL_STARTX, y: BALL_STARTY}, BALL_SIZE,{xComponent: BALL_SPEED, yComponent:BALL_SPEED*-1})
const sprites = {ball, bricks, paddle}
view.initStartButton(()=> {
    const game = new Game(view, sprites)
    game.start()
})

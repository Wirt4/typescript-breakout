import {Sprite} from "../../src/sprites/Sprite";
import {Paddle} from "../../src/sprites/Paddle";
import {PADDLE_HEIGHT, PADDLE_WIDTH} from "../../src/setup";
import {Size} from "../../src/types";
import {Ball} from "../../src/sprites/Ball";

jest.mock("../../src/images/paddle.png");
jest.mock( "../../src/setup",()=>({
    PADDLE_HEIGHT: 10,
    PADDLE_WIDTH: 10,
    STAGE_PADDING:0
}));

describe('Paddle', () => {
    it('paddle is a sprite',()=>{
        const paddle = new Paddle(0, {width: 800, height:600});
        expect(paddle).toBeInstanceOf(Sprite);
    })
})

describe('Paddle.isMovingLeft and isMovingRight', () => {
    let paddle: Paddle
    beforeEach(()=>{
        paddle = new Paddle(0, {width: 800, height:600});
    })
    it('when created, moveLeft is false',()=>{
        expect(paddle.isMovingLeft).toEqual(false)
    })
    it('when created, moveRight is false',()=>{
        expect(paddle.isMovingRight).toEqual(false)
    })
    it('after Arrow key down left, isMovingLeft is true',()=>{
        const event = new KeyboardEvent('keydown', { key: "ArrowLeft" });
        document.dispatchEvent(event);
        expect(paddle.isMovingLeft).toEqual(true)
    })
    it('if arrow key down is not left, isMovingLeft is not true',()=>{
        const event = new KeyboardEvent('keydown', { key: "A" });
        document.dispatchEvent(event);
        expect(paddle.isMovingLeft).toEqual(false)
    })
    it('if arrow key down is right, isMovingRight is  true',()=>{
        expect(paddle.isMovingRight).toEqual(false)
        const event = new KeyboardEvent('keydown', { key: "ArrowRight" });
        document.dispatchEvent(event);
        expect(paddle.isMovingRight).toEqual(true)
    })
    it('if both keys are pushed down at once, then paddle neither moves right or less',()=>{
        const event = new KeyboardEvent('keydown', { key: "ArrowRight" });
        document.dispatchEvent(event);
        expect(paddle.isMovingRight).toEqual(true)
        const event2 = new KeyboardEvent('keydown', { key: "ArrowLeft" });
        document.dispatchEvent(event2);
        expect(paddle.isMovingRight).toEqual(false)
        expect(paddle.isMovingLeft).toEqual(false)
    })
    it('stop moving lef when the left arrow key is raised',()=>{
        const event = new KeyboardEvent('keydown', { key: "ArrowLeft" });
        document.dispatchEvent(event);
        expect(paddle.isMovingLeft).toEqual(true)
        const event2 = new KeyboardEvent('keyup', { key: "ArrowLeft" });
        document.dispatchEvent(event2);
        expect(paddle.isMovingLeft).toEqual(false)
    })
    it('stop moving lef when the left arrow key is raised',()=>{
        const event = new KeyboardEvent('keydown', { key: "ArrowRight" });
        document.dispatchEvent(event);
        expect(paddle.isMovingRight).toEqual(true)
        const event2 = new KeyboardEvent('keyup', { key: "ArrowRight" });
        document.dispatchEvent(event2);
        expect(paddle.isMovingRight).toEqual(false)
    })
    it('paddle Width should be the constant PADDLE_WIDTH',()=>{
        expect(paddle.width).toEqual(PADDLE_WIDTH)
    })
    it('paddle Height should be the constant PADDLE_HEIGHT',()=>{
        expect(paddle.height).toEqual(PADDLE_HEIGHT)
    })
})

describe('Paddle.move', () => {
    let paddle: Paddle
    let canvasSize: Size
    let mockedSetup:Record<string, any>;
    beforeEach(() => {
        canvasSize = {width: 1200, height:800};
        mockedSetup = require("../../src/setup");
    })
    it('given paddle is moving left, when move is called, the the x position is adjusted minus  5 pix',()=>{
        paddle = new Paddle(6,canvasSize, 5);
        const event = new KeyboardEvent('keydown', { key: "ArrowLeft" });
        document.dispatchEvent(event);
        paddle.detectMove()
        expect(paddle.x).toEqual(1)
    })
    it('given paddle is moving left and the speed is 10, when move is called, the the x position is adjusted minus  10 pix',()=>{
        paddle = new Paddle(20, canvasSize,10);
        const event = new KeyboardEvent('keydown', { key: "ArrowLeft" });
        document.dispatchEvent(event);
        paddle.detectMove()
        expect(paddle.x).toEqual(10)
    })
    it('given paddle is not moving and the speed is 10, when move is called, the the x position is not adjusted',()=>{
        paddle = new Paddle(20, canvasSize,10);
        paddle.detectMove()
        expect(paddle.x).toEqual(20)
    })
    it('given paddle is moving right with a speed of 2, when move is called, the the s position is adjust plus 2pix',()=>{
        paddle = new Paddle(40, canvasSize,2);
        const event = new KeyboardEvent('keydown', { key: "ArrowRight" });
        document.dispatchEvent(event);
        paddle.detectMove()
        expect(paddle.x).toEqual(42)
    })
    it('given paddle is moving left, the speed is 10 and the initial position is 5, when move is called, the the x position is adjusted only to the border, 0',()=>{
        paddle = new Paddle(5, canvasSize,10);
        const event = new KeyboardEvent('keydown', { key: "ArrowLeft" });
        document.dispatchEvent(event);
        paddle.detectMove()
        expect(paddle.x).toEqual(0)
    })
    it('given paddle is moving right and about to exit the plain, the x coordinate is stopped at 1180',()=>{
        mockedSetup.PADDLE_WIDTH = 20
        canvasSize = {width: 1200, height:800};
        paddle = new Paddle(1175, canvasSize,10);
        const event = new KeyboardEvent('keydown', { key: "ArrowRight" });
        document.dispatchEvent(event);
        paddle.detectMove()
        expect(paddle.x).toEqual(1180)
    })

})

describe('Paddle start.y', () => {
    let paddle: Paddle
    let mockedSetup: Record<string, any>;
    beforeEach(() => {
        mockedSetup = require("../../src/setup");
    })
    it('given a canvasHeight of 800 a STAGE_PADDING of 5 and a PADDLE_HEIGHT of 25, when the paddle is created, it should be with the y coordinate of 770',()=>{
        mockedSetup.PADDLE_HEIGHT = 25
        mockedSetup.STAGE_PADDING = 5
        paddle = new Paddle(40, {width:500, height:800}, 2);
        expect(paddle.y).toEqual(770)
    })
    it('given a canvasHeight of 1200 a STAGE_PADDING of 10 and a PADDLE_HEIGHT of 40, when the paddle is created, it should be with the y coordinate of 1170',()=>{
        mockedSetup.PADDLE_HEIGHT = 40
        mockedSetup.STAGE_PADDING = 10
        paddle = new Paddle(40, {width: 50, height:1200}, 2);
        expect(paddle.y).toEqual(1150)
    })
})

describe('isCollideWith',()=>{
    let paddle: Paddle
    let ball: Ball
    let mockedSetup: Record<string, any>;
    beforeEach(() => {
        mockedSetup = require("../../src/setup");
    })
    it('the paddle line touches the ball',()=>{
        mockedSetup.PADDLE_WIDTH = 20
        mockedSetup.PADDLE_HEIGHT = 5
        mockedSetup.STAGE_PADDING = 10
        ball = new Ball({x:45, y:1180}, 5, 50, 8)
        paddle = new Paddle(40, {width: 50, height:1200}, 2);
        expect(paddle.isCollidedWith(ball)).toEqual(true)
    })
    it('the paddle line does not intersect the ball, ball is too far right',()=>{
        mockedSetup.PADDLE_WIDTH = 20
        mockedSetup.PADDLE_HEIGHT = 5
        mockedSetup.STAGE_PADDING = 10
        ball = new Ball({x:400, y:1180}, 5, 50, 8)
        paddle = new Paddle(40, {width: 500, height:1200}, 2);
        expect(paddle.isCollidedWith(ball)).toEqual(false)
    })
    it('the paddle line does not intersect the ball, ball is too far left',()=>{
        mockedSetup.PADDLE_WIDTH = 20
        mockedSetup.PADDLE_HEIGHT = 5
        mockedSetup.STAGE_PADDING = 10
        ball = new Ball({x:5, y:1185}, 5, 50, 8)
        paddle = new Paddle(40, {width: 500, height:1200}, 2);
        expect(paddle.isCollidedWith(ball)).toEqual(false)
    })
    it('edge case, ball is directly above panel',()=>{
        mockedSetup.PADDLE_WIDTH = 20
        mockedSetup.PADDLE_HEIGHT = 5
        mockedSetup.STAGE_PADDING = 10
        ball = new Ball({x:45, y:2}, 5, 50, 8)
        paddle = new Paddle(40, {width: 50, height:1200}, 2);
        expect(paddle.isCollidedWith(ball)).toEqual(false)
    })
    it('edge case, ball is directly under panel',()=>{
        mockedSetup.PADDLE_WIDTH = 20
        mockedSetup.PADDLE_HEIGHT = 5
        mockedSetup.STAGE_PADDING = 10
        ball = new Ball({x:45, y:1300}, 5, 50, 8)
        paddle = new Paddle(40, {width: 50, height:1200}, 2);
        expect(paddle.isCollidedWith(ball)).toEqual(false)
    })
    it('edge case, ball is directly under panel',()=>{
        mockedSetup.PADDLE_WIDTH = 150
        mockedSetup.PADDLE_HEIGHT = 25
        mockedSetup.STAGE_PADDING = 10
        ball = new Ball({x:45, y:1146}, 20, 2, 8)
        paddle = new Paddle(40, {width: 50, height:1200}, 2);
        expect(paddle.isCollidedWith(ball)).toEqual(true)
    })
})

import {Sprite} from "../../src/sprites/Sprite";
import {Paddle} from "../../src/sprites/Paddle";
import {PADDLE_HEIGHT, PADDLE_WIDTH} from "../../src/setup";

jest.mock("../../src/images/paddle.png");
jest.mock( "../../src/setup",()=>({
    PADDLE_HEIGHT: 10,
    PADDLE_WIDTH: 10,
    STAGE_PADDING:0

}));

describe('Paddle', () => {
    it('paddle is a sprite',()=>{
        const paddle = new Paddle(0);
        expect(paddle).toBeInstanceOf(Sprite);
    })
})

describe('Paddle.isMovingLeft and isMovingRight', () => {
    let paddle: Paddle
    beforeEach(()=>{
        paddle = new Paddle(0);
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
    it('given paddle is moving left, when move is called, the the x position is adjusted minus  5 pix',()=>{
        paddle = new Paddle(0,800, 5);
        const event = new KeyboardEvent('keydown', { key: "ArrowLeft" });
        document.dispatchEvent(event);
        paddle.move()
        expect(paddle.x).toEqual(-5)
    })
    it('given paddle is moving left and the speed is 10, when move is called, the the x position is adjusted minus  10 pix',()=>{
        paddle = new Paddle(20, 800,10);
        const event = new KeyboardEvent('keydown', { key: "ArrowLeft" });
        document.dispatchEvent(event);
        paddle.move()
        expect(paddle.x).toEqual(10)
    })
    it('given paddle is not moving and the speed is 10, when move is called, the the x position is not adjusted',()=>{
        paddle = new Paddle(20, 800,10);
        paddle.move()
        expect(paddle.x).toEqual(20)
    })
    it('given paddle is moving right with a speed of 2, when move is called, the the s position is adjust plus 2pix',()=>{
        paddle = new Paddle(40, 800,2);
        const event = new KeyboardEvent('keydown', { key: "ArrowRight" });
        document.dispatchEvent(event);
        paddle.move()
        expect(paddle.x).toEqual(42)
    })
})

describe('Paddle start.y', () => {
    let paddle: Paddle
    let mockedSetup: Record<string, any>;
    beforeEach(() => {
        mockedSetup = require("../../src/setup");
    })
    it('given a canvasHeight of 800 a STAGE_PADDING of 5 and a PADDLE_HEIGHT of 25, when the paddle is created, it should be with the y coordinate of 770',()=>{
        mockedSetup.PADDLE_HEIGHT = 5
        paddle = new Paddle(40, 800, 2);
        expect(paddle.y).toEqual(770)
    })
    it('given a canvasHeight of 1200 a STAGE_PADDING of 10 and a PADDLE_HEIGHT of 40, when the paddle is created, it should be with the y coordinate of 1170',()=>{
        mockedSetup.PADDLE_HEIGHT = 10
        paddle = new Paddle(40, 1200, 2);
        expect(paddle.y).toEqual(1150)
    })
})

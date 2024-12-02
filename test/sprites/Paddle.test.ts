import {Sprite} from "../../src/sprites/Sprite";
import {Paddle} from "../../src/sprites/Paddle";
import {PADDLE_HEIGHT, PADDLE_WIDTH} from "../../src/setup";

jest.mock("../../src/images/paddle.png");

describe('Paddle', () => {
    it('paddle is a sprite',()=>{
        const paddle = new Paddle({x:0, y:0});
        expect(paddle).toBeInstanceOf(Sprite);
    })
})

describe('Paddle.isMovingLeft and isMovingRight', () => {
    let paddle: Paddle
    beforeEach(()=>{
        paddle = new Paddle({x:0, y:0},);
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
    it('given paddle is moving left, when move is called, the the x position is ajusted minus  5 pix',()=>{
        paddle = new Paddle({x:0, y:0},);
        const event = new KeyboardEvent('keydown', { key: "ArrowLeft" });
        document.dispatchEvent(event);
        paddle.move()
        expect(paddle.x).toEqual(-5)
    })
})

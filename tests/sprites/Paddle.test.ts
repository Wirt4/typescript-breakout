import {Sprite} from "../../src/sprites/Sprite";
import {Paddle} from "../../src/sprites/Paddle";
import {PADDLE_HEIGHT, PADDLE_WIDTH} from "../../src/setup";
import {Position, Size, Vector} from "../../src/types";
import {Ball} from "../../src/sprites/Ball";

jest.mock("../../src/images/paddle.png");
jest.mock( "../../src/setup",()=>({
    PADDLE_HEIGHT: 10,
    PADDLE_WIDTH: 10,
    STAGE_PADDING:0
}));

describe('Paddle.isMovingLeft and isMovingRight', () => {
    let paddle: Paddle
    let paddleSize: Size
    beforeEach(()=>{
        paddleSize = {width: 800, height:600}
        paddle = new Paddle(0, paddleSize);
    })
    it('paddle is a sprite',()=>{
        expect(paddle).toBeInstanceOf(Sprite);
    })
    it('when created, moveLeft is false',()=>{
        expect(paddle.isMovingLeft).toEqual(false)
    })
    it('when created, moveRight is false',()=>{
        expect(paddle.isMovingRight).toEqual(false)
    })
    it('after Arrow key down left, isMovingLeft is true',()=>{
        keyDown('ArrowLeft');
        expect(paddle.isMovingLeft).toEqual(true)
    })
    it('if arrow key down is not left, isMovingLeft is not true',()=>{
        keyDown('A');
        expect(paddle.isMovingLeft).toEqual(false)
    })
    it('if arrow key down is right, isMovingRight is  true',()=>{
        expect(paddle.isMovingRight).toEqual(false)
        keyDown('ArrowRight');
        expect(paddle.isMovingRight).toEqual(true)
    })
    it('if both keys are pushed down at once, then paddle neither moves right or less',()=>{
        keyDown('ArrowRight');
        expect(paddle.isMovingRight).toEqual(true)
        keyDown('ArrowLeft');
        expect(paddle.isMovingRight).toEqual(false)
        expect(paddle.isMovingLeft).toEqual(false)
    })
    it('stop moving lef when the left arrow key is raised',()=>{
        keyDown('ArrowLeft');
        expect(paddle.isMovingLeft).toEqual(true)
        keyUp('ArrowLeft');
        expect(paddle.isMovingLeft).toEqual(false)
    })
    it('stop moving lef when the left arrow key is raised',()=>{
        keyDown('ArrowRight');
        expect(paddle.isMovingRight).toEqual(true)
        keyUp('ArrowRight');
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
    let startXPosition: number
    let paddleSpeed: number
    beforeEach(() => {
        canvasSize = {width: 1200, height:800};
        mockedSetup = require("../../src/setup");
        startXPosition =6
        paddleSpeed = 5
    })
    it('given paddle is moving left, when move is called, the the x position is adjusted minus  5 pix',()=>{
        paddle = new Paddle(startXPosition,canvasSize, paddleSpeed);
        keyDown('ArrowLeft');
        paddle.detectMove()
        expect(paddle.position.x).toEqual(1)
    })
    it('given paddle is moving left and the speed is 10, when move is called, the the x position is adjusted minus  10 pix',()=>{
        startXPosition = 20
        paddleSpeed = 10
        paddle = new Paddle(startXPosition,canvasSize, paddleSpeed);
        keyDown('ArrowLeft');
        paddle.detectMove()
        expect(paddle.position.x).toEqual(10)
    })
    it('given paddle is not moving and the speed is 10, when move is called, the the x position is not adjusted',()=>{
        startXPosition = 20
        paddleSpeed = 10
        paddle = new Paddle(startXPosition, canvasSize,paddleSpeed);
        paddle.detectMove()
        expect(paddle.position.x).toEqual(startXPosition)
    })
    it('given paddle is moving right with a speed of 2, when move is called, the the s position is adjust plus 2pix',()=>{
        startXPosition = 40
        paddleSpeed = 2
        paddle = new Paddle(startXPosition, canvasSize,paddleSpeed);
        keyDown('ArrowRight');
        paddle.detectMove()
        expect(paddle.position.x).toEqual(42)
    })
    it('given paddle is moving left, the speed is 10 and the initial position is 5, when move is called, the the x position is adjusted only to the border, 0',()=>{
        startXPosition = 5
        paddleSpeed = 10
        paddle = new Paddle(5, canvasSize,10);
        keyDown('ArrowLeft');
        paddle.detectMove()
        expect(paddle.position.x).toEqual(0)
    })
    it('given paddle is moving right and about to exit the plain, the x coordinate is stopped at 1180',()=>{
        mockedSetup.PADDLE_WIDTH = 20
        canvasSize = {width: 1200, height:800};
        startXPosition = 1175
        paddleSpeed = 10
        paddle = new Paddle(startXPosition, canvasSize,paddleSpeed);
        keyDown('ArrowRight');
        paddle.detectMove()
        expect(paddle.position.x).toEqual(1180)
    })

})

describe('Paddle start.y', () => {
    let paddle: Paddle
    let mockedSetup: Record<string, any>;
    let startXPosition: number
    let canvasSize: Size
    let paddleSpeed: number
    beforeEach(() => {
        mockedSetup = require("../../src/setup");
        startXPosition =  40
        paddleSpeed =2
    })
    it('given a canvasHeight of 800 a STAGE_PADDING of 5 and a PADDLE_HEIGHT of 25, when the paddle is created, it should be with the y coordinate of 770',()=>{
        mockedSetup.PADDLE_HEIGHT = 25
        mockedSetup.STAGE_PADDING = 5
        canvasSize = {width:500, height:800};
        paddle = new Paddle(startXPosition, canvasSize, paddleSpeed);
        expect(paddle.position.y).toEqual(770)
    })
    it('given a canvasHeight of 1200 a STAGE_PADDING of 10 and a PADDLE_HEIGHT of 40, when the paddle is created, it should be with the y coordinate of 1170',()=>{
        mockedSetup.PADDLE_HEIGHT = 40
        mockedSetup.STAGE_PADDING = 10
        canvasSize = {width: 50, height:1200}
        paddle = new Paddle(startXPosition, canvasSize, paddleSpeed);
        expect(paddle.position.y).toEqual(1150)
    })
})

describe('isCollideWith',()=>{
    let paddle: Paddle
    let ball: Ball
    let mockedSetup: Record<string, any>;
    let ballStartPosition: Position
    let ballSize: number
    let canvasSize: Size
    let paddleStartXPosition: number
    let paddleSpeed: number
    let ballSpeed: Vector
    beforeEach(() => {
        mockedSetup = require("../../src/setup");
        ballStartPosition = {x:45, y:1180}
        ballSize = 5
        canvasSize = {width: 50, height:1200}
        paddleStartXPosition = 40
        ballSpeed = {xComponent: 8, yComponent:-8}
        paddleSpeed = 2
        mockedSetup.PADDLE_WIDTH = 20
        mockedSetup.PADDLE_HEIGHT = 5
        mockedSetup.STAGE_PADDING = 10
    })
    it('the paddle line touches the ball',()=>{
        ball = new Ball(ballStartPosition, ballSize, ballSpeed)
        paddle = new Paddle(paddleStartXPosition, canvasSize, paddleSpeed);
        expect(paddle.isCollidedWith(ball)).toEqual(true)
    })
    it('the paddle line does not intersect the ball, ball is too far right',()=>{
        canvasSize = {width: 500, height:1200}
        ballStartPosition = {x:400, y:1180}
        ball = new Ball(ballStartPosition, ballSize, ballSpeed)
        paddle = new Paddle(paddleStartXPosition, canvasSize, paddleSpeed);
        expect(paddle.isCollidedWith(ball)).toEqual(false)
    })
    it('the paddle line does not intersect the ball, ball is too far left',()=>{
        ballStartPosition = {x:5, y:1185}
        canvasSize = {width: 500, height:1200}
        ball = new Ball(ballStartPosition, ballSize,  ballSpeed)
        paddle = new Paddle(paddleStartXPosition, canvasSize, paddleSpeed);
        expect(paddle.isCollidedWith(ball)).toEqual(false)
    })
    it('edge case, ball is directly above panel',()=>{
        ballStartPosition={x:45, y:2}
        ball = new Ball(ballStartPosition, ballSize,  ballSpeed)
        paddle = new Paddle(40, canvasSize, paddleSpeed);
        expect(paddle.isCollidedWith(ball)).toEqual(false)
    })
    it('edge case, ball is directly under panel',()=>{
        ballStartPosition = {x:45, y:1300}
        canvasSize = {width: 50, height:1200}
        ball = new Ball(ballStartPosition, ballSize, ballSpeed)
        paddle = new Paddle(paddleStartXPosition, canvasSize, paddleSpeed);
        expect(paddle.isCollidedWith(ball)).toEqual(false)
    })
    it('edge case, ball is directly under panel, different paddle size',()=>{
        mockedSetup.PADDLE_WIDTH = 150
        mockedSetup.PADDLE_HEIGHT = 25
        mockedSetup.STAGE_PADDING = 10
        ballStartPosition= {x:45, y:1146}
        ballSize = 20
        canvasSize = {width: 50, height:1200}
        ball = new Ball(ballStartPosition, ballSize,ballSpeed)
        paddle = new Paddle(paddleStartXPosition, canvasSize, paddleSpeed);
        expect(paddle.isCollidedWith(ball)).toEqual(true)
    })
})

function keyDown(keyName:string){
    dispatchKeyEvent(keyName, 'keydown')
}

function keyUp(keyName:string){
    dispatchKeyEvent(keyName, 'keyup')
}

function dispatchKeyEvent(keyName:string, eventType: string){
    const event = new KeyboardEvent(eventType, { key:keyName });
    document.dispatchEvent(event);
}

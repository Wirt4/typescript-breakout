import {CanvasView} from "./view/CanvasView";
import {createBricks} from "./helper";
import {Paddle} from "./sprites/Paddle";
import {BALL_SIZE, BALL_SPEED, BALL_STARTX, BALL_STARTY, PADDLE_SPEED, PADDLE_STARTX} from "./setup";
import {Size} from "./types";
import {Ball} from "./sprites/Ball";
import {BricksWrapper} from "./sprites/BricksWrapper";
import {CanvasContact} from "./enums";

enum EndState{
    GAME_OVER = "Game Over!",
    GAME_WON = "Game Won!"
}

export class Game {
    private readonly _isGameOver: boolean
    private readonly _view: CanvasView
    private _score = 0
    public bricks = new BricksWrapper(createBricks())
    private readonly _paddle: Paddle
    private readonly _ball: Ball

    constructor(view: CanvasView) {
        this._isGameOver = false;
        this._view = view;
        this._paddle = new Paddle(PADDLE_STARTX, this.canvasSize(), PADDLE_SPEED)
        const ballPosition = {x: BALL_STARTX, y: BALL_STARTY};
        this._ball = new Ball(ballPosition, BALL_SIZE, this.canvasSize().width, BALL_SPEED)
    }

    private canvasSize(): Size{
        if(this._view.canvas){
            const {width, height} = this._view.canvas;
            return {width, height};
        }
        return {width:0, height:0}
    }

    get ball(): Ball{
        return this._ball
    }
    get paddle(): Paddle{
        return this._paddle
    }

    get score():number{
        return this._score;
    }

    get isGameOver(): boolean {
        return this._isGameOver
    }

    setGameOver():void {
        this.setGameStatus(EndState.GAME_OVER)
    }

    setGameWin():void{
        this.setGameStatus(EndState.GAME_WON)
    }

    setGameStatus(state: EndState):void{
        this._view.drawInfo(state)
    }

    start(){
        this._view.drawInfo("")
        this._view.drawScore(0)
        this.loop()
    }

    private drawSprites(){
        this._view.drawBricks(this.bricks.arr)
        this._view.drawSprite(this._paddle)
        this._view.drawSprite(this._ball)
    }

     detectEvents(){
        this._paddle.detectMove()
         const canvasTouch = this._ball.detectCanvasCollision()
         if (canvasTouch === CanvasContact.CEILING){
             this.ball.bounceY()
             return
         }
         if (canvasTouch === CanvasContact.WALL){
             this.ball.bounceX()
             return
         }
        const brickCollide = this.bricks.detectCollision(this.ball)
        if (brickCollide) {
            this._score ++
            this._view.drawScore(this._score)
            if (this.bricks.isVerticalCollision()){
                console.log('calling ball.bounce y from game.detectEvents')
                this._ball.bounceY()
            }else{
                this._ball.bounceX() //this is causing corner hang issues -- TODO: log all the coordinates and write a test case from that
            }
        }else if (this._paddle.isCollidedWith(this.ball)){
            this._ball.bounceY()
        }
    }

    loop():void{
        this._view.clear()
        this.drawSprites()
        this.detectEvents()
        this._ball.move()
        requestAnimationFrame(()=>{this.loop()})
    }
}

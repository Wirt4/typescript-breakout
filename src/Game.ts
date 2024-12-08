import {CanvasView} from "./view/CanvasView";
import {createBricks} from "./helper";
import {Paddle} from "./sprites/Paddle";
import {BALL_SIZE, BALL_SPEED, BALL_STARTX, BALL_STARTY, PADDLE_SPEED, PADDLE_STARTX} from "./setup";
import {Size} from "./types";
import {Ball} from "./sprites/Ball";
import {BricksWrapper} from "./sprites/BricksWrapper";
import {Contact} from "./enums";

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
    private canvasWidth: number;

    constructor(view: CanvasView) {
        this._isGameOver = false;
        this._view = view;
        this._paddle = new Paddle(PADDLE_STARTX, this.canvasSize(), PADDLE_SPEED)
        const ballPosition = {x: BALL_STARTX, y: BALL_STARTY};
        let speed = {xComponent: BALL_SPEED, yComponent: -BALL_SPEED};
        const canvasSize = this.canvasSize()
        this.canvasWidth = canvasSize.width
        this._ball = new Ball(ballPosition, BALL_SIZE,speed)
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
         if (this._ball.y <=0){
             this._ball.bounceY()
             return
         }
         if (this._ball.x <= 0 || this._ball.rightMostX >= this.canvasWidth){
             this._ball.bounceX()
             return
         }
         if (this._paddle.isCollidedWith(this.ball)){
             this._ball.bounceY()
         }
         this.bricks.detectCollision(this.ball)
         const brickCollide = this.bricks.collisionType()
         if (brickCollide == Contact.NO_CONTACT){
             return
         }
            this.ball.rewind(this.bricks.collisionOverlap())
            this._score ++
            this._view.drawScore(this._score)
            if (brickCollide == Contact.TOP_OR_BOTTOM){
                this._ball.bounceY()
                return
            }
            this.ball.bounceX()
    }

    loop():void{
        this._view.clear()
        this.drawSprites()
        this.detectEvents()
        this._ball.move()
        requestAnimationFrame(()=>{this.loop()})
    }
}

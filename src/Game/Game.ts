import {CanvasView} from "../view/CanvasView";
import {Paddle} from "../sprites/Paddle";
import {
    BALL_SIZE,
    BALL_SPEED,
    BALL_STARTX,
    BALL_STARTY,
    NUMBER_OF_BRICKS,
    PADDLE_SPEED,
    PADDLE_STARTX,
} from "../setup";
import {Size} from "../types";
import {Ball} from "../sprites/Ball";
import {BricksWrapper} from "../sprites/Bricks/BricksWrapper";
import {Contact} from "../enums";
import {BricksWrapperClient} from "../sprites/Bricks/BricksWrapperClient";

enum EndState{
    GAME_OVER = "Game Over!",
    GAME_WON = "Game Won!"
}

export class Game {
    private _isGameOver: boolean
    private readonly _view: CanvasView
    private _score = 0
    public bricks : BricksWrapper
    private readonly _paddle: Paddle
    private readonly _ball: Ball
    private readonly canvasWidth: number;
    private readonly canvasHeight: number;
    private _ballHasBounced =  false

    constructor(view: CanvasView, bricksWrapperClient: BricksWrapperClient) {
        this._isGameOver = false;
        this._view = view;
        this._paddle = new Paddle(PADDLE_STARTX, this.canvasSize(), PADDLE_SPEED)
        const ballPosition = {x: BALL_STARTX, y: BALL_STARTY};
        let speed = {xComponent: BALL_SPEED, yComponent: -BALL_SPEED};
        const canvasSize = this.canvasSize()
        this.canvasWidth = canvasSize.width
        this.canvasHeight = canvasSize.height
        this._ball = new Ball(ballPosition, BALL_SIZE,speed)
        this.bricks = bricksWrapperClient.getBricksWrapper(NUMBER_OF_BRICKS)

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
        try{
            this.loop()
        }catch(e){
            console.error('issue with game.loop', e)
        }
    }

    private drawSprites(){
        this._view.drawBricks(this.bricks?.arr)
        this._view.drawSprite(this._paddle)
        this._view.drawSprite(this._ball)
    }

    private detectCeilingBounce(){
        if (this._ball.y <=0){
            this._ball.bounceY()
            this._ballHasBounced = true
        }
    }

    private detectWallBounce(){
        if (this._ball.x <= 0 || this._ball.rightMostX >= this.canvasWidth){
            this._ball.bounceX()
            this._ballHasBounced = true
        }
    }

    private detectIfBallOutOfBounds(){
        if (this._ball.y > this.canvasHeight){
            this.setGameOver()
            this._isGameOver = true;
        }
    }

    private detectIfAllBricksGone(){
        if (this.bricks?.isEmpty()){
            this.setGameWin()
            this._isGameOver = true;
        }
    }

    private detectGameEnd(){
        this.detectIfBallOutOfBounds()
        this.detectIfAllBricksGone()
    }

    private detectPaddleBounce(){
        if (this._paddle.isCollidedWith(this.ball)){
            this._ball.bounceY()
            this._ballHasBounced = true
        }
    }

    private updateScore(){
        this._score ++
        this._view.drawScore(this._score)
    }

    private adjustBallPosition(){
        this.ball.rewind(this.bricks.collisionOverlap())
    }

    private handleBrickBounce(contact: Contact){
        if (contact == Contact.TOP_OR_BOTTOM){
            this._ball.bounceY()
            return
        }
        this.ball.bounceX()
    }

     detectEvents(){
        this._paddle.detectMove()
         this.detectPaddleBounce()
         this.detectCeilingBounce()

         this.detectWallBounce()
         if (this._ballHasBounced){
             this._ballHasBounced = false
             return
         }

         this.detectGameEnd()
         if (this._isGameOver){
             return
         }

         this.bricks.detectCollision(this.ball)
         const brickCollide = this.bricks.collisionType()

         if (brickCollide == Contact.NO_CONTACT){
             return
         }

         this.bricks.adjustBricks()
         this.adjustBallPosition()
         this.updateScore()
         this.handleBrickBounce(brickCollide)
    }

    loop():void{
        this._view.clear()
        this.drawSprites()
        this.detectEvents()
        this._ball.move()
        if (this.isGameOver){
            return
        }
        requestAnimationFrame(()=>{this.loop()})
    }
}

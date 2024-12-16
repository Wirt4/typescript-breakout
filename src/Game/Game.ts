
import {Size} from "../types";
import {Contact} from "../enums";
import {ICanvasView} from "./Interfaces/view/ICanvasView";
import {IPaddle} from "./Interfaces/sprites/IPaddle";
import {IBall} from "./Interfaces/sprites/IBall";
import {IBricks} from "./Interfaces/sprites/IBricks";
import {SpriteFacade} from "./Interfaces/spriteFacade";

enum EndState{
    GAME_OVER = "Game Over!",
    GAME_WON = "Game Won!"
}

export class Game {
    private _isGameOver: boolean
    private readonly _view: ICanvasView
    private _score = 0
    public bricks : IBricks
    private readonly _paddle: IPaddle
    private readonly canvasWidth: number;
    private readonly canvasHeight: number;
    private _ballHasBounced =  false
    private _ball: IBall

    constructor(view: ICanvasView, sprites: SpriteFacade) {
        this._isGameOver = false;
        this._view = view;
        this._paddle = sprites.paddle
        const canvasSize = this.canvasSize()
        this.canvasWidth = canvasSize.width
        this.canvasHeight = canvasSize.height
        this._ball = sprites.ball
        this.bricks = sprites.bricks
    }

    private canvasSize(): Size{
        if(this._view.canvas){
            const {width, height} = this._view.canvas;
            return {width, height};
        }
        return {width:0, height:0}
    }

    get ball(): IBall{
        return this._ball
    }

    get paddle(): IPaddle{
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

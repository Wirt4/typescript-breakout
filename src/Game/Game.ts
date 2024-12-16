
import {Size} from "../types";
import {Contact} from "../enums";
import {ICanvasView} from "./Interfaces/view/ICanvasView";
import {IPaddle} from "./Interfaces/sprites/IPaddle";
import {IBall} from "./Interfaces/sprites/IBall";
import {IBricksWrapper} from "./Interfaces/sprites/IBricksWrapper";
import {SpriteFacade} from "./Interfaces/spriteFacade";
import {IBrick} from "./Interfaces/sprites/IBrick";

enum EndState{
    GAME_OVER = "Game Over!",
    GAME_WON = "Game Won!"
}

export class Game {
    private _isGameOver: boolean
    private readonly _view: ICanvasView
    private _score = 0
    public bricksWrapper : IBricksWrapper
    private readonly _paddle: IPaddle
    private readonly canvasWidth: number;
    private readonly canvasHeight: number;
    private _ballHasBounced =  false
    private _ball: IBall
    private _bricks: IBrick[]

    constructor(view: ICanvasView, sprites: SpriteFacade) {
        this._isGameOver = false;
        this._view = view;
        this._paddle = sprites.paddle
        const canvasSize = this.canvasSize()
        this.canvasWidth = canvasSize.width
        this.canvasHeight = canvasSize.height
        this._ball = sprites.ball
        this.bricksWrapper = sprites.bricksWrapper
        if (sprites.bricks){
            this._bricks = sprites.bricks
        }else{
            this._bricks = []
        }
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

    get bricks():IBrick[]{
        return this._bricks
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
        this._view.drawBricks(this.bricksWrapper?.arr)
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
        if (this.bricksWrapper?.isEmpty()){
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
        this.ball.rewind(this.bricksWrapper.collisionOverlap())
    }

    private handleBrickBounce(contact: Contact){
        if (contact == Contact.TOP_OR_BOTTOM){
            this._ball.bounceY()
            return
        }
        this.ball.bounceX()
    }

    private getContact(): number{
        for (let i=0; i< this._bricks.length; i++){
            this._bricks[i].detectCollision(this.ball)
            const collisionType = this._bricks[i].hasCollision()
            if (collisionType!= Contact.NO_CONTACT){
                return i
            }
        }
        return -1
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
         const contactIndex = this.getContact()
         if (contactIndex != -1){
               if (this._bricks[contactIndex].energy ==1){
                   this._bricks.splice(contactIndex, 1)
               }else{
                   this._bricks[contactIndex].reduceEnergy()
               }
         }

         this.bricksWrapper.detectCollision(this.ball)
         const brickCollide = this.bricksWrapper.collisionType()

         if (brickCollide == Contact.NO_CONTACT){
             return
         }

         this.bricksWrapper.adjustBricks()
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

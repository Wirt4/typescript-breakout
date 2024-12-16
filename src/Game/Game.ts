import {Size} from "../types";
import {Contact} from "../enums";
import {ICanvasView} from "./Interfaces/view/ICanvasView";
import {IPaddle} from "./Interfaces/sprites/IPaddle";
import {IBall} from "./Interfaces/sprites/IBall";
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
    private readonly _paddle: IPaddle
    private readonly canvasWidth: number;
    private readonly canvasHeight: number;
    private _ballHasBounced =  false
    private readonly _ball: IBall
    private readonly _bricks: IBrick[]

    constructor(view: ICanvasView, sprites: SpriteFacade) {
        this._isGameOver = false;
        this._view = view;
        this._paddle = sprites.paddle
        const canvasSize = this.canvasSize()
        this.canvasWidth = canvasSize.width
        this.canvasHeight = canvasSize.height
        this._ball = sprites.ball
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
        this._view.drawBricks(this._bricks)
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
        if (this._bricks.length == 0){
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
        this.ball.rewind(-1)
    }

    private handleBrickBounce(contact: Contact){
        if (contact == Contact.TOP_OR_BOTTOM){
            this._ball.bounceY()
            return
        }
        this.ball.bounceX()
    }

    private getContact(): {index: number, type: Contact, overlap: number}{
        for (let i=0; i< this._bricks.length; i++){
            this._bricks[i].detectCollision(this.ball)
            const collisionType = this._bricks[i].hasCollision()
            if (collisionType!= Contact.NO_CONTACT){
                return {index:i, type: collisionType, overlap: this._bricks[i].collisionOverlapDistance()}
            }
        }
        return {index:-1, type: Contact.NO_CONTACT, overlap:0}
    }


    private bounceBall(contact: Contact){
        if (contact == Contact.TOP_OR_BOTTOM){
            this._ball.bounceY()
        }else{
            this._ball.bounceX()
        }
    }

    private adjustBricks(index: number){
        if (this._bricks[index].energy ==1){
            this._bricks.splice(index, 1)
            return
        }
            this._bricks[index].reduceEnergy()
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

         const contact = this.getContact()
         if (contact.type != Contact.NO_CONTACT){
             this.updateScore()
             this._ball.rewind(contact.overlap)
             this.bounceBall(contact.type)
             this.adjustBricks(contact.index)
         }
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

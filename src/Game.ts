import {CanvasView} from "./view/CanvasView";
import {createBricks} from "./helper";
import {Brick} from "./sprites/Brick";
import {Paddle} from "./sprites/Paddle";
import {BALL_SIZE, BALL_SPEED, BALL_STARTX, BALL_STARTY, PADDLE_SPEED, PADDLE_STARTX} from "./setup";
import {Size} from "./types";
import {Ball} from "./sprites/Ball";

enum EndState{
    GAME_OVER = "Game Over!",
    GAME_WON = "Game Won!"
}

export class Game {
    private readonly _isGameOver: boolean
    private readonly _view: CanvasView
    public score = 0
    private _bricks = createBricks()
    private readonly _paddle: Paddle
    private readonly _ball: Ball

    constructor(view: CanvasView) {
        this._isGameOver = false;
        this._view = view;
        this._paddle = new Paddle(PADDLE_STARTX, this.canvasSize(), PADDLE_SPEED)
        const ballPosition = {x: BALL_STARTX, y: BALL_STARTY};
        this._ball =new Ball(ballPosition, BALL_SIZE, BALL_SPEED)
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

    get isGameOver(): boolean {
        return this._isGameOver
    }

    get bricks(): Brick[] {
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
        this.loop()
    }

    loop():void{
        this._view.clear()
        this._view.drawBricks(this._bricks)
        this._view.drawSprite(this._paddle)
        this._view.drawSprite(this._ball)
        this._paddle.detectMove()
        this._ball.move()
        requestAnimationFrame(()=>{this.loop()})
    }
}

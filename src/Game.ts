import {CanvasView} from "./view/CanvasView";
import {createBricks} from "./helper";
import {Brick} from "./sprites/Brick";
import {Paddle} from "./sprites/Paddle";
import {PADDLE_SPEED, PADDLE_STARTX} from "./setup";
import {Size} from "./types";

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

    constructor(view: CanvasView) {
        this._isGameOver = false;
        this._view = view;
        this._paddle = new Paddle(PADDLE_STARTX, this.canvasSize(), PADDLE_SPEED)
    }

    private canvasSize(): Size{
        if(this._view.canvas){
            const {width, height} = this._view.canvas;
            return {width, height};
        }
        return {width:0, height:0}
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
        this.loop(this._view, createBricks())
    }

    loop(view: CanvasView, bricks: Brick[]):void{
        view.clear()
        view.drawBricks(this._bricks)
        view.drawSprite(this._paddle)
        this._paddle.move()
        requestAnimationFrame(()=>{this.loop(view, bricks)})
    }
}

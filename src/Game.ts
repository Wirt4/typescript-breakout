import {CanvasView} from "./view/CanvasView";
import {createBricks} from "./helper";
import {Brick} from "./sprites/Brick";
import {Paddle} from "./sprites/Paddle";
import {PADDLE_STARTX} from "./setup";

enum EndState{
    GAME_OVER = "Game Over!",
    GAME_WON = "Game Won!"
}

export class Game {
    private readonly _isGameOver: boolean
    private readonly _view: CanvasView
    public score = 0
    private _bricks = createBricks()

    constructor(view: CanvasView) {
        this._isGameOver = false;
        this._view = view;
        if (view.canvas){
            const {width, height} = view.canvas;
            new Paddle(PADDLE_STARTX,{width, height})
        }
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
        const canvasSize = {width: this._view.canvas?.width||0, height: this._view.canvas?.height||0}
        const paddle = new Paddle(PADDLE_STARTX, canvasSize, 8)
        this.loop(this._view, createBricks(), paddle)
    }

    loop(view: CanvasView, bricks: Brick[], paddle: Paddle):void{
        view.clear()
        view.drawBricks(this._bricks)
        view.drawSprite(paddle)
        paddle.move()
        requestAnimationFrame(()=>{this.loop(view, bricks, paddle)})
    }
}

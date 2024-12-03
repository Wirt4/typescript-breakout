import {CanvasView} from "./view/CanvasView";
import {createBricks} from "./helper";
import {Brick} from "./sprites/Brick";
import {Paddle} from "./sprites/Paddle";
import {PADDLE_STARTX} from "./setup";

enum EndState{
    GAME_OVER = "Game Over!",
    GAME_WON = "Game Won!",
    BLANK = ""
}

export class Game {
    private readonly _isGameOver: boolean
    private _view: CanvasView
    public score = 0

    constructor(view: CanvasView) {
        this._isGameOver = false;
        this._view = view;
    }

    get isGameOver(): boolean {
        return this._isGameOver
    }

    setGameOver():void {
        this.setGameStatus(EndState.GAME_OVER)
    }

    clearInfo():void{
        this.setGameStatus(EndState.BLANK)
    }

    setGameWin():void{
        this.setGameStatus(EndState.GAME_WON)
    }

    setGameStatus(state: EndState):void{
        this._view.drawInfo(state)
    }

    start(view: CanvasView){
        view.drawInfo("")
        view.drawScore(0)
        const canvasSize = {width: view.canvas?.width||0, height:view.canvas?.height||0}
        const paddle = new Paddle(PADDLE_STARTX, canvasSize, 8)
        this.loop(view, createBricks(), paddle)
    }

    loop(view: CanvasView, bricks: Brick[], paddle: Paddle):void{
        view.clear()
        view.drawBricks(bricks)
        requestAnimationFrame(()=>{this.loop(view, bricks, paddle)})
    }
}

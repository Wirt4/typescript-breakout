import {CanvasView} from "./view/CanvasView";
import {createBricks} from "./helper";
import {Brick} from "./sprites/Brick";

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

    start():void{
        this.clearInfo()
        this._view.drawScore(0)
        this.loop(this._view, createBricks())
    }

    loop(view: CanvasView, bricks: Brick[]):void{
        view.clear()
        view.drawBricks([])
    }
}

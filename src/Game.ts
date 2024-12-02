import {CanvasView} from "./view/CanvasView";
enum EndState{
    GAME_OVER = "Game Over!",
    GAME_WON = "Game Won!",
}
export class Game {
    private _isGameOver: boolean
    private _view: CanvasView

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

    setGameWin():void{
        this.setGameStatus(EndState.GAME_WON)
    }

    setGameStatus(state: EndState):void{
        this._view.drawInfo(state)
    }
}

import {CanvasView} from "./view/CanvasView";

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
        this._view.drawInfo("Game Over!")
        this._isGameOver = true
    }
}

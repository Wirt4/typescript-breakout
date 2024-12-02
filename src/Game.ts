import {CanvasView} from "./view/CanvasView";

export class Game {
    private _isGameOver: boolean

    constructor(view: CanvasView = new CanvasView('stub')) {
        view.drawInfo("Game Over!")
        this._isGameOver = false;
    }

    get isGameOver(): boolean {
        return this._isGameOver
    }

    setGameOver():void {
        this._isGameOver = true
    }
}

export class Game {
    private _isGameOver: boolean

    constructor() {
        this._isGameOver = false;
    }

    get isGameOver(): boolean {
        return this._isGameOver
    }

    setGameOver():void {
        this._isGameOver = true
    }
}

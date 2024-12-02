import {Sprite} from "./Sprite";

export class Paddle extends Sprite{
    private _moveLeft = false

    get isMovingLeft():boolean{
        return this._moveLeft;
    }
    get isMovingRight(): boolean{
        return this._moveLeft;
    }
}

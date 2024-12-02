import {Sprite} from "./Sprite";

export class Paddle extends Sprite{
    private _moveLeft = false

    get moveLeft():boolean{
        return this._moveLeft;
    }
}

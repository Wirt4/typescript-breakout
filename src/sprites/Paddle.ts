import {Sprite} from "./Sprite";
import {Size, Vector} from "../types";

export class Paddle extends Sprite{
    private _moveLeft = false

    constructor(src: string, pos: Vector, size: Size) {
        super(src, pos, size);
        document.addEventListener('keydown', this.handleKeyDown);
    }
    get isMovingLeft():boolean{
        return this._moveLeft;
    }

    get isMovingRight(): boolean{
        return this._moveLeft;
    }

    handleKeyDown = (event: KeyboardEvent)=>{
       if(event.key == "ArrowLeft") this._moveLeft = true;
    }
}

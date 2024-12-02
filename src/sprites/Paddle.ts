import {Sprite} from "./Sprite";
import {Size, Vector} from "../types";

export class Paddle extends Sprite{
    private _moveLeft = false
    private _moveRight = false

    constructor(src: string, pos: Vector, size: Size) {
        super(src, pos, size);
        document.addEventListener('keydown', this.handleKeyDown);
    }
    get isMovingLeft():boolean{
        return this._moveLeft;
    }

    get isMovingRight(): boolean{
        return this._moveRight;
    }

    handleKeyDown = (event: KeyboardEvent)=>{
        switch (event.key){
            case"ArrowLeft":
                if (this.isMovingRight){
                    this._moveRight = false
                    this._moveLeft = false
                    break
                }
                this._moveLeft = true
                break
            case "ArrowRight":
                if (this.isMovingLeft){
                    this._moveRight = false
                    this._moveLeft = false
                    break
                }
                this._moveRight = true
        }
    }
}

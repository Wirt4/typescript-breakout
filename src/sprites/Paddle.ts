import {Sprite} from "./Sprite";
import {Size, Vector} from "../types";

export class Paddle extends Sprite{
    private _moveLeft = false
    private _moveRight = false

    constructor(src: string, pos: Vector, size: Size) {
        super(src, pos, size);
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
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
                    this.stopPaddle()
                    break
                }
                this._moveLeft = true
                break
            case "ArrowRight":
                if (this.isMovingLeft){
                    this.stopPaddle()
                    break
                }
                this._moveRight = true
        }
    }

    handleKeyUp = (event: KeyboardEvent)=>{
        switch (event.key){
            case"ArrowLeft":
                this._moveLeft = false
                break
            case "ArrowRight":
                this._moveRight = false
        }
    }

    private stopPaddle():void{
        this._moveRight = false
        this._moveLeft = false
    }
}

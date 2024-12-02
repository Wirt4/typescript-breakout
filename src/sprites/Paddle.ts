import {Sprite} from "./Sprite";
import {Size, Vector} from "../types";
import {PADDLE_WIDTH} from "../setup";
enum keys{
    LEFT = "ArrowLeft",
    RIGHT = "ArrowRight",
}
export class Paddle extends Sprite{
    private _moveLeft = false
    private _moveRight = false

    constructor(src: string, pos: Vector, size: Size) {
        size = {width: PADDLE_WIDTH, height: size.height};
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
            case keys.LEFT:
                if (this.isMovingRight){
                    this.stopPaddle()
                    break
                }
                this._moveLeft = true
                break
            case keys.RIGHT:
                if (this.isMovingLeft){
                    this.stopPaddle()
                    break
                }
                this._moveRight = true
        }
    }

    private stopPaddle():void{
        this._moveRight = false
        this._moveLeft = false
    }

    handleKeyUp = (event: KeyboardEvent)=>{
        switch (event.key){
            case keys.LEFT:
                this._moveLeft = false
                break
            case keys.RIGHT:
                this._moveRight = false
        }
    }
}

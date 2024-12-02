import {Sprite} from "./Sprite";
import {PADDLE_HEIGHT, PADDLE_WIDTH, STAGE_PADDING} from "../setup";
import PADDLE_IMAGE from "../images/paddle.png"
import {Size} from "../types";

enum keys{
    LEFT = "ArrowLeft",
    RIGHT = "ArrowRight",
}

export class Paddle extends Sprite{
    private _moveLeft = false
    private _moveRight = false
    private readonly _speed: number
    private _canvasWidth: number

    constructor(startX: number, canvasSize: Size,  speed: number = 5) {
        const size = {width: PADDLE_WIDTH, height: PADDLE_HEIGHT}
        const pos = {y:canvasSize.height - PADDLE_HEIGHT - STAGE_PADDING, x: startX}
        super(PADDLE_IMAGE, pos, size);
        this._speed = speed
        this._canvasWidth =canvasSize.width
        document.addEventListener('keydown', this.handleKeyDown)
        document.addEventListener('keyup', this.handleKeyUp)
    }
    get isMovingLeft():boolean{
        return this._moveLeft;
    }

    get isMovingRight(): boolean{
        return this._moveRight;
    }

    private stopPaddle():void{
        this._moveRight = false
        this._moveLeft = false
    }

    move():void{
       if (this.isMovingLeft) {
           const newX = this.x - this._speed
           this._x = newX >=0? newX : 0
       }
       if (this.isMovingRight) {
           const newX = this.x + this._speed
           this._x = newX <= this._canvasWidth - this.width? newX :this._canvasWidth - this.width
       }
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

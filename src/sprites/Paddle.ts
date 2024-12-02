import {Sprite} from "./Sprite";
import {Vector} from "../types";
import {PADDLE_HEIGHT, PADDLE_WIDTH} from "../setup";
import PADDLE_IMAGE from "../images/paddle.png"

enum keys{
    LEFT = "ArrowLeft",
    RIGHT = "ArrowRight",
}

export class Paddle extends Sprite{
    private _moveLeft = false
    private _moveRight = false
    private readonly _speed: number

    constructor(startX: number, canvasHeight: number =0, speed: number = 5) {
        const size = {width: PADDLE_WIDTH, height: PADDLE_HEIGHT};
        const pos= {y:770, x: startX}
        super(PADDLE_IMAGE, pos, size);
        this._speed = speed
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
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
       if (this.isMovingLeft) this._x -= this._speed;
       if (this.isMovingRight) this._x += this._speed;
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

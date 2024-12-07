import {Sprite} from "./Sprite";
import {Position} from "../types";
import BALL_IMAGE from "../images/ball.png";
import {CanvasContact} from "../enums";

export class Ball extends Sprite{
    private _speed: Position;
    private readonly canvasWidth: number

    constructor(position: Position, size: number, canvasWidth: number, speed: Position) {
        super(BALL_IMAGE, position, {width: size, height: size});
        this._speed = speed
        this.canvasWidth =canvasWidth
    }

    hasCanvasCollision(): CanvasContact{
        if (this.position.y <= 0){
            return CanvasContact.CEILING
        }

        if (this.position.x <= 0 || this.rightMostX >= this.canvasWidth) {
            return CanvasContact.WALL
        }

        return CanvasContact.NO_CONTACT
    }

    get speed(): number {
        return Math.abs(this._speed.x)
    }

    get centerX():number{
        return this.position.x + this.width/2
    }

    move():void{
        this.position.x += this._speed.x
        this.position.y += this._speed.y
    }

    bounceY():void{
        this._speed.y *= -1
    }

    bounceX():void{
        this._speed.x *= -1
    }
}


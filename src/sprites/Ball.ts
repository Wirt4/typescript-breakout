import {Sprite} from "./Sprite";
import {Position} from "../types";
import BALL_IMAGE from "../images/ball.png";
import {Contact} from "../enums";

export class Ball extends Sprite{
    private _speed: Position;
    private readonly canvasWidth: number

    constructor(position: Position, size: number, canvasWidth: number, speed: Position) {
        super(BALL_IMAGE, position, {width: size, height: size});
        this._speed = speed
        this.canvasWidth =canvasWidth
    }

    hasCanvasCollision(): Contact{
        if (this.position.y <= 0){
            return Contact.TOP_OR_BOTTOM
        }

        if (this.position.x <= 0 || this.rightMostX >= this.canvasWidth) {
            return Contact.SIDE
        }

        return Contact.NO_CONTACT
    }

    get speed(): number {
        return Math.abs(this._speed.x)
    }


    rewind(distance: number):void{
        //TODO: implement this
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


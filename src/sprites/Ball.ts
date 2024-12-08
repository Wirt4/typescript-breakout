import {Sprite} from "./Sprite";
import { Position, Vector} from "../types";
import BALL_IMAGE from "../images/ball.png";
import {Contact} from "../enums";

export class Ball extends Sprite{
    private _speed: Vector;
    private readonly canvasWidth: number

    constructor(position: Position, size: number, canvasWidth: number, vector: Vector) {
        super(BALL_IMAGE, position, {width: size, height: size});
        this._speed = vector
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
        return Math.abs(this._speed.xComponent)
    }


    private offset(distance: number, speedComponent: number){
        if (speedComponent > 0){
            return -distance
        }
        return  distance
    }

    rewind(distance: number):void{
        this.position.x += this.offset(distance, this._speed.xComponent)
        this.position.y += this.offset(distance, this._speed.yComponent)
    }

    move():void{
        this.position.x += this._speed.xComponent
        this.position.y += this._speed.yComponent
    }

    bounceY():void{
        this._speed.yComponent *= -1
    }

    bounceX():void{
        this._speed.xComponent *= -1
    }
}


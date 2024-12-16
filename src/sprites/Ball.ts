import {Sprite} from "./Sprite";
import { Position, Vector} from "../types";
import BALL_IMAGE from "../images/ball.png";
import {IBall} from "../Game/Interfaces/IBall";

export class Ball extends Sprite implements IBall{
    private _speed: Vector;

    constructor(position: Position, size: number, vector: Vector) {
        super(BALL_IMAGE, position, {width: size, height: size});
        this._speed = vector
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


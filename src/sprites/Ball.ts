import {Sprite} from "./Sprite";
import {Vector} from "../types";
import BALL_IMAGE from "../images/ball.png"

export class Ball extends Sprite{
    private readonly _xSpeed: number
    private  _ySpeed: number
    constructor(position: Vector, size: number, speed: number) {
        super(BALL_IMAGE, position, {width: size, height: size});
        this._xSpeed = speed;
        this._ySpeed = speed *-1;
    }

    move():void{
        this._x += this._xSpeed
        this._y += this._ySpeed
    }

    bounceY(){
        this._ySpeed *= -1
    }
}
